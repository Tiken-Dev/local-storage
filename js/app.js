// Variables:
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event Listeners:
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo Tweet:
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo:
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}



// Funciones:
function agregarTweet(e) {
    e.preventDefault();

    // TextArea - Donde el usuario escribe:

    const tweet = document.querySelector('#tweet').value;

    // Validación:
    if(tweet === '') {
        mostrarError('Un mensaje, no puede ir vacío');
        return; //Evita que se ejecuten más líneas de código.
    } 


    const tweetObj = {
        id: Date.now(),
        tweet // Esto es igual a escribir: tweet: tweet
    }

    // Añadir al ARRAY de la variable let = tweets:
    tweets = [...tweets, tweetObj]

    // Una vez agregado el tweet al ARRAY, vamos a crear el HTML:
    crearHTML();

    // Reiniciar el Formulario:
    formulario.reset();
}

// Mostrar mensaje de ERROR:

function mostrarError(error) {


    const mensajeError = document.createElement('p');
    mensajeError.textContent = error; //Coge el mensaje cualquier mensaje que agreguemos.
    mensajeError.classList.add('error');

    // Insertar el mensaje de Error dentro del contenido:
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta pasados 3 segundos:
    setTimeout( () => {
        mensajeError.remove();
    }, 3000);
}




// Muestra un listado con los TWEETS creados:
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            // Agregar el botón de Eliminar Tweet:
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la función de ELIMINAR:
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML:
            const li = document.createElement('li');

            // Añadir el texto:
            li.innerText = tweet.tweet; //Añadimos el valor de la llave tweet de nuestro OBJETO.

            // Asignar el BOTÓN:
            li.appendChild(btnEliminar);

            // Insertar los tweets en el HTML:
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

// Agrega los Tweets actuales a Local Storage:

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// Limpiar HTML:
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// Borrar Tweet:
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();

}