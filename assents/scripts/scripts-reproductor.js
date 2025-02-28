document.addEventListener("DOMContentLoaded", function () {

    const canalNombreElement = document.getElementById("canal-nombre");
    const gridContainer = document.getElementById("grid-container");


    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const canalNombre = params.get('nombre');
    const canalUrlsParam = params.get('urls');
    const canalUrls = canalUrlsParam ? JSON.parse(decodeURIComponent(canalUrlsParam)) : [];

    const video = document.getElementById('videoPlayer');

    // Configurar el nombre del canal
    if (canalNombre) {
        canalNombreElement.textContent = canalNombre;
        document.title = canalNombre;
    }

    // Función para configurar el reproductor con la URL del canal
    function playStream(url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        }
    }

    



    // Cargar los canales desde el archivo JSON
    fetch('../../data/canales.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los canales');
            }
            return response.json();
        })
        .then(canales => {
            function mostrarCanales(filtrados) {
                gridContainer.innerHTML = ''; // Limpiar el contenedor
                filtrados.forEach(canal => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    card.innerHTML = `
                        <img src="../logos/${canal.logo}" alt="Logo de ${canal.nombre}" onerror="this.src='logos/default_logo.png'">
                        <h2>${canal.nombre}</h2>
                        <p>Ver ${canal.nombre} online en vivo y en directo.</p>
                        <button class="button">VER CANAL</button>
                    `;

                    card.querySelector('button').addEventListener('click', () => {
                        const urls = JSON.stringify(canal.urls);
                        window.location.href = `../pages/reproductor.html?urls=${encodeURIComponent(urls)}&nombre=${encodeURIComponent(canal.nombre)}`;
                    });

                    gridContainer.appendChild(card); // Agregar la tarjeta al contenedor
                });
            }

            // Mostrar todos los canales inicialmente
            mostrarCanales(canales);

        })
    
        


    
    console.log(canalNombre)
    console.log(canalUrlsParam)
    playStream(canalUrls)
});
