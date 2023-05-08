interface UserSignUp {
  name: string;
  email: string;
  password: string;
  type: string;
  engaged: boolean;
}

window.onload = async () => {
  const users = await (
    await fetch(`http://localhost:3000/users?type=admin`)
  ).json();
  console.log(users);

  if (users.length > 0) {
    const adminOption = document.querySelector(
      'option[value="admin"]'
    ) as HTMLOptionElement;
    adminOption.disabled = true;
  }
};

class UserForm {
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  typeSelect: HTMLSelectElement;

  constructor() {
    this.nameInput = document.querySelector("#name") as HTMLInputElement;
    this.emailInput = document.querySelector("#email") as HTMLInputElement;
    this.passwordInput = document.querySelector(
      "#password"
    ) as HTMLInputElement;
    this.confirmPasswordInput = document.querySelector(
      "#confirm-password"
    ) as HTMLInputElement;
    this.typeSelect = document.querySelector(
      "#account-type"
    ) as HTMLSelectElement;
  }

  validateFields(): boolean {
    let isValid = true;

    if (!this.nameInput.value) {
      this.nameInput.classList.add("invalid");
      isValid = false;
    }

    if (!this.emailInput.value) {
      this.emailInput.classList.add("invalid");
      isValid = false;
    }

    if (!this.passwordInput.value) {
      this.passwordInput.classList.add("invalid");
      isValid = false;
    }

    if (!this.confirmPasswordInput.value) {
      this.confirmPasswordInput.classList.add("invalid");
      isValid = false;
    }

    if (this.passwordInput.value !== this.confirmPasswordInput.value) {
      this.passwordInput.classList.add("invalid");
      this.confirmPasswordInput.classList.add("invalid");
      isValid = false;
    }

    return isValid;
  }

  clearValidation(): void {
    this.nameInput.classList.remove("invalid");
    this.emailInput.classList.remove("invalid");
    this.passwordInput.classList.remove("invalid");
    this.confirmPasswordInput.classList.remove("invalid");
  }

  async checkIfUserExists(email: string): Promise<boolean> {
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    const users = await response.json();

    if (users.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getUser(): UserSignUp | null {
    if (!this.validateFields()) {
      let invalidFields: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".invalid");
      invalidFields.forEach((field) => {
        field.placeholder = "This is a required field";
      });
      let mismatched = document.querySelector(
        ".mismatched"
      ) as HTMLInputElement;
      mismatched.style.display = "block";

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
    const userExists = await form.checkIfUserExists(user.email);
    if (userExists) {
      const emailInput = document.querySelector("#email") as HTMLInputElement;
      emailInput.classList.add("invalid");
      const mismatched = document.querySelector(
        ".email-exists"
      ) as HTMLParagraphElement;
      mismatched.style.display = "block";
    } else {
      window.location.href = "../sign-in/sign-in.html";
      await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
};

const signupBtn = document.querySelector("button")!;
signupBtn.addEventListener("click", createUser);
