const loginForm = document.querySelector(".login-form")
const emailInput = document.querySelector(".email-input")
const passwordInput = document.querySelector(".password-input")

const token = localStorage.getItem("token")
if (token) {
    window.location.href = "/profile/"
}

loginForm.onsubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("https://tech-snowy.vercel.app/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": emailInput.value,
            "password": passwordInput.value,
        })
    })

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()
        const token = data.results.token
        localStorage.setItem("token", token)
        window.location.href = "/profile/"
        return
    }

    const error = await res.json()
    Toastify({
        text: error.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#A21A22",
            color: "#fbfbfb"
        },
    }).showToast();
}
