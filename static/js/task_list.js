// eslint-disable-next-line no-undef
const taskList = document.getElementById('task-list');
// eslint-disable-next-line no-undef
const taskTitle = document.getElementById('task-title');
// eslint-disable-next-line no-undef
const taskExpiration = document.getElementById('task-expiration');
// eslint-disable-next-line no-undef
const taskDescription = document.getElementById('task-description');

function getToken() {
  // eslint-disable-next-line no-undef
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === "token") {
      return decodeURIComponent(cookieValue);
    }
  }
}

async function getTaskDetails(taskID, token) {
  try {
    const response = await fetch('http://localhost:3000/task/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "token " + token,
      },
      body: JSON.stringify({ task_id: taskID })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayTaskDetails(taskId) {
  const taskDetails = await getTaskDetails(taskId);
  if (!taskDetails) return;
  taskTitle.textContent = `Title: ${taskDetails.title}`;
  taskExpiration.textContent = `Expiration Date: ${taskDetails.expiration}`;
  taskDescription.textContent = `Description: ${taskDetails.description}`;
}

async function getAllTasks(ownerID, token) {
    try {
        const response = await fetch('http://localhost:3000/task/read-all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "token" + token,
          },
          body: JSON.stringify({ owner_id: ownerID }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch task details');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Add event listener to display task details when a task is clicked
taskList.addEventListener('click', (event) => {
  const selectedTask = event.target.closest('li');
  if (selectedTask) {
    const taskId = selectedTask.dataset.id;
    displayTaskDetails(taskId);
  }
});

// Function to populate the task list with dummy tasks
async function populateTaskList() {
  // eslint-disable-next-line no-undef
  const fragment = document.createDocumentFragment();
  const tasks = await getAllTasks(1, getToken());
  tasks.forEach((task) => {
    // eslint-disable-next-line no-undef
    const taskItem = document.createElement('li');
    taskItem.dataset.id = task.id;
    taskItem.textContent = `${task.title}`;
    fragment.appendChild(taskItem);
  });
  taskList.appendChild(fragment);
}

// eslint-disable-next-line no-undef
document.addEventListener('DOMContentLoaded', populateTaskList());