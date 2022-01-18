const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value; // Getting user input value.
  if(userData.trim() != 0){  // if users value ain't only spaces
    addBtn.classList.add("active"); // activating the buttton
  }else{
      addBtn.classList.remove("active"); // de-activating the buttton
  }
}

//showTasks(); // calling showTask function

// When user click buttons.
addBtn.onclick = () =>{
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if(getLocalStorage == null){
    listArr = []; // creating a blank Array.
  }else{
      listArr = JSON.parse(getLocalStorage); // transfering JSON string into js object
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // transfering js object into a JSON string
  showTasks(); // calling showTask function
  addBtn.classList.remove("active")
}

// function to add task list inside ul
function showTasks(){
  let getLocalStorage = localStorage.getItem("New Todo")
  if(getLocalStorage == null){
    listArr = []; // creating a blank Array.
  }else{
    listArr = JSON.parse(getLocalStorage) // transfering JSON string into js object
  }

  const pendingNumber = document.querySelector(".pendingNumber");
  pendingNumber.textContent = listArr.length;
  if(listArr.length > 0){
    deleteAllBtn.classList.add("active"); // activate the clearall button
  }else{
    deleteAllBtn.classList.remove("active"); // de-activate the clearall button

  }
  let newLiTag = '';
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
  inputBox.value = ""; // leave the input field blank after adding a task.
}

// function to delete task
function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); // delete a particular indexed li

  // after deleteing the li, update the localStorage
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

// delete all task function
deleteAllBtn.onclick = ()=>{
  listArr = [] // empting the array
  // after deleteing all tasks, update the localStorage
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();

}

