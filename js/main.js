/* --- 1. SWIPER: BİZ KİMİZ (EKİP) --- */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,     
    spaceBetween: 20,     
    loop: true,           
    autoplay: {           
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {         
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {         
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {        
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }, 
    },
});

/* --- 2. SWIPER: OKUL GALERİSİ (YENİ EKLENEN) --- */
var schoolGallerySwiper = new Swiper(".schoolGallerySwiper", {
    slidesPerView: 1, 
    spaceBetween: 0,
    loop: true,
    observer: true, // RESİMLERİN YÜKLENMESİNİ BEKLE
    observeParents: true, // ALANI KONTROL ET
    autoplay: { 
        delay: 4000, 
        disableOnInteraction: false 
    },
    effect: "fade", 
    fadeEffect: { crossFade: true },
    pagination: { el: ".swiper-pagination", clickable: true },
    // DİKKAT: BURADA ÖZEL İSİMLENDİRİLMİŞ TUŞLARI KULLANIYORUZ
    navigation: { 
        nextEl: ".school-next", 
        prevEl: ".school-prev" 
    },
});

/* --- FORM VE SCROLL İŞLEMLERİ --- */
function selectVolunteer() {
    var contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({behavior: 'smooth'});
        setTimeout(function() {
            var subjectSelect = document.getElementById('subject-select');
            if(subjectSelect) {
                subjectSelect.value = "Voluntariado";
            }
        }, 500);
    }
}

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-status");
    var btn = document.getElementById("form-button");
    var data = new FormData(event.target);
    
    btn.disabled = true;
    btn.innerHTML = "Enviando...";

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "¡Gracias! Hemos recibido tu mensaje. ❤️";
            status.style.color = "#00CC00";
            form.reset();
            btn.innerHTML = "ENVIAR MENSAJE <i class='fa-solid fa-paper-plane ms-2'></i>";
            btn.disabled = false;
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! Hubo un problema al enviar tu formulario";
                }
                status.style.color = "#E60000";
                btn.disabled = false;
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! Hubo un problema al enviar tu formulario";
        status.style.color = "#E60000";
        btn.disabled = false;
    });
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}

/* --- GDPR ANALYTICS --- */
function loadGoogleAnalytics() {
    var script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-T48PFFC3TY"; 
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T48PFFC3TY'); 
    
    console.log("GDPR: Analytics Başlatıldı ✅");
}

document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-consent");
    const acceptBtn = document.getElementById("btn-accept");
    const rejectBtn = document.getElementById("btn-reject");

    const userConsent = localStorage.getItem("gambiaChip_consent");

    if (userConsent === "accepted") {
        loadGoogleAnalytics();
    } else if (userConsent === "rejected") {
        console.log("GDPR: Reddedildi 🛑");
    } else {
        if(cookieBanner) cookieBanner.style.display = "block";
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", function() {
            localStorage.setItem("gambiaChip_consent", "accepted");
            if(cookieBanner) cookieBanner.style.display = "none";
            loadGoogleAnalytics();
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener("click", function() {
            localStorage.setItem("gambiaChip_consent", "rejected");
            if(cookieBanner) cookieBanner.style.display = "none";
        });
    }
});