gsap.registerPlugin(ScrollTrigger);

// --- 1. LÓGICA DEL CURSOR (Global) ---
const cursor = document.querySelector(".cursor");
if (cursor) {
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    const interactiveElements = document.querySelectorAll('a, .car-card, .moto-item, .btn-contact, .item-car, button');
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("cursor-active"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-active"));
    });
}

// --- 2. LÓGICA DEL INDEX (Solo si existe el Loader) ---
const loader = document.querySelector("#loader");
if (loader) {
    let progress = { value: 0 };
    const tl = gsap.timeline();

    tl.to(progress, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
            const bar = document.querySelector(".loader-bar");
            const percent = document.querySelector(".loader-percentage");
            if (bar) bar.style.width = progress.value + "%";
            if (percent) percent.innerText = Math.round(progress.value) + "%";
        }
    })
    .to("#loader", {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
    })
    .from(".navbar", { y: -100, opacity: 0, duration: 1 }, "-=0.5")
    .from(".reveal", {
        y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out"
    }, "-=0.8");

    const reveals = document.querySelectorAll(".reveal-scroll");
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 80, opacity: 0, duration: 1.5, ease: "power3.out"
        });
    });

    if (document.querySelector(".hero-img img")) {
        gsap.to(".hero-img img", {
            scrollTrigger: { trigger: ".hero", scrub: true },
            y: 150, scale: 1.2
        });
    }
}