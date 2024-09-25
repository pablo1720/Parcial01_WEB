// Funcionalidad modal para características
// Selecciona los modales de características y compra, así como los elementos del título y descripción dentro del modal.
const featureModal = document.getElementById('featureModal');
const buyModal = document.getElementById('buyModal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

// Objeto que contiene las características del producto con sus respectivos títulos y descripciones.
const features = {
    bluetooth: {
        title: "Conectividad Bluetooth",
        description: "Soporte para Bluetooth 5.0 o superior para garantizar una conexión estable y segura con dispositivos móviles y ordenadores."
    },
    battery: {
        title: "Batería de Larga Duración",
        description: "Nuestro altavoz cuenta con una impresionante duración de batería de 20 horas, lo que garantiza que su música se reproduzca durante todo el día o la noche. La batería recargable integrada de 4400 mAh se puede cargar por completo en solo 4 horas a través de USB-C."
    },
    water: {
        title: "Resistente al Agua",
        description: "Con una clasificación IPX7, este altavoz está totalmente protegido contra la inmersión en agua hasta 1 metro durante 30 minutos. ¡Perfecto para fiestas en la piscina, días de playa o para cantar en la ducha!"
    },
    sound: {
        title: "Sonido Estruendoso",
        description: "Experimente un sonido envolvente con nuestra tecnología de audio avanzada. Los controladores duales de 10 W y los radiadores pasivos brindan agudos nítidos, medios ricos y graves profundos para una experiencia auditiva envolvente."
    },
    compatibility: {
        title: "Compatibilidad",
        description: "Soporte para múltiples perfiles, como HSP (Headset Profile), A2DP (Advanced Audio Distribution Profile), AVRCP (Audio/Video Remote Control Profile) y SPP (Serial Port Profile), para permitir la conexión con auriculares, smartphones y ordenadores."
    }
};

// Abre el modal de características y muestra la información correspondiente al parámetro 'feature'.
function openFeatureModal(feature) {
    modalTitle.textContent = features[feature].title;
    modalDescription.textContent = features[feature].description;
    featureModal.style.display = "block"; // Muestra el modal
}

// Cierra el modal de características.
function closeFeatureModal() {
    featureModal.style.display = "none"; // Oculta el modal.
}

// Abre el modal de compra.
function openBuyModal() {
    buyModal.style.display = 'block'; // Muestra el modal.
}

// Cierra el modal de compra.
function closeBuyModal() {
    buyModal.style.display = 'none'; // Oculta el modal.
}

// Funcionalidad Modal para Compras
// Inicializa variables para almacenar el color seleccionado y la cantidad del producto.
let selectedColor = 'Black';
let quantity = 1;

// Cambia la selección del color del producto, actualizando la interfaz.
function selectColor(element) {
    document.querySelectorAll('.color-option').forEach(option => option.classList.remove('selected'));
    element.classList.add('selected'); // Añade la clase 'selected' al color actual.
    selectedColor = element.getAttribute('data-color'); // Actualiza el color seleccionado.
}

// Cambia la cantidad del producto entre 1 y 10.
function changeQuantity(change) {
    quantity = Math.max(1, Math.min(10, quantity + change)); // Limita la cantidad entre 1 y 10.
    document.getElementById('quantity').value = quantity; // Actualiza el valor en el input de cantidad.
}

// Valida los campos del formulario de compra y muestra un resumen de la orden si son válidos.
function validateForm() {
    const requiredFields = ['buyName', 'email', 'address', 'city', 'departament', 'zip'];
    for (const field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value) {
            alert(`Por favor llena el ${field}.`);
            return false;
        }
    }
    // Muestra un resumen de la compra y cierra el modal.
    const name = document.getElementById('buyName').value;
    alert(`Gracias por tu compra, ${name}!\n\nResumen de la orden:\n- Altavoz Beatzzz Ultra Bajos\n- Color: ${selectedColor}\n- Cantidad: ${quantity}\n- Total: $${(29.99 * quantity).toFixed(2)}`);
    closeBuyModal(); // Cierra el modal de compra.
    return false; // Evita que el formulario se envíe.
}

// Funcionalidad del carrusel.
// Variable para controlar el índice actual del carrusel.
let currentIndex = 0;
// Selecciona todos los elementos con la clase 'review-card' dentro del contenedor del carrusel.
const items = document.querySelectorAll('.carousel-container .review-card');

// Función que mueve el carrusel en la dirección indicada.
// La dirección puede ser -1 (anterior) o 1 (siguiente), y ajusta el índice actual de forma circular.
function moveCarousel(direction) {
    // Calcula el nuevo índice asegurando que siempre esté dentro del rango de elementos disponibles.
    currentIndex = (currentIndex + direction + items.length) % items.length;
    // Actualiza el transform del contenedor para mostrar la tarjeta de reseña correspondiente.
    document.querySelector('.carousel-container').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Event listeners.
// Ejecuta el código cuando el DOM ha sido completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
     // Selecciona el formulario de reseña, el input de la imagen de perfil y el contenedor de vista previa de imagen.
    const reviewForm = document.getElementById('review-form');
    const profilePicInput = document.getElementById('profile-pic');
    const imagePreview = document.getElementById('image-preview');

    // Variable para almacenar la imagen cargada por el usuario.
    let uploadedImage = null;

    // Reconoce cambios en el input de imagen y carga la imagen seleccionada.
    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado.
        if (file) {
            const reader = new FileReader(); // Crea un FileReader para leer el archivo.
            reader.onload = (e) => {
                uploadedImage = e.target.result; // Almacena la imagen cargada como URL.
                imagePreview.innerHTML = `<img src="${uploadedImage}" alt="Profile picture preview">`; // Muestra una vista previa de la imagen.
            };
            reader.readAsDataURL(file); // Lee el archivo como una URL.
        }
    });

    // Maneja el envío del formulario de reseñas.
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene que el formulario se envíe.

        // Obtiene los valores del formulario.
        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const review = document.getElementById('review').value;

         // Crea una nueva tarjeta de reseña con la información ingresada.
        const newReviewCard = document.createElement('div');
        newReviewCard.className = 'review-card';
        newReviewCard.innerHTML = `
            <div class="review-header">
                <img src="${uploadedImage || '/assets/img/profile-pic.png'}" alt="${name}" class="profile-pic">
                <div class="review-info">
                    <h3>${name}</h3>
                    <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                </div>
            </div>
            <p>${review}</p>
        `;

         // Añade la nueva reseña al carrusel.
        document.querySelector('.carousel-container').appendChild(newReviewCard);
        reviewForm.reset(); // Resetea el formulario.
        imagePreview.innerHTML = ''; // Limpia la vista previa de la imagen.
        uploadedImage = null; // Restablece la variable de imagen cargada.

        // Actualiza la lista de reseñas y muestra la nueva reseña en el carrusel.
        items = document.querySelectorAll('.carousel-container .review-card');
        currentIndex = items.length - 1; // Actualiza el índice actual al último elemento.
        moveCarousel(0);  // Mueve el carrusel para mostrar la nueva reseña.
    });
});

// Global click event listeners
// Cierra los modales cuando el usuario hace clic fuera de ellos.
window.onclick = function (event) {
    if (event.target == featureModal) {
        closeFeatureModal(); // Cierra el modal de características.
    }
    if (event.target == buyModal) {
        closeBuyModal();  // Cierra el modal de compra.
    }
};

// Attach event listeners to buttons
// Añade funcionalidad a los botones "Learn More" para abrir el modal de características.
document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Obtiene la característica correspondiente del botón presionado.
        const feature = e.target.closest('.feature-card').querySelector('h3').textContent.toLowerCase().split(' ')[0];
        openFeatureModal(feature);  // Abre el modal con la información de la característica.
    });
});

// Añade funcionalidad a los botones de compra para abrir el modal de compra.
document.querySelectorAll('.buy-button').forEach(btn => {
    btn.addEventListener('click', openBuyModal);
});

// Añade funcionalidad a los botones de navegación del carrusel.
document.querySelector('.carousel-button.prev').addEventListener('click', () => moveCarousel(-1));
document.querySelector('.carousel-button.next').addEventListener('click', () => moveCarousel(1));

// Close buttons for modals
// Añade funcionalidad a los botones de cierre de los modales.
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        if (this.closest('#featureModal')) {
            closeFeatureModal(); // Cierra el modal de características.
        } else if (this.closest('#buyModal')) {
            closeBuyModal(); // Cierra el modal de compra.
        }
    });
});