const initNavbar = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        document.querySelector(".nav-container .right-side").innerHTML += `
            <li>
                <a href="/login/">
                    <div class="login">Log In</div>
                </a>
            </li>
        `
        return
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
        document.querySelector(".nav-container .right-side").innerHTML += `
            <li>
                <a href="/profile/" style="display: flex; padding: 0px; margin-left: 18px;">
                    <img src="${user.profileImage.url}" style="width: 36px; height: 36px; object-fit: cover;" />
                </a>
            </li>
        `

        return
    }

    localStorage.removeItem("token")
    document.querySelector(".nav-container .right-side").innerHTML += `
        <li>
            <a href="/login/">
                <div class="login">Log In</div>
            </a>
        </li>
    `
}

initNavbar()
