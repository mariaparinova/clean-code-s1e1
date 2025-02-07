var taskInput = document.getElementById("new-task");
var addButton = document.querySelector(".task__btn_add");
var uncompletedTasks = document.getElementById("uncompleted");
var completedTasks = document.getElementById("completed");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task__label";

  listItem.className = "task__item";

  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  editInput.type = "text";
  editInput.className = "task__input task__input_new-task";

  editButton.innerText = "Edit";
  editButton.className = "task__btn task__btn_edit";

  deleteButton.className = "task__btn task__btn_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "task__icon";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask = function() {
  if (!taskInput.value) {
    return;
  }

  var listItem = createNewTaskElement(taskInput.value);

  uncompletedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".task__input");
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".task__btn_edit");
  var containsClass = listItem.classList.contains("tasks__item_edit-mode");

  if(containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("tasks__item_edit-mode");
};

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

var taskCompleted = function() {
  var listItem = this.parentNode;

  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskUncompleted);
}

var taskUncompleted = function() {
  var listItem = this.parentNode;

  uncompletedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector(".task__btn_edit");
  var deleteButton = taskListItem.querySelector(".task__btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < uncompletedTasks.children.length; i++) {
  bindTaskEvents(uncompletedTasks.children[i], taskCompleted);
}

for (var i = 0; i < completedTasks.children.length; i++) {
  bindTaskEvents(completedTasks.children[i], taskUncompleted);
}