let authForm,
  authFormEmail,
  authFormPassword,
  authFormSubmit,
  emailError,
  passwordError,
  alertError,
  alertClose,
  registrationLinkInForm,
  registrationLinkInAlert,
  togglePassworVisibility;

const wrapper = document.querySelector('#wrapper');
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

const authFormMarkup = `<form
        id="auth-form"
        class="border border-gray-50/50 rounded-xl gap-1 flex flex-col p-10 justify-self-center align-middle w-full max-w-md"
      >
        <h1 class="text-white text-3xl mb-5">Авторизация</h1>
        <div>
          <input
            id="auth-form-email"
            class="border border-gray-50/50 rounded-md text-white px-3 py-1 w-full"
            autofocus
            type="text"
            name="email"
            placeholder="Введите почту"
          />
          <p id="email-error" class="text-red-600 text-xs mt-1 invisible">
            Не верно введена почта
          </p>
        </div>
        <div class="relative">
          <input
            id="auth-form-password"
            class="border border-gray-50/50 rounded-md text-white px-3 py-1 disabled:opacity-45 w-full"
            type="password"
            name="password"
            placeholder="Введите праоль"
            disabled
          />
          <button
            id="toggle-password-visibility"
            type="checkbox"
            class="absolute right-3 top-1/3 -translate-y-1/2 w-5 h-5 appearance-none cursor-pointer bg-no-repeat hidden"
            style="
              background-image: url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999);
            "
            data-visibility="false"
          ></button>
          <!-- <input id="hide-password" type="checkbox" class="hidden absolute
          right-3 top-1/3 -translate-y-1/2 w-5 h-5 appearance-none
          cursor-pointer
          bg-[url('https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999')]
          bg-no-repeat"> -->
          <p id="password-error" class="text-red-600 text-xs mt-1 invisible">
            Не верно введен пароль
          </p>
        </div>
        <input
          id="auth-form-submit"
          class="rounded-md bg-blue-700 text-white px-3 py-1 cursor-pointer hover:bg-blue-800 disabled:bg-blue-900 disabled:cursor-auto"
          type="submit"
          value="Войти"
          disabled
        />
        <a id="registration-link-in-form" class="text-blue-500 underline self-center hover:no-underline hover:text-white" href="#">Регистрация</a>
      </form>`;

const regFormMarkup = `<form
        id="registration-form"
        class=" border border-gray-50/50 rounded-xl gap-1 flex flex-col p-10 justify-self-center align-middle w-full max-w-md"
      >
        <h1 class="text-white text-3xl mb-5">Регистрация</h1>
        <div>
          <input
            id="auth-form-email"
            class="border border-gray-50/50 rounded-md text-white px-3 py-1 w-full"
            autofocus
            type="text"
            name="email"
            placeholder="Введите почту"
          />
          <p id="email-error" class="text-red-600 text-xs mt-1 invisible">
            Не верно введена почта
          </p>
        </div>
        <div class="relative">
          <input
            id="auth-form-password"
            class="border border-gray-50/50 rounded-md text-white px-3 py-1 disabled:opacity-45 w-full"
            type="password"
            name="password"
            placeholder="Введите праоль"
            disabled
          />
          <button
            id="toggle-password-visibility"
            type="checkbox"
            class="absolute right-3 top-1/3 -translate-y-1/2 w-5 h-5 appearance-none cursor-pointer bg-no-repeat hidden"
            style="
              background-image: url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999);
            "
            data-visibility="false"
          ></button>
          <!-- <input id="hide-password" type="checkbox" class="hidden absolute
          right-3 top-1/3 -translate-y-1/2 w-5 h-5 appearance-none
          cursor-pointer
          bg-[url('https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999')]
          bg-no-repeat"> -->
          <p id="password-error" class="text-red-600 text-xs mt-1 invisible">
            Не верно введен пароль
          </p>
        </div>
        <input
          id="auth-form-submit"
          class="rounded-md bg-blue-700 text-white px-3 py-1 cursor-pointer hover:bg-blue-800 disabled:bg-blue-900 disabled:cursor-auto"
          type="submit"
          value="Зарегистрироваться"
          disabled
        />
        <a id="registration-link-in-form" class="text-blue-500 underline self-center hover:no-underline hover:text-white" href="#">Войти</a>
      </form>`;

const checkSubmitDisabled = () => {
  if (formValidation.email && formValidation.password) {
    authFormSubmit.disabled = false;
  } else {
    authFormSubmit.disabled = true;
  }
};



const render = (markup) => {
  wrapper.insertAdjacentHTML('afterbegin', markup);
};


const init = () => {
  authForm = document.querySelector('#auth-form');
  authFormEmail = document.querySelector('#auth-form-email');
  authFormPassword = document.querySelector('#auth-form-password');
  authFormSubmit = document.querySelector('#auth-form-submit');
  emailError = document.querySelector('#email-error');
  passwordError = document.querySelector('#password-error');
  alertError = document.querySelector('#alert-error');
  alertClose = document.querySelector('#alert-close');
  registrationLinkInForm = document.querySelector(
    '#registration-link-in-form'
  );
  registrationLinkInAlert = document.querySelector(
    '#registration-link-in-alert'
  );
  togglePassworVisibility = document.querySelector(
    '#toggle-password-visibility'
  );
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
  } else {
    alert('Вход разрешён');
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
if (isAlertErrorVisibal) {
  alertError.classList.add('opacity-0');
}
});

registrationLinkInAlert.addEventListener('click', (e)=>{
  e.preventDefault()
  authForm.remove()
  render(regFormMarkup)
});
registrationLinkInForm.addEventListener('click', (e)=>{
  e.preventDefault()
  authForm.remove()
  render(regFormMarkup)
});
};

document.addEventListener('DOMContentLoaded', () => {
  render(authFormMarkup);
  init()
});
