let prevScrollPos = window.pageYOffset; // Menyimpan posisi scroll sebelumnya

const plus = document.querySelector('#plusFontSize');
const min = document.querySelector('#minFontSize');

let plusFontClicked;
let minFontClicked;

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    
    // Menampilkan atau menyembunyikan navbar berdasarkan arah scroll
    if (prevScrollPos > currentScrollPos) {
        // munculin
        document.getElementById("navbar").style.top = "-10px";
        
        document.querySelector('#search').classList.remove('d-none');
        document.querySelector('#semuaSurat').classList.remove('d-none');

        const localSurat = localStorage.getItem('surat');
        const localAyat = localStorage.getItem('ayat');
        if (localSurat && localAyat) {
            document.querySelector('#bookmark').classList.remove('d-none');
        }

        document.querySelector('#plusFontSize').classList.remove('d-none');
        document.querySelector('#minFontSize').classList.remove('d-none');
        document.querySelector('#btnGoToTop').classList.remove('d-none');

        if (document.getElementById("controls").classList.contains('active-play')) {
            document.querySelector('#controls').classList.remove('d-none');
        }

        plusFontClicked = false;
        minFontClicked = false;
    } else {
        // ngilangin

        plus.addEventListener('click', () => {
            plusFontClicked = true;
        });

        min.addEventListener('click', () => {
            minFontClicked = true;
        });

        if (!plusFontClicked) {
            document.getElementById("navbar").style.top = "-100px";

            document.querySelector('#search').classList.add('d-none');
            document.querySelector('#semuaSurat').classList.add('d-none');
            document.querySelector('#bookmark').classList.add('d-none');

            document.querySelector('#plusFontSize').classList.add('d-none');
            document.querySelector('#minFontSize').classList.add('d-none');
            document.querySelector('#btnGoToTop').classList.add('d-none');
            
            if (!document.querySelector('#searchBox').classList.contains('d-none')) {
                document.querySelector('#searchBox').classList.add('d-none');
            }        
            
            if (!document.querySelector('#semuaSuratBox').classList.contains('d-none')) {
                document.querySelector('#semuaSuratBox').classList.add('d-none');
            }    

            document.querySelector('#controls').classList.add('d-none');
        }
        
    }
    
    prevScrollPos = currentScrollPos;
}
