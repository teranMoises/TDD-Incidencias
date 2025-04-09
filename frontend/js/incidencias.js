// Cargar empresas en el selector
async function cargarEmpresasIncidencia() {
    const respuesta = await fetch("http://localhost:3000/empresas");
    const empresas = await respuesta.json();
    const select = document.getElementById("empresaSelect");
    select.innerHTML = `<option value="">Seleccione una Empresa</option>`;
    empresas.forEach((empresa, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerText = empresa.nombre;
        select.appendChild(option);
    });
}

// Función para cargar historial de incidencias
async function cargarIncidencias() {
    const respuesta = await fetch("http://localhost:3000/incidencias");
    const incidencias = await respuesta.json();
    const lista = document.getElementById("listaIncidencias");
    lista.innerHTML = "";
    incidencias.forEach(incidencia => {
        const li = document.createElement("li");
        li.innerText = `Empresa: ${incidencia.empresa.nombre} - Incidencia: ${incidencia.descripcion}`;
        lista.appendChild(li);
    });
}

document.getElementById("incidenciaForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const empresaIndex = document.getElementById("empresaSelect").value;
    const descripcion = document.getElementById("descripcion").value;
    const causa = document.getElementById("causa").value;
    const afectacion = document.getElementById("afectacion").value;
    const reporte = document.getElementById("reporte").value;
    const atencion = document.getElementById("atencion").value;

    const datos = { empresaIndex, descripcion, causa, afectacion, reporte, atencion };
    await fetch("http://localhost:3000/incidencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
    document.getElementById("incidenciaForm").reset();
    cargarIncidencias();
});

document.addEventListener("DOMContentLoaded", function () {
    cargarEmpresasIncidencia();
    cargarIncidencias();
});  