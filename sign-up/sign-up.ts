interface UserSignUp {
    name: string;
    email: string;
    password: string;
    type: string;
    engaged: boolean;
}

class UserForm {
    nameInput: HTMLInputElement;
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    confirmPasswordInput: HTMLInputElement;
    typeSelect: HTMLSelectElement;

    constructor() {
        this.nameInput = document.querySelector('#name') as HTMLInputElement;
        this.emailInput = document.querySelector('#email') as HTMLInputElement;
        this.passwordInput = document.querySelector(
            '#password'
        ) as HTMLInputElement;
        this.confirmPasswordInput = document.querySelector(
            '#confirm-password'
        ) as HTMLInputElement;
        this.typeSelect = document.querySelector(
            '#account-type'
        ) as HTMLSelectElement;
    }

    validateFields(): boolean {
        let isValid = true;

        if (!this.nameInput.value) {
            this.nameInput.classList.add('invalid');
            isValid = false;
        }

        if (!this.emailInput.value) {
            this.emailInput.classList.add('invalid');
            isValid = false;
        }

        if (!this.passwordInput.value) {
            this.passwordInput.classList.add('invalid');
            isValid = false;
        }

        if (!this.confirmPasswordInput.value) {
            this.confirmPasswordInput.classList.add('invalid');
            isValid = false;
        }

        if (this.passwordInput.value !== this.confirmPasswordInput.value) {
            this.passwordInput.classList.add('invalid');
            this.confirmPasswordInput.classList.add('invalid');
            isValid = false;
        }

        return isValid;
    }

    clearValidation(): void {
        this.nameInput.classList.remove('invalid');
        this.emailInput.classList.remove('invalid');
        this.passwordInput.classList.remove('invalid');
        this.confirmPasswordInput.classList.remove('invalid');
    }

    getUser(): UserSignUp | null {
		if (!this.validateFields()) {
			let invalidFields: NodeListOf<HTMLInputElement> = document.querySelectorAll('.invalid')
			invalidFields.forEach(field => {
				field.placeholder = "This is a required field"
			})
			let mismatched = document.querySelector('.mismatched') as HTMLInputElement
			mismatched.style.display = 'block'

            return null;
        }

        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const type = this.typeSelect.value;
        const engaged = false;

        return {
            name,
            email,
            password,
            type,
            engaged,
        };
    }
}

const createUser = async () => {
    const form = new UserForm();
    form.clearValidation();
    const user = form.getUser();

    if (user) {
        window.location.href = '../sign-in/sign-in.html';
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
};

const btn = document.querySelector('button')!;
btn.addEventListener('click', createUser);