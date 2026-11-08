/* =====================================================
   ESPECIALES JR
   Archivo principal de JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================================================
       1. ELEMENTOS DEL DOM
       ================================================ */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    const currentYear = document.getElementById("current-year");

    const whatsappButton = document.querySelector(".whatsapp-float");


    /* ================================================
       2. AÑO AUTOMÁTICO DEL FOOTER
       ================================================ */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ================================================
       3. MENÚ RESPONSIVE
       ================================================ */

    function openMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Cerrar menú de navegación");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú de navegación");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    function toggleMenu() {
        if (!navMenu) return;

        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", toggleMenu);

        // Cerrar el menú al seleccionar una sección.
        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Cerrar el menú si se hace clic fuera de él.
        document.addEventListener("click", (event) => {

            const clickInsideMenu = navMenu.contains(event.target);
            const clickOnButton = menuToggle.contains(event.target);

            if (!clickInsideMenu && !clickOnButton) {
                closeMenu();
            }

        });

        // Cerrar con la tecla Escape.
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }

        });

        // Cerrar el menú al cambiar a una pantalla grande.
        window.addEventListener("resize", () => {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        });

    }


    /* ================================================
       4. NAVEGACIÓN ACTIVA
       ================================================ */

    const sections = document.querySelectorAll(
        "main section[id], header[id]"
    );

    if ("IntersectionObserver" in window && sections.length > 0) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navLinks.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        link.classList.toggle("active", isActive);

                    });

                });

            },
            {
                root: null,
                rootMargin: "-25% 0px -65% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* ================================================
       5. FORMULARIO DE CONTACTO
       ================================================ */

    if (contactForm && formMessage) {

        const nombre = document.getElementById("nombre");
        const telefono = document.getElementById("telefono");
        const correo = document.getElementById("correo");
        const servicio = document.getElementById("servicio");
        const mensaje = document.getElementById("mensaje");
        const privacidad = document.getElementById("privacidad");

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonHTML = submitButton
            ? submitButton.innerHTML
            : "";

        let sending = false;

        function showFormMessage(text, type) {

            formMessage.textContent = text;

            formMessage.classList.remove("success", "error");

            if (type) {
                formMessage.classList.add(type);
            }

        }

        function clearFormMessage() {

            formMessage.textContent = "";

            formMessage.classList.remove("success", "error");

        }

        function normalizePhone(value) {
            return value.replace(/[\s().-]/g, "");
        }

        function validateForm() {

            const nameValue = nombre.value.trim();
            const phoneValue = normalizePhone(telefono.value.trim());
            const emailValue = correo.value.trim();
            const serviceValue = servicio.value;
            const messageValue = mensaje.value.trim();

            if (nameValue.length < 3) {
                showFormMessage(
                    "Por favor, escribe tu nombre completo.",
                    "error"
                );

                nombre.focus();
                return false;
            }

            // Acepta números internacionales con el signo +.
            // No sustituye la verificación real del número.
            const phonePattern = /^\+?[0-9]{7,15}$/;

            if (!phonePattern.test(phoneValue)) {

                showFormMessage(
                    "Escribe un teléfono válido, incluyendo el indicativo si corresponde.",
                    "error"
                );

                telefono.focus();
                return false;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!emailPattern.test(emailValue)) {

                showFormMessage(
                    "Por favor, introduce un correo electrónico válido.",
                    "error"
                );

                correo.focus();
                return false;
            }

            if (!serviceValue) {

                showFormMessage(
                    "Selecciona el tipo de servicio que necesitas.",
                    "error"
                );

                servicio.focus();
                return false;
            }

            if (messageValue.length < 10) {

                showFormMessage(
                    "Cuéntanos un poco más sobre tu recorrido.",
                    "error"
                );

                mensaje.focus();
                return false;
            }

            if (!privacidad.checked) {

                showFormMessage(
                    "Debes aceptar el tratamiento de datos personales para continuar.",
                    "error"
                );

                privacidad.focus();
                return false;
            }

            return true;

        }


        /* ============================================
           6. ENVIAR SOLICITUD A WHATSAPP
           ============================================ */

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (sending) return;

            clearFormMessage();

            if (!validateForm()) return;

            /*
             * IMPORTANTE:
             * Reemplaza este número por el WhatsApp oficial
             * de Especiales JR, con indicativo de país.
             *
             * Colombia: 57 + número de teléfono.
             * Usa solo números, sin espacios ni el signo +.
             */

            const WHATSAPP_NUMBER = "573000000000";

            if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {

                showFormMessage(
                    "El número de WhatsApp de la empresa no está configurado correctamente.",
                    "error"
                );

                return;

            }

            const nameValue = nombre.value.trim();
            const phoneValue = telefono.value.trim();
            const emailValue = correo.value.trim();
            const serviceValue = servicio.value;
            const messageValue = mensaje.value.trim();

            const serviceNames = {
                empresarial: "Transporte empresarial",
                grupal: "Transporte grupal",
                viajes: "Viajes especiales",
                programado: "Servicios programados",
                otro: "Otro servicio"
            };

            const selectedService =
                serviceNames[serviceValue] || serviceValue;

            const whatsappMessage = [
                "Hola, Especiales JR. Quiero solicitar una cotización.",
                "",
                "*DATOS DEL CLIENTE*",
                `Nombre: ${nameValue}`,
                `Teléfono: ${phoneValue}`,
                `Correo: ${emailValue}`,
                "",
                "*SERVICIO SOLICITADO*",
                `Tipo: ${selectedService}`,
                "",
                "*DETALLES DEL RECORRIDO*",
                messageValue,
                "",
                "Enviado desde el sitio web de Especiales JR."
            ].join("\n");

            const whatsappURL =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(whatsappMessage);

            /*
             * Abrimos WhatsApp en una pestaña nueva.
             * El usuario deberá revisar y enviar el mensaje.
             */

            sending = true;

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Abriendo WhatsApp...';
            }

            try {

                const whatsappWindow = window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

                if (whatsappWindow) {

                    showFormMessage(
                        "Tu solicitud está preparada. Revisa WhatsApp y pulsa Enviar para compartirla con Especiales JR.",
                        "success"
                    );

                } else {

                    showFormMessage(
                        "El navegador bloqueó la nueva ventana. Puedes abrir WhatsApp con el siguiente enlace.",
                        "error"
                    );

                    // Alternativa visible si el navegador bloquea la ventana.
                    const fallbackLink = document.createElement("a");

                    fallbackLink.href = whatsappURL;
                    fallbackLink.target = "_blank";
                    fallbackLink.rel = "noopener noreferrer";
                    fallbackLink.className = "text-link";
                    fallbackLink.textContent = "Abrir WhatsApp";

                    fallbackLink.style.display = "inline-flex";
                    fallbackLink.style.marginTop = "10px";

                    formMessage.appendChild(
                        document.createElement("br")
                    );

                    formMessage.appendChild(fallbackLink);

                }

            } catch (error) {

                showFormMessage(
                    "No fue posible abrir WhatsApp. Inténtalo de nuevo.",
                    "error"
                );

            } finally {

                sending = false;

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonHTML;

                }

            }

        });


        // Limpiar mensajes de error al editar los campos.
        contactForm.addEventListener("input", (event) => {

            if (
                event.target.matches("input, textarea, select") &&
                formMessage.classList.contains("error")
            ) {
                clearFormMessage();
            }

        });

    }


    /* ================================================
       7. BOTÓN FLOTANTE DE WHATSAPP
       ================================================ */

    if (whatsappButton) {

        /*
         * IMPORTANTE:
         * Cambia también el número configurado en el HTML:
         * https://wa.me/573000000000
         *
         * Este botón abre una conversación directa.
         */

        whatsappButton.setAttribute(
            "aria-label",
            "Contactar a Especiales JR por WhatsApp"
        );

    }


    /* ================================================
       8. PREVENIR DOBLE CLIC EN BOTONES DE ANCLA
       ================================================ */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", () => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            // El navegador realiza el desplazamiento nativo.
            // No se necesita modificar el comportamiento del enlace.

        });

    });


    /* ================================================
       9. REGISTRO DE INICIALIZACIÓN
       ================================================ */

    console.info(
        "Especiales JR: sitio web inicializado correctamente."
    );

});