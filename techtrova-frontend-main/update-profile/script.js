const profileForm = document.querySelector(".profile-form")
const nameInput = document.querySelector(".name-input")
const phoneInput = document.querySelector(".phone-input")

profileForm.onsubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/login/"
        return
    }

    const res = await fetch("https://tech-snowy.vercel.app/user/update_profile", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "token": `BEARER__${token}`
        },
        body: JSON.stringify({
            "userName": nameInput.value,
            "phone": phoneInput.value,
        })
    })

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()
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
