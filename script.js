const authForm = document.querySelector('#auth-form');
const authFormEmail = document.querySelector('#auth-form-email');
const authFormPssword = document.querySelector('#auth-form-password');
const authFormSubmit = document.querySelector('#auth-form-submit');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const togglePassworVisibility = document.querySelector(
  '#toggle-password-visibility'
);
const hidePassword = document.querySelector('#hide-password');
const validationRules = {
  emilRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwoedRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};
const passwordIcons={
  eyOpen:'url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)',
  eyeClose:'url(https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999)'
}

const formValidation = {
  email: false,
  password: false,
};
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
  const formDate = Object.fromEntries(formObj);

  if (
    formDate.email.match(validationRules.emilRegex) &&
    formDate.password.match(validationRules.passwoedRegex)
  ) {
    console.log('yes');
  }
});

authFormEmail.addEventListener('input', (e) => {
  if (e.target.value.match(validationRules.emilRegex)) {
    formValidation.email = true;
    authFormPssword.disabled = false;
    emailError.classList.add('invisible');
  } else {
    emailError.classList.remove('invisible');
    formValidation.email = false;
    authFormPssword.disabled = true;
  }
  checkSubmitDisabled();
});

authFormPssword.addEventListener('input', (e) => {
  if(e.target.value){
    togglePassworVisibility.classList.remove("hidden")
  }
  else{
    togglePassworVisibility.classList.add("hidden")

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
    authFormPssword.type = 'password';
    e.target.style.backgroundImage = passwordIcons.eyOpen;
    e.target.dataset.visibility = 'false';
  } else {
    authFormPssword.type = 'text';
    e.target.style.backgroundImage =passwordIcons.eyeClose
    e.target.dataset.visibility = 'true';
  }
  authFormPssword.focus()

  // showPassword.classList.add("hidden")
  // hidePassword.classList.remove("hidden")
});
