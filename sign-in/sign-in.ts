interface UserLogin {
    id: number;
    email: string;
    password: string;
}

class LoginForm {
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;

    constructor() {
        this.emailInput = document.querySelector('#email') as HTMLInputElement;
        this.passwordInput = document.querySelector(
            '#password'
        ) as HTMLInputElement;
    }

    validateFields(): boolean {
        let isValid = true;

        if (!this.emailInput.value) {
            this.emailInput.classList.add('invalid');
            isValid = false;
        }

        if (!this.passwordInput.value) {
            this.passwordInput.classList.add('invalid');
            isValid = false;
        }

        return isValid;
    }

    clearValidation(): void {
        this.emailInput.classList.remove('invalid');
        this.passwordInput.classList.remove('invalid');
    }

    getUser(): UserLogin | null {
        if (!this.validateFields()) {
            let invalidFields: NodeListOf<HTMLInputElement> =
                document.querySelectorAll('.invalid');
            invalidFields.forEach((field) => {
                field.placeholder = 'This is a required field';
            });
            return null;
        }

        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        return {
            id: 0,
            email,
            password,
        };
    }
}

const loginUser = async () => {
    const form = new LoginForm();
    form.clearValidation();
    const user = form.getUser();

    if (user) {
        const users = (await (
            await fetch('http://localhost:3000/users')
        ).json()) as UserLogin[];

        const matchedUser = users.find(
            (u) => u.email === user.email && u.password === user.password
        );

        if (matchedUser) {
            console.log('Logged in as:', matchedUser.email);
            window.location.href = '../user-dashboard/user-dashboard.html';
        } else {
            const mismatched = document.querySelector(
                '.mismatched'
            ) as HTMLInputElement;
            mismatched.style.display = 'block';
        }
    }
};

const signInBtn = document.querySelector('.login-btn')!;
signInBtn.addEventListener('click', loginUser);
