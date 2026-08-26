(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);

  const loginView = $("#loginView");
  const dashboardView = $("#dashboardView");
  const configError = $("#configError");
  const loginForm = $("#loginForm");
  const loginButton = $("#loginButton");
  const loginMessage = $("#loginMessage");
  const logoutButton = $("#logoutButton");
  const refreshButton = $("#refreshButton");
  const searchInput = $("#searchInput");
  const loadingState = $("#loadingState");
  const errorState = $("#errorState");
  const tableWrapper = $("#tableWrapper");
  const emptyState = $("#emptyState");
  const confirmationsBody = $("#confirmationsBody");

  let client = null;
  let confirmations = [];

  function showOnly(view) {
    [loginView, dashboardView, configError].forEach((el) => el.classList.add("hidden"));
    view.classList.remove("hidden");
  }

  function normalize(value) {
    return String(value || "").trim().toLocaleLowerCase("es");
  }

  function isYes(value) {
    const v = normalize(value);
    return v.startsWith("sí") || v.startsWith("si") ||
      v.includes("asistiré") || v.includes("asistire");
  }

  function isNo(value) {
    const v = normalize(value);
    return v.startsWith("no") || v.includes("no podr");
  }

  function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("es-CL", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);
  }

  function makeCell(label, value, className = "") {
    const td = document.createElement("td");
    td.dataset.label = label;
    td.textContent = value ?? "—";
    if (className) td.className = className;
    return td;
  }

  function makeStatusCell(value) {
    const td = document.createElement("td");
    td.dataset.label = "Asistencia";

    const span = document.createElement("span");
    span.className = "status " + (isYes(value) ? "yes" : isNo(value) ? "no" : "other");
    span.textContent = value || "Sin indicar";

    td.appendChild(span);
    return td;
  }

  function renderRows(rows) {
    confirmationsBody.replaceChildren();

    rows.forEach((item) => {
      const tr = document.createElement("tr");
      tr.appendChild(makeCell("Nombre", item.nombre || "—"));
      tr.appendChild(makeStatusCell(item.asistencia));
      tr.appendChild(makeCell("Personas", item.cantidad_personas ?? "—"));
      tr.appendChild(makeCell("Acompañante", item.acompanante || "—"));
      tr.appendChild(makeCell("Comentario", item.comentario || "—", "comment-cell"));
      tr.appendChild(makeCell("Fecha", formatDate(item.fecha_confirmacion)));
      confirmationsBody.appendChild(tr);
    });

    tableWrapper.classList.toggle("hidden", rows.length === 0);
    emptyState.classList.toggle("hidden", rows.length !== 0);

    $("#tableSummary").textContent =
      rows.length === confirmations.length
        ? `${confirmations.length} respuesta${confirmations.length === 1 ? "" : "s"}`
        : `${rows.length} de ${confirmations.length} respuestas`;
  }

  function updateStats() {
    const yes = confirmations.filter((x) => isYes(x.asistencia));
    const no = confirmations.filter((x) => isNo(x.asistencia));

    const people = yes.reduce((total, x) => {
      const n = Number(x.cantidad_personas);
      return total + (Number.isFinite(n) ? n : 0);
    }, 0);

    $("#statTotal").textContent = confirmations.length;
    $("#statYes").textContent = yes.length;
    $("#statNo").textContent = no.length;
    $("#statPeople").textContent = people;
  }

  function applySearch() {
    const q = searchInput.value.trim().toLocaleLowerCase("es");

    if (!q) {
      renderRows(confirmations);
      return;
    }

    const filtered = confirmations.filter((x) =>
      [x.nombre, x.asistencia, x.acompanante, x.comentario]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("es")
        .includes(q)
    );

    renderRows(filtered);
  }

  async function loadConfirmations() {
    loadingState.classList.remove("hidden");
    tableWrapper.classList.add("hidden");
    emptyState.classList.add("hidden");
    errorState.classList.add("hidden");

    const { data, error } = await client
      .from("confirmaciones")
      .select("id,nombre,asistencia,fecha_confirmacion")
      .order("fecha_confirmacion", { ascending: false });

    loadingState.classList.add("hidden");

    if (error) {
      console.error("Error cargando confirmaciones:", error);
      errorState.textContent =
        "No fue posible leer las confirmaciones. Revisa RLS y permisos en Supabase.";
      errorState.classList.remove("hidden");
      return;
    }

    confirmations = Array.isArray(data) ? data : [];
    updateStats();
    applySearch();
  }

  async function getAuthorizedProfile(user) {
    const { data, error } = await client
      .from("usuarios")
      .select("id,email,nombre,rol,activo")
      .eq("id", user.id)
      .eq("activo", true)
      .maybeSingle();

    if (error) {
      console.error("Error comprobando autorización:", error);
      return null;
    }

    return data;
  }

  async function openDashboard(user) {
    const profile = await getAuthorizedProfile(user);

    if (!profile) {
      await client.auth.signOut();
      showOnly(loginView);
      loginMessage.textContent = "Esta cuenta no está autorizada para entrar al panel.";
      return;
    }

    $("#adminName").textContent = profile.nombre || "Administrador";
    $("#adminEmail").textContent = profile.email || user.email || "";

    showOnly(dashboardView);
    await loadConfirmations();
  }

  async function init() {
    if (!window.supabaseClient) {
      showOnly(configError);
      return;
    }

    client = window.supabaseClient;

    const { data, error } = await client.auth.getSession();

    if (error) {
      console.error(error);
      showOnly(loginView);
      return;
    }

    if (data.session?.user) {
      await openDashboard(data.session.user);
    } else {
      showOnly(loginView);
    }
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginMessage.textContent = "";

    const email = $("#email").value.trim();
    const password = $("#password").value;

    loginButton.disabled = true;
    loginButton.textContent = "Ingresando…";

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });

    loginButton.disabled = false;
    loginButton.textContent = "Iniciar sesión";

    if (error || !data?.user) {
      console.error(error);
      loginMessage.textContent = "Correo o contraseña incorrectos.";
      return;
    }

    await openDashboard(data.user);
  });

  logoutButton.addEventListener("click", async () => {
    await client.auth.signOut();
    confirmations = [];
    searchInput.value = "";
    loginForm.reset();
    loginMessage.textContent = "";
    showOnly(loginView);
  });

  refreshButton.addEventListener("click", async () => {
    refreshButton.disabled = true;
    await loadConfirmations();
    refreshButton.disabled = false;
  });

  searchInput.addEventListener("input", applySearch);

  $("#showPassword").addEventListener("click", () => {
    const password = $("#password");
    const showing = password.type === "text";
    password.type = showing ? "password" : "text";
    $("#showPassword").textContent = showing ? "Ver" : "Ocultar";
  });

  init();
})();
