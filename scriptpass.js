// Obtener referencias a los elementos del DOM
const modal = document.getElementById("passwordModal");
const openModalBtn = document.getElementById("addPasswordBtn");
const closeModalBtn = document.getElementsByClassName("close")[0];
const passwordForm = document.getElementById("passwordForm");
const passwordList = document.getElementById("passwords");

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

// Mostrar la lista de contraseñas guardadas en una tabla
function renderPasswords() {
    passwordList.innerHTML = "";
    passwords.forEach((password, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${password.account}</td>
            <td>${password.username}</td>
            <td>${password.password}</td>
            <td>
                <button onclick="editPassword(${index})">Editar</button>
                <button class="delete" onclick="deletePassword(${index})">Eliminar</button>
            </td>
        `;
        passwordList.appendChild(row);
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