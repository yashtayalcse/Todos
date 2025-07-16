let input = document.querySelector('input');
let addTaskButton = document.getElementById('addTaskButton');
let list = document.getElementById('taskList');

function addTaskToList(){
    let inputText = input.value.trim();
    input.value = "";
    if(inputText != ""){
        let li = document.createElement('li');

        //create li's inner elements
        let span = document.createElement('span');
        let b1 = document.createElement('button');
        let b2 = document.createElement('button');
        let b3 = document.createElement('button');
        let b4 = document.createElement('button');

        //now add content of these elements
        span.innerText = inputText;
        b1.innerText = '↑';
        b2.innerText = '↓ ';
        b3.innerText = '❌ ';
        b4.innerText = '♻️ ';

        //add classes to these these items of li
        b1.classList.add('increase-priority');
        b2.classList.add('decrease-priority');
        b3.classList.add('delete-task');
        b4.classList.add('update-task');

        //add elements to li
        li.appendChild(span);
        li.appendChild(b1);
        li.appendChild(b2);
        li.appendChild(b3);
        li.appendChild(b4);

        //add li to taskList
        list.appendChild(li)
    }

    else{
        alert('Give task to add');
    }
}

function increase_priority(clicked_task){
    let higherSibling = clicked_task.previousElementSibling;
    if(higherSibling==null) return;

    let t1 = clicked_task.querySelector('span').innerText;
    let t2 = higherSibling.querySelector('span').innerText;
        
    let temp = t1;
    clicked_task.querySelector('span').innerText = t2;
    higherSibling.querySelector('span').innerText = temp;
}

function decrease_priority(clicked_task){
    let lowerSibling = clicked_task.nextElementSibling;
    if(lowerSibling==null) return;

    let t1 = clicked_task.querySelector('span').innerText;
    let t2 = lowerSibling.querySelector('span').innerText;
        
    let temp = t1;
    clicked_task.querySelector('span').innerText = t2;
    lowerSibling.querySelector('span').innerText = temp;
}

function update_task(clicked_task){
    let updated_task = input.value.trim();
    input.value = "";
    if(updated_task!= ""){
        clicked_task.querySelector('span').innerText = updated_task;
    }
    else{
        alert('Give task to update');
    }
}

addTaskButton.addEventListener('click',(ev)=>{
    addTaskToList();
})

list.addEventListener('click',(ev)=>{
    let clicked_button = ev.target;
    let clicked_task = clicked_button.parentElement;
    //handle one of ↑ ↓ ❌ ♻️
    if(clicked_button.classList.contains('increase-priority')){
        increase_priority(clicked_task);
    }
    else if(clicked_button.classList.contains('decrease-priority')){
        decrease_priority(clicked_task);
    }
    else if(clicked_button.classList.contains('delete-task')){
        clicked_task.remove();
    }
    else if(clicked_button.classList.contains('update-task')){
        update_task(clicked_task);
    }
})