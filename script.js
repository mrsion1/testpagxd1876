(() => {
  "use strict";

  const config = window.WEDDING_CONFIG;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };

  const fullCouple = `${config.couple.partner1} & ${config.couple.partner2}`;
  const fullCoupleWords = `${config.couple.partner1} y ${config.couple.partner2}`;

  // Inserción de datos configurables
  document.title = `Nos casamos | ${fullCouple}`;
  setText("#navCouple", config.couple.initials);
  setText("#heroCouple", fullCouple);
  setText("#heroDate", config.event.dateText);
  setText("#heroPlace", config.event.mainPlace);
  setText("#romanticQuote", `“${config.couple.quote}”`);
  setText("#welcomeSignature", fullCoupleWords);
  setText("#ceremonyTime", config.ceremony.time);
  setText("#ceremonyVenue", config.ceremony.venue);
  setText("#ceremonyAddress", config.ceremony.address);
  setText("#receptionTime", config.reception.time);
  setText("#receptionVenue", config.reception.venue);
  setText("#receptionAddress", config.reception.address);
  setText("#eventDay", config.event.dayText);
  setText("#eventFullDate", config.event.dateText);
  setText("#rsvpDeadline", config.event.rsvpDeadline);
  setText("#contactName", config.contact.name);
  setText("#phoneLink", config.contact.phoneDisplay);
  setText("#hashtagButton", config.social.hashtag);
  setText("#footerCouple", fullCouple);
  setText("#footerYear", new Date(config.event.dateTime).getFullYear().toString());

  $("#closingSignature").innerHTML = `Con cariño,<br>${fullCouple}`;
  $("#ceremonyMaps").href = config.ceremony.mapsUrl;
  $("#receptionMaps").href = config.reception.mapsUrl;
  $("#phoneLink").href = `tel:+${config.contact.phoneInternational}`;

  setText("#bankName", config.gifts.bank);
  setText("#accountType", config.gifts.accountType);
  setText("#rutdep", config.gifts.rutdep);
  setText("#accountNumber", config.gifts.accountNumber);
  setText("#accountHolder", config.gifts.accountHolder);
  setText("#accountEmail", config.gifts.email);

  const whatsappMessage = encodeURIComponent(
    `Hola, tengo una consulta sobre la boda de ${fullCouple}.`
  );
  $("#whatsAppLink").href =
    `https://wa.me/${config.contact.phoneInternational}?text=${whatsappMessage}`;

  // Menú móvil
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Cerrar menú" : "Abrir menú");
    navLinks.classList.toggle("open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  $$("#navLinks a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Cabecera al desplazarse
  const header = $("#siteHeader");
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Sección activa en la navegación
  const navigationLinks = $$("#navLinks a");
  const observedSections = navigationLinks
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);

  const scrollSpy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navigationLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: [0.05, 0.2, 0.5]
    }
  );

  observedSections.forEach((section) => scrollSpy.observe(section));

  // Animación de aparición
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  $$(".reveal").forEach((element) => revealObserver.observe(element));

  // Cuenta regresiva
  const targetDate = new Date(config.event.dateTime).getTime();
  const countdownElements = {
    days: $("#days"),
    hours: $("#hours"),
    minutes: $("#minutes"),
    seconds: $("#seconds")
  };

  const pad = (number) => String(number).padStart(2, "0");

  const updateCountdown = () => {
    const distance = targetDate - Date.now();

    if (distance <= 0) {
      Object.values(countdownElements).forEach((element) => {
        element.textContent = "00";
      });
      setText("#countdownMessage", "¡Llegó el gran día! Gracias por celebrar junto a nosotros.");
      return;
    }

    const days = Math.floor(distance / 86_400_000);
    const hours = Math.floor((distance % 86_400_000) / 3_600_000);
    const minutes = Math.floor((distance % 3_600_000) / 60_000);
    const seconds = Math.floor((distance % 60_000) / 1_000);

    countdownElements.days.textContent = pad(days);
    countdownElements.hours.textContent = pad(hours);
    countdownElements.minutes.textContent = pad(minutes);
    countdownElements.seconds.textContent = pad(seconds);
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Archivo de calendario (.ics)
  const formatCalendarDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const min = String(date.getUTCMinutes()).padStart(2, "0");
    const ss = String(date.getUTCSeconds()).padStart(2, "0");
    return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
  };

  $("#calendarButton").addEventListener("click", () => {
    const calendarContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Invitacion Boda//ES",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@invitacion-boda`,
      `DTSTAMP:${formatCalendarDate(new Date().toISOString())}`,
      `DTSTART:${formatCalendarDate(config.event.dateTime)}`,
      `DTEND:${formatCalendarDate(config.event.endDateTime)}`,
      `SUMMARY:Boda de ${fullCouple}`,
      `LOCATION:${config.reception.venue}, ${config.reception.address}`,
      "DESCRIPTION:¡Nos casamos! Será una alegría contar con tu presencia.",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([calendarContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `boda-${config.couple.partner1}-${config.couple.partner2}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  });

  // Confirmación de asistencia
  const rsvpForm = $("#rsvpForm");
  const rsvpFeedback = $("#rsvpFeedback");
  const rsvpWhatsApp = $("#sendRsvpWhatsApp");

  const buildRsvpMessage = (data) => [
    `Confirmación para la boda de ${fullCouple}`,
    `Nombre: ${data.guestName}`,
    `Asistencia: ${data.attendance}`,
    `Cantidad: ${data.guestCount}`,
    `Acompañante: ${data.companionName || "No indicado"}`,
    `Comentario: ${data.rsvpComment || "Sin comentarios"}`
  ].join("\n");

  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData.entries());
    data.savedAt = new Date().toISOString();

    try {
      localStorage.setItem("weddingRsvp", JSON.stringify(data));
      rsvpFeedback.textContent = "Tu confirmación fue guardada correctamente.";
    } catch {
      rsvpFeedback.textContent = "La confirmación está lista para enviar por WhatsApp.";
    }

    const message = encodeURIComponent(buildRsvpMessage(data));
    rsvpWhatsApp.href =
      `https://wa.me/${config.contact.phoneInternational}?text=${message}`;
    rsvpWhatsApp.classList.remove("hidden");
  });

  // Restaurar confirmación guardada
  try {
    const savedRsvp = JSON.parse(localStorage.getItem("weddingRsvp"));
    if (savedRsvp) {
      Object.entries(savedRsvp).forEach(([key, value]) => {
        const field = rsvpForm.elements[key];
        if (!field) return;

        if (field instanceof RadioNodeList) {
          [...field].forEach((radio) => {
            radio.checked = radio.value === value;
          });
        } else if (key !== "savedAt") {
          field.value = value;
        }
      });
    }
  } catch {
    // Si el navegador bloquea localStorage, el formulario sigue funcionando.
  }

  // Preferencias alimentarias
  const foodForm = $("#foodForm");
  const foodFeedback = $("#foodFeedback");

  foodForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(foodForm);
    const preferences = formData.getAll("foodPreference");
    const data = {
      guestName: formData.get("foodGuestName"),
      preferences,
      details: formData.get("foodDetails"),
      savedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem("weddingFoodPreferences", JSON.stringify(data));
      foodFeedback.textContent = "Tus preferencias fueron guardadas correctamente.";
    } catch {
      foodFeedback.textContent = "Preferencias registradas en el formulario.";
    }
  });

  // Datos bancarios
  const bankDetails = $("#bankDetails");
  $("#bankDetailsButton").addEventListener("click", () => {
    const isHidden = bankDetails.classList.toggle("hidden");
    $("#bankDetailsButton").textContent = isHidden
      ? "Ver datos de aporte"
      : "Ocultar datos";
  });

  $("#copyBankDetails").addEventListener("click", async () => {
    const bankText = [
      `Banco: ${config.gifts.bank}`,
      `Tipo de cuenta: ${config.gifts.accountType}`,
      `Número: ${config.gifts.accountNumber}`,
      `Titular: ${config.gifts.accountHolder}`,
      `Correo: ${config.gifts.email}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(bankText);
      $("#copyBankDetails").textContent = "Datos copiados ✓";
    } catch {
      $("#copyBankDetails").textContent = "Selecciona y copia los datos manualmente";
    }
  });

  // Hashtag
  $("#hashtagButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(config.social.hashtag);
      setText("#hashtagFeedback", "Hashtag copiado ✓");
    } catch {
      setText("#hashtagFeedback", `Copia esta etiqueta: ${config.social.hashtag}`);
    }
  });

  // Galería
  const galleryModal = $("#galleryModal");
  const modalImage = $("#modalImage");

  $$(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      modalImage.src = item.dataset.image;
      if (typeof galleryModal.showModal === "function") {
        galleryModal.showModal();
      }
    });
  });

  const closeGallery = () => {
    if (galleryModal.open) galleryModal.close();
  };

  $("#modalClose").addEventListener("click", closeGallery);
  galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) closeGallery();
  });

  // Reproductor musical fijo
  const musicConfig = config.music || {};
  const tracks = Array.isArray(musicConfig.tracks) ? musicConfig.tracks : [];
  const audio = $("#weddingAudio");
  const musicPlayer = $("#musicPlayer");
  const musicStartPrompt = $("#musicStartPrompt");
  const musicStartButton = $("#musicStartButton");
  const playPauseButton = $("#playPauseButton");
  const previousTrackButton = $("#previousTrackButton");
  const nextTrackButton = $("#nextTrackButton");
  const rewindButton = $("#rewindButton");
  const forwardButton = $("#forwardButton");
  const muteButton = $("#muteButton");
  const progressSlider = $("#progressSlider");
  const volumeSlider = $("#volumeSlider");
  const playerCollapseButton = $("#playerCollapseButton");
  const openPlaylistButton = $("#openPlaylistButton");
  const playlistCards = $("#playlistCards");

  let currentTrackIndex = 0;
  let lastNonZeroVolume = Number(musicConfig.initialVolume ?? 0.55) || 0.55;
  let autoplayPending = false;
  let pendingResumeTime = 0;

  const safeStorageGet = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const safeStorageSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // El reproductor continúa funcionando aunque el navegador bloquee localStorage.
    }
  };

  const formatAudioTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const renderPlaylist = () => {
    playlistCards.innerHTML = "";

    tracks.forEach((track, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "playlist-card";
      card.dataset.trackIndex = String(index);
      card.setAttribute("aria-label", `Reproducir ${track.title} de ${track.artist}`);
      card.innerHTML = `
        <img src="${track.cover || "assets/music-cover-1.svg"}" alt="" />
        <span class="playlist-card-copy">
          <strong>${track.title}</strong>
          <span>${track.artist}${track.album ? ` · ${track.album}` : ""}</span>
        </span>
        <span class="playlist-card-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="playlist-card-state">Reproduciendo ♫</span>
      `;
      card.addEventListener("click", () => {
        loadTrack(index, true, 0);
      });
      playlistCards.appendChild(card);
    });
  };

  const updateActiveTrack = () => {
    $$(".playlist-card", playlistCards).forEach((card, index) => {
      const active = index === currentTrackIndex;
      card.classList.toggle("active", active);
      card.setAttribute("aria-pressed", String(active));
    });
  };

  const updatePlayButton = () => {
    const playing = !audio.paused && !audio.ended;
    playPauseButton.textContent = playing ? "❚❚" : "▶";
    playPauseButton.setAttribute("aria-label", playing ? "Pausar" : "Reproducir");
    playPauseButton.title = playing ? "Pausar" : "Reproducir";
  };

  const updateMuteButton = () => {
    const silent = audio.muted || audio.volume === 0;
    muteButton.textContent = silent ? "🔇" : audio.volume < 0.45 ? "🔉" : "🔊";
    muteButton.setAttribute("aria-label", silent ? "Activar sonido" : "Silenciar");
    muteButton.title = silent ? "Activar sonido" : "Silenciar";
  };

  const hideStartPrompt = () => {
    autoplayPending = false;
    musicStartPrompt.classList.add("hidden");
    removeUnlockListeners();
  };

  const showStartPrompt = () => {
    autoplayPending = true;
    musicStartPrompt.classList.remove("hidden");
    addUnlockListeners();
  };

  const attemptPlayback = async ({ showPromptOnFailure = true } = {}) => {
    if (!tracks.length) return false;

    try {
      await audio.play();
      hideStartPrompt();
      updatePlayButton();
      return true;
    } catch {
      updatePlayButton();
      if (showPromptOnFailure) showStartPrompt();
      return false;
    }
  };

  const loadTrack = (index, shouldPlay = false, resumeTime = 0) => {
    if (!tracks.length) return;

    currentTrackIndex = (index + tracks.length) % tracks.length;
    const track = tracks[currentTrackIndex];
    pendingResumeTime = Number.isFinite(resumeTime) ? Math.max(0, resumeTime) : 0;

    audio.src = track.file;
    audio.load();
    setText("#playerTitle", track.title);
    setText("#playerArtist", track.artist);
    $("#playerArtist").classList.remove("music-error");
    $("#playerCover").src = track.cover || "assets/music-cover-1.svg";
    $("#playerCover").alt = `Portada de ${track.title}`;
    setText("#currentTime", "0:00");
    setText("#durationTime", "0:00");
    progressSlider.value = "0";
    updateActiveTrack();
    updatePlayButton();

    safeStorageSet("weddingMusicTrack", String(currentTrackIndex));
    safeStorageSet("weddingMusicTime", String(pendingResumeTime));

    if (shouldPlay) {
      attemptPlayback();
    }
  };

  const nextTrack = (shouldPlay = true) => {
    loadTrack(currentTrackIndex + 1, shouldPlay, 0);
  };

  const previousTrack = () => {
    if (audio.currentTime > 4) {
      audio.currentTime = 0;
      return;
    }
    loadTrack(currentTrackIndex - 1, true, 0);
  };

  const unlockOnInteraction = (event) => {
    if (!autoplayPending) return;
    if (event.type === "keydown" && ["Tab", "Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
    attemptPlayback({ showPromptOnFailure: true });
  };

  const addUnlockListeners = () => {
    document.addEventListener("pointerdown", unlockOnInteraction, { once: true, capture: true });
    document.addEventListener("touchstart", unlockOnInteraction, { once: true, capture: true, passive: true });
    document.addEventListener("keydown", unlockOnInteraction, { once: true, capture: true });
  };

  const removeUnlockListeners = () => {
    document.removeEventListener("pointerdown", unlockOnInteraction, true);
    document.removeEventListener("touchstart", unlockOnInteraction, true);
    document.removeEventListener("keydown", unlockOnInteraction, true);
  };

  if (tracks.length) {
    renderPlaylist();

    const storedTrack = Number.parseInt(safeStorageGet("weddingMusicTrack") || "0", 10);
    const storedTime = Number.parseFloat(safeStorageGet("weddingMusicTime") || "0");
    const storedVolume = Number.parseFloat(safeStorageGet("weddingMusicVolume") || "");
    const storedCollapsed = safeStorageGet("weddingMusicCollapsed") === "true";

    currentTrackIndex = Number.isInteger(storedTrack) && storedTrack >= 0 && storedTrack < tracks.length
      ? storedTrack
      : 0;

    const initialVolume = Number.isFinite(storedVolume)
      ? Math.min(1, Math.max(0, storedVolume))
      : Math.min(1, Math.max(0, Number(musicConfig.initialVolume ?? 0.55)));

    audio.volume = initialVolume;
    audio.muted = false;
    volumeSlider.value = String(initialVolume);
    if (initialVolume > 0) lastNonZeroVolume = initialVolume;
    updateMuteButton();

    if (storedCollapsed) {
      musicPlayer.classList.add("collapsed");
      document.body.classList.add("player-collapsed");
      playerCollapseButton.setAttribute("aria-expanded", "false");
      playerCollapseButton.setAttribute("aria-label", "Expandir reproductor");
      playerCollapseButton.title = "Expandir reproductor";
    }

    loadTrack(currentTrackIndex, false, Number.isFinite(storedTime) ? storedTime : 0);

    audio.addEventListener("loadedmetadata", () => {
      progressSlider.max = String(audio.duration || 100);
      setText("#durationTime", formatAudioTime(audio.duration));

      if (pendingResumeTime > 0 && pendingResumeTime < audio.duration - 1) {
        audio.currentTime = pendingResumeTime;
      }
      pendingResumeTime = 0;
    });

    audio.addEventListener("timeupdate", () => {
      if (Number.isFinite(audio.duration)) {
        progressSlider.max = String(audio.duration);
        progressSlider.value = String(audio.currentTime);
      }
      setText("#currentTime", formatAudioTime(audio.currentTime));

      if (Math.floor(audio.currentTime) % 3 === 0) {
        safeStorageSet("weddingMusicTime", String(audio.currentTime));
      }
    });

    audio.addEventListener("play", updatePlayButton);
    audio.addEventListener("pause", updatePlayButton);
    audio.addEventListener("ended", () => nextTrack(true));
    audio.addEventListener("volumechange", updateMuteButton);
    audio.addEventListener("error", () => {
      $("#playerArtist").textContent = "No se pudo cargar el archivo de audio";
      $("#playerArtist").classList.add("music-error");
      updatePlayButton();
    });

    playPauseButton.addEventListener("click", () => {
      if (audio.paused) attemptPlayback();
      else audio.pause();
    });

    previousTrackButton.addEventListener("click", previousTrack);
    nextTrackButton.addEventListener("click", () => nextTrack(true));

    rewindButton.addEventListener("click", () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    forwardButton.addEventListener("click", () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : audio.currentTime + 10;
      audio.currentTime = Math.min(duration, audio.currentTime + 10);
    });

    progressSlider.addEventListener("input", () => {
      if (Number.isFinite(audio.duration)) {
        audio.currentTime = Number(progressSlider.value);
      }
    });

    volumeSlider.addEventListener("input", () => {
      const volume = Number(volumeSlider.value);
      audio.volume = volume;
      audio.muted = false;
      if (volume > 0) lastNonZeroVolume = volume;
      safeStorageSet("weddingMusicVolume", String(volume));
    });

    muteButton.addEventListener("click", () => {
      if (audio.muted || audio.volume === 0) {
        audio.muted = false;
        audio.volume = Math.max(0.05, lastNonZeroVolume);
        volumeSlider.value = String(audio.volume);
      } else {
        lastNonZeroVolume = audio.volume;
        audio.muted = true;
      }
      updateMuteButton();
    });

    musicStartButton.addEventListener("click", () => attemptPlayback());

    playerCollapseButton.addEventListener("click", () => {
      const collapsed = musicPlayer.classList.toggle("collapsed");
      document.body.classList.toggle("player-collapsed", collapsed);
      playerCollapseButton.setAttribute("aria-expanded", String(!collapsed));
      playerCollapseButton.setAttribute("aria-label", collapsed ? "Expandir reproductor" : "Minimizar reproductor");
      playerCollapseButton.title = collapsed ? "Expandir reproductor" : "Minimizar reproductor";
      safeStorageSet("weddingMusicCollapsed", String(collapsed));
    });

    openPlaylistButton.addEventListener("click", () => {
      $("#musica").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    window.addEventListener("beforeunload", () => {
      safeStorageSet("weddingMusicTrack", String(currentTrackIndex));
      safeStorageSet("weddingMusicTime", String(audio.currentTime));
    });

    // Los navegadores deciden si permiten autoplay con sonido. Primero se intenta
    // reproducir normalmente; si se bloquea, se muestra el botón y el primer toque
    // o clic del usuario vuelve a intentar la reproducción.
    if (musicConfig.autoplay !== false) {
      window.setTimeout(() => attemptPlayback(), 250);
    }
  } else {
    musicPlayer.classList.add("hidden");
    document.body.style.paddingBottom = "0";
    playlistCards.innerHTML = "<p>No hay canciones configuradas todavía.</p>";
  }

})();
