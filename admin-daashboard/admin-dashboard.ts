const modal = document.querySelector(".modal") as HTMLElement;
const closeModal = document.querySelector("#closeModal") as HTMLElement;
const openModal = document.querySelector(".addProject") as HTMLElement;
const updateModal = document.querySelector("#updatebtn");

openModal.addEventListener("click", function () {
  console.log("hello ");
  modal.style.display = "flex";
});
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

interface task {
  taskName: string;
  taskDescription: string;
  taskDate: Date;
  assignTo: string;
}

class TaskForm {
  taskNameInput: HTMLInputElement;
  taskDescriptionInput: HTMLInputElement;
  taskDateInput: HTMLInputElement;
  assignToSelect: HTMLSelectElement;

  constructor() {
    this.taskNameInput = document.querySelector(
      "#taskName"
    ) as HTMLInputElement;
    this.taskDescriptionInput = document.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.taskDateInput = document.querySelector("#date") as HTMLInputElement;
    this.assignToSelect = document.querySelector("#users") as HTMLSelectElement;
  }

  getUser(): task {
    const taskName = this.taskNameInput.value;
    const taskDescription = this.taskDescriptionInput.value;
    const taskDate = new Date(this.taskDateInput.value);
    const assignTo = this.assignToSelect.value;

    return {
      taskName,
      taskDescription,
      taskDate,
      assignTo,
    };
  }
  async showTask() {
    const response = await fetch("http://localhost:3000/tasks");
    const allTask = (await response.json()) as task[];

    let html = "";
    allTask.forEach((alltask) => {
      html += `
      <div class="project-card">
      <div class="card-text">
        <h3>${alltask.taskName}</h3>
        <p>
${alltask.taskDescription}        </p>
      </div>
      <div class="card-illustration">
        <p>Progress <span>25%</span></p>
        <div class="progress"><div class="inner-progress"></div></div>
        <div class="more">
          <img
            class="img-thumbnail"
            src="../Assets/images/logo.png"
            alt=""
          />
          <div class="update-icons">
          <img src="../Assets/icons/trash.svg" alt="" />
          <img class="addProject"  width="20" height="20" src="../Assets/icons/edit-task.png" alt="" />
            </div>
          </div>
      </div>
    </div>
       `;
    });
    const app = document.querySelector(".previous-project")! as HTMLDivElement;
    app.innerHTML = html;
  }
}

const createTask = async () => {
  const form = new TaskForm();
  const addedTask = form.getUser();
  console.log(addedTask);
  await fetch("http://localhost:3000/tasks", {
    method: "POST",
    body: JSON.stringify(addedTask),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const btn = document.querySelector("#addbtn")!;
btn.addEventListener("click", createTask);

// console.log(user); // { name: 'John Doe', email: 'john.doe@example.com', password: 'password123', type: 'admin' }
const myTask = new TaskForm();
myTask.getUser();
myTask.showTask();
