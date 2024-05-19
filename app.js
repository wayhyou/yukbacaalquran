const btnSurah = document.querySelector('#getSurah');
const namaSurat = document.querySelector('#namaSurat');
const namaArab = document.querySelector('#namaArab');
const artiNamaSurat = document.querySelector('#artiNama');
const nomorSurat = document.querySelector('#nomorSurat');
const keteranganSurat = document.querySelector('#keteranganSurat');
const textKeteranganSurat = document.querySelector('#keteranganSurat');
const btnAction = document.querySelector('#btnAction');
const btnPlay = document.getElementById('btnPlay');
let audioUrl;
const bissmillah_arab = document.querySelector('#bissmillah-arab');
const bissmillah_latin = document.querySelector('#bissmillah-latin');
const bissmillah_arti = document.querySelector('#bissmillah-arti');

const btnSearch = document.querySelector('#search');
const formSearch = document.querySelector('#searchBox');
const btnSemuaSurat = document.querySelector('#semuaSurat');
const boxSemuaSurat = document.querySelector('#semuaSuratBox');

const ulSurat = document.querySelector('#isiSurat');
const prevSurat = document.querySelector('#prevSurat');
const nextSurat = document.querySelector('#nextSurat');
const prevNama = document.querySelector('#prevNama');
const prevKeterangan = document.querySelector('#prevKeterangan');
const nextNama = document.querySelector('#nextNama');
const nextKeterangan = document.querySelector('#nextKeterangan');
let prevValue = 0;
let nextValue = 0;

// ----------------------------------------------------------------------------
const searchKey = document.querySelector('#searchBox input');
const suggestionList = document.querySelector('#suggestionList');
// ----------------------------------------------------------------------------
const suratList = document.querySelector('#suratList');
// ----------------------------------------------------------------------------
const plusFont = document.querySelector('#plusFontSize');
const minFont = document.querySelector('#minFontSize');
// ----------------------------------------------------------------------------
const bookmark = document.querySelector('#bookmark');
const localSurat = localStorage.getItem('surat');
const localAyat = localStorage.getItem('ayat');

const getSurah = async (direction = 'random') => {
    try {
        // Clear previous content
        namaSurat.innerHTML = '';
        nomorSurat.innerHTML = '';
        prevNama.innerHTML = '';
        prevKeterangan.innerHTML = '';
        nextNama.innerHTML = '';
        nextKeterangan.innerHTML = '';
        ulSurat.innerHTML = '';
        namaArab.innerHTML = '';
        artiNamaSurat.innerHTML = '';
        keteranganSurat.innerHTML = '';
        bissmillah_arab.innerHTML = '';
        bissmillah_latin.innerHTML = '';
        bissmillah_arti.innerHTML = '';
        
        btnSurah.classList.add('d-none');
        btnAction.classList.add('d-none');
        textKeteranganSurat.classList.add('d-none');
        btnSearch.classList.add('d-none');
        formSearch.classList.add('d-none');
        btnSemuaSurat.classList.add('d-none');
        boxSemuaSurat.classList.add('d-none');
        plusFont.classList.add('d-none');
        minFont.classList.add('d-none');
        bookmark.classList.add('d-none');
        document.querySelector('#controls').classList.add('d-none');
        document.getElementById("controls").classList.remove('active-play');

        btnPlay.innerHTML = '<i class="bi bi-play"></i>';

        // ----
        searchKey.value = '';

        // Fetch Surat data
        const response = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/data`);
        const suratData = response.data;

        // Random Surat number
        let suratNumber;
        if (direction === 'prev') {
            suratNumber = prevValue;
        } else if (direction === 'next') {
            suratNumber = nextValue;
        } else if (direction === 'random') {
            suratNumber = Math.floor(Math.random() * 114) + 1;
        } else {
            suratNumber = parseInt(direction);
        }

        // Fetch Surat content
        const suratContent = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/surat/${suratNumber}`);

        // Populate Previous and Next Surat data
        if (suratNumber > 1) {
            prevNama.textContent = suratData[suratNumber - 2].nama;
            prevValue = suratData[suratNumber - 2].nomor;
            prevKeterangan.textContent = `Surat ke ${prevValue} : ${suratData[suratNumber - 2].ayat} Ayat`;
        }
        if (suratNumber < 114) {
            nextNama.textContent = suratData[suratNumber].nama;
            nextValue = suratData[suratNumber].nomor;
            nextKeterangan.textContent = `Surat ke ${nextValue} : ${suratData[suratNumber].ayat} Ayat`;
        }

        // Populate Surat data
        const namaSuratData = suratData[suratNumber - 1].nama;
        const namaArabSuratData = suratData[suratNumber - 1].asma;
        const artiNamaSuratData = suratData[suratNumber - 1].arti;
        const nomorSuratData = suratData[suratNumber - 1].nomor;
        const jumlahAyatData = suratData[suratNumber - 1].ayat;
        const keteranganSuratData = suratData[suratNumber - 1].keterangan;
        audioUrl = suratData[suratNumber - 1].audio;

        namaSurat.innerHTML = `${namaSuratData}`;
        namaArab.innerHTML = `${namaArabSuratData}`;
        artiNamaSurat.innerHTML = `(${artiNamaSuratData})`;
        nomorSurat.innerHTML = `Surat ke ${nomorSuratData} : ${jumlahAyatData} Ayat`;
        keteranganSurat.innerHTML = `${keteranganSuratData}`;

        // Stop and play new audio
        if (audioPlayer) {
            audioPlayer.pause(); // Stop current audio
            audioPlayer = null; // Reset audio player
        };

        // Populate Surat content
        for (const isi of suratContent.data) {
            // Membuat elemen li
            const newListItem = document.createElement('li');
            newListItem.classList.add('py-2');

            // Membuat elemen button
            const saveLastBtn = document.createElement('button');
            saveLastBtn.setAttribute('type', 'button');
            saveLastBtn.setAttribute('class', 'saveLastBtn');
            saveLastBtn.setAttribute('id', isi.nomor);

            // Membuat elemen ikon
            const icon = document.createElement('i');
            icon.setAttribute('id', 'saveBtn');

            const localSurat = localStorage.getItem('surat');
            const localAyat = localStorage.getItem('ayat');
            if (localSurat && localAyat) {
                if (localSurat == suratNumber && saveLastBtn.id == localAyat) {
                    icon.classList.add('bi', 'bi-bookmark-fill');
                } else {
                    icon.classList.add('bi', 'bi-bookmark');
                }
            } else {
                icon.classList.add('bi', 'bi-bookmark');
            }

            // Menambahkan ikon ke dalam button
            saveLastBtn.appendChild(icon);

            // isi ayat
            const nomorDanSave = document.createElement('div');
            nomorDanSave.setAttribute('id', 'nomorDanSave');
            const nomorAyat = document.createElement('h3');
            nomorDanSave.appendChild(nomorAyat);
            nomorDanSave.appendChild(saveLastBtn);
            const ayatSurat = document.createElement('h3');
            const bacaAyat = document.createElement('h4');
            const terjemahanAyat = document.createElement('h6');
            const pembatas = document.createElement('hr');

            // Menambahkan event listener pada tombol "saveLastBtn"
            saveLastBtn.addEventListener('click', () => {

                if (btnSearch.classList.contains('d-none')) {
                    bookmark.classList.add('d-none');
                } else {
                    bookmark.classList.remove('d-none');
                }

                const semuaBookmarkFill = document.querySelectorAll('.bi-bookmark-fill');
                semuaBookmarkFill.forEach(icon => icon.classList.replace('bi-bookmark-fill', 'bi-bookmark'));

                icon.classList.toggle('bi-bookmark-fill');
                icon.classList.toggle('bi-bookmark');

                // Menyimpan data
                localStorage.setItem('surat', suratNumber);
                localStorage.setItem('ayat', isi.nomor);

                // Mengambil data
                const localSurat = localStorage.getItem('surat');
                const localAyat = localStorage.getItem('ayat');
            });

            ayatSurat.id = "teksArab";

            nomorAyat.textContent = isi.nomor;

            if (isi.nomor == 1 && suratNumber !== 1) {
                ayatSurat.textContent = isi.ar.replace(/بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ/g, '');
                bissmillah_arab.textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
                bissmillah_latin.innerHTML = 'bismi <strong>al</strong>l<u>aa</u>hi <strong>al</strong>rra<u>h</u>m<u>aa</u>ni <strong>al</strong>rra<u>h</u>iim<strong>i</strong>';
                bissmillah_arti.textContent = 'Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.';
            } else {
                ayatSurat.textContent = isi.ar;
            }
            bacaAyat.innerHTML = isi.tr;
            terjemahanAyat.textContent = isi.id;

            // nomorAyat.classList.add('nomorAyat');
            ayatSurat.classList.add('arabFont');
            terjemahanAyat.classList.add('terjemahan');

            // newListItem.appendChild(nomorAyat);
            // newListItem.appendChild(saveLastBtn);
            newListItem.appendChild(nomorDanSave);
            newListItem.appendChild(ayatSurat);
            newListItem.appendChild(bacaAyat);
            newListItem.appendChild(terjemahanAyat);
            newListItem.appendChild(pembatas);

            ulSurat.appendChild(newListItem);
        }

        btnAction.classList.remove('d-none');

        btnSurah.classList.remove('d-none');
        btnSearch.classList.remove('d-none');
        btnSemuaSurat.classList.remove('d-none');
        plusFont.classList.remove('d-none');
        minFont.classList.remove('d-none');

        if (localSurat && localAyat) {
            bookmark.classList.remove('d-none');
        }

    } catch (error) {
        return "No Surat For You Brother...";
    }
};

// Initial random Surat
getSurah();

// Event listeners
btnSurah.addEventListener('click', () => getSurah('random'));
prevSurat.addEventListener('click', () => getSurah('prev'));
nextSurat.addEventListener('click', () => getSurah('next'));

// Ganti dengan URL file audio Anda
// const audioUrl = 'your-audio-file.mp3'; 

let audioPlayer;

function initAudioPlayer() {
    audioPlayer = new Audio(audioUrl);
    audioPlayer.id = "audio";
    audioPlayer.addEventListener('ended', function() {
        btnPlay.innerHTML = '<i class="bi bi-play"></i>';
    });

    const playPauseButton = document.getElementById("btnPlay");
    const backwardButton = document.getElementById("backward");
    const forwardButton = document.getElementById("forward");
    const progress = document.getElementById("progress");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");

    backwardButton.addEventListener("click", function() {
        audioPlayer.currentTime -= 10;
    });

    forwardButton.addEventListener("click", function() {
        audioPlayer.currentTime += 10;
    });

    audioPlayer.addEventListener("timeupdate", function() {
        const value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.value = value;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener("loadedmetadata", function() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    progress.addEventListener("input", function() {
        const value = (progress.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = value;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

function togglePlay() {
    if (!audioPlayer) {
        initAudioPlayer();
    }
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlay.innerHTML = '<i class="bi bi-pause"></i>';
        document.getElementById("controls").classList.remove('d-none');
        document.getElementById("controls").classList.add('active-play');
        document.querySelector('#btnPlayControls').innerHTML = '<i class="bi bi-pause"></i>';
    } else {
        audioPlayer.pause();
        btnPlay.innerHTML = '<i class="bi bi-play"></i>';
        document.getElementById("controls").classList.add('d-none');
        document.getElementById("controls").classList.remove('active-play');
        document.querySelector('#btnPlayControls').innerHTML = '<i class="bi bi-play"></i>';
    }
}

// const btnPlay = document.getElementById('btnPlay');
btnPlay.innerHTML = '<i class="bi bi-play"></i>';
btnPlay.addEventListener('click', togglePlay);

function togglePlayControls() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlay.innerHTML = '<i class="bi bi-pause"></i>';
        document.querySelector('#btnPlayControls').innerHTML = '<i class="bi bi-pause"></i>';
    } else {
        audioPlayer.pause();
        btnPlay.innerHTML = '<i class="bi bi-play"></i>';
        document.querySelector('#btnPlayControls').innerHTML = '<i class="bi bi-play"></i>';
    }
}

document.querySelector('#btnPlayControls').addEventListener('click', togglePlayControls);



// ----------------------------------------------------
// Searching Features


let nomor = 0;

// Data sugesti (contoh data statis)
const suggestions = [
    // Tambahkan lebih banyak sugesti di sini sesuai kebutuhan
];

const getSurat = async () => {
    // Fetch Surat data
    const response = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/data`);
    const suratData = response.data;

    for (let i = 0; i < 113; i++) {
        suggestions.push(suratData[i].nama);
    }
}

getSurat();

const getNomor = async (surah) => {
    nomor -= nomor;
    // Fetch Surat data
    const response = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/data`);
    const suratData = response.data;

    for (let i = 0; i <= 113; i++) {
        if (surah === suratData[i].nama) {
            nomor += suratData[i].nomor;
        }
    }
}

// Fungsi untuk menampilkan sugesti yang sesuai dengan input pengguna
function showSuggestions(input) {
    // Kosongkan daftar sugesti
    suggestionList.innerHTML = '';

    // Jika input kosong, sembunyikan daftar sugesti
    if (!input || input.trim() === '') {
        suggestionList.style.display = 'none';
        return;
    }

    // Filter sugesti yang cocok dengan input pengguna
    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(input.toLowerCase())
    );

    // Tampilkan sugesti yang sesuai dalam daftar
    filteredSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.classList.add('list-group-item');
        suggestionList.appendChild(li);
    });

    // Tampilkan daftar sugesti
    suggestionList.style.display = 'block';
}

// Tindakan saat pengguna mengetik di kotak pencarian
searchKey.addEventListener('input', function() {
    showSuggestions(this.value);
});

// Tindakan saat pengguna memilih sugesti dari daftar
suggestionList.addEventListener('click', async function(event) {
    const selectedSuggestion = event.target.textContent;
    // searchKey.value = selectedSuggestion;
    await getNomor(selectedSuggestion);
    getSurah(nomor.toString());
    suggestionList.style.display = 'none'; // Sembunyikan daftar sugesti setelah pengguna memilih
});

// Tindakan saat pengguna menekan tombol panah atas/bawah
searchKey.addEventListener('keydown', async function(event) {
    const activeSuggestion = document.querySelector('.list-group-item.active');

    if (event.key === 'ArrowDown') {
        // Navigasi ke bawah
        if (activeSuggestion) {
            const nextSuggestion = activeSuggestion.nextElementSibling;
            if (nextSuggestion) {
                activeSuggestion.classList.remove('active');
                nextSuggestion.classList.add('active');
            }
        } else {
            const firstSuggestion = suggestionList.firstElementChild;
            if (firstSuggestion) {
                firstSuggestion.classList.add('active');
            }
        }
    } else if (event.key === 'ArrowUp') {
        // Navigasi ke atas
        if (activeSuggestion) {
            const prevSuggestion = activeSuggestion.previousElementSibling;
            if (prevSuggestion) {
                activeSuggestion.classList.remove('active');
                prevSuggestion.classList.add('active');
            }
        } else {
            const lastSuggestion = suggestionList.lastElementChild;
            if (lastSuggestion) {
                lastSuggestion.classList.add('active');
            }
        }
    } else if (event.key === 'Enter' && activeSuggestion) {
        // Pilih sugesti saat pengguna menekan Enter
        // searchKey.value = activeSuggestion.textContent;
        await getNomor(activeSuggestion.textContent);
        getSurah(nomor.toString());
        suggestionList.style.display = 'none';
    }
});

// Sembunyikan daftar sugesti saat pengguna mengklik di luar kotak pencarian
document.addEventListener('click', function(event) {
    if (!searchBox.contains(event.target)) {
        suggestionList.style.display = 'none';
    }
});

// ------------------------------------------------------------------------------------
// Semua Surat List
const semuaSuratButton = document.getElementById('semuaSurat');
const semuaSuratBox = document.getElementById('semuaSuratBox');

let nomorUntukSemuaSurat;

const dataSemuaSurat = [
    // Tambahkan lebih banyak sugesti di sini sesuai kebutuhan
];

const getSemuaSurat = async () => {
    nomorUntukSemuaSurat -= nomorUntukSemuaSurat;
    // Fetch Surat data
    const response = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/data`);
    const suratData = response.data;

    for (let i = 0; i <= 113; i++) {
        dataSemuaSurat.push(suratData[i].nama);
        nomorUntukSemuaSurat += suratData[i].nomor;
    }
}

getSemuaSurat();

// Fungsi untuk menampilkan semua surat
function showSemuaSurat() {
    // Bersihkan daftar sebelum menambahkan elemen baru
    suratList.innerHTML = '';

    // Tampilkan sugesti yang sesuai dalam daftar
    let counting = 1;
    dataSemuaSurat.forEach((surat) => {
        const li = document.createElement('li');
        li.textContent = counting + '. ' + surat; // Menggunakan nilai surat
        li.classList.add('list-group-item');
        suratList.appendChild(li);
        counting++;
    });

    // Tampilkan daftar sugesti
    suratList.style.display = 'block';

    // Set scroll ke bagian atas
    suratList.scrollTop = 0;
}

// Tindakan saat tombol pencarian diklik
semuaSuratButton.addEventListener('click', function(event) {
    // Mencegah event klik dari menyebabkan penggunaan lain (misalnya menutup kotak pencarian)
    event.stopPropagation();

    semuaSuratBox.classList.toggle('d-none');

    if (!formSearch.classList.contains('d-none')) {
        formSearch.classList.add('d-none');
    }

    showSemuaSurat();
});

// Menambahkan event listener ke document untuk menutup kotak pencarian ketika klik di luar kotak pencarian
document.addEventListener('click', function(event) {
    // Memeriksa apakah klik terjadi di luar kotak pencarian
    if (!semuaSuratBox.contains(event.target) && event.target !== semuaSuratButton) {
        // Menutup kotak pencarian jika terjadi klik di luar kotak pencarian
        semuaSuratBox.classList.add('d-none');
    }
});

suratList.addEventListener('click', async function(event) {
    // Mengambil teks dari elemen li yang diklik
    let suratYangDicari = event.target.textContent;
    let suratYangDicariSplit = suratYangDicari.split(" ");
    let namaSuratReady = suratYangDicariSplit.slice(1).join(" ");

    // Cari indeks surat dalam array dataSemuaSurat
    const indexSurat = dataSemuaSurat.indexOf(namaSuratReady);

    // Periksa apakah nilai ditemukan dalam array
    if (indexSurat !== -1) {
        // Lakukan sesuatu dengan nilai indeks atau nama surat yang ditemukan
        // Contoh: getSurah(nomorUntukSemuaSurat.toString());
        // Contoh: getSurah("1");
        await getSurah((indexSurat + 1).toString());
    } else {
    }

    suratList.style.display = 'none'; // Sembunyikan daftar sugesti setelah pengguna memilih
});



// ---------------------------------------------------
// font size plus dan minus

plusFont.addEventListener('click', () => {
    // Ambil semua elemen dengan kelas "arabFont"
    const semuaTeksArab = document.getElementsByClassName('arabFont');

    // Loop melalui semua elemen dan ubah ukuran font
    for (let i = 0; i < semuaTeksArab.length; i++) {
        // Ambil ukuran font saat ini
        let ukuranFont = window.getComputedStyle(semuaTeksArab[i]).fontSize;

        // Parse ukuran font menjadi bilangan bulat
        let ukuranFontInteger = parseInt(ukuranFont);

        // Tambahkan ke ukuran font
        ukuranFontInteger += 1;

        // Setel kembali ukuran font ke elemen
        semuaTeksArab[i].style.fontSize = ukuranFontInteger + 'px';
    }
});

minFont.addEventListener('click', () => {
    // Ambil semua elemen dengan kelas "arabFont"
    const semuaTeksArab = document.getElementsByClassName('arabFont');

    // Loop melalui semua elemen dan ubah ukuran font
    for (let i = 0; i < semuaTeksArab.length; i++) {
        // Ambil ukuran font saat ini
        let ukuranFont = window.getComputedStyle(semuaTeksArab[i]).fontSize;

        // Parse ukuran font menjadi bilangan bulat
        let ukuranFontInteger = parseInt(ukuranFont);

        // Tambahkan ke ukuran font
        ukuranFontInteger -= 1;

        // Setel kembali ukuran font ke elemen
        semuaTeksArab[i].style.fontSize = ukuranFontInteger + 'px';
    }
});

// ----------------------------------------------------------------------
// Bookmark

bookmark.addEventListener('click', async () => {
    const localSurat = localStorage.getItem('surat');
    const localAyat = localStorage.getItem('ayat');

    let currentUrl = window.location.href;

    // Menghapus hash sebelum menambahkan yang baru
    const hashIndex = currentUrl.indexOf('#');
    if (hashIndex !== -1) {
        currentUrl = currentUrl.substring(0, hashIndex);
    }

    // Menambahkan '#1' ke dalam hash URL
    currentUrl += `#${localAyat}`;

    // Mengubah URL dengan hash baru
    window.location.href = currentUrl;
    
    await getSurah(localSurat);

    // Ambil elemen target berdasarkan ID
    const targetElement = document.getElementById(localAyat);
    
    // Lakukan scroll ke elemen target
    if (targetElement) {
        const offset = -50; // Atur jarak yang diinginkan dari atas (dalam piksel)
        const targetOffsetTop = targetElement.offsetTop + offset;
        window.scrollTo({ top: targetOffsetTop, behavior: 'smooth' });
    }
});


// --------------------------------------------------------------------------------------
// swipe kiri kanan
let container = document.documentElement; // Menggunakan seluruh area layar

let startX = 0;
let threshold = 250; // Minimum distance to trigger swipe

container.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

container.addEventListener('touchend', function(e) {
    let endX = e.changedTouches[0].clientX;
    let deltaX = startX - endX;

    if (deltaX > threshold) {
        // Swipe to the left
        nextPage();
    } else if (deltaX < -threshold) {
        // Swipe to the right
        previousPage();
    }
});

function nextPage() {
    getSurah('next');
}

function previousPage() {
    getSurah('prev');
}