// Obtener referencias a los elementos del DOM
const userModal = document.getElementById("userModal");
const addUserBtn = document.getElementById("addUserBtn");
const closeUserModalBtn = document.getElementsByClassName("close-user")[0];
const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

// Almacenar usuarios en localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];

// Mostrar la lista de usuarios guardados
function renderUsers() {
    userList.innerHTML = ""; // Limpiar la lista antes de renderizar
    users.forEach((user, index) => {
        const item = document.createElement("div");
        item.classList.add("user-item");
        item.innerHTML = `
            <h3>${user.username}</h3>
            <p><strong>Nombre Completo:</strong> ${user.fullName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <button onclick="editUser(${index})">Editar</button>
            <button onclick="deleteUser(${index})">Eliminar</button>
        `;
        userList.appendChild(item);
    });
}

// Abrir el modal para añadir un nuevo usuario
addUserBtn.onclick = function() {
    userModal.style.display = "block";
    document.getElementById("userModalTitle").innerText = "Añadir Nuevo Usuario";
    userForm.reset();
}

// Cerrar el modal de usuario
function closeUserModal() {
    userModal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === userModal) {
        closeUserModal();
    }
}

// Guardar nueva cuenta de usuario
userForm.onsubmit = function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("password").value;

    users.push({ username, fullName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    closeUserModal();
    renderUsers();
}

// Editar un usuario
function editUser(index) {
    const user = users[index];
    document.getElementById("username").value = user.username;
    document.getElementById("fullName").value = user.fullName;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("userModalTitle").innerText = "Editar Usuario";

    userModal.style.display = "block";

    userForm.onsubmit = function(event) {
        event.preventDefault();
        users[index] = {
            username: document.getElementById("username").value,
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("userEmail").value,
            password: document.getElementById("password").value
        };
        localStorage.setItem("users", JSON.stringify(users));
        closeUserModal();
        renderUsers();
    }
}

// Eliminar un usuario
function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
}

// Renderizar la lista de usuarios al cargar la página
renderUsers();
