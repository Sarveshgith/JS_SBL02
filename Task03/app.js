const modal = document.getElementById('modal')
const modalImg = document.getElementById('modalImg')
const gallery = document.getElementById('gallery')

gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img')

    if (!img) {
        return
    }

    modal.classList.add('active')
    modalImg.src = img.src
    modalImg.alt = img.alt
})

modal.addEventListener('click', () => {
    modal.classList.remove('active')
    modalImg.src = ''
    modalImg.alt = ''
})