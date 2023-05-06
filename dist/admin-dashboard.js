"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const openModal = document.querySelector("#addProject");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#closeModal");
openModal.addEventListener("click", function () {
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
class TaskForm {
    constructor() {
        this.taskNameInput = document.querySelector("#taskName");
        this.taskDescriptionInput = document.querySelector("#description");
        this.taskDateInput = document.querySelector("#date");
        this.assignToSelect = document.querySelector("#users");
    }
    getUser() {
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
    showTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("http://localhost:3000/tasks");
            const allTask = (yield response.json());
            let html = "";
            allTask.forEach((alltask) => {
                console.log(alltask);
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
          <img src="../Assets/icons/ellipsis.svg" alt="" />
        </div>
      </div>
    </div>
       `;
            });
            const app = document.querySelector(".previous-project");
            app.innerHTML = html;
        });
    }
}
const createTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new TaskForm();
    const addedTask = form.getUser();
    console.log(addedTask);
    yield fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(addedTask),
        headers: {
            "Content-Type": "application/json",
        },
    });
});
const btn = document.querySelector("#addbtn");
btn.addEventListener("click", createTask);
// console.log(user); // { name: 'John Doe', email: 'john.doe@example.com', password: 'password123', type: 'admin' }
const myTask = new TaskForm();
myTask.getUser();
myTask.showTask();
