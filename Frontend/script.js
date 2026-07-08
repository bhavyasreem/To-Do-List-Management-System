const API_URL = "http://127.0.0.1:8000";

// Load tasks when page loads
window.onload = function () {
    loadTasks();
};

// -------------------- Load All Tasks --------------------
function loadTasks() {

    fetch(API_URL + "/tasks/")
        .then(response => response.json())
        .then(data => {

            let output = "";

            data.forEach(task => {

                output += `
                    <div class="card">
                        <h3>${task.title}</h3>

                        <p><b>Description:</b> ${task.description}</p>

                        <p><b>Priority:</b> ${task.priority}</p>

                        <p><b>Status:</b> ${task.status}</p>

                        <button onclick="updateTask('${task._id}')">
                            Update
                        </button>

                        <button onclick="deleteTask('${task._id}')">
                            Delete
                        </button>

                    </div>
                `;
            });

            document.getElementById("taskList").innerHTML = output;

        })
        .catch(error => console.log(error));
}

// -------------------- Add Task --------------------
function addTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;

    fetch(API_URL + "/tasks/add/", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            description: description,
            priority: priority,
            status: status
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("status").value = "";

        loadTasks();

    })

    .catch(error => console.log(error));
}

// -------------------- Delete Task --------------------
function deleteTask(id) {

    fetch(API_URL + "/tasks/delete/" + id + "/", {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        loadTasks();

    })

    .catch(error => console.log(error));
}

// -------------------- Update Task --------------------
function updateTask(id) {

    const title = prompt("Enter New Title");
    const description = prompt("Enter New Description");
    const priority = prompt("Enter Priority (High/Medium/Low)");
    const status = prompt("Enter Status (Pending/Completed)");

    if (!title || !description || !priority || !status) {
        alert("All fields are required!");
        return;
    }

    fetch(API_URL + "/tasks/update/" + id + "/", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            description: description,
            priority: priority,
            status: status
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        loadTasks();

    })

    .catch(error => console.log(error));
}