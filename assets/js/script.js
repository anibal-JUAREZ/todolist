//Variables's declarations
let btnAdd;
let taskInformation;
let listOfTasks;
let allTrash;
let allEdits;
let allChecks;
let itemToEdit;
let allTasks=[];
let btnSave;
let btnDelete;
let btnDownload;


//getting HTML elements

taskInformation=document.getElementById('one-task');
btnAdd=document.getElementById('btn-add');
listOfTasks=document.getElementById('content');
btnSave=document.getElementById('save-btn');
btnDelete=document.getElementById('delete-btn');
btnDownload=document.getElementById('download-btn');


//deleting any information from input
taskInformation.value="";

//adding event listeners

btnAdd.addEventListener('click',addOneTask);
btnSave.addEventListener('click',saveToDoList);
btnDelete.addEventListener('click',DeleteToDoList);
btnDownload.addEventListener('click',DownloadToDoList);


/**
 * function to save the to-do list in localstorage
 */
function saveToDoList(){

    if(allTasks.length>0){
        localStorage.setItem("to-do-list",JSON.stringify(allTasks));
        listOfTasks.innerHTML="";
        alert('To-do list saved');
        DownloadToDoList();
    }else{
        alert('At least a task may be added in the to-do list');
    }

}
/**
 * deleting the to-do list
 */
function DeleteToDoList(){
    let confirmDeletingList=confirm("Do you really want to delete the to-do list?")
    if(confirmDeletingList==true){
        localStorage.removeItem('to-do-list');
        allTasks=[];
        listOfTasks.innerHTML="";

    }
}

/**
 * downloading to do list
 */
function DownloadToDoList(){

    let getToDoList=JSON.parse(localStorage.getItem('to-do-list'));
    if(getToDoList){
        allTasks=getToDoList;
        showAllTheTasks();
    }else{
        alert('There is no to-do list saved')
    }
    

}
//showing to do list saved anytime the page is refreshed
DownloadToDoList();

/**
 * add a task inside of the to-do list
 * 
 */
function addOneTask(){
    if(taskInformation.value != ""){
        console.log(btnAdd.getAttribute('data-function'));
        if(btnAdd.getAttribute('data-function')=='add'){
            
            let task={
                task:taskInformation.value,
                status:'noncompleted'
            }
            allTasks.push(task);
            taskInformation.value="";
            showAllTheTasks();

        }else{
            console.log(taskInformation.value);
            allTasks[itemToEdit].task=taskInformation.value;
            console.log(allTasks);
            taskInformation.value="";
            showAllTheTasks();
            btnAdd.dataset.function="add";
            btnAdd.textContent="ADD";

        }
        
        
    }else{
        alert('You must write a task');
    }
}


/**
 * change the status of a task
 * @param {event} e 
 */
function changeTheStatus(e){
    //getting the current check icon
    let currentIcon=e.currentTarget;
    
    let item=currentIcon.getAttribute('data-item');
    
    
    
    
   
    if(allTasks[item].status=='noncompleted'){
        allTasks[item].status="completed";
    }
    else{
        allTasks[item].status="noncompleted";
    }
   
    //calling the function to show the last changes
    showAllTheTasks();
    
}


/**
 * deleting a task
 * @param {event} e 
 */
function deleteTask(e){

    //asking confirmation to delete the task

    let confirmDeletingTask=confirm("Do you really want to delete this task?")
    if(confirmDeletingTask==true){
        //getting the current trash icon
        let currentIcon=e.currentTarget;
        //getting the item inside the array to delete it
        let item=currentIcon.getAttribute('data-item');
    
        allTasks.splice(item,1);
        showAllTheTasks();

    }
    
}

/**
 * editing an existing task
 * @param {event} e 
 */
function modifyTask(e){
    let currentIcon=e.currentTarget;
    
    let item=currentIcon.getAttribute('data-item');
    taskInformation.value=allTasks[item].task;
    //change data-attribute and the content from add button

    btnAdd.dataset.function="edit";
    btnAdd.textContent="EDIT";

    //saving the item to edit
     itemToEdit=item;

}

/**
 * function to show every task written by the user 
 */
function showAllTheTasks(){
    let classCompleted;
    let classChecked;
    listOfTasks.innerHTML="";
    allTasks.forEach((oneTask, index)=>{
        if(oneTask.status=="completed"){
            classCompleted="completed";
            classChecked="checked"
        }else{
            classCompleted="";
            classChecked="";
        }
        listOfTasks.innerHTML +=`
            <div class="d-flex justify-content-center align-items-center mt-4">
                <p class="col ${classCompleted} font-size" data-item="${index}">${oneTask.task}</p>
                <div class="d-flex">
                    <i  data-item="${index}" class="fas fa-check check-in mr-4 ${classChecked}"></i>
                    <i data-item="${index}" class="fas fa-edit btn-edit"></i>
                    <i  data-item="${index}" class="fas fa-trash trash-can"></i>
                <div>
            </div>

        `
        })

    //getting all the trash's icons

    allTrash=document.querySelectorAll('.trash-can');
    allTrash.forEach(oneTrashIcon=>{
        oneTrashIcon.addEventListener('click',deleteTask)
    })

    // getting all the Check's icons

    allChecks=document.querySelectorAll('.check-in');
    allChecks.forEach(oneCheck=>{
        oneCheck.addEventListener('click',changeTheStatus)
    })

    //getting all the edit's icons
    allEdits=document.querySelectorAll('.btn-edit');
    allEdits.forEach(oneEdit=>{
        oneEdit.addEventListener('click',modifyTask)
    })


}




