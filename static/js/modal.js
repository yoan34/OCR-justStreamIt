let modal = document.querySelector('.modal');
modal.style.display = 'none';
let close = modal.querySelector('.modal__content__header__close');
let pictures = document.querySelectorAll('.category__img');

close.addEventListener('click', () => modal.style.display = 'none');

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
})

let items = [];

items.push(document.querySelector('.best-movie__info__img'));
items.push(document.querySelector('.best-movie__info__btn'));

for (let i = 0; i < pictures.length; i++) {
    items.push(pictures[i])
}


const onClickMovieImg = (event) => {
    let id = event.target.attributes['id_movie'].value;
    // requete AJAX avec l'API et l'ID du film pour récupérér
    // les informations et les mettres dans le modal.

    // Remplacer dans le modal les 'string' par les variables.
    // peu être je peux modifier le modal directement ici avec le JSON de la requete AJAX.
    console.log("id: " + id)
    modal.style.display='';

}

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', (event) => onClickMovieImg(event));
}
