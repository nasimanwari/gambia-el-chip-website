// 1. Swiper Galeri Ayarları
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

// 2. Hazte Socio Buton Fonksiyonu
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

// 3. Formspree AJAX Gönderim Scripti
var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-status");
    var btn = document.getElementById("form-button");
    var data = new FormData(event.target);
    
    // Butonu pasif yap ve yazısını değiştir
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
            // BAŞARILI DURUMU
            status.innerHTML = "¡Gracias! Hemos recibido tu mensaje. ❤️";
            status.style.color = "#00CC00"; // Yeşil
            form.reset(); // Formu temizle
            btn.innerHTML = "ENVIAR MENSAJE <i class='fa-solid fa-paper-plane ms-2'></i>";
            btn.disabled = false;
        } else {
            // HATA DURUMU
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! Hubo un problema al enviar tu formulario";
                }
                status.style.color = "#E60000"; // Kırmızı
                btn.disabled = false;
            })
        }
    }).catch(error => {
        // BAĞLANTI HATASI DURUMU
        status.innerHTML = "Oops! Hubo un problema al enviar tu formulario";
        status.style.color = "#E60000";
        btn.disabled = false;
    });
}

// Eğer form sayfada varsa dinleyiciyi ekle
if (form) {
    form.addEventListener("submit", handleSubmit);
}

// COOKIE BANNER KONTROLÜ
document.addEventListener("DOMContentLoaded", function() {
    // Eğer daha önce onaylanmadıysa göster
    if (!localStorage.getItem("cookiesAccepted")) {
        document.getElementById("cookie-banner").style.display = "block";
    }

    // Butona basılınca
    document.getElementById("accept-cookies").addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "true"); // Onayı hafızaya kaydet
        document.getElementById("cookie-banner").style.display = "none"; // Bannerı gizle
    });
});