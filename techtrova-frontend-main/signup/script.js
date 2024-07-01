const signupForm = document.querySelector(".signup-form")
const nameInput = document.querySelector(".name-input")
const emailInput = document.querySelector(".email-input")
const passwordInput = document.querySelector(".password-input")
const repasswordInput = document.querySelector(".repassword-input")

const token = localStorage.getItem("token")
if (token) {
    window.location.href = "/profile/"
}

signupForm.onsubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("https://tech-snowy.vercel.app/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "userName": nameInput.value,
            "email": emailInput.value,
            "password": passwordInput.value,
            "confirmPassword": repasswordInput.value
        })
    })

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()
        console.log({ data })
        sessionStorage.setItem("email", emailInput.value)
        window.location.href = "/check-email/"
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
