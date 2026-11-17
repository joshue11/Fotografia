
/* =================================
   ALBERT RODRIGUEZ PHOTOGRAPHY
   JAVASCRIPT
================================= */


/* MENÚ MÓVIL */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


/* CERRAR MENÚ AL PULSAR UN ENLACE */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* FILTROS DE FOTOGRAFÍA */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Quitar clase activa de todos los filtros

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activar filtro seleccionado

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        // Mostrar fotografías correspondientes

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


/* LIGHTBOX - AMPLIAR FOTOGRAFÍAS */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

let previousFocus = null;

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image = item.dataset.image;

        previousFocus = document.activeElement;

        lightboxImage.src = image;

        lightboxImage.alt =
            item.querySelector("img").alt;

        lightbox.classList.add("open");

        lightbox.setAttribute("aria-hidden", "false");

        lightboxClose.focus();

        document.body.style.overflow = "hidden";

    });

});


/* CERRAR LIGHTBOX */

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";

    document.body.style.overflow = "";

    if (previousFocus) {
        previousFocus.focus();
    }

}

lightboxClose.addEventListener("click", closeLightbox);


/* CERRAR AL PULSAR FUERA DE LA IMAGEN */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* CERRAR CON ESCAPE */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" &&
        lightbox.classList.contains("open")) {

        closeLightbox();

    }

});
