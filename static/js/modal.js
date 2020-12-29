let modal = document.querySelector('.modal');
let images = document.querySelectorAll('.carousel__items__image');

const openModal = (event) => {
    modal.style.display = 'block';
    let url = `http://localhost:8000/api/v1/titles/${event.target.id}`;

    // Fonction qui permet de changer dynamiquement le modal lors d'une requête avec 'fetch'.
    const writeOnModal = data => {
        let title = document.querySelector('.modal__header__title');
        title.textContent = data['title']
        let image = document.querySelector('.modal__section1__img');
        image.src = data['image_url']
        let plot = document.querySelector('.modal__section1__plot');
        plot.textContent = data['description'];


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


window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}