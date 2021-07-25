"use strict";
console.log("todoit");
var todoList = [];
console.log("Current todo list: ", todoList);
var todoInput = document.getElementById("todoInput");
var todoListDiv = document.getElementById("todoListContainer");
function addTodo() {
    // if we don't have the todo input
    if (todoInput == null) {
        console.error("The todo input is missing from the page!");
        return;
    }
    // get the value from the input
    var newTodo = todoInput.value;
    // verify that there is text
    if ("" !== newTodo.trim()) {
        console.log("Adding todo: ", newTodo);
        // add the new item to the list
        todoList.push(newTodo);
        console.log("New todo list: ", todoList);
        // clear the input
        todoInput.value = "";
    }
    // keep the list sorted
    todoList.sort();
    // update the todo list
    updateTodoList();
    // apply the todo list filter
    filterTodoList();
}
function updateTodoList() {
    console.log("Updating the rendered todo list");
    todoListDiv.innerHTML = "";
    todoListDiv.textContent = ""; // Edge, ...​
    var ul = document.createElement("ul");
    ul.setAttribute("id", "todoList");
    todoListDiv.appendChild(ul);
    todoList.forEach(function (item) {
        var li = document.createElement("li");
        li.setAttribute("class", "todo-list-item");
        li.innerHTML = "<a href='#' onclick='removeTodoListItem(\"" + item + "\")'>" + item + "</a>;";
        ul.appendChild(li);
    });
}
function filterTodoList() {
    console.log("Filtering the rendered todo list");
    var todoListHtml = document.getElementById("todoList");
    if (todoListHtml === null) {
        console.log("Nothing to filter");
        return;
    }
    var todoListFilter = document.getElementById("todoFilter");
    var todoListFilterText = todoListFilter.value.toUpperCase();
    todoListHtml.childNodes.forEach(function (item) {
        var itemText = item.textContent;
        if (itemText !== null) {
            itemText = itemText.toUpperCase();
            if (itemText.startsWith(todoListFilterText)) {
                item.style.display = "list-item";
            }
            else {
                item.style.display = "none";
            }
        }
    });
}
function removeTodoListItem(itemToRemove) {
    console.log("item to remove: ", itemToRemove);
    todoList = todoList.filter(function (value, _index, _array) {
        if (value === itemToRemove) {
            return false;
        }
        return true;
    });
    // unsafe alternative: todoList.splice(...​)
    // update the todo list
    updateTodoList();
    // apply the todo list filter
    filterTodoList();
}
//# sourceMappingURL=todo-it.js.map