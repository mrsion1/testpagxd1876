/*
  CONFIGURACIÓN PRINCIPAL
  Cambia estos datos y la página se actualizará automáticamente.
*/

window.WEDDING_CONFIG = {
  couple: {
    partner1: "Maria Carolina",
    partner2: "Franco Javier",
    initials: "MC & FJ",
    quote: "El mejor lugar del mundo es aquel donde estamos juntos."
  },

  event: {
    // Formato recomendado: AAAA-MM-DDTHH:MM:SS-03:00
    dateTime: "2027-03-20T17:30:00-03:00",
    endDateTime: "2027-01-31T03:00:00-03:00",
    dateText: "20 de marzo de 2027",
    dayText: "Sabado",
    mainPlace: "Parroquia Divino Maestro · Rancagua",
    rsvpDeadline: "31 de Enero de 2027"
  },

  ceremony: {
    time: "17:30 horas",
    venue: "Parroquia Divino Maestro",
    address: "Marta Brunet 038, 2831381 Rancagua, O'Higgins",
    mapsUrl: "https://maps.app.goo.gl/Ngan9kmz31t6HtVAA"
  },

  reception: {
    time: "19:00 horas",
    venue: "Centro De Eventos Terrabella",
    address: "Camino el litre, La Gloria S, N, sector, Requínoa, O'Higgins",
    mapsUrl: "https://maps.app.goo.gl/jCWYEAkoveamBRyFA"
  },

  contact: {
    name: "Aurora — Secretaria",
    phoneDisplay: "+56 9 7529 7553",
    phoneInternational: "56975297553"
  },

  gifts: {
    rutdep: "19.261.263-2",
    registryUrl: "https://example.com/lista-de-novios",
    bank: "Banco Falabella",
    accountType: "Cuenta corriente",
    accountNumber: "19830723734",
    accountHolder: "Maria Ortiz",
    email: "mcarolina.ortiz.toro@gmail.com"
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
      /*
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
      */
      {
        title: "Amour",
        artist: "Eben Vogel",
        album: "Recuerdos",
        file: "musica/cancion-04.mp3",
        cover: "assets/music-cover-4.jpeg"
      }
    ]
  }
};
