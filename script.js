// localStorage.clear()
let currentPage = 'projects'
let id = 0


// ==================removes the loader spinner and loads the App.====================
const loadComponents = () => {
    $('.loader').removeClass('d-flex')
    $('.loader').addClass('none')
    $('.app').removeClass('none')
    $('.app').addClass('d-flex')
}

// ============ Checks for small screen size on load and hides the side bar==============
const checkScreenSize = () => {
    let screenSize = $(window).width();
    if (screenSize < 768) {
        $('.side-nav').addClass('none')
    }
}

// ===========Function for adding task ===================================
const addTask = (title, content, date) => {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let id = JSON.parse(localStorage.getItem("id") || 0)
    let task = {
        title,
        content,
        date,
        id,
        category: "ongoing",
        // Category is ongoing by default.
    }

    if (tasks.length == 0) {
        $('.no-task').addClass('none')
        $('.all-tasks').removeClass('none')
        appendTask(task.title, task.content, task.category, task.date, id)
    } else {
        appendTask(task.title, task.content, task.category, task.date, id)
    }
    id++
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('id', JSON.stringify(id))

}

const setPage = (page) => {
    $(`#${currentPage}`).removeClass("active-link")
    $(`.${currentPage}`).addClass("none")
    $(`.${page}`).removeClass('none')
    $(`#${page}`).addClass('active-link')
    currentPage = page
}


const appendTask = (title, content, category, date, id) => {
    let card = document.createElement('div')
    card.className = 'card text-center mb-3'
    let cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    let cardTitle = document.createElement('h5')
    cardTitle.innerHTML = `${title}`
    cardTitle.className = 'card-title mt-2'
    let cardText = document.createElement('p')
    cardText.innerHTML = `${content}`
    cardText.className = 'card-text ps-2'
    let cardButton = document.createElement('button')
    cardButton.className = 'card-button btn btn-secondary my-2'
    cardButton.innerHTML = 'delete'
    cardButton.setAttribute("id", `${id}`);


    let cardFooter = document.createElement('div')
    cardFooter.className = 'card-footer text-muted'
    cardFooter.innerHTML = `${date}`


    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(cardFooter)
    cardBody.appendChild(cardButton)

    card.appendChild(cardBody)

    if (category == 'ongoing') {
        cardBody.className = 'bd-blue'
        document.querySelector('.ongoing').appendChild(card)
    } else if (category == 'completed') {
        cardBody.className = 'bd-green'
        document.querySelector('completed').appendChild(card)

    } else {
        document.querySelector('.elapsed').appendChild(card)
        cardBody.className = 'bd-red'
    }
}

const loadTasks = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (tasks.length == 0) {
        $('.all-tasks').addClass('none')
        $('.no-task').removeClass('none')
    } else {
        tasks.forEach(task => {
            appendTask(task.title, task.content, task.category, task.date, task.id)
        });
    }
}

setTimeout(loadComponents, 1500)
loadTasks()


checkScreenSize()

let navButtons = document.querySelectorAll('.nav-btn');
for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function() {
        setPage($(this).attr('id'));
        checkScreenSize()
    });
}



$('.toggler').on('click', function() {
    if (document.querySelector('.side-nav').classList.contains('none')) {
        $('.side-nav').removeClass('none')
    } else {
        $('.side-nav').addClass('none')
    }
})
$('.cancel').on('click', function() {
    $('.side-nav').addClass('none')
})


$('.add-btn').click(() => {
    setPage('create-task')
})

$('.search-icon').click(() => {

    let searched = document.getElementById('search').value;
    console.log(searched)
    document.querySelector('.searched').innerHTML = ''
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (tasks.length == 0) {
        alert('task empty')
    } else {
        $('.all-tasks').addClass('none')
        $('.searched-task').removeClass('none')
        let searchedTasks = tasks.filter(task => task.title.toUpperCase().includes(searched.toUpperCase()))
        if (searchedTasks.length == 0) {
            let title = document.createElement('h2')
            title.innerHTML = 'No task found'
            title.className = 'mt-2'
            document.querySelector('.searched').appendChild(title)
        } else {
            console.log(searchedTasks)
            searchedTasks.forEach(task => {
                let card = document.createElement('div')
                card.className = 'card text-center mb-3'
                let cardBody = document.createElement('div')
                cardBody.className = 'card-body'
                let cardTitle = document.createElement('h5')
                cardTitle.innerHTML = `${task.title}`
                cardTitle.className = 'card-title mt-2'
                let cardText = document.createElement('p')
                cardText.innerHTML = `${task.content}`
                cardText.className = 'card-text ps-2'
                let cardButton = document.createElement('button')
                cardButton.className = 'card-button btn btn-secondary my-2'
                cardButton.innerHTML = 'delete'
                cardButton.setAttribute("id", `${task.id}`);


                let cardFooter = document.createElement('div')
                cardFooter.className = 'card-footer text-muted'
                cardFooter.innerHTML = `${task.date}`


                cardBody.appendChild(cardTitle)
                cardBody.appendChild(cardText)
                cardBody.appendChild(cardFooter)
                cardBody.appendChild(cardButton)

                card.appendChild(cardBody)
                document.querySelector('.searched').appendChild(card)
            });
        }
    }
})
$('.back').click(() => {
    $('.all-tasks').removeClass('none')
    $('.searched-task').addClass('none')
    document.getElementById('search').value = ''
})

$('#add-task').click(() => {
    let title = document.getElementById("title").value;
    let task = document.getElementById("task").value;
    let date = document.getElementById('date').value;

    // let convertedDate = new Date(date).getTime()
    // console.log(convertedDate)

    // presentDate = new Date().getTime()
    // console.log(presentDate)

    if (title == "" || task == "" || date == "") {
        alert('Task cant be empty')
    } else {

        addTask(title, task, date)
        document.getElementById("title").value = ''
        document.getElementById("task").value = ''
        setPage('projects')
    }

})

$('.ongoing').on('click', '.card-button', function() {
    let isDeleted = confirm('Are you sure you want to delete this task')
    if (isDeleted) {
        let cardBody = $(this).parent()
        let card = cardBody.parent()
        card.remove()
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        filteredTask = tasks.filter(task => task.id != this.id)
        localStorage.setItem('tasks', JSON.stringify(filteredTask))
        if (filteredTask.length == 0) {
            $('.all-tasks').addClass('none')
            $('.no-task').removeClass('none')
        }
    }
})






// Things to work on
// 1. A user shouldnt be able to put a date that is past when adding a new task
// 4. Uodating the category of the tasks, if the task has elapsed before adding it to the DOM


// const date1 = new Date('7/13/2010');
// const date2 = new Date('12/15/2010');
// const diffTime = Math.abs(date2 - date1);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log(diffTime + " milliseconds");
// console.log(diffDays + " days");