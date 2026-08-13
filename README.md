# Invitación de boda — página web de una sola página

Proyecto estático, responsive y listo para abrir. No requiere instalar programas ni dependencias.

## Cómo abrirlo

1. Descomprime la carpeta.
2. Abre `index.html` con Chrome, Edge, Firefox u otro navegador moderno.

También puedes usar la extensión **Live Server** de Visual Studio Code para verlo como un sitio local.

## Personalización rápida

Abre `config.js` y cambia:

- Nombres de los novios.
- Iniciales.
- Fecha y hora.
- Lugares y direcciones.
- Enlaces de Google Maps.
- Teléfono de contacto.
- Datos bancarios.
- Enlace de lista de regalos.
- Hashtag.

La mayor parte de la información se actualiza automáticamente.

## Cambiar textos extensos

Los textos de bienvenida, historia, vestimenta, información práctica y cierre están en `index.html`.

## Cambiar fotografías

La carpeta `assets` incluye ilustraciones SVG de ejemplo.

Puedes reemplazarlas por archivos propios manteniendo los mismos nombres:

- `story-main.svg`
- `gallery-1.svg`
- `gallery-2.svg`
- `gallery-3.svg`
- `gallery-4.svg`

También puedes usar archivos `.jpg`, `.png` o `.webp`, pero debes cambiar la extensión en `index.html`.

## Formularios

La página guarda la confirmación y las preferencias alimentarias en `localStorage`, es decir, en el navegador del invitado.

Después de guardar la confirmación aparece un botón para enviarla por WhatsApp a la persona configurada en `config.js`.

Para recibir respuestas en una base de datos, Google Sheets, correo o servidor, se debe conectar el formulario a un servicio externo o a un backend.

## Funciones incluidas

- Barra de navegación fija.
- Desplazamiento suave a cada sección.
- Menú adaptable para celulares.
- Marcado automático de la sección activa.
- Cuenta regresiva en tiempo real.
- Descarga de evento en formato `.ics`.
- Enlaces a Google Maps.
- Confirmación de asistencia.
- Preferencias alimentarias.
- Envío por WhatsApp.
- Datos de regalos y botón para copiar.
- Galería con visor ampliado.
- Hashtag copiable.
- Diseño accesible y responsive.

## Estructura

```text
invitacion_boda/
├── index.html
├── styles.css
├── config.js
├── script.js
├── README.md
└── assets/
```


## Reproductor de música

El proyecto incluye un reproductor fijo con:

- Reproducir y pausar.
- Canción anterior y siguiente.
- Retroceder o adelantar 10 segundos.
- Barra de progreso y tiempos.
- Volumen y silencio.
- Playlist en orden y repetición continua.
- Reproductor minimizable.
- Intento de reproducción automática.

Los navegadores móviles pueden bloquear el audio automático. En ese caso aparece el botón **♫ Iniciar música** y el primer toque o clic del invitado también intenta activar la reproducción.

### Cambiar las canciones

1. Copia tus archivos MP3 dentro de la carpeta `musica`.
2. Abre `config.js`.
3. Edita la sección `music.tracks`:

```javascript
{
  title: "Nombre de la canción",
  artist: "Nombre del artista",
  album: "Nombre del álbum",
  file: "musica/nombre-del-archivo.mp3",
  cover: "assets/portada.jpg"
}
```

Puedes agregar o quitar tantas canciones como necesites. No es obligatorio que el nombre visible coincida con el nombre del archivo.
