'use strict'

const todoInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo-list');
const allBtn = document.querySelector('.all-btn');
const activeBtn = document.querySelector('.active-btn');
const completeBtn = document.querySelector('.complete-btn');
const clearBtn = document.querySelector('.clear-btn');

function appendElement(element, child) {
    element.appendChild(child);
}

function toggle(element, elClass) {
    element.classList.toggle(elClass);
}

function remove(element, elClass) {
    element.classList.remove(elClass);
}

function styleDisplay(element, type) {
    element.style.display = type;
}

todoInput.addEventListener('keydown', event => {
    const isSpace = event.target.value.match(/^[ ]+$/);
    const removeSpace = event.target.value.replace(/^[ ]+$/, '');
    const keyName = event.key;

    if (isSpace) {
        event.target.value = removeSpace;

    } else if (keyName === 'Enter' && event.target.value !== '') {
        createTodo();
        event.target.value = '';

    } else if (keyName === 'Escape') {
        event.target.value = '';
        event.target.blur();
    }

});

function createTodo() {
    const fragmentList = document.createDocumentFragment();
    const todoContainer = document.createElement('li');
    const todoItem = document.createElement('div');
    const todoDesc = document.createElement('label');
    const todoEdit = document.createElement('div');
    const deleteBtn = document.createElement('button');

    todoItem.classList.add('todo-list__item');
    todoDesc.classList.add('todo-list__desc');
    todoEdit.classList.add('todo-list__edit');
    deleteBtn.classList.add('todo-list__delete');

    todoEdit.setAttribute('contenteditable', 'true');
    todoDesc.textContent = todoInput.value;

    appendElement(todoContainer, todoItem);
    appendElement(todoItem, todoDesc);
    appendElement(todoItem, deleteBtn);
    appendElement(fragmentList, todoContainer);
    appendElement(todoList, fragmentList);

    todoDesc.addEventListener('click', () => {
        toggle(todoDesc, 'done');
        toggle(todoContainer, 'done');
        styleDisplay(clearBtn, 'none');

        document.querySelectorAll('li.done').forEach(index => {
            if (index) styleDisplay(clearBtn, 'block');
        })
    });

    todoItem.addEventListener('dblclick', () => {
        todoEdit.textContent = todoDesc.textContent;
        todoItem.replaceChild(todoEdit, todoDesc);
        toggle(todoItem, 'item-edit');
        todoItem.removeChild(deleteBtn);
    });

    todoEdit.addEventListener('keydown', event => {
        const keyName = event.key

        if (keyName === 'Enter') {
            todoDesc.textContent = todoEdit.textContent;
            remove(todoItem, 'item-edit');
            todoItem.replaceChild(todoDesc, todoEdit);
            appendElement(todoItem, deleteBtn);
            todoEdit.remove();

        } else if (keyName === 'Escape') {
            remove(todoItem, 'item-edit');
            todoItem.replaceChild(todoDesc, todoEdit);
            appendElement(todoItem, deleteBtn);
            todoEdit.remove();
        }
    });

    todoItem.addEventListener('mouseenter', () => {
        styleDisplay(deleteBtn, 'block');
    });

    todoItem.addEventListener('mouseleave', () => {
        styleDisplay(deleteBtn, 'none');
    });

    deleteBtn.addEventListener('click', () => {
        todoContainer.remove();
        styleDisplay(clearBtn, 'none');

        document.querySelectorAll('li.done').forEach(index => {
            if (index) styleDisplay(clearBtn, 'block');
        })
    });

    allBtn.addEventListener('click', () => {
        styleDisplay(todoContainer, 'block');
        allBtn.classList.add('button-selected');
        completeBtn.classList.remove('button-selected');
        activeBtn.classList.remove('button-selected');
    })

    function checkContainerClass(elem) {
        elem ? styleDisplay(todoContainer, 'block')
            : styleDisplay(todoContainer, 'none');
    }

    activeBtn.addEventListener('click', () => {
        const isClass = todoContainer.classList.contains('done');
        checkContainerClass(!isClass);
        activeBtn.classList.add('button-selected');
        completeBtn.classList.remove('button-selected');
        allBtn.classList.remove('button-selected');
    });

    completeBtn.addEventListener('click', () => {
        const isClass = todoContainer.classList.contains('done');
        checkContainerClass(isClass);
        completeBtn.classList.add('button-selected');
        activeBtn.classList.remove('button-selected');
        allBtn.classList.remove('button-selected');

    });

    clearBtn.addEventListener('click', () => {
        document.querySelectorAll('li.done').forEach(index => {
            index.remove();
            styleDisplay(clearBtn, 'none');
        });
    });
}
