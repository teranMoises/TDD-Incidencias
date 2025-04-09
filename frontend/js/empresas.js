// Función para cargar empresas desde el backend
async function cargarEmpresas() {
    const respuesta = await fetch("http://localhost:3000/empresas");
    const empresas = await respuesta.json();
    const lista = document.getElementById("listaEmpresas");
    lista.innerHTML = "";
    empresas.forEach((empresa, index) => {
        const li = document.createElement("li");
        li.innerText = `${empresa.nombre} - ${empresa.direccion}`;
        li.dataset.index = index;
        lista.appendChild(li);
    });

    // También se puede actualizar el selector de empresas en incidencia
    actualizarSelectorEmpresas(empresas);
}

document.getElementById("empresaForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const nombreEmpresa = document.getElementById("nombreEmpresa").value;
    const direccion = document.getElementById("direccion").value;

    await fetch("http://localhost:3000/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreEmpresa, direccion })
    });
    document.getElementById("nombreEmpresa").value = "";
    document.getElementById("direccion").value = "";
    cargarEmpresas();
});

// Función para actualizar el selector de empresas en la página de incidencias (si aplica)
function actualizarSelectorEmpresas(empresas) {
    const select = document.getElementById("empresaSelect");
    if (!select) return;
    select.innerHTML = `<option value="">Seleccione una Empresa</option>`;
    empresas.forEach((empresa, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerText = empresa.nombre;
        select.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", cargarEmpresas);