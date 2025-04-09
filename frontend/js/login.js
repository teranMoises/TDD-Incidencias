document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            window.location.href = "empresas.html";
        } else {
            document.getElementById("loginMessage").innerText = data.message;
        }
    } catch (error) {
        document.getElementById("loginMessage").innerText = "Error en la conexión.";
    }
});  