const authForm = document.querySelector('#auth-form');
const authFormEmail = document.querySelector('#auth-form-email');
const authFormPssword = document.querySelector('#auth-form-password');
const authFormSubmit = document.querySelector('#auth-form-submit');
const validationRules = {
  emilRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwoedRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};
const formValidation = {
  email: false,
  password: false,
};
const checkSubmitDisabled=()=>{
  if (formValidation.email && formValidation.password) {
    authFormSubmit.disabled = false;
  } else {
    authFormSubmit.disabled = true;
  }
}
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
  } else {
    formValidation.email = false;
    authFormPssword.disabled = true;
  }
  checkSubmitDisabled()
});

authFormPssword.addEventListener('input', (e) => {
  if (e.target.value.match(validationRules.passwoedRegex)) {
    formValidation.password = true;
  } else {
    formValidation.password = false;
  }
  checkSubmitDisabled()
});
