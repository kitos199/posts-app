const authForm = document.querySelector('#auth-form');
const authFormEmail = document.querySelector('#auth-form-email');
const authFormPssword = document.querySelector('#auth-form-password');
const authFormSubmit = document.querySelector('#auth-form-submit');
const validationRules = {
  emilRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwoedRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
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
  if (authFormEmail.value.match(validationRules.emilRegex)) {
    authFormPssword.disabled = false;
  } else {
    authFormPssword.disabled = true;
  }
});