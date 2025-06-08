// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('block');
    } else {
        menu.classList.remove('block');
        menu.classList.add('hidden');
    }
});

// Typewriter effect
let i = 0;
const txt = 'Buah & Sayur Anda'; // Teks baru untuk typewriter
const speed = 120;
const typewriterElement = document.querySelector(".typewriter");

function typeWriter() {
    if (i < txt.length) {
        typewriterElement.textContent += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        typewriterElement.classList.add("typing");
    }
}

window.addEventListener('load', function() {
    setTimeout(typeWriter, 1000);
});

// Sparkle effect (disesuaikan warna)
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    
    sparkle.animate([
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(3)' }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
    });
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animation triggers
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

window.addEventListener('load', animateOnScroll);

// Fitur unggah gambar hero (simulasi)
document.getElementById('image-upload-hero').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const aiToolContent = document.querySelector('.ai-tool-content');
            
            // Clear previous messages
            aiToolContent.innerHTML = '';

            // Add loading message
            const loadingHtml = `
                <div class="ai-loading mt-4">
                    <span class="text-sm">Menganalisis gambar...</span>
                    <div class="ai-loading-dot"></div>
                    <div class="ai-loading-dot"></div>
                    <div class="ai-loading-dot"></div>
                </div>
            `;
            aiToolContent.innerHTML += loadingHtml;

            // Simulate AI detection
            setTimeout(() => {
                const freshness = Math.floor(Math.random() * (100 - 40 + 1)) + 40; // Random 40-100%
                const produceType = ['Apel', 'Pisang', 'Tomat', 'Bayam', 'Jeruk'][Math.floor(Math.random() * 5)];
                const status = freshness >= 80 ? 'sangat segar' : (freshness >= 60 ? 'cukup segar' : (freshness >= 40 ? 'mulai menurun' : 'sudah busuk'));
                const freshnessColor = freshness >= 80 ? 'green-700' : (freshness >= 60 ? 'yellow-700' : (freshness >= 40 ? 'orange-700' : 'red-700'));
                const freshnessBg = freshness >= 80 ? 'green-100' : (freshness >= 60 ? 'yellow-100' : (freshness >= 40 ? 'orange-100' : 'red-100'));

                const botResponseHtml = `
                    <div class="ai-message">
                        <h4 class="font-bold text-primary mb-1">🔍 Deteksi Gambar Selesai!</h4>
                        <p class="text-sm text-gray-700">Gambar berhasil diunggah. Berikut hasil analisisnya:</p>
                    </div>
                    <div class="ai-message">
                        <h4 class="font-bold text-primary mb-1">✨ Hasil Deteksi: ${produceType}</h4>
                        <img src="${imageUrl}" alt="Uploaded image" class="rounded-lg mb-2 max-h-48 w-full object-contain border border-gray-200">
                        <p class="text-sm text-gray-700">Buah/sayur yang Anda unggah terdeteksi sebagai **${produceType.toLowerCase()}** dan kondisinya **${status}** dengan tingkat kesegaran:</p>
                        <div class="mt-3 flex items-center gap-2">
                            <span class="text-sm bg-${freshnessBg} text-${freshnessColor} px-3 py-1 rounded-full"><i class="fas fa-percent"></i> ${freshness}% Segar</span>
                            <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"><i class="fas fa-flask"></i> AI Klasifikasi</span>
                        </div>
                    </div>
                    <div class="ai-message">
                        <h4 class="font-bold text-primary mb-1">💡 Rekomendasi untuk ${produceType} Anda:</h4>
                        <ul class="text-sm text-gray-700 list-disc list-inside space-y-1">
                            <li>Untuk ${produceType} yang **${status}**, Anda bisa coba membuat ${generateRecipeSuggestion(produceType, status)}.</li>
                            <li>Tips Penyimpanan: ${generateStorageTip(produceType)}.</li>
                            <li>Solusi 3R: ${generate3RSolution(produceType, status)}.</li>
                        </ul>
                    </div>
                `;
                aiToolContent.innerHTML = botResponseHtml;
            }, 2000); // Simulate AI processing time
        };
        reader.readAsDataURL(file);
    }
});

function generateRecipeSuggestion(produce, status) {
    if (status === 'sangat segar' || status === 'cukup segar') {
        switch(produce) {
            case 'Apel': return 'jus apel segar atau salad buah.';
            case 'Pisang': return 'smoothie pisang atau camilan sehat.';
            case 'Tomat': return 'salad caprese atau saus pasta segar.';
            case 'Bayam': return 'tumis bayam atau sup krim bayam.';
            case 'Jeruk': return 'jus jeruk murni atau salad jeruk.';
            default: return 'resep sehat lainnya.';
        }
    } else if (status === 'mulai menurun') {
        switch(produce) {
            case 'Apel': return 'pai apel atau saus apel.';
            case 'Pisang': return 'roti pisang atau *pancake* pisang.';
            case 'Tomat': return 'saus tomat rumahan atau sup tomat panggang.';
            case 'Bayam': return 'puree bayam untuk *smoothie* atau sup.';
            case 'Jeruk': return 'kulit jeruk untuk *zest* atau *infused water*.';
            default: return 'olahan makanan yang dipanggang atau dimasak.';
        }
    } else { // sudah busuk
        return 'menggunakan sebagai kompos.';
    }
}

function generateStorageTip(produce) {
    switch(produce) {
        case 'Apel': return 'Simpan apel di kulkas, jauh dari buah lain untuk mencegah pematangan cepat.';
        case 'Pisang': return 'Simpan pisang di suhu ruangan, gantung agar tidak mudah memar. Pisahkan dari buah lain.';
        case 'Tomat': return 'Simpan tomat di suhu ruangan agar tetap beraroma. Masukkan kulkas jika sudah sangat matang.';
        case 'Bayam': return 'Bungkus bayam dengan tisu dapur dan masukkan ke kantong kedap udara di kulkas.';
        case 'Jeruk': return 'Simpan jeruk di kulkas untuk masa simpan lebih lama.';
        default: return 'Simpan di tempat sejuk dan kering.';
    }
}

function generate3RSolution(produce, status) {
    if (status === 'sudah busuk') {
        switch(produce) {
            case 'Apel':
            case 'Pisang':
            case 'Tomat':
            case 'Bayam':
            case 'Jeruk': return 'Komposkan sisa-sisa untuk menyuburkan tanaman Anda.';
            default: return 'Pertimbangkan untuk membuat kompos dari sisa makanan.';
        }
    } else if (status === 'mulai menurun') {
        switch(produce) {
            case 'Apel': return 'Buat cuka apel dari sisa kulit dan inti.';
            case 'Pisang': return 'Gunakan kulit pisang untuk pupuk tanaman atau pembersih daun.';
            case 'Tomat': return 'Buat pupuk cair dari sisa tomat yang lembek.';
            case 'Bayam': return 'Blender sisa bayam untuk masker wajah alami.';
            case 'Jeruk': return 'Kulit jeruk bisa jadi *potpourri* alami atau pembersih serbaguna.';
            default: return 'Cari ide *reuse* atau kompos.';
        }
    } else {
        return 'Tidak ada solusi 3R mendesak, nikmati buah/sayur Anda!';
    }
}