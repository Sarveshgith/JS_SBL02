const addBtn = document.getElementById('addBtn')
const taskInput = document.getElementById('inputBar')
const tasks = document.getElementById('tasks')
const emptyState = document.getElementById('emptyState')
const STORAGE_KEY = 'todoTasks'

const updateEmptyState = () => {
    emptyState.style.display = tasks.children.length === 0 ? 'block' : 'none'
}

const saveTasksToStorage = () => {
    const allTasks = [...tasks.querySelectorAll('.task-item')].map((item) => {
        const text = item.querySelector('.task-text').textContent
        const completed = item.querySelector('.task-checkbox').checked
        return { text, completed }
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks))
}

const loadTasksFromStorage = () => {
    const storedTasks = localStorage.getItem(STORAGE_KEY)

    if (!storedTasks) {
        updateEmptyState()
        return
    }

    const parsedTasks = JSON.parse(storedTasks)

    parsedTasks.forEach((task) => {
        const taskItem = createTaskElement(task.text, task.completed)
        tasks.appendChild(taskItem)
    })

    updateEmptyState()
}

const createTaskElement = (taskText, isCompleted = false) => {
    const li = document.createElement('li')
    li.className = 'task-item'

    li.innerHTML = `
        <label class="task-label">
            <input type="checkbox" class="task-checkbox">
            <span class="task-text"></span>
        </label>

        <div class="actions">
            <button class="btn btn-delete" type="button">Delete</button>
        </div>
    `

    li.querySelector('.task-text').textContent = taskText

    const checkbox = li.querySelector('.task-checkbox')
    const deleteBtn = li.querySelector('.btn-delete')

    checkbox.checked = isCompleted
    li.classList.toggle('completed', isCompleted)

    // Toggle completed
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked)
        saveTasksToStorage()
    })

    // Delete task
    deleteBtn.addEventListener('click', () => {
        li.remove()
        updateEmptyState()
        saveTasksToStorage()
    })

    return li
}

const addTasks = () => {
    const task = taskInput.value.trim()

    if (task === '') {
        return
    }

    const taskItem = createTaskElement(task)
    tasks.appendChild(taskItem)
    taskInput.value = ''
    updateEmptyState()
    saveTasksToStorage()
}

addBtn.addEventListener('click', addTasks)

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTasks()
    }
})

loadTasksFromStorage()