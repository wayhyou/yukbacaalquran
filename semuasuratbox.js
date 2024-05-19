const suratList = document.getElementById('suratList');

// Data sugesti (contoh data statis)
const daftarSurat = [
    // Tambahkan lebih banyak sugesti di sini sesuai kebutuhan
];

const getSemuaSurat = async () => {
    // Fetch Surat data
    const response = await axios.get(`https://api.npoint.io/99c279bb173a6e28359c/data`);
    const suratData = response.data;

    for (let i = 0; i <= 113; i++) {
        daftarSurat.push(suratData[i].nama);
    }
}

getSemuaSurat();

