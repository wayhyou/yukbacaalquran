const btnKeterangan = document.querySelector('#btnKeterangan');
const textKeteranganSuratt = document.querySelector('#keteranganSurat');

btnKeterangan.addEventListener('click', function() {
    textKeteranganSuratt.classList.toggle('d-none');
});