const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners

loadEventListeners();

// Load all event Listerners

function loadEventListeners() {
  // DOM Load event. This is to enable all saved items to the local storage to display in the UI
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add Task event
  form.addEventListener("submit", addTask);

  // Remove Task event
  taskList.addEventListener("click", removeTask);

  // clear Taskevent
  clearBtn.addEventListener("click", clearTasks);

  // Filter task
  filter.addEventListener("keyup", filterTasks);
}

// Get TAsk from Local Storage
function getTasks() {
  let tasks;
  // Check if there is a task in the local storage
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //To loop through each task that are in there using the forEach Loop
  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement("li");

    //Add a class
    li.className = "collection-item";

    //create text node and append to the li
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement("a");

    //Add class
    link.className = "delete-item secondary-content";

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}

//Add all task

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //Create li element
  const li = document.createElement("li");

  //Add a class
  li.className = "collection-item";

  //create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create new link element
  const link = document.createElement("a");

  //Add class
  link.className = "delete-item secondary-content";

  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  // Tos store task in local storage i.e to th window's storage

  storeTaskInLocalStorage(taskInput.value);

  //Clear the input
  taskInput.value = "";

  e.preventDefault();
}

// Store task

function storeTaskInLocalStorage(task) {
  // initialize a variable called tasks
  let tasks;
  // Check if there is a task in the local storage
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Now add the task to the storage with the push function

  tasks.push(task);

  // Now set it back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove task. In this delegation method will be used beacuse there will be lots of listed items, and the remove function needs to be dynamic in order to remove any selected task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure? ")) {
      e.target.parentElement.parentElement.remove(); // This will remove the parentElement of the the parentelement (i.e, a < li )

      // Remove task fro local task
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Function to remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // Check if there is a task in the local storage
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //Loop through task and romove using index

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear task function

function clearTasks(e) {
  // // using innerHTML method,

  // taskList.innerHTML = "";

  // To confirm before clearing

  // if (confirm("Are you sure you want to clear all?")) {
  //   taskList.innerHTML = "";
  // }

  // Using removeChild method by loopig through the firstchild. This means the clear butto should work in
  // as much theres still something in the formm. This method actuall removes items faster

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from local storage

  clearTasksFromLocalStorage();
}

// function to clear from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter Tasks
function filterTasks(e) {
  // Get whatever is being typed in here
  const text = e.target.value.toLowerCase(); // The tex being typed

  //To get all the list items and loop through using foreach because queryselectore returns a  node list

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) !== -1) {
      // the "text is passed here"
      task.style.display = "block"; // This will display the text being typed if it tallies with what is being typed
    } else {
      task.style.display = "none"; //this will not display if the task is not available.
    }
  });
}
