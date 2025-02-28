document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            mostrarDatos(data.transferencias, "transferencias");
            mostrarDatos(data.oxxo, "oxxo");
        })
        .catch(error => console.error("Error al cargar datos:", error));
});

function mostrarDatos(lista, idDiv) {
    let container = document.getElementById(idDiv);
    lista.forEach(item => {
        let card = document.createElement("div");
        let claseBanco = obtenerClaseBanco(item.banco);

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

        container.appendChild(card);
    });
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("Número copiado: " + texto);
    }).catch(err => {
        console.error("Error al copiar: ", err);
    });
}

function obtenerClaseBanco(banco) {
    if (banco.includes("BBVA")) return "bbva";
    if (banco.includes("BANCOPPEL")) return "coppel";
    if (banco.includes("HSBC")) return "hsbc";
    if (banco.includes("OXXO")) return "oxxo";
    return "";
}
