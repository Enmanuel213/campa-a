
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const abierto = navLinks.classList.toggle("active");

    menuBtn.textContent = abierto ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", abierto);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(element => observer.observe(element));
} else {
    reveals.forEach(element => element.classList.add("visible"));
}

const commitForm = document.getElementById("commitForm");
const commitment = document.getElementById("commitment");
const formMessage = document.getElementById("formMessage");

try {
    const savedCommitment = localStorage.getItem("compromisoMateo58");

    if (savedCommitment) {
        commitment.value = savedCommitment;
    }
} catch (error) {
    console.log("Almacenamiento local no disponible.");
}

commitForm.addEventListener("submit", event => {
    event.preventDefault();

    const texto = commitment.value.trim();

    if (!texto) {
        formMessage.textContent = "Escribe tu compromiso antes de guardarlo.";
        return;
    }

    try {
        localStorage.setItem("compromisoMateo58", texto);
        formMessage.textContent = "✳ ¡Tu compromiso ha sido guardado!";
    } catch (error) {
        formMessage.textContent = "Tu compromiso está escrito, pero no se pudo guardar en este navegador.";
    }
});

document.getElementById("year").textContent = new Date().getFullYear();
