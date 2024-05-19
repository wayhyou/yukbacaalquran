const semuaSuratButton = document.getElementById('semuaSurat');
const semuaSuratBox = document.getElementById('semuaSuratBox');

// Tindakan saat tombol pencarian diklik
semuaSuratButton.addEventListener('click', function() {
    semuaSuratBox.classList.toggle('d-none');
});
