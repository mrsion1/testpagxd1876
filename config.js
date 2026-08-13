/*
  CONFIGURACIÓN PRINCIPAL
  Cambia estos datos y la página se actualizará automáticamente.
*/

window.WEDDING_CONFIG = {
  couple: {
    partner1: "Carolina",
    partner2: "Franco",
    initials: "C & F",
    quote: "El mejor lugar del mundo es aquel donde estamos juntos."
  },

  event: {
    // Formato recomendado: AAAA-MM-DDTHH:MM:SS-03:00
    dateTime: "2026-12-20T17:30:00-03:00",
    endDateTime: "2026-12-21T03:00:00-03:00",
    dateText: "20 de diciembre de 2026",
    dayText: "Domingo",
    mainPlace: "Viña Santa Aurora · Santiago",
    rsvpDeadline: "20 de noviembre de 2026"
  },

  ceremony: {
    time: "17:30 horas",
    venue: "Capilla Santa Clara",
    address: "Camino Los Almendros 2450, Pirque, Región Metropolitana",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pirque+Chile"
  },

  reception: {
    time: "19:00 horas",
    venue: "Viña Santa Aurora",
    address: "Camino El Principal 3880, Pirque, Región Metropolitana",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pirque+Chile"
  },

  contact: {
    name: "Camila — Coordinación",
    phoneDisplay: "+56 9 1234 5678",
    phoneInternational: "56912345678"
  },

  gifts: {
    registryUrl: "https://example.com/lista-de-novios",
    bank: "Banco de ejemplo",
    accountType: "Cuenta corriente",
    accountNumber: "000000000",
    accountHolder: "Martina Ejemplo",
    email: "novios@ejemplo.cl"
  },

  social: {
    hashtag: "#CarolinaYFranco"
  },

  music: {
    // Se intentará reproducir automáticamente. Si el navegador lo bloquea,
    // aparecerá el botón “♫ Iniciar música”.
    autoplay: true,
    initialVolume: 0.55,
    tracks: [
      {
        title: "MTC",
        artist: "S3RL",
        album: "Recuerdos",
        file: "musica/cancion-01.mp3",
        cover: "assets/music-cover-1.svg"
      },
      {
        title: "did i tell u that i miss u",
        artist: "adore",
        album: "Recuerdos",
        file: "musica/cancion-02.mp3",
        cover: "assets/music-cover-2.svg"
      },
      {
        title: "Looping the Rooms",
        artist: "Hatsune Miku",
        album: "Recuerdos",
        file: "musica/cancion-03.mp3",
        cover: "assets/music-cover-3.svg"
      }
    ]
  }
};
