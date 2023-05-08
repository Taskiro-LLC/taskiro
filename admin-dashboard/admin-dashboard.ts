const modal = document.querySelector('.modal') as HTMLElement;
const closeModal = document.querySelector('#closeModal') as HTMLElement;
const openModal = document.querySelector('.addProject') as HTMLElement;
const updateModal = document.querySelector('#updatebtn') as HTMLElement;
const btn = document.querySelector('#addbtn') as HTMLElement;
const updatePr = document.querySelector('#projectUpdate') as HTMLButtonElement;
const usersList = document.querySelector('.lists')!;

openModal.addEventListener('click', function () {
    modal.style.display = 'flex';
    updateModal.style.display = 'none';
    btn.style.display = 'block';
});

closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function modalUpdate() {
    btn.style.display = 'none';
    updateModal.style.display = 'block';
    modal.style.display = 'flex';
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

class TaskForm {
    taskNameInput: HTMLInputElement;
    taskDescriptionInput: HTMLInputElement;
    taskDateInput: HTMLInputElement;
    assignToSelect: HTMLSelectElement;
    // static prepopulate: any;

    constructor() {
        this.taskNameInput = document.querySelector(
            '#taskName'
        ) as HTMLInputElement;
        this.taskDescriptionInput = document.querySelector(
            '#description'
        ) as HTMLInputElement;
        this.taskDateInput = document.querySelector(
            '#date'
        ) as HTMLInputElement;
        this.assignToSelect = document.querySelector(
            '#users'
        ) as HTMLSelectElement;
    }

    getUser(): Project {
        const taskName = this.taskNameInput.value;
        const taskDescription = this.taskDescriptionInput.value;
        const taskDate = new Date(
            this.taskDateInput.value
        ).toLocaleDateString();
        const assignTo = this.assignToSelect.value;

        return {
            taskName,
            taskDescription,
            taskDate,
            assignTo,
            completedOn: '',
          progress: 'incomplete',
            id:0
        };
    }

    async showTask() {
        const response = await fetch('http://localhost:3000/tasks');
        const allTask: Project[] = await response.json();

        let html = '';
        allTask.forEach((alltask) => {
            html += `
      <div class="project-card">
      <div class="card-text">
        <h3>${alltask.taskName}</h3>
        <p>
          ${alltask.taskDescription}        
        </p>
      </div>
      <div class="card-illustration">
        <p>Progress <span>25%</span></p>
        <div class="progress"><div class="inner-progress"></div></div>
        <div class="more">
          <img
            class="img-thumbnail"
            src="https://robohash.org/${alltask.assignTo}?set=set4"
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
        const app = document.querySelector(
            '.previous-project'
        )! as HTMLDivElement;
        app.innerHTML = html;
    }

    // async updateTask(id: number) {
    //   const response = await fetch(`http://localhost:3000/tasks/${id}`);
    //   const tasc = (await response.json()) as task;
    //   TaskForm.prepopulate(tasc);
    // }

    async updateTask(id: number) {
        const response = await fetch(`http://localhost:3000/tasks/${id}`);
        const tasc = await response.json();
        console.log(tasc);
    }

    static async prepopulate(id: number) {
        modalUpdate();
        const response = await fetch(`http://localhost:3000/tasks/${id}`);
        const tasc = await response.json();
        console.log(tasc);

        (document.querySelector('#taskName') as HTMLInputElement).value =
            tasc.taskName.toString();

        (document.querySelector('#description') as HTMLInputElement).value =
            tasc.taskDescription.toString();
        (document.querySelector('#date') as HTMLInputElement).value =
            tasc.taskDate.toString();
        (document.querySelector('#users') as HTMLSelectElement).value =
            tasc.assignTo.toString();
        // (document.querySelector("#image") as HTMLInputElement).value = photo.url;
        // (document.getElementById("addBtn")! as HTMLButtonElement).innerText =
        //   "Update Photo";
    }

    // updateModal.addEventListener("click", async function(){
    //     await fetch(`http://localhost:3000/tasks/${id}`,{
    //       method: "PATCH",
    //       body: JSON.stringify(),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })

    // })
}

const createTask = async () => {
    const form = new TaskForm();
    const addedTask = form.getUser();
    console.log(addedTask);
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(addedTask),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getUsers = async (url: string): Promise<UserSignUp[]> => {
    let users = await (await fetch(url)).json();
    return users;
};

const showUsers = async () => {
    let users = await getUsers('http://localhost:3000/users');
    users.forEach((user) => {
        let person = document.createElement('div');
        person.classList.add('person');
        person.innerHTML = `
      <div class="section1">
        <img src="https://robohash.org/${user.name}?set=set4" alt="" />
        <h3>${user.name}</h3>
      </div>
      <img src="../Assets/icons/trash.svg" alt="" />
    `;
        usersList.appendChild(person);
    });
};

btn.addEventListener('click', createTask);

const myTask = new TaskForm();
myTask.getUser();
myTask.showTask();
showUsers();
