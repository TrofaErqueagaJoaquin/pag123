// Obtener el ID de la noticia desde la URL
const urlParams = new URLSearchParams(window.location.search);
const noticiaId = urlParams.get('id');

// Cargar el archivo JSON
fetch('noticias.json')
    .then(response => response.json())
    .then(data => {
        const noticia = data.noticias.find(n => n.id == noticiaId);
        if (noticia) {
            document.getElementById('titulo').innerText = noticia.titulo;
            document.getElementById('texto').innerText = noticia.texto;

            const imagenesContainer = document.getElementById('imagenes');
            noticia.imagenes.forEach(imagen => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                
                const imgElement = document.createElement('img');
                imgElement.src = imagen;
                swiperSlide.appendChild(imgElement);
                
                imagenesContainer.appendChild(swiperSlide);
            });

            // Inicializar el carrusel de Swiper para móviles
            const swiper = new Swiper('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                slidesPerView: 1,
                spaceBetween: 30,
            });

        } else {
            document.getElementById('titulo').innerText = "Noticia no encontrada";
        }
    })
    .catch(error => console.error('Error cargando el JSON:', error));