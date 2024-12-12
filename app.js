document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById("grid-container");

    fetch('canales.json')
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
                        <img src="logos/${canal.logo}" alt="Logo de ${canal.nombre}" onerror="this.src='logos/default_logo.png'">
                        <h2>${canal.nombre}</h2>
                        <p>Ver ${canal.nombre} online en vivo y en directo.</p>
                        <button class="button">VER CANAL</button>
                    `;

                    card.querySelector('button').addEventListener('click', () => {
                        const urls = JSON.stringify(canal.urls);
                        window.location.href = `reproductor.html?urls=${encodeURIComponent(urls)}&nombre=${encodeURIComponent(canal.nombre)}`;
                    });

                    gridContainer.appendChild(card); // Agregar la tarjeta al contenedor
                });
            }

            // Mostrar todos los canales inicialmente
            mostrarCanales(canales);

            document.querySelectorAll('.selector button[data-categoria]').forEach(button => {
                button.addEventListener('click', function() {
                    const categoria = this.getAttribute('data-categoria');
                    const filtrados = canales.filter(canal => canal.categoria === categoria);
                    mostrarCanales(filtrados);
                });
            });

            // Mostrar todos los canales al hacer clic en el botón "TODOS"
            document.getElementById('mostrar-todos').addEventListener('click', function() {
                mostrarCanales(canales);
            });

            document.querySelectorAll('.botons button[data-categoria]').forEach(button => {
                button.addEventListener('click', function() {
                    const categoria = this.getAttribute('data-categoria');
                    const filtrados = canales.filter(canal => canal.categoria === categoria);
                    mostrarCanales(filtrados);
                });
            });

            document.getElementById('mostrar-todos2').addEventListener('click', function() {
                mostrarCanales(canales);
            });

            
            const burger = document.getElementById('burger');
            const botons = document.getElementById('botonss');
            
            burger.addEventListener('click', () => {
                // Alternar entre mostrar y ocultar el menú
                if (botons.style.display === 'none' || botons.style.display === '') {
                    botons.style.display = 'block'; // Mostrar el menú
                    burger.style.color = '#0cc5e2';
                } else {
                    botons.style.display = 'none'; // Ocultar el menú
                    burger.style.color = 'black';
                }
            });
        })
        .catch(error => console.error('Error al cargar los canales:', error));
});


