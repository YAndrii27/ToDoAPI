/* eslint-disable no-undef */
document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Perform your client-side actions here before submitting the form
  const login = document.getElementById("login").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  if (login.lenght >= 17) {
    alert("Login can not be contain more than 16 chars.");
    return;
  }

  // If all client-side checks pass, submit the form
  this.submit();
});