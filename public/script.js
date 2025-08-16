let taskList = document.getElementById('taskList');
// S: adding dark theme
let darkbtn = document.getElementById('darkbtn');

darkbtn.addEventListener('click',(ev)=>{
    let darkbtn = document.getElementById('darkbtn');
    darkbtn.classList.toggle('darkbtnC1');
    darkbtn.classList.toggle('darkbtnC2');
    document.body.classList.toggle('dark');
})

let taskCategory = 'All';

function refreshTodos(){
    axios.get('todos')
        .then(res=>{
            // console.log(res.data);
            taskList.innerHTML = '';
            let list = res.data;
            let filteredTodos = [];
            if(taskCategory == 'All'){
                filteredTodos = list;
            }
            else if(taskCategory == 'Active'){
                filteredTodos = list.filter( d => !d.completed )
            }
            else if(taskCategory == 'Completed'){
                filteredTodos = list.filter( d => d.completed )
            }

            filteredTodos.forEach((d,i) => {
                let li = document.createElement('li');
                li.innerHTML = `
                    <span id="taskName">${d.task}</span>
                    <span style="display:none" id="idOfTask">${d.id}</span>
                    <div class="itemButtons">
                    <button class="${(d.completed)?"redButton":"greenButton"}" id="statusButton">${ (d.completed) ? "Undo" : "Complete" }</button>
                    <button class="greenButton">Edit</button>
                    <button class="greenButton">Delete</button>
                    </div>                    
                `;
                // console.log(li);
                taskList.appendChild(li);
            });
            
        })
        .catch(err=>{
            console.log(err.message);
        })
}


window.addEventListener('load',()=>{
    refreshTodos();
})

let addTaskbtn = document.getElementById('addTaskbtn');
let inputTask = document.getElementById('inputBar');
let listOptions = document.querySelector('.taskcategory');
let clearButton = document.getElementById('clearCompleted');
// import Sortable from 'sortablejs';

function addTask() {
    let taskName = inputTask.value.trim();
    inputTask.value = "";
    if (taskName === "") {
        alert('Enter a valid task!!');
        return;
    }

    axios.post('/todos', { task: taskName })
        .then(res => {
            refreshTodos();
        })
        .catch(err => {
            console.log(err.message);
        });
}

// ✅ Click event on button
addTaskbtn.addEventListener('click', addTask);

// ✅ Enter key event on input field
inputTask.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

listOptions.addEventListener('click',(ev)=>{
    if(ev.target.tagName == 'BUTTON'){
        let initialTaskCategory = taskCategory; // current category stored
        taskCategory = ev.target.innerText; // new selected category stored

        if(initialTaskCategory != taskCategory){
            
        let buttons = listOptions.querySelectorAll('button');

        buttons.forEach((d,i)=>{
            if(d.innerText == initialTaskCategory){
                d.classList.remove('activeCategory'); // d.classList = '' ;
            }
            else if(d.innerText == taskCategory){
                d.classList.add('activeCategory');
            }
        } )

        refreshTodos();
        }
    }
    else return;
})

taskList.addEventListener('click',(ev)=>{
    let clickedBtn = ev.target;
    if(clickedBtn.tagName == 'BUTTON'){
        if(clickedBtn.innerText == 'Delete'){
            let id = clickedBtn.parentElement.parentElement.querySelector('#idOfTask').innerText;
            axios.delete( '/todos' , { data: {'id': id} } )
            .then(res=>{
                console.log(res.data.message);
                refreshTodos();
            })
            .catch(err=>{
                console.log(err.message);
            })
        }

        else if(clickedBtn.innerText == 'Complete'){
            let id = clickedBtn.parentElement.parentElement.querySelector('#idOfTask').innerText;
            axios.put('/todos', {'id': id})
            .then(res=>{
                console.log(res.data.message);
                refreshTodos();
            })
            .catch(err=>{
                console.log('hello',err.message);
            })
        }

        else if(clickedBtn.innerText == 'Undo'){
            let id = clickedBtn.parentElement.parentElement.querySelector('#idOfTask').innerText;
            axios.put('/todos', {'id': id})
            .then(res=>{
                console.log(res.data.message);
                refreshTodos();
            })
            .catch(err=>{
                console.log(err.message);
            })
        }
        else if(clickedBtn.innerText == 'Edit'){
            let id = clickedBtn.parentElement.parentElement.querySelector('#idOfTask').innerText;
            let userInput = prompt('Enter updated task name!!');
            userInput = userInput.trim();
            if(userInput == ''){
                alert('enter valid task!!');
            }
            else{
                axios.put('/todos/edit', {id: id, newName: userInput})
                .then(res=>{
                console.log(res.data.message);
                refreshTodos();
                })
                .catch(err=>{
                    console.log(err.message);
                })
            }
        }
    }
    else{
        return;
    }
})

clearButton.addEventListener('click',(ev)=>{
    console.log(ev.target);
    axios.get('/todos')
    .then(res=>{
        let list = res.data;
        list.forEach((d)=>{
            console.log(d.completed);
            if(d.completed == true){
            console.log('testing');
            axios.delete('/todos', { data: {'id': d.id} })
            .then(res=>{
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err.message);
            })
            }
        })
        refreshTodos();
    })
    .catch(err=>{
        console.log(err.message);
    })
})

document.addEventListener("DOMContentLoaded", function () {
  new Sortable(taskList, {
    animation: 150,       // smooth movement in px
    ghostClass: "ghost",  // optional class for dragged element
    onEnd: function (evt) {
    console.log("Item reordered!");
    // Code to track new order or sync with backend
    let newOrdered = [];
    let lis = Array.from(taskList.getElementsByTagName('li'));

    lis.forEach(li=>{
        // console.log(li);
        newOrdered.push({
            task: li.querySelector('#taskName').innerText,
            id: li.querySelector('#idOfTask').innerText,
            status: (li.querySelector('#statusButton').innerText == 'Undo')? true : false 
        })
    })

    console.log(newOrdered);
    }
  });

});

//to do: mongoose implementation and homework of core mongo db tabler od. entors and from L28 to L33

refreshTodos();