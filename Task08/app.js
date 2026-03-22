const views = document.querySelectorAll('.view')
const navLinks = document.querySelectorAll('.nav-links a')

const showView = (id = 'home') => {
    views.forEach(v => v.classList.toggle('active', v.id === id))

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`
        link.classList.toggle('active', isActive)
    })
}

const handleRouteChange = () => {
    const id = window.location.hash.slice(1) || 'home'
    showView(id)
}

document.addEventListener('DOMContentLoaded', handleRouteChange)
window.onhashchange = handleRouteChange