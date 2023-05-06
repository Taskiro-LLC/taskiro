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
<<<<<<< HEAD
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#closeModal");
const openModal = document.querySelector(".addProject");
const updateModal = document.getElementById("updatebtn");
const btn = document.querySelector("#addbtn");
const updatePr = document.querySelector("#projectUpdate");
// const deleteBtnTask = document.querySelector("#deleteBtn") as HTMLImageElement;
console.log(updateModal);
openModal.addEventListener("click", function () {
    modal.style.display = "flex";
    updateModal.style.display = "none";
    btn.style.display = "block";
=======
const openModal = document.querySelector("#addProject");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#closeModal");
const openModal = document.querySelector(".addProject");
const updateModal = document.querySelector("#updatebtn");
const btn = document.querySelector("#addbtn");
const updatePr = document.querySelector("#projectUpdate");
openModal.addEventListener("click", function () {
    modal.style.display = "flex";
<<<<<<< HEAD
>>>>>>> f0183ac (add admin dashboard functionality)
=======
    updateModal.style.display = "none";
    btn.style.display = "block";
>>>>>>> 934ae2e (add admin dashboard functionality)
});
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});
window.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 934ae2e (add admin dashboard functionality)
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
<<<<<<< HEAD
    static deleteBtnTask() {
        throw new Error("Method not implemented.");
    }
=======
class TaskForm {
>>>>>>> f0183ac (add admin dashboard functionality)
=======
    // static prepopulate: any;
>>>>>>> 934ae2e (add admin dashboard functionality)
    constructor() {
        this.taskNameInput = document.querySelector("#taskName");
        this.taskDescriptionInput = document.querySelector("#description");
        this.taskDateInput = document.querySelector("#date");
        this.assignToSelect = document.querySelector("#users");
    }
<<<<<<< HEAD
    getTask() {
        const taskName = this.taskNameInput.value;
        const taskDescription = this.taskDescriptionInput.value;
        const taskDate = this.taskDateInput.value;
=======
    getUser() {
        const taskName = this.taskNameInput.value;
        const taskDescription = this.taskDescriptionInput.value;
        const taskDate = new Date(this.taskDateInput.value);
>>>>>>> f0183ac (add admin dashboard functionality)
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
<<<<<<< HEAD
=======
                console.log(alltask);
>>>>>>> f0183ac (add admin dashboard functionality)
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
<<<<<<< HEAD
          <div class="update-icons">
<<<<<<< HEAD
          <img id="deleteBtn" onClick="TaskForm.deleteTask(${alltask.id})"  src="../Assets/icons/trash.svg" alt="" />
          <img id="projectUpdate" onClick="TaskForm.prepopulate(${alltask.id})
          " width="20" height="20" src="../Assets/icons/edit-task.png" alt="" />
=======
          <img src="../Assets/icons/trash.svg" alt="" />
          <img id="projectUpdate" onClick="TaskForm.prepopulate(${alltask.id})" width="20" height="20" src="../Assets/icons/edit-task.png" alt="" />
>>>>>>> 934ae2e (add admin dashboard functionality)
            </div>
          </div>
=======
          <img src="../Assets/icons/ellipsis.svg" alt="" />
        </div>
>>>>>>> f0183ac (add admin dashboard functionality)
      </div>
    </div>
       `;
            });
            const app = document.querySelector(".previous-project");
            app.innerHTML = html;
        });
    }
<<<<<<< HEAD
<<<<<<< HEAD
    static deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        });
    }
    static updateTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:3000/tasks/${TaskForm.id}`);
            const taskupdate = yield response.json();
            TaskForm.prepopulate(taskupdate);
            console.log("update");
            const updatedTask = new TaskForm().getTask();
            this.sendUpdate(Object.assign({}, updatedTask));
        });
    }
    static sendUpdate(tasking) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(tasking);
            yield fetch(`http://localhost:3000/tasks/${TaskForm.id}`, {
                method: "PUT",
                body: JSON.stringify(tasking),
                headers: {
                    "Content-Type": "application/json",
                },
            });
=======
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
>>>>>>> 934ae2e (add admin dashboard functionality)
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
<<<<<<< HEAD
            TaskForm.id = id;
        });
    }
}
TaskForm.id = 0;
updateModal.addEventListener("click", () => {
    TaskForm.updateTask();
});
const createTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new TaskForm();
    const addedTask = form.getTask();
=======
=======
            // (document.querySelector("#image") as HTMLInputElement).value = photo.url;
            // (document.getElementById("addBtn")! as HTMLButtonElement).innerText =
            //   "Update Photo";
        });
    }
>>>>>>> 934ae2e (add admin dashboard functionality)
}
const createTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new TaskForm();
    const addedTask = form.getUser();
>>>>>>> f0183ac (add admin dashboard functionality)
    console.log(addedTask);
    yield fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(addedTask),
        headers: {
            "Content-Type": "application/json",
        },
    });
});
<<<<<<< HEAD
<<<<<<< HEAD
btn.addEventListener("click", createTask);
const myTask = new TaskForm();
myTask.getTask();
=======
const btn = document.querySelector("#addbtn");
=======
>>>>>>> 934ae2e (add admin dashboard functionality)
btn.addEventListener("click", createTask);
const myTask = new TaskForm();
myTask.getUser();
>>>>>>> f0183ac (add admin dashboard functionality)
myTask.showTask();
