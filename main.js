// document onload event
document.getElementsByTagName('body')[0].addEventListener("load", showtasks());

// function to create new task
function newtask(name, duedate, desc) {
    // creating task name for key in localstorage
    let noOfTask = parseInt(localStorage.getItem('totalTask'));
    noOfTask += 1;
    let taskname = "task" + noOfTask;
    console.log(noOfTask);
    // creating task object 
    task = {};
    task.name = name;
    task.deadline = duedate;
    task.desc = desc;
    // storing task in string format to local storage
    task = JSON.stringify(task);
    localStorage.setItem(taskname, task);
    localStorage.setItem('totalTask', noOfTask);
    return task;
};

// function to display task on webpage 
function displaytask (task) {
    let parentel = document.querySelector('.tasks');
    // creating t div element
    let card = document.createElement('div');
    card.className = 't';
    // create h1 element and append it to 't'.
    let cardheading = document.createElement('h1');
    cardheading.appendChild(document.createTextNode(task.name));
    card.appendChild(cardheading);

    // create deadline div and append to 't'.
    // preparing strings for html textnode
    let deadline = `Due: ${task.deadline}`;
    let carddeadline = document.createElement('div');
    carddeadline.className = 'deadline';
    carddeadline.appendChild(document.createTextNode(deadline));
    card.appendChild(carddeadline);

    // create update div and append it to 't'.
    let cardupdate = document.createElement('div');
    cardupdate.className = 'update';
    cardupdate.appendChild(document.createTextNode(deadline));
    card.appendChild(cardupdate);

    // create desc div and append it to 't'.
    let carddesc = document.createElement('div');
    carddesc.className = 'desc';
    carddesc.appendChild(document.createTextNode(task.desc));
    card.appendChild(carddesc);
    
    // append the overall element to already present grand-parent
    // element on html
    parentel.appendChild(card);
};

// Expanding task card
document.querySelectorAll(".t").forEach(item => {
    item.addEventListener('click', function() {
        if (this.style.maxHeight == "4em") {
            this.style.maxHeight = "8em";
            this.children[3].style.zIndex = "1";
        }
        else {
            this.style.maxHeight = "4em";
            this.children[3].style.zIndex = "-1";
        }
    })
});

// function to show all tasks 
function showtasks() {
    let totaltask = localStorage.getItem('totalTask');
    if (totaltask >= 1) {
        for (let index = 1; index <= totaltask; index++) {
            let task = JSON.parse(localStorage.getItem(("task"+index)));
            displaytask(task); 
        }
    } else {
        localStorage.setItem('totalTask', 0);
        // alert("No tasks available to show. Please create one by clicking on New button");
    }
};
// displaying new task form.
document.querySelector('.menu button:first-child').addEventListener('click', function () {
    document.querySelector('.newtask').style.zIndex = "2";
});

// Submit new task event
document.querySelector('.submittask').addEventListener('click', function() {
    let taskcontainer = document.querySelector('.newtask');
    let name = taskcontainer.children[0].value;
    let deadline = taskcontainer.children[2].value;
    let desc = taskcontainer.children[4].value;
    let status = "";
    for (let index = 0; index < 6; index=index+2) {
        if (!(taskcontainer.children[index].value)) {
            taskcontainer.children[index+1].innerHTML = "Provide valid input.";
            status = "notok";
        } else {
            taskcontainer.children[index+1].innerHTML = "";
            status = "ok"
        }
    };
    if(status == "ok") {
        let newtaskadd = newtask(name, deadline, desc);
        document.querySelector('.newtask').style.zIndex = "-1";
        location.reload();
    } else {
        console.log("Something went wrong");
    } 
});


// function showlocalstore() {
//     var keys = Object.keys(localStorage),
//         i = keys.length;
//     while (i--) {
//         console.log(keys[i]);
//     }
// }