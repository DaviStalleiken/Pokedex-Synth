pokemonPopup.addEventListener('click', (event) => {
        const classNameOfClickedElement = event.target.classList[0]; 
        const classNames = ['popup-wrapper','popup-close'];
        const shouldClosePopup = classNames.some((className) => 
        className === classNameOfClickedElement);
         
        if (shouldClosePopup) {
            pokemonPopup.style.display = 'none'
        }    
    });