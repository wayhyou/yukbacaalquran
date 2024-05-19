const searchKey = document.querySelector('#searchBox input');
const suggestionList = document.getElementById('suggestionList');

// Data sugesti (contoh data statis)
const suggestions = [
    // Tambahkan lebih banyak sugesti di sini sesuai kebutuhan
];

const getSurat = async () => {
    // Fetch Surat data
    const response = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/data`);
    const suratData = response.data;

    for (let i = 0; i <= 113; i++) {
        suggestions.push(suratData[i].nama);
    }
}

getSurat();

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
suggestionList.addEventListener('click', function(event) {
    const selectedSuggestion = event.target.textContent;
    searchKey.value = selectedSuggestion;
    suggestionList.style.display = 'none'; // Sembunyikan daftar sugesti setelah pengguna memilih
});

// Tindakan saat pengguna menekan tombol panah atas/bawah
searchKey.addEventListener('keydown', function(event) {
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
        searchKey.value = activeSuggestion.textContent;
        suggestionList.style.display = 'none';
    }
});

// Sembunyikan daftar sugesti saat pengguna mengklik di luar kotak pencarian
document.addEventListener('click', function(event) {
    if (!searchBox.contains(event.target)) {
        suggestionList.style.display = 'none';
    }
});
