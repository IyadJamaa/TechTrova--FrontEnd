const resetForm = document.querySelector(".reset-form")
const emailInput = document.querySelector(".email-input")
const codeInput = document.querySelector(".code-input")
const passwordInput = document.querySelector(".password-input")
const confirmPasswordInput = document.querySelector(".confirm-password-input")

const token = localStorage.getItem("token")
if (token) {
    window.location.href = "/profile/"
}

resetForm.onsubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("https://tech-snowy.vercel.app/auth/reset_password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": emailInput.value,
            "forgetCode": codeInput.value,
            "password": passwordInput.value,
            "confirmPassword": confirmPasswordInput.value,
        })
    })

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()
        console.log({ data })
        localStorage.removeItem("token")
        window.location.href = "/login/"
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
