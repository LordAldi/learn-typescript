console.log("todoit");
let todoList: string[] = [];
console.log("Current todo list: ", todoList);

const todoInput: HTMLInputElement = document.getElementById(
  "todoInput"
) as HTMLInputElement;
const todoListDiv: HTMLDivElement = document.getElementById(
  "todoListContainer"
) as HTMLDivElement;

function addTodo(): void {
  // if we don't have the todo input
  if (todoInput == null) {
    console.error("The todo input is missing from the page!");
    return;
  }
  // get the value from the input
  const newTodo: string = todoInput.value;
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

function updateTodoList(): void {
  console.log("Updating the rendered todo list");
  todoListDiv.innerHTML = "";
  todoListDiv.textContent = ""; // Edge, ...​
  const ul = document.createElement("ul");
  ul.setAttribute("id", "todoList");
  todoListDiv.appendChild(ul);
  todoList.forEach((item) => {
    const li = document.createElement("li");
    li.setAttribute("class", "todo-list-item");
    li.innerHTML = `<a href='#' onclick='removeTodoListItem("${item}")'>${item}</a>;`;
    ul.appendChild(li);
  });
}

function filterTodoList(): void {
  console.log("Filtering the rendered todo list");
  const todoListHtml: HTMLUListElement = document.getElementById(
    "todoList"
  ) as HTMLUListElement;
  if (todoListHtml === null) {
    console.log("Nothing to filter");
    return;
  }
  const todoListFilter = document.getElementById(
    "todoFilter"
  ) as HTMLInputElement;
  const todoListFilterText = todoListFilter.value.toUpperCase();
  todoListHtml.childNodes.forEach((item) => {
    let itemText: string | null = item.textContent;
    if (itemText !== null) {
      itemText = itemText.toUpperCase();
      if (itemText.startsWith(todoListFilterText)) {
        (item as HTMLLIElement).style.display = "list-item";
      } else {
        (item as HTMLLIElement).style.display = "none";
      }
    }
  });
}

function removeTodoListItem(itemToRemove: string): void {
  console.log("item to remove: ", itemToRemove);
  todoList = todoList.filter((value: string, _index, _array) => {
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
