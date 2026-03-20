const chatArea = document.querySelector('.chat-area')
const inputBar = document.getElementById('inputBar')
const sendBtn = document.getElementById('sendBtn')

const getReplyFromBot = (isHi = false) => {
    const msgs = ['Mmm..', 'Nice', 'Tell me more..', 'Good good', 'Okk']

    if (isHi) {
        return 'Hello!'
    }

    return msgs[Math.floor(Math.random() * msgs.length)]
}

const addMessages = (text, type) => {

    const div = document.createElement('div')
    div.textContent = text
    div.className = `msg ${type}`
    chatArea.appendChild(div)

    return div
}

const sendMessage = () => {
    const text = inputBar.value.trim()
    if (!text) return

    addMessages(text, 'user')

    const botDiv = addMessages('Typing.', 'bot')

    let dots = 1

    const typingInterval = setInterval(() => {
        dots = (dots % 3) + 1
        botDiv.textContent = 'Typing' + '.'.repeat(dots)
    }, 500)

    setTimeout(() => {
        clearInterval(typingInterval)

        const textBot = getReplyFromBot(text.toLowerCase().includes('hi'))
        botDiv.textContent = textBot
    }, 2000)

    chatArea.scrollTop = chatArea.scrollHeight
    inputBar.value = ''
    inputBar.focus()

    return
}

sendBtn.addEventListener('click', sendMessage)
inputBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage()
    }
})