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


