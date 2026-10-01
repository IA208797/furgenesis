document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Estas son las opciones para el observador
  const observerOptions = {
    root: null,
    // El margen ayuda a que la clase se active un poco antes de que la sección llegue exactamente al tope
    rootMargin: "-20% 0px -70% 0px", 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Obtenemos el ID de la sección visible
        const activeId = entry.target.id;
        
        // Removemos la clase active de todos los enlaces
        navLinks.forEach(link => {
          link.classList.remove("active");
          // Si el href del enlace coincide con el ID visible, le añadimos la clase active
          if (link.getAttribute("href") === `#${activeId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  // Observamos cada sección
  sections.forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const wireframeLayer = document.getElementById('wireframe-layer');
  const sliderLine = document.getElementById('slider-line');

  // Esta es la función para actualizar la UI
  const updateSlider = (value) => {
    // Actualiza el recorte usando el porcentaje del valor actual
    wireframeLayer.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
    // Mueve la línea blanca divisora
    sliderLine.style.left = `${value}%`;
  };

  // Escuchar cuando el usuario arrastra el control desliznte
  slider.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hotspots = document.querySelectorAll('.hotspot');

  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      // Esto previene el comportamiento por defecto, para evitar que se siga un link si el hotspot es un <a>
      e.preventDefault();
      
      // Esto cierra otros hotspots abiertos, para que solo uno esté activo a la vez
      hotspots.forEach(h => {
        if (h !== hotspot) h.classList.remove('active');
      });

      // Alternar el hotspot actual, agregando o quitando la clase "active"
      hotspot.classList.toggle('active');
    });
  });

  // Cerrar hotspots al hacer clic fuera de ellos en el visor
  const viewer = document.querySelector('model-viewer');
  viewer.addEventListener('click', (e) => {
    if (!e.target.closest('.hotspot')) {
      hotspots.forEach(h => h.classList.remove('active'));
    }
  });
});

// =========================================
// LIGHTBOX 
// =========================================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

// Función para abrir el lightbox
function openLightbox(element) {
  // Busca la imagen dentro del contenedor clickeado
  const img = element.querySelector("img");
  // Busca el texto superpuesto o el alt para usarlo como footer de la imagen
  const overlayText = element.querySelector("span") ? element.querySelector("span").innerText : img.alt;
  
  // Asigna los valores al modal
  lightboxImg.src = img.src;
  lightboxCaption.innerText = overlayText;
  
  // Muestra el lightbox
  lightbox.style.display = "flex";
  // Bloquea el scroll de la página de fondo
  document.body.style.overflow = "hidden";
}

// Función para cerrar el lightbox
function closeLightbox() {
  lightbox.style.display = "none";
  // Restaura el scroll
  document.body.style.overflow = "auto";
}

// Cerrar con la tecla Esc
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape" && lightbox.style.display === "flex") {
    closeLightbox();
  }
});