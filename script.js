document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar los datos.");
            }
            return response.json();
        })
        .then(data => {
            mostrarDatos(data.transferencias, "transferencias");
            mostrarDatos(data.oxxo, "oxxo");
        })
        .catch(error => {
            console.error("Error:", error);
            mostrarError("Hubo un problema al cargar los métodos de pago.");
        });
});

function mostrarDatos(lista, idDiv) {
    const container = document.getElementById(idDiv);
    if (!container) {
        console.error(`El contenedor con ID ${idDiv} no existe.`);
        return;
    }

    lista.forEach(item => {
        const card = crearCard(item);
        container.appendChild(card);
    });
}

function crearCard(item) {
    const card = document.createElement("div");
    const claseBanco = obtenerClaseBanco(item.banco);

    card.classList.add("card", claseBanco);

    card.innerHTML = `
        <img src="${item.imagen}" alt="${item.banco}">
        <div class="card-content">
            <h4>${item.banco}</h4>
            <p><strong>${item.numero}</strong></p>
            <p>${item.titular}</p>
        </div>
        <button onclick="copiarTexto('${item.numero}')">Copiar</button>
    `;

    return card;
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Número copiado: " + texto);
        })
        .catch(err => {
            console.error("Error al copiar:", err);
        });
}

function obtenerClaseBanco(banco) {
    if (banco.includes("BBVA")) return "bbva";
    if (banco.includes("BANCOPPEL")) return "coppel";
    if (banco.includes("HSBC")) return "hsbc";
    if (banco.includes("OXXO")) return "oxxo";
    return "";
}