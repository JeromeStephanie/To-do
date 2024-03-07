// Retrieve stored to-do items from local storage
let todoItems = JSON.parse(localStorage.getItem('todoItems')) || []

function updateLocalStorage () {
  localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

function show (view) {
  const todoList = document.getElementById('todoList')
  todoList.innerHTML = '' // Clear the existing list

  switch (view) {
    case 'all':
      todoItems.forEach(item => createTodoItem(item))
      break
    case 'active':
      todoItems
        .filter(item => !item.checked)
        .forEach(item => createTodoItem(item))
      break
    case 'completed':
      todoItems
        .filter(item => item.checked)
        .forEach(item => createTodoItem(item))
      break
    default:
      break
  }
}

function createTodoItem (item) {
  const li = document.createElement('li')
  li.textContent = item.text
  if (item.checked) {
    li.classList.add('checked')
  }

  const span = document.createElement('SPAN')
  const txt = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(txt)
  li.appendChild(span)

  document.getElementById('todoList').appendChild(li)

  // Click on a close button to remove the item
  span.onclick = function () {
    const index = todoItems.findIndex(i => i.text === item.text)
    if (index !== -1) {
      todoItems.splice(index, 1)
      updateLocalStorage()
      show('all') // Refresh the list after removing an item
    }
  }

  // Add a "checked" symbol when clicking on a list item
  li.onclick = function () {
    item.checked = !item.checked
    updateLocalStorage()
    show('all') // Refresh the list after updating the item's status
  }
}

// Initialize the list based on the stored data
document.addEventListener('DOMContentLoaded', function () {
  show('all')

  const taskInput = document.getElementById('taskInput')
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      newElement()
    }
  })
})

function newElement () {
  const inputValue = document.getElementById('taskInput').value
  if (inputValue === '') {
    showErrorModal('You must write something!')
  } else {
    const newItem = { text: inputValue, checked: false }
    todoItems.push(newItem)
    updateLocalStorage()
    show('all') // Refresh the list after adding a new item
  }
  document.getElementById('taskInput').value = ''
}

function showErrorModal (message) {
  const errorMessageModal = document.getElementById('errorMessageModal')
  errorMessageModal.textContent = message

  const errorModal = document.getElementById('errorModal')
  errorModal.style.display = 'block'
}

function closeErrorModal () {
  const errorModal = document.getElementById('errorModal')
  errorModal.style.display = 'none'
}

