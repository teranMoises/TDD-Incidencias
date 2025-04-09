const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Permite solicitudes desde el frontend

const app = express();
const PORT = 3000;

// Configuración de Middlewares
app.use(bodyParser.json());
app.use(cors());

// Simulación de base de datos en memoria
let usuarios = [
    { username: "admin", password: "admin123" }
];

let empresas = [];
let incidencias = [];

// Ruta de Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = usuarios.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Usuario o contraseña incorrecta" });
    }
});

// Rutas para empresas
app.get("/empresas", (req, res) => {
    res.json(empresas);
});

app.post("/empresas", (req, res) => {
    const { nombre, direccion } = req.body;
    empresas.push({ nombre, direccion });
    res.json({ success: true });
});

// Rutas para incidencias
app.get("/incidencias", (req, res) => {
    res.json(incidencias);
});

app.post("/incidencias", (req, res) => {
    const { empresaIndex, descripcion, causa, afectacion, reporte, atencion } = req.body;
    // Se verifica que la empresa exista
    if (empresas[empresaIndex]) {
        const incidencia = {
            empresa: empresas[empresaIndex],
            descripcion,
            causa,
            afectacion,
            reporte,
            atencion,
            fecha: new Date()
        };
        incidencias.push(incidencia);
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Empresa no encontrada" });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});