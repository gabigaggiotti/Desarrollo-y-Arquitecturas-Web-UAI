const URL_BASE = 'https://rickandmortyapi.com/api/character';

const btnTodos = document.getElementById('btn-todos');
const btnBuscar = document.getElementById('btn-buscar');
const resultados = document.getElementById('resultados');
const mensajeError = document.getElementById('mensaje-error');

// Traer todos los personajes
btnTodos.addEventListener('click', function () {
  obtenerPersonajes(URL_BASE);
});

// Buscar con filtros
btnBuscar.addEventListener('click', function () {
  const name = document.getElementById('name').value.trim();
  const status = document.getElementById('status').value.trim();
  const species = document.getElementById('species').value.trim();
  const type = document.getElementById('type').value.trim();
  const gender = document.getElementById('gender').value.trim();

  // Armo los parametros de la query
  const params = [];
  if (name) params.push('name=' + name);
  if (status) params.push('status=' + status);
  if (species) params.push('species=' + species);
  if (type) params.push('type=' + type);
  if (gender) params.push('gender=' + gender);

  let url = URL_BASE;
  if (params.length > 0) {
    url = URL_BASE + '?' + params.join('&');
  }

  obtenerPersonajes(url);
});

// Funcion que hace el request y renderiza
function obtenerPersonajes(url) {
  limpiar();

  fetch(url)
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error('No se encontraron personajes o la busqueda fallo.');
      }
      return respuesta.json();
    })
    .then(function (datos) {
      mostrarPersonajes(datos.results);
    })
    .catch(function (error) {
      mensajeError.textContent = error.message;
    });
}

// Renderiza las tarjetas
function mostrarPersonajes(personajes) {
  personajes.forEach(function (personaje) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';

    tarjeta.innerHTML =
      '<img src="' + personaje.image + '" alt="' + personaje.name + '">' +
      '<div class="tarjeta-info">' +
      '<h3>' + personaje.name + '</h3>' +
      '<p><strong>Estado:</strong> ' + personaje.status + '</p>' +
      '<p><strong>Especie:</strong> ' + personaje.species + '</p>' +
      '<p><strong>Genero:</strong> ' + personaje.gender + '</p>' +
      '<p><strong>Origen:</strong> ' + personaje.origin.name + '</p>' +
      '</div>';

    resultados.appendChild(tarjeta);
  });
}

// Limpia resultados y errores
function limpiar() {
  resultados.innerHTML = '';
  mensajeError.textContent = '';
}
