const user = JSON.parse(localStorage.getItem('loggedInUser')!);
const userProfile = document.querySelector('.profile2')!;
userProfile.innerHTML = `
	<img src="https://robohash.org/${user.name}?set=set4" alt="${user.name}" />
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
