// Cuando se carga la página
document.addEventListener('DOMContentLoaded', mostrarJugadores);

// Escuchar el formulario
document.getElementById('formRegistro').addEventListener('submit', function (e) {
  e.preventDefault(); // evita que la página se recargue

  // Tomar los datos del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const alias = document.getElementById('alias').value.trim();
  const num_camisa = document.getElementById('num_camisa').value.trim();
  const posicion = document.getElementById('posicion').value.trim();

  // Crear objeto jugador
  const jugador = { nombre, apellidos, alias, num_camisa, posicion };

  // Obtener lista actual o crear una nueva
  const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

  // Agregar el nuevo jugador
  jugadores.push(jugador);

  // Guardar en localStorage (como texto JSON)
  localStorage.setItem('jugadores', JSON.stringify(jugadores));

  // Limpiar formulario
  document.getElementById('formRegistro').reset();

  // Actualizar la lista
  mostrarJugadores();
});

// Función para mostrar los jugadores
function mostrarJugadores() {
  const lista = document.getElementById('listaJugadores');
  lista.innerHTML = ''; // limpiar antes de volver a mostrar

  const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

  if (jugadores.length === 0) {
    lista.innerHTML = '<li>No hay jugadores registrados.</li>';
    return;
  }

  jugadores.forEach((j, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${i + 1}. ${j.nombre} ${j.apellidos} - ${j.alias} (#${j.num_camisa}) - ${j.posicion}
      <button onclick="eliminarJugador(${i})" style="
        margin-left:10px;
        background:red;
        color:white;
        border:none;
        border-radius:4px;
        cursor:pointer;
        padding:3px 7px;
      ">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Función para eliminar un jugador individual
function eliminarJugador(index) {
  const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

  if (confirm(`¿Seguro que quieres eliminar a ${jugadores[index].nombre}?`)) {
    jugadores.splice(index, 1); // elimina al jugador
    localStorage.setItem('jugadores', JSON.stringify(jugadores)); // guarda cambios
    mostrarJugadores(); // actualiza la lista
  }
}
