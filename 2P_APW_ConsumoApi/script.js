// Referencia inicial

let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// utilizamos "moviename" para buscar el nombre que a introducido el usuario al principi,
//de ahi lo estamos conectando a una api mediante un url conectandolo tambien con el archivo js con el nombre key que tiene un codigo de validacion y puede mostrar resp
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    ///// del if al else
    //esto sirve para verificar que el campo este completo si este no esta completo, procedera a lanzar un mensaje para que agtegue algun nombre de una pelicula
    if (movieName.length <= 0) {
        result.innerHTML = '<h3 class="msg">Por favor coloca el nombre de una pelicula</h3>';
    } else {
        //del fetch al .then 
        //ahora se viene los chido ya que llama ala url y esta devuelve un resultado y json
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response == "True") {
                    result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="Poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                ${data.Genre.split(",").map(genre => `<div>${genre}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                    `;
                    // si funciona procedera a devolver una que se va ir estructurando en un html con la info de la pelicula en especifico
                    //un ejemplo seria como data.poster donde coloca el url de la pelicula en especifico
                } else {
                    // Si la película no existe en la base de datos dara una resopuesta fallida 
                    result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
                }
            })
            // Si ha ocurrido un error de parte de la red este generara un mensaje de error de parte del script
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Ocurred</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
