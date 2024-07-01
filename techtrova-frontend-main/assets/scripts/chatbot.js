const chatbotContainer = document.querySelector(".chatbot-container")
const closeChatbot = document.querySelector(".close-chatbot")
const chatbotSendForm = document.querySelector(".chatbot-send-form")
const chatbotMessageInput = document.querySelector(".chatbot-message-input")
const token = localStorage.getItem("token")

chatbotContainer.onclick = async () => {
    if (chatbotContainer.classList.contains("active")) {
        return
    }

    if (!token) {
        window.location.href = "/login/"
        return
    }

    const res = await fetch("https://tech-snowy.vercel.app/chat/messages", {
        method: "GET",
        headers: {
            "token": `BEARER__${token}`
        }
    })

    if (res.status === 200) {
        const data = await res.json()
        console.log({ data })
        data.forEach(message => {
            document.querySelector(".chat-body").innerHTML += `
            <div class="message ${message.isFromUser ? "user-message" : ""}">
                ${message.message}
            </div>
        `
        })

        if (!chatbotContainer.classList.contains("active")) {
            chatbotContainer.classList.add("active")
        }

        return
    }

    window.location.href = "/pricing/"
}

closeChatbot.onclick = (e) => {
    e.stopPropagation()
    chatbotContainer.classList.remove("active")
}

chatbotSendForm.onsubmit = async (e) => {
    e.preventDefault()
    if (!token) {
        window.location.href = "/login/"
        return
    }

    document.querySelector(".chat-body").innerHTML += `
        <div class="message user-message">
            ${chatbotMessageInput.value}
        </div>
    `

    const res = await fetch("https://tech-snowy.vercel.app/chat/send-message", {
        method: "POST",
        headers: {
            "token": `BEARER__${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: chatbotMessageInput.value
        })
    })

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()
        console.log({ data })
        chatbotMessageInput.value = ""
        document.querySelector(".chat-body").innerHTML += `
            <div class="message">
                ${data.answer}
            </div>
        `

        return
    }

    window.location.href = "/pricing/"
}
