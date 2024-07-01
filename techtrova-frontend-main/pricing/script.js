// "use strict";

// let check = 0;

// const btnCheck = document.querySelector(".check-button");
// const mark = document.querySelector('.alahly');

// btnCheck.addEventListener("click", function () {
//     check = check === 0 ? 1 : 0;
//     if (check === 0) {
//         document.querySelector(".h4j").textContent =
//             "Have Access To Your Personal Mentor Ai";
//         document.querySelector(".l5j").textContent = "5 Teams";
//         document.querySelector(".s6j").textContent = "$10";
//         mark.style.display = 'none';

//     } else {
//         document.querySelector(".h4j").textContent =
//             "Have Access To Your Personal Mentor Ai, \n Powered By Open AI";
//         document.querySelector(".l5j").textContent = "Access To Our Mentor AI";
//         document.querySelector(".s6j").textContent = "$8";
//         mark.style.display = 'inline';
//     }
// });

const paymentBtn = document.querySelector(".payment-btn")

paymentBtn.onclick = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/login/"
        return
    }

    const res = await fetch("https://tech-snowy.vercel.app/sub/create-checkout-session", {
        method: "POST",
        headers: {
            "token": `BEARER__${token}`
        },
    })

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()
        console.log({ data })
        window.location.href = data.url
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
