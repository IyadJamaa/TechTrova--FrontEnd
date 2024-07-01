const initCheckEmail = () => {
    const email = sessionStorage.getItem("email")
    if (!email) {
        window.location.href = "/login/"
    }

    document.querySelector(".user-email").textContent = email
}

initCheckEmail()
