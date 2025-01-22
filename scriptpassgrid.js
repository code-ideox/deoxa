// Obtener referencias a los elementos del DOM
const modal = document.getElementById("passwordModal");
const openModalBtn = document.getElementById("addPasswordBtn");
const closeModalBtn = document.getElementsByClassName("close")[0];
const passwordForm = document.getElementById("passwordForm");
const passwordGrid = document.getElementById("passwordGrid");

// Mostrar la ventana emergente
openModalBtn.onclick = function() {
    modal.style.display = "block";
    document.getElementById("modalTitle").innerText = "Añadir nueva contraseña";
    passwordForm.reset();  // Limpiar el formulario
}

// Cerrar la ventana emergente
closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

// Cerrar la ventana emergente si el usuario hace clic fuera del modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}







// Almacenar contraseñas en localStorage
const passwords = JSON.parse(localStorage.getItem("passwords")) || [];

// Mostrar la lista de contraseñas en tarjetas
function renderPasswords() {
    passwordGrid.innerHTML = "";
    passwords.forEach((password, index) => {
        const card = document.createElement("div");
        card.classList.add("password-card");
        card.innerHTML = `
            <h3>${password.account}</h3>
            <p><strong>Usuario:</strong> ${password.username}</p>
            <p><strong>Contraseña:</strong> ${password.password}</p>
            <button onclick="editPassword(${index})">Editar</button>
            <button class="delete" onclick="deletePassword(${index})">Eliminar</button>
        `;
        passwordGrid.appendChild(card);
    });
}

// Guardar nueva contraseña
passwordForm.onsubmit = function(event) {
    event.preventDefault();
    
    const account = document.getElementById("account").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    passwords.push({ account, username, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));
    
    modal.style.display = "none";  // Cerrar el modal
    renderPasswords();  // Actualizar la lista
}

// Editar una contraseña
function editPassword(index) {
    const password = passwords[index];
    document.getElementById("account").value = password.account;
    document.getElementById("username").value = password.username;
    document.getElementById("password").value = password.password;
    document.getElementById("modalTitle").innerText = "Editar contraseña";

    modal.style.display = "block";  // Abrir el modal para editar

    passwordForm.onsubmit = function(event) {
        event.preventDefault();
        passwords[index] = {
            account: document.getElementById("account").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };
        localStorage.setItem("passwords", JSON.stringify(passwords));
        modal.style.display = "none";
        renderPasswords();
    }
}

// Eliminar una contraseña
function deletePassword(index) {
    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    renderPasswords();
}

// Renderizar la lista de contraseñas al cargar la página
renderPasswords();


// Mostrar la lista de contraseñas en tarjetas
function renderPasswords() {
    passwordGrid.innerHTML = "";
    passwords.forEach((password, index) => {
        const card = document.createElement("div");
        card.classList.add("password-card");
        card.innerHTML = `
            <h3>${password.account}</h3>
            <p><strong>Usuario:</strong> ${password.username}</p>
            <p><strong>Contraseña:</strong> ${password.password}</p>
            <div class="button-group">
                <button onclick="editPassword(${index})">Editar</button>
                <button class="delete" onclick="deletePassword(${index})">Eliminar</button>
            </div>
        `;
        passwordGrid.appendChild(card);
    });
}




const searchInput = document.getElementById("searchInput");

// Filtrar las contraseñas según la búsqueda
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPasswords = passwords.filter(password => {
        return (
            password.account.toLowerCase().includes(searchTerm) ||
            password.username.toLowerCase().includes(searchTerm)
        );
    });
    renderPasswords(filteredPasswords); // Llama a la función de renderizado con los resultados filtrados
});

// Mostrar la lista de contraseñas en tarjetas
function renderPasswords(passwordList = passwords) {
    passwordGrid.innerHTML = "";
    passwordList.forEach((password, index) => {
        const card = document.createElement("div");
        card.classList.add("password-card");
        card.innerHTML = `
            <h3>${password.account}</h3>
            <p><strong>Usuario:</strong> ${password.username}</p>
            <p><strong>Contraseña:</strong> ${password.password}</p>
            <div class="button-group">
                <button onclick="editPassword(${index})">Editar</button>
                <button class="delete" onclick="deletePassword(${index})">Eliminar</button>
            </div>
        `;
        passwordGrid.appendChild(card);
    });
}