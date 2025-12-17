document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('cuerpo-principal');
    const likeButtons = document.querySelectorAll('.like-btn');
    const actionButtons = document.querySelectorAll('.card-action-btn');

    /**
     * Reordena las tarjetas en el contenedor principal.
     * Las tarjetas con data-liked="true" se colocan al principio.
     */
    function reorderCards() {
        const cards = Array.from(mainContainer.querySelectorAll('.card'));
        
        // Separa las tarjetas "liked" de las no "liked"
        const likedCards = cards.filter(card => 
            card.querySelector('.like-btn').getAttribute('data-liked') === 'true'
        );
        const unlikedCards = cards.filter(card => 
            card.querySelector('.like-btn').getAttribute('data-liked') === 'false'
        );

        // Concatena: Liked primero, Unliked después
        const orderedCards = [...likedCards, ...unlikedCards];

        // Limpia y reinserta todas las tarjetas en el orden correcto
        mainContainer.innerHTML = '';
        orderedCards.forEach(card => {
            mainContainer.appendChild(card);
        });
    }

    /**
     * Maneja el clic en el botón de "Me Gusta".
     */
    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que el clic se propague al contenedor de la imagen
            const isLiked = button.getAttribute('data-liked') === 'true';

            // 1. Cambiar el aspecto del icono y el estado
            if (isLiked) {
                button.setAttribute('data-liked', 'false');
                button.classList.remove('fa-solid');
                button.classList.add('fa-regular');
                button.style.color = 'white';
            } else {
                button.setAttribute('data-liked', 'true');
                button.classList.remove('fa-regular');
                button.classList.add('fa-solid');
                button.style.color = 'red';
            }

            // 2. Reordenar las tarjetas
            reorderCards();
        });
    });

    /**
     * Maneja el clic en el botón de acción "Detalle".
     */
    actionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Previene cualquier interacción de la tarjeta padre
            const card = button.closest('.card');
            
            // 1. Efecto de cambio permanente
            if (card.classList.contains('permanently-changed')) {
                // Si ya está cambiado, lo revierte
                card.classList.remove('permanently-changed');
                button.textContent = 'Detalle';
                button.style.background = 'var(--color-secundario)';
            } else {
                // Aplica el cambio
                card.classList.add('permanently-changed');
                button.textContent = 'VISTO'; // Cambio de texto
                button.style.background = '#ffc107'; // Cambio de color del botón
            }
        });
    });

    // Inicializar el orden de las tarjetas (en caso de que data-liked="true" exista inicialmente)
    reorderCards();
});