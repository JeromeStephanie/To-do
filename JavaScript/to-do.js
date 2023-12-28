const todoList = document.getElementById('todoList');
const taskInput = document.getElementById('taskInput');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function show(filter) {
    const filteredTodos = filter === 'all'
        ? todos
        : todos.filter(function(todo) {
            if (filter === 'active') {
                return !todo.completed;
            } else {
                return todo.completed;
            }
        });

    renderTodos(filteredTodos);
}

function renderTodos(todosToRender) {
    // Hide all list items initially
    const listItems = todoList.querySelectorAll('li');
    listItems.forEach(li => li.style.display = 'none');

    for (let i = 0; i < todosToRender.length; i++) {
        const todo = todosToRender[i];
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function() {
            todo.completed = checkbox.checked;
            saveTodos();
            show('all');
        });
        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(todo.text));
        li.appendChild(label);

        // Add a delete button (x) to the right side
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerHTML = 'x';
        deleteButton.addEventListener('click', function() {
            deleteTask(todo);
            show('all');
        });

        li.appendChild(deleteButton);
        

        todoList.appendChild(li);
        li.style.display = 'block'; // Display the filtered items
        if (todo.completed) {
            li.classList.add('hidden'); // Apply 'hidden' class to completed tasks
        }
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        todos.push({ text: taskText, completed: false });
        taskInput.value = '';
        show('all'); // Refresh the list after adding a new task
    }
}

function clearCompleted() {
    for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i].completed) {
            todos.splice(i, 1);
        }
    }
    show('all'); // Refresh the list after clearing completed tasks
}

function deleteTask(task) {
    const taskIndex = todos.indexOf(task);
    if (taskIndex !== -1) {
        todos.splice(taskIndex, 1);
        saveTodos();
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

show('all');
