// Dapatkan tombol kembali ke atas
const btnGoToTop = document.getElementById('btnGoToTop');

// Tampilkan tombol kembali ke atas jika pengguna telah menggulir ke bawah
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
        btnGoToTop.style.display = 'block';
    } else {
        btnGoToTop.style.display = 'none';
    }
});

// Tindakan saat tombol kembali ke atas diklik
btnGoToTop.addEventListener('click', function() {
    // Gulir ke bagian atas halaman dengan efek smooth
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});