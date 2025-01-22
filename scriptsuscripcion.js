// Obtener referencias a los elementos del DOM
const subscriptionModal = document.getElementById("subscriptionModal");
const openSubscriptionModalBtn = document.getElementById("addSubscriptionBtn");
const closeSubscriptionModalBtn = document.getElementsByClassName("close-subscription")[0];
const subscriptionForm = document.getElementById("subscriptionForm");
const subscriptionList = document.getElementById("subscriptionList");
const userModal = document.getElementById("userModal");
const userForm = document.getElementById("userForm");

// Cargar usuarios y suscripciones desde localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];

// Función para renderizar el selector de usuarios en el formulario de suscripción
function populateUserEmailSelect() {
    const userEmailSelect = document.getElementById("userEmailSelect");
    userEmailSelect.innerHTML = "<option value=''>Seleccione un usuario</option>";
    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.email;
        option.text = `${user.fullName} (${user.email})`;
        userEmailSelect.appendChild(option);
    });
}

// Mostrar el modal de suscripción
openSubscriptionModalBtn.onclick = function() {
    populateUserEmailSelect();  // Asegura que el selector se actualice cada vez que se abre el modal
    subscriptionModal.style.display = "block";
    document.getElementById("subscriptionModalTitle").innerText = "Añadir Nueva Suscripción";
    subscriptionForm.reset();
}

// Cerrar el modal de suscripción
closeSubscriptionModalBtn.onclick = function() {
    subscriptionModal.style.display = "none";
}

// Renderizar la lista de suscripciones guardadas
function renderSubscriptions() {
    subscriptionList.innerHTML = "";
    subscriptions.forEach((subscription, index) => {
        const item = document.createElement("div");
        item.classList.add("subscription-item");
        item.innerHTML = `
            <img src="${subscription.imageUrl}" alt="${subscription.planTitle}">
            <h3>${subscription.planTitle}</h3>
            <p><strong>URL:</strong> <a href="${subscription.url}" target="_blank">${subscription.url}</a></p>
            <p><strong>Fecha de Inicio:</strong> ${subscription.startDate}</p>
            <p><strong>Duración:</strong> ${subscription.duration} meses</p>
            <p><strong>Email:</strong> ${subscription.email}</p>
            <p><strong>Estado:</strong> ${isSubscriptionActive(subscription.startDate, subscription.duration) ? "Activo" : "Vencido"}</p>
            <button onclick="editSubscription(${index})">Editar</button>
            <button onclick="deleteSubscription(${index})">Eliminar</button>
        `;
        subscriptionList.appendChild(item);
    });
}

// Función para verificar si la suscripción está activa
function isSubscriptionActive(startDate, duration) {
    const start = new Date(startDate);
    const endDate = new Date(start.setMonth(start.getMonth() + duration));
    return endDate >= new Date();
}

// Guardar nueva suscripción
subscriptionForm.onsubmit = function(event) {
    event.preventDefault();

    const planTitle = document.getElementById("planTitle").value;
    const url = document.getElementById("url").value;
    const startDate = document.getElementById("startDate").value;
    const duration = parseInt(document.getElementById("duration").value);
    const email = document.getElementById("userEmailSelect").value; // Obtener email del usuario seleccionado
    const imageUrl = document.getElementById("imageUrl").value;

    subscriptions.push({ planTitle, url, startDate, duration, email, imageUrl });
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

    subscriptionModal.style.display = "none";
    renderSubscriptions();
}

// Editar una suscripción
function editSubscription(index) {
    const subscription = subscriptions[index];
    document.getElementById("planTitle").value = subscription.planTitle;
    document.getElementById("url").value = subscription.url;
    document.getElementById("startDate").value = subscription.startDate;
    document.getElementById("duration").value = subscription.duration;
    document.getElementById("userEmailSelect").value = subscription.email; // Seleccionar el email del usuario
    document.getElementById("imageUrl").value = subscription.imageUrl;
    document.getElementById("subscriptionModalTitle").innerText = "Editar Suscripción";

    subscriptionModal.style.display = "block";

    subscriptionForm.onsubmit = function(event) {
        event.preventDefault();
        subscriptions[index] = {
            planTitle: document.getElementById("planTitle").value,
            url: document.getElementById("url").value,
            startDate: document.getElementById("startDate").value,
            duration: parseInt(document.getElementById("duration").value),
            email: document.getElementById("userEmailSelect").value, // Obtener el email actualizado
            imageUrl: document.getElementById("imageUrl").value
        };
        localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
        subscriptionModal.style.display = "none";
        renderSubscriptions();
    }
}

// Eliminar una suscripción
function deleteSubscription(index) {
    subscriptions.splice(index, 1);
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    renderSubscriptions();
}

// Renderizar la lista de suscripciones al cargar la página
renderSubscriptions();
