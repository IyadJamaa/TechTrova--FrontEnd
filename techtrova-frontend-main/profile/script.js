function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
}

const initProfilePage = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/login/"
        return
    }

    document.querySelector(".logout-btn").onclick = async () => {
        localStorage.removeItem("token")
        const res = await fetch("https://tech-snowy.vercel.app/auth/logout", {
            method: "POST",
            headers: {
                "token": `BEARER__${token}`
            }
        })
        const data = await res.json()
        window.location.href = "/login/"
    }

    document.querySelector(".profile-image").onclick = async () => {
        document.querySelector(".file-input").click()
    }

    document.querySelector(".file-input").onchange = async (e) => {
        const formData = new FormData()
        formData.append("profileImage", e.target.files[0])
        const res = await fetch("https://tech-snowy.vercel.app/user/upload_profile_image", {
            method: "PATCH",
            headers: {
                "token": `BEARER__${token}`
            },
            body: formData
        })
        const data = await res.json()
        window.location.href = "/profile/"
    }

    const res = await fetch("https://tech-snowy.vercel.app/user", {
        method: "GET",
        headers: {
            "token": `BEARER__${token}`
        }
    })

    if (res.status === 200) {
        const data = await res.json()
        const user = data.results.user
        document.querySelector(".profile-image").src = user.profileImage.url
        document.querySelector(".user-name").textContent = user.userName
        document.querySelector(".user-email").textContent = user.email
        document.querySelector(".user-phone").textContent = user.phone || "-"

        const subscription = data.results.Subscription
        if (subscription) {
            const paymentDetails = document.querySelector(".payment-details")
            paymentDetails.innerHTML += `
                <div class="row">
                    <span>Next Payment</span>
                    <span>${formatDate(subscription.nextBillingDate)}</span>
                </div>
            `
            paymentDetails.innerHTML += `<div class="separator"></div>`
            paymentDetails.classList.remove("d-none")
        }

        return
    }

    localStorage.removeItem("token")
    window.location.href = "/login/"
}

initProfilePage()
