interface Project {
    taskName: string;
    taskDescription: string;
    taskDate: string;
    assignTo: string;
    progress: string;
    completedOn: string;
    id: number;
}

const user = JSON.parse(localStorage.getItem('loggedInUser')!);
const userProfile = document.querySelector('.profile2')!;
const profileImg = `https://robohash.org/${user.name}?set=set4`;
let oneDay = 1000 * 60 * 60 * 24;

userProfile.innerHTML = `
	<img src="${profileImg}" alt="${user.name}" />
	<div class="profile-names">
		<h3>${user.name}</h3>
		<h4>Fullstack Developer</h4>
	</div>
`;

const userContainer = document.querySelector('.user-details')!;
userContainer.innerHTML = `
	<div class="container-header">
		<h1>Profile</h1>
		<h3 class="subtitle">${user.name}</h3>
	</div>
	<div class="container-profile">
		<img
		class="banner-img"
		src="../Assets/images/banner.png"
		alt="banner image"
		/>
	<div class="profile-img">
	<img src="${profileImg}" alt="profile image" />
	</div>
`;

const logout = document.querySelector('.logout') as HTMLButtonElement;
const logoutUser = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../sign-in/sign-in.html';
};
logout.addEventListener('click', logoutUser);

const dateTime = document.querySelector('.date_time')!;
function refreshTime() {
    let datetime = new Date();
    dateTime.innerHTML = `
	<h2>${datetime.toLocaleTimeString('en-US', {
        hour12: false,
    })}</h2>
	<h4>${datetime.toLocaleDateString()}</h4>
	`;
}

setInterval(refreshTime, 1000);

const currentProject = document.querySelector(
    '.current-project .project-card'
)!;

const getCurrentProject = async (userID: number) => {
    const project: Project = (
        await (
            await fetch(
                `http://localhost:3000/tasks?progress=incomplete&&assignTo=${userID}`
            )
        ).json()
    )[0];

    if (project) {
        let timeRemaining = Math.ceil(
            (new Date(project.taskDate).getTime() - new Date().getTime()) /
                oneDay
        );
        console.log(project);
        currentProject.innerHTML = `
	<div class="card-text">
		<h3>${project.taskName}</h3>
		<p>
		${project.taskDescription}
		</p>
	</div>
	<div class="card-illustration">
	<p>Due In: <span>${timeRemaining} Days</span></p>
	<div class="progress"><div class="inner-progress"></div></div>
	<div class="more">
	<img
		class="img-thumbnail"
		src="${profileImg}"
		alt=""
	/>
	<div onclick="markAsComplete(${project.id})" class="tooltip">
		<img class="img-thumbnail complete" src="../Assets/icons/tick-mark.png" alt="" />
		<span class="tooltiptext">Mark as complete</span>	
	</div>
	</div>
	</div>
`;
    } else {
        currentProject.innerHTML = `
	<div class="card-text">
		<h3>No available projects</h3>
		<p>
		Kindly hold on while we look for an assignment that best fits your skills. 
		</p>
	</div>
	<div class="card-illustration">
	<p>Next assignment In: <span>3 Days</span></p>
	<div class="progress"><div class="inner-progress"></div></div>
	<div class="more">
	<img
		class="img-thumbnail"
		src="${profileImg}"
		alt=""
	/>
	<div" class="tooltip">
		<span class="emoji complete">🙂</span>
	</div>
	</div>
	</div>
	`;
    }
};

getCurrentProject(user.id);

const markAsComplete = async (id: number) => {
    let today = new Date().toLocaleDateString();
    let patch = { progress: 'complete', completedOn: today };
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const previousProjects = document.querySelector('.previous-project')!;
const getPreviousProjects = async (userID: number) => {
    const projects: Project[] = await (
        await fetch(
            `http://localhost:3000/tasks?progress=complete&&assignTo=${userID}`
        )
    ).json();
    if (projects.length == 0) {
        previousProjects.innerHTML = `
		<div class="project-card">
		<div class="card-text">
		  <h3>Hello, ${user.name}!</h3>
		  <p>
			You have not completed any tasks before.
		  </p>
		</div>
		<div class="card-illustration">
		  <p>Progress <span>0%</span></p>
		  <div class="progress"><div style="width: 0%"class="inner-progress"></div></div>
		  <div class="more">
			<img
			  class="img-thumbnail"
			  src="${profileImg}"
			  alt="${user.name}"
			/>
			<div" class="tooltip">
		<span class="emoji complete">😶</span>
	</div>
		  </div>
		</div>
	  </div>
		`;
    } else {
        projects.forEach((project: Project, index: number) => {
            if (index <= 3) {
                const completed = Math.ceil(
                    (new Date(project.completedOn).getTime() -
                        new Date().getTime()) /
                        oneDay
                );
                const card = document.createElement('div');
                card.classList.add('project-card');
                card.innerHTML = `
			<div class="card-text">
				<h3>${project.taskName}</h3>
				<p>
				${project.taskDescription}
				</p>
			</div>
			<div class="card-illustration">
			<p>Completed: <span>${completed} Days Ago</span></p>
			<div class="progress"><div style="width:100%" class="inner-progress"></div></div>
			<div class="more">
			<img
				class="img-thumbnail"
				src="${profileImg}"
				alt=""
			/>
			<div" class="tooltip">
				<img class="img-thumbnail complete" src="../Assets/icons/tick-mark.png" alt="" />
				<span class="tooltiptext">Completed</span>	
			</div>
			</div>
			</div>
			`;
                previousProjects.appendChild(card);
            }
        });
    }
};

getPreviousProjects(user.id);
