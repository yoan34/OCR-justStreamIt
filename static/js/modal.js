let modal = document.querySelector('.modal');
let images = document.querySelectorAll('.carousel__items__image');
let details = document.querySelector('details');
let actor_landscape = document.querySelector('.modal__section1__actors--landscape');




const openModal = (event) => {
    let url = `http://localhost:8000/api/v1/titles/${event.target.id}`;

    // Fonction qui permet de changer dynamiquement le modal lors d'une requête avec 'fetch'.
    const writeOnModal = data => {
        let title = document.querySelector('.modal__header__title');
        let country = document.querySelector('.modal__section1__country');
        let image = document.querySelector('.modal__section1__img');
        let info = document.querySelectorAll('.modal__section1__info>p');
        let plot = document.querySelector('.modal__section1__plot');
        let genre = document.querySelector('.modal__section1__genre');
        let directors = document.querySelector('.modal__section1__directors');
        let actors = document.querySelector('.modal__section1__actors');
        let money = document.querySelector('.modal__section1__boxoffice__dollars');
        let title_money = document.querySelector('.modal__section1__boxoffice__title');
        let rated = document.querySelector('.modal__section1__rated');

        let landscape = window.innerWidth > window.innerHeight ? true : false;
        

        title.textContent = data['original_title']
        image.src = data['image_url']
        country.textContent = data['countries'].join(' - ');

        let [rate, year, time] = [info[0], info[1], info[2]];
        rate.textContent = `${data['imdb_score']}/10`
        year.textContent = data['date_published']
        let time_convert = data['duration']

        let hour = parseInt(time_convert / 60)
        let minute = time_convert - (hour * 60)
        time.textContent = `${hour}h${minute}m`
        
        genre.textContent = data['genres'].join(' - ')
        if (data['description'].slice(0,10) !== 'Add a Plot') {
            plot.textContent = data['description'];
        } else {
            plot.textContent = "Description not available."
        }

        directors.textContent = 'Directors: ' + data['directors'].join(', ');

        if (landscape) {
            details.style.display = 'none';
            actor_landscape.style.display = 'initial';
        } else {
            details.style.display = 'initial';
            actor_landscape.style.display = 'none';
        }
        if (window.innerWidth < 800) {
            actor_landscape.textContent = "Actors: " + data['actors'].slice(0, 7).join(', ') + '...';
        } else {
            actor_landscape.textContent = "Actors: " + data['actors'].join(', ');
        }
        actors.textContent = data['actors'].join(', ');
        

        if (data['worldwide_gross_income'] !== null) {
            title_money.style.display = 'initial';
            money.style.display = 'initial';
            let moneyDots = data['worldwide_gross_income'].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
            console.log(moneyDots)
            money.textContent = moneyDots + ' $';
        } else {
            title_money.style.display = 'none';
            money.style.display = 'none';
        }
        if (data['rated'] !== "Not rated or unkown rating") {
            rated.textContent = "Rated: " + data['rated'];
            rated.style.display = 'initial';
        } else {
            rated.style.display = 'none';
        }
        modal.style.display = 'initial';
        console.log(data)
    }

    // Utilise 'fetch' pout faire une requête sur l'API en 
    // utilisant l'ID du film.
    fetch(url)
        .then(response => response.json())
        .then(data => writeOnModal(data))
        .catch(error => console.log(error))
}

for (let i = 0; i < images.length; i++) {
    
    images[i].addEventListener('click', (e) => openModal(e))
}


window.addEventListener('resize', () => {
    let landscape = window.innerWidth > window.innerHeight ? true : false;
    let actors = document.querySelector('.modal__section1__actors');
    let actor_landscape = document.querySelector('.modal__section1__actors--landscape');

    if (landscape) {
        details.style.display = 'none';
        actor_landscape.style.display = 'initial';
    } else {
        details.style.display = 'initial';
        actor_landscape.style.display = 'none';
    }
});

// Fermer la fenêtre modal
window.onclick = (event) => {
    if (event.target == modal) {
        details.removeAttribute("open");
        modal.style.display = 'none';
    }
}

document.querySelector('.modal__header__close').addEventListener('click', () => {
    details.removeAttribute("open");
    modal.style.display = 'none';
})
