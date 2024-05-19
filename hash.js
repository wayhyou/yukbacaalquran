// Periksa hash dalam URL
const hash = window.location.hash;

// Jika hash tidak kosong
if (hash) {
    // Dapatkan elemen dengan id yang sesuai dengan hash
    const targetElement = document.querySelector(hash);

    // Jika elemen ditemukan
    if (targetElement) {
        // Gulir ke elemen dengan sedikit jarak
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Tambahkan sedikit jarak ke atas
        const scrollY = window.scrollY;
        window.scrollTo(0, scrollY + 500); // Sesuaikan dengan jumlah jarak yang Anda inginkan
    }
}