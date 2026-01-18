/* --- 1. SWIPER: TAKIM & GÖNÜLLÜLER (Quienes Somos) --- */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,     // Mobilde 1 resim
    spaceBetween: 20,     // Boşluk
    loop: true,           // Sonsuz döngü
    autoplay: {           // Otomatik oynatma
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {         // Alt noktalar
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {         // Yan oklar
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {        // Ekran boyutuna göre ayar
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }, // Masaüstünde 3 resim
    },
});

/* --- 2. SWIPER: OKUL GALERİSİ (YENİ EKLENEN KISIM) --- */
var schoolGallerySwiper = new Swiper(".schoolGallerySwiper", {
    slidesPerView: 1,       // Tek büyük resim
    spaceBetween: 0,        // Boşluk yok
    loop: true,             // Sonsuz döngü
    autoplay: {             
        delay: 4000,        // 4 saniyede bir değişsin
        disableOnInteraction: false,
    },
    effect: "fade",         // Yumuşak geçiş efekti
    fadeEffect: { crossFade: true },
    pagination: {           
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {           
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/* --- SCROLL VE FORM İŞLEMLERİ --- */
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

/* --- GDPR UYUMLU ÇEREZ YÖNETİMİ (Analytics) --- */

// Google Analytics'i Başlatan Fonksiyon
function loadGoogleAnalytics() {
    var script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-T48PFFC3TY"; // SENİN ID'N
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T48PFFC3TY'); 
    
    console.log("GDPR: Kullanıcı izni alındı, Google Analytics başlatıldı. ✅");
}

// Banner Kontrolü ve Olaylar
document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-consent");
    const acceptBtn = document.getElementById("btn-accept");
    const rejectBtn = document.getElementById("btn-reject");

    // Kullanıcının daha önceki tercihi var mı?
    const userConsent = localStorage.getItem("gambiaChip_consent");

    if (userConsent === "accepted") {
        loadGoogleAnalytics();
    } else if (userConsent === "rejected") {
        console.log("GDPR: Kullanıcı çerezleri reddetti. Analytics engellendi.");
    } else {
        if(cookieBanner) cookieBanner.style.display = "block";
    }

    // KABUL ET butonuna basınca
    if (acceptBtn) {
        acceptBtn.addEventListener("click", function() {
            localStorage.setItem("gambiaChip_consent", "accepted"); 
            if(cookieBanner) cookieBanner.style.display = "none"; 
            loadGoogleAnalytics(); 
        });
    }

    // REDDET butonuna basınca
    if (rejectBtn) {
        rejectBtn.addEventListener("click", function() {
            localStorage.setItem("gambiaChip_consent", "rejected"); 
            if(cookieBanner) cookieBanner.style.display = "none"; 
        });
    }
});