/* --- 1. SWIPER: BİZ KİMİZ (EKİP) --- */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,     
    spaceBetween: 20,     
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: { 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
});

/* --- 2. SWIPER: OKUL GALERİSİ --- */
var schoolGallerySwiper = new Swiper(".schoolGallerySwiper", {
    slidesPerView: 1, 
    spaceBetween: 0,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    effect: "fade", 
    fadeEffect: { crossFade: true },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".school-next", prevEl: ".school-prev" },
});

/* --- 3. SWIPER: MERCADILLO (OK TUŞLARI EKLENDİ) --- */
var mercadilloSwiper = new Swiper(".mercadilloSwiper", {
    slidesPerView: 1, 
    spaceBetween: 0,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".merca-next", prevEl: ".merca-prev" },
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

/* --- GDPR ANALYTICS (DÜZELTİLDİ) --- */
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

/* --- VİDEO GALERİSİ FONKSİYONLARI --- */

// 1. Video Değiştirme Fonksiyonu
function changeVideo(videoId, title, element) {
    // Ana iframe'i güncelle
    var mainFrame = document.getElementById('main-video-frame');
    mainFrame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";
    
    // Başlığı güncelle
    document.getElementById('main-video-title').innerText = title;

    // Aktif sınıfını yönet (Kırmızı çerçeve için)
    var thumbs = document.querySelectorAll('.video-thumb');
    thumbs.forEach(t => t.classList.remove('active-thumb'));
    element.classList.add('active-thumb');
}

// 2. Video Slider Ayarları
var videoSwiper = new Swiper(".videoSwiper", {
    slidesPerView: 2,
    spaceBetween: 15,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
    },
    breakpoints: {
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
    },
});