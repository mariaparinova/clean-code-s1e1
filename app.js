var newTaskInputElement = document.getElementById("new-task");
var addButtonElement = document.body.querySelector(".tasks-container__item_new-task").querySelector(".tasks-container__btn");
var incompleteTasksElement = document.getElementById("uncompleted");
var completedTasksElement = document.getElementById("completed");

var createNewTaskElement = function(str) {
  var taskItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var input = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  taskItem.className = "tasks-container__item";

  label.innerText = str;
  label.className = "tasks-container__label";

  checkBox.type = "checkbox";
  checkBox.className = "tasks-container__checkbox";

  input.type = "text";
  input.className = "tasks-container__input";

  editButton.innerText = "Edit";
  editButton.className = "tasks-container__btn tasks-container__btn_edit";

  deleteButtonImg.className = "tasks-container__icon";

  deleteButton.className = "tasks-container__btn tasks-container__btn_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(input);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

var addTask = function() {
  if (!newTaskInputElement.value) {
    return;
  }

  var listItem = createNewTaskElement(newTaskInputElement.value);

  incompleteTasksElement.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInputElement.value = "";
}

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".tasks-container__input");
  var label = listItem.querySelector(".tasks-container__label");
  var editBtn = listItem.querySelector(".tasks-container__btn_edit");
  var containsClass = listItem.classList.contains("tasks-container__item_editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText="Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle( "tasks-container__item_editMode" );
};

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild( listItem );
}

var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksElement.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksElement.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButtonElement.onclick = addTask;
addButtonElement.addEventListener("click", addTask);
addButtonElement.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector(".tasks-container__btn_edit");
  var deleteButton = taskListItem.querySelector(".tasks-container__btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTasksElement.children.length; i ++){
  bindTaskEvents(incompleteTasksElement.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksElement.children.length; i++){
  bindTaskEvents(completedTasksElement.children[i], taskIncomplete);
}