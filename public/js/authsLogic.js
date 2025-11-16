window.addEventListener("load", () => {
  const modal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");

  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const toggleText = document.getElementById("toggleText");

  const messageModal = document.getElementById("messageModal");
  const messageBox = document.getElementById("messageBox");

  function showMessage(message, type = "info") {
    messageBox.textContent = message;
    messageBox.style.background =
      type === "error" ? "#d32f2f" :
      type === "success" ? "#2e7d32" :
      "#0270d7";

    messageModal.style.display = "block";

    setTimeout(() => {
      messageModal.style.display = "none";
    }, 2500);
  }

  function showModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function hideModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function hideEmail() { emailInput.style.display = "none"; }
  function showEmail() { emailInput.style.display = "block"; }

  function switchToLogin() {
    modalTitle.textContent = "Login to software and web development \n E-Learning platform.";
    modalText.textContent = "Please log in using your registered account.";

    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "none";

    toggleText.innerHTML = `
      Don't have an account?
      <a href="#" id="toggleLink">Register here</a>
    `;

    hideEmail();
    usernameInput.value = "";
    passwordInput.value = "";

    addToggleListener();
  }

  function switchToRegister() {
    modalTitle.textContent = "Welcome to software and web development \n E-Learning platform.";
    modalText.textContent = "Please register first to continue.";

    loginBtn.style.display = "none";
    registerBtn.style.display = "inline-block";

    toggleText.innerHTML = `
      Already have an account?
      <a href="#" id="toggleLink">Login here</a>
    `;

    showEmail();
    emailInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";

    addToggleListener();
  }

  function addToggleListener() {
    const link = document.getElementById("toggleLink");

    if (link.textContent.includes("Login")) {
      link.onclick = (e) => { e.preventDefault(); switchToLogin(); };
    } else {
      link.onclick = (e) => { e.preventDefault(); switchToRegister(); };
    }
  }

  registerBtn.onclick = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const email = emailInput.value.trim();

    if (!username || !password || !email)
      return showMessage("Please fill in all fields.", "error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return showMessage("Enter a valid email address.", "error");

    const passwordRegex = /^(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(password))
      return showMessage("Password must contain a number & be 6+ characters.", "error");

    if (localStorage.getItem(username)) {
      showMessage("Username already exists. Please log in.", "error");
      switchToLogin();
      return;
    }

    localStorage.setItem(username, JSON.stringify({ username, password, email }));
    showMessage("Registration successful! Redirecting to login...", "success");

    setTimeout(() => switchToLogin(), 1200);
  };

  loginBtn.onclick = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password)
      return showMessage("Please enter all fields.", "error");

    const user = JSON.parse(localStorage.getItem(username));

    if (!user) {
      showMessage("Account not found. Please register.", "error");
      switchToRegister();
      return;
    }

    if (user.password !== password)
      return showMessage("Incorrect password.", "error");

    localStorage.setItem("loggedInUser", username);
    showMessage(`Welcome back, ${username}!`, "success");

    setTimeout(() => hideModal(), 1000);
  };

  if (!localStorage.getItem("loggedInUser")) {
    showModal();
    switchToRegister();
  }

  window.logoutUser = function () {
    localStorage.removeItem("loggedInUser");
    showModal();
    switchToLogin();
  };
});
