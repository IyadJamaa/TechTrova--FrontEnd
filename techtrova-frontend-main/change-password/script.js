const passwordForm = document.querySelector(".password-form")
const oldPasswordInput = document.querySelector(".old-password-input")
const newPasswordInput = document.querySelector(".new-password-input")
const confirmPasswordInput = document.querySelector(".confirm-password-input")

passwordForm.onsubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/login/"
        return
    }

    const res = await fetch("https://tech-snowy.vercel.app/auth/update_password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "token": `BEARER__${token}`
        },
        body: JSON.stringify({
            "oldPassword": oldPasswordInput.value,
            "newPassword": newPasswordInput.value,
            "confirmPassword": newPasswordInput.value,
        })
    })

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()
        console.log({ data })
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
