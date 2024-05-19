// search
const searchButton = document.getElementById('search');
const searchBox = document.getElementById('searchBox');
const searchInput = document.querySelector('#searchInput');

// semua surat
const allSurat = document.querySelector('#semuaSuratBox');

// Tindakan saat tombol pencarian diklik
searchButton.addEventListener('click', function(event) {
    // Mencegah event klik dari menyebabkan penggunaan lain (misalnya menutup kotak pencarian)
    event.stopPropagation();
    
    // Memeriksa apakah kotak pencarian sedang ditampilkan atau tidak
    if (searchBox.classList.contains('d-none')) {
        // Jika tidak ditampilkan, tampilkan kotak pencarian
        searchBox.classList.remove('d-none');
        // Fokuskan input setelah ditampilkan
        searchInput.focus();

        if (!allSurat.classList.contains('d-none')) {
            allSurat.classList.add('d-none');
        }
    } else {
        // Jika sudah ditampilkan, sembunyikan kotak pencarian
        searchBox.classList.add('d-none');
    }

});

// Menambahkan event listener ke document untuk menutup kotak pencarian ketika klik di luar kotak pencarian
document.addEventListener('click', function(event) {
    // Memeriksa apakah klik terjadi di luar kotak pencarian
    if (!searchBox.contains(event.target) && event.target !== searchButton) {
        // Menutup kotak pencarian jika terjadi klik di luar kotak pencarian
        searchBox.classList.add('d-none');
    }
});