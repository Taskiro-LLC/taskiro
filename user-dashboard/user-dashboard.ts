const user = JSON.parse(localStorage.getItem('loggedInUser')!);
const userProfile = document.querySelector('.profile2')!;
const profileImg = `https://robohash.org/${user.name}?set=set4`
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
	<img src="https://robohash.org/${user.name}?set=set4" alt="profile image" />
	</div>
`;

const logout = document.querySelector('.logout') as HTMLButtonElement;
const logoutUser = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../sign-in/sign-in.html';
};
logout.addEventListener('click', logoutUser);

const dateTime = document.querySelector('.date_time')!;
function refreshTime () {
	let datetime = new Date();
	dateTime.innerHTML = `
	<h2>${datetime.toLocaleTimeString('en-US', {
		hour12: false,
	  })}</h2>
	<h4>${datetime.toLocaleDateString()}</h4>
	`
}

setInterval(refreshTime, 1000)


const currentProject = document.querySelector('.current-project .project-card')!;

const getCurrentProject = async(userID:number) => {
	const project = (await (await fetch(`http://localhost:3000/tasks?assignTo=${userID}`)).json())[0];
	let oneDay = 1000*60*60*24
	let timeRemaining = Math.ceil((new Date(project.taskDate).getTime() - new Date().getTime())/oneDay)
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
	<div class="tooltip">
		<img class="img-thumbnail complete" src="../Assets/icons/tick-mark.png" alt="" />
		<span class="tooltiptext">Mark as complete</span>	
	</div>
	</div>
	</div>
`
}

getCurrentProject(user.id);

// const markAsComplete = (project:any) => {
// 	console.log(project)
// }
