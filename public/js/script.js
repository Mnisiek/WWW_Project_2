document.addEventListener('DOMContentLoaded', function(){

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    const mapImage = document.getElementById('mapImage');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
  
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      });
    }
  
    searchClose.addEventListener('click', function() {
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });

    let scale = 1;

    zoomIn.addEventListener("click", function () {
        scale += 0.2;
        mapImage.style.transform = `scale(${scale})`;
    });

    zoomOut.addEventListener("click", function () {
        if (scale > 1) {
            scale -= 0.2;
            mapImage.style.transform = `scale(${scale})`;
        }
    });
    
  });
