// Abrir poupup de cadastro do google
document.getElementById("google-login").addEventListener("click", (event) => {
    event.preventDefault(); // Evita o comportamento padrão do link
    window.open(
        "/auth/google",
        "popupWindow",
        "width=600,height=700,left=200,top=100"
    );
});
