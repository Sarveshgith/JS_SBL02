const display = document.getElementById('display')
const buttons = document.querySelector('.buttons')

let currentInput = ''

const updateDisplay = (value) => {
    display.value = value
}

const appendNumber = (number) => {
    if (currentInput === '0') {
        currentInput = number
    } else {
        currentInput += number
    }

    updateDisplay(currentInput)
}

const appendOperator = (operator) => {
    if (currentInput === '') {
        return
    }

    const lastChar = currentInput[currentInput.length - 1]
    const operators = ['+', '-', '*', '/']

    if (operators.includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator
    } else {
        currentInput += operator
    }

    updateDisplay(currentInput)
}

const clearInput = () => {
    currentInput = ''
    updateDisplay('0')
}

const calculate = () => {
    if (currentInput === '') {
        return
    }

    try {
        const result = eval(currentInput)

        if (!Number.isFinite(result)) {
            updateDisplay('Error')
            currentInput = ''
            return
        }

        currentInput = String(result)
        updateDisplay(currentInput)
    } catch {
        updateDisplay('Error')
        currentInput = ''
    }
}

buttons.addEventListener('click', (event) => {
    const target = event.target.closest('button')

    if (!target) {
        return
    }

    const action = target.dataset.action
    const value = target.dataset.value

    if (action === 'number') {
        appendNumber(value)
    }

    if (action === 'operator') {
        appendOperator(value)
    }

    if (action === 'equal') {
        calculate()
    }

    if (action === 'clear') {
        clearInput()
    }
})
