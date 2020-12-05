//------------------ANIMATION IMAGES--------------------
let categories = document.querySelectorAll('.category');

// On ajoute les classes permettant de jouer l'animation
for (let i = 0; i < categories.length; i++) {
    if (i % 2 === 0) {
        categories[i].style.opacity = '0.9';
    }
    images = categories[i].querySelectorAll('.category__img');
    for (let j = 0; j < images.length; j++) {
        images[j].style.width = '236px';
        images[j].style.height = '370px';
        images[j].addEventListener('mouseover', function() {
            if (this.classList.contains('leave')) {
                this.classList.replace('leave', 'enter');
            } else {
                this.classList.add('enter');
            }
        });
        images[j].addEventListener('mouseout', function() {
            this.classList.replace('enter', 'leave');

        })
        
    }
}
//-----------------------------------------------------


// -------------------- CAROUSEL ----------------------

// initialise les index de chaque carousel.
let list_index = [0, 0, 0, 0];

// On récupère tous les bouttons 'prev', 'next' des carousels
// et les carousels eux même et tous les 'dots'.
let carousel_prev = document.querySelectorAll('.category__carousel__prev');
let carousel_next = document.querySelectorAll('.category__carousel__next');
let carousels = document.querySelectorAll('.category__carousel');
let bullets = document.querySelectorAll('.category__carousel__dot');

// fonction revenir en arrière dans le carousel et updater les 'dots'.
const onClicklPrev = (carousel, list_index, i) => {
    if (list_index[i] > 0) {
        let width = window.innerWidth;
        let containerBullets = document.querySelectorAll('.category__container__dot')[i]
        let bullets = containerBullets.querySelectorAll('.category__carousel__dot');
        let bullet_active = containerBullets.querySelector('.active');
        bullet_active.classList.remove('active');
        list_index[i] --;
        bullets[list_index[i]].classList.add('active');
        let step = (width *0.9) /100;
        let animation = setInterval(() => {
            let pos = carousel.offsetLeft;
            carousel.style.left = (pos + step) + 'px';
            if (carousel.offsetLeft >= (list_index[i]) * -width*0.9) {
                clearInterval(animation);
            }
        }, 2);
    }
};

// fonction avancer dans le carousel et updater les 'dots'.
const onClicklNext = (carousel, list_index, i) => {
    if (list_index[i] < 2) {
        let width = window.innerWidth;
        let containerBullets = document.querySelectorAll('.category__container__dot')[i]
        let bullets = containerBullets.querySelectorAll('.category__carousel__dot');
        let bullet_active = containerBullets.querySelector('.active');
        bullet_active.classList.remove('active');
        list_index[i] ++;
        bullets[list_index[i]].classList.add('active');
        
        let step = (width *0.9) /100;

        let animation = setInterval(() => {
            let pos = carousel.offsetLeft;
            carousel.style.left = (pos - step) + 'px';
            if (carousel.offsetLeft < - (list_index[i] * width*0.9)) {
                clearInterval(animation);
            }
        }, 2);
        

    }
}

// fonction pour aller à l'index du carousel souhaiter avec les 'dots'.
const onClickBullet = (event, carousel, list_index, i, j) => {
    let containerBullets = document.querySelectorAll('.category__container__dot')[i]
    let bullet_active = containerBullets.querySelector('.active');
    bullet_active.classList.remove('active');
    event.target.classList.add('active');
    let width = window.innerWidth;

    let reverse;
    let speed = Math.abs(list_index[i] - j) === 1 ? 2 : 1;
    if (list_index[i] > j) {
        reverse = 1;
    } else if (list_index[i] === j) {
        reverse = 0;
    } else {
        reverse = -1
    }
    list_index[i] = j;

    let step = (width *0.9) /100;

    let animation = setInterval(() => {
        let pos = carousel.offsetLeft;
        
        if (reverse === 1) {
            carousel.style.left = (pos + step) + 'px';
            if (carousel.offsetLeft >= (list_index[i]) * -width*0.9) {
                clearInterval(animation);
            }
        } else if (reverse === -1) {
            carousel.style.left = (pos - step) + 'px';
            if (carousel.offsetLeft < - ((list_index[i]) * width*0.9)) {
                clearInterval(animation);
            }
        }

    }, speed);
}

// Initialisation des functions pour les flèches 'previous' et 'next' de tous les
// carousels.
for (let i = 0; i < carousels.length; i++) {
    let carousel = carousels[i];
    carousel_prev[i].addEventListener('click', () => onClicklPrev(carousel, list_index, i));
    carousel_next[i].addEventListener('click',() => onClicklNext(carousel, list_index, i));

    // attache la fonction 'onClickBullet' à tous les 'dots' du carousel d'index 'i'.
    for (let j = 0; j < 3; j++) {
        bullets[i*3+j].addEventListener('click', (event) => onClickBullet(event, carousel, list_index, i, j))
    }
}
// --------------------------------------------------------
