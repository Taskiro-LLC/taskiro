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
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#closeModal");
const openModal = document.querySelector(".addProject");
const updateModal = document.querySelector("#updatebtn");
const btn = document.querySelector("#addbtn");
const updatePr = document.querySelector("#projectUpdate");
openModal.addEventListener("click", function () {
    modal.style.display = "flex";
    updateModal.style.display = "none";
    btn.style.display = "block";
});
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});
window.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
function modalUpdate() {
    btn.style.display = "none";
    updateModal.style.display = "block";
    modal.style.display = "flex";
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}
class TaskForm {
    // static prepopulate: any;
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
          <img id="projectUpdate" onClick="TaskForm.prepopulate(${alltask.id})" width="20" height="20" src="../Assets/icons/edit-task.png" alt="" />
            </div>
          </div>
      </div>
    </div>
       `;
            });
            const app = document.querySelector(".previous-project");
            app.innerHTML = html;
        });
    }
    // async updateTask(id: number) {
    //   const response = await fetch(`http://localhost:3000/tasks/${id}`);
    //   const tasc = (await response.json()) as task;
    //   TaskForm.prepopulate(tasc);
    // }
    updateTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:3000/tasks/${id}`);
            const tasc = yield response.json();
            console.log(tasc);
        });
    }
    static prepopulate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            modalUpdate();
            const response = yield fetch(`http://localhost:3000/tasks/${id}`);
            const tasc = yield response.json();
            console.log(tasc);
            document.querySelector("#taskName").value =
                tasc.taskName.toString();
            document.querySelector("#description").value =
                tasc.taskDescription.toString();
            document.querySelector("#date").value =
                tasc.taskDate.toString();
            document.querySelector("#users").value =
                tasc.assignTo.toString();
            // (document.querySelector("#image") as HTMLInputElement).value = photo.url;
            // (document.getElementById("addBtn")! as HTMLButtonElement).innerText =
            //   "Update Photo";
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
btn.addEventListener("click", createTask);
const myTask = new TaskForm();
myTask.getUser();
myTask.showTask();
