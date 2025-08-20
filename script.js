const authForm = document.querySelector('#auth-form');
const authFormEmail = document.querySelector('#auth-form-email');
const authFormPassword = document.querySelector('#auth-form-password');
const authFormSubmit = document.querySelector('#auth-form-submit');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const alertError = document.querySelector('#alert-error');
const alertClose = document.querySelector('#alert-close');
const togglePassworVisibility = document.querySelector(
  '#toggle-password-visibility'
);
const hidePassword = document.querySelector('#hide-password');
const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};
const passwordIcons = {
  eyOpen:
    'url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)',
  eyeClose:
    'url(https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999)',
};

const users = [
  { email: 'user1@mail.ru', password: 'Erf123' },
  { email: 'user1@mail.ru', password: 'Erf123' },
  { email: 'user1@mail.ru', password: 'Erf123' },
  { email: 'user2@mail.ru', password: 'Sda123' },
  { email: 'user3@mail.ru', password: 'Xczzced123' },
];

const formValidation = {
  email: false,
  password: false,
};

let isAlertErrorVisibal = false;

const checkSubmitDisabled = () => {
  if (formValidation.email && formValidation.password) {
    authFormSubmit.disabled = false;
  } else {
    authFormSubmit.disabled = true;
  }
};

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formObj = new FormData(e.target);
  const formData = Object.fromEntries(formObj);

  if (
    formData.email.match(validationRules.emailRegex) &&
    formData.password.match(validationRules.passwordRegex)
  ) {
    // try {
    //   users.forEach((user) => {
    //     if (
    //       formData.email === user.email &&
    //       formData.password === user.password
    //     ) {
    //       console.log('user found');
    //       throw new Error('');
    //     }
    //   });
    // } catch (error) {}
    // const isUser = users.find((user) => {
    //   return (
    //     formData.email === user.email &&
    //     formData.password === user.password
    //   )
    // });
    const isUser = users.find(
      (user) =>
        formData.email === user.email && formData.password === user.password
    );

    if (!isUser) {
      console.log('false');
      alertError.classList.remove('opacity-0');
      isAlertErrorVisibal = true;
      if (isAlertErrorVisibal) {
        setTimeout(() => {
          alertError.classList.add('opacity-0');
        }, 7000);
      }
    }else{
      alert("Вход разрешён")
    }
    //  email: 'user1@mail.ru', password: 'Erf123'
  }
});

authFormEmail.addEventListener('input', (e) => {
  if (e.target.value.match(validationRules.emailRegex)) {
    formValidation.email = true;
    authFormPassword.disabled = false;
    emailError.classList.add('invisible');
  } else {
    emailError.classList.remove('invisible');
    formValidation.email = false;
    authFormPassword.disabled = true;
  }
  checkSubmitDisabled();
});

authFormPassword.addEventListener('input', (e) => {
  if (e.target.value) {
    togglePassworVisibility.classList.remove('hidden');
  } else {
    togglePassworVisibility.classList.add('hidden');
  }
  if (e.target.value.match(validationRules.passwoedRegex)) {
    formValidation.password = true;
    passwordError.classList.add('invisible');
  } else {
    passwordError.classList.remove('invisible');
    formValidation.password = false;
  }
  checkSubmitDisabled();
});

togglePassworVisibility.addEventListener('click', (e) => {
  // console.log(e.target.getAttribute("data-visibility")); обратится к атрибуту можно
  // console.log(e.target.dataset.visibility); тоже способ что бы обратится к атрибутаи
  if (e.target.dataset.visibility === 'true') {
    authFormPassword.type = 'password';
    e.target.style.backgroundImage = passwordIcons.eyOpen;
    e.target.dataset.visibility = 'false';
  } else {
    authFormPassword.type = 'text';
    e.target.style.backgroundImage = passwordIcons.eyeClose;
    e.target.dataset.visibility = 'true';
  }
  authFormPassword.focus();

  // showPassword.classList.add("hidden")
  // hidePassword.classList.remove("hidden")
});

alertClose.addEventListener('click', () => {
  if(isAlertErrorVisibal){
    alertError.classList.add('opacity-0');
  }
});
