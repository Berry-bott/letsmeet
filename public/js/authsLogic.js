
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
    const toggleLink = document.getElementById("toggleLink");
    const messageModal = document.getElementById("messageModal");
    const messageBox = document.getElementById("messageBox");

    // Show message modal
    function showMessage(message, type = "info") {
      messageBox.textContent = message;
      messageBox.style.background =
        type === "error" ? "#d32f2f" : type === "success" ? "#2e7d32" : "#0270d7";
      messageModal.style.display = "block";
      setTimeout(() => {
        messageModal.style.display = "none";
      }, 2500);
    }

    // Show modal
    function showModal() {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }

    // Hide modal
    function hideModal() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }

    // Switch to login mode
    function switchToLogin() {
      modalTitle.textContent = "Login to LetsMeet";
      modalText.textContent = "Please log in using your registered account.";
      loginBtn.style.display = "inline-block";
      registerBtn.style.display = "none";
      toggleText.innerHTML = `Don't have an account? 
        <a href="#" id="toggleLink" style="color: #0270d7; text-decoration: underline;">Register here</a>`;
      usernameInput.value = "";
      passwordInput.value = "";
      emailInput.value = "";
      addToggleListener();
    }

    // Switch to register mode
    function switchToRegister() {
      modalTitle.textContent = "Welcome to software and web development E Learning platform.";
      modalText.textContent = "Please register first to continue mmmmmmm.";
      loginBtn.style.display = "none";
      registerBtn.style.display = "inline-block";
      toggleText.innerHTML = `Already have an account? 
        <a href="#" id="toggleLink" style="color: #0270d7; text-decoration: underline;">Login here</a>`;
        emailInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";
      addToggleListener();
    }

    // Handle registration
    registerBtn.onclick = () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const email = emailInput.value.trim();

        if (!username || !password || !email)
            return showMessage("Please fill in all fields.", "error");

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return showMessage("Please enter a valid email address.", "error");
        }

        // Password strength validation (at least 6 chars, one number)
        const passwordRegex = /^(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return showMessage("Password must be at least 6 characters and contain a number.", "error");
        }

        if (localStorage.getItem(username)) {
            showMessage("Username already exists. Please log in instead.", "error");
            switchToLogin();
            return;
        }

        localStorage.setItem(username, JSON.stringify({ username, password, email }));
        showMessage("Registration successful! Redirecting to login...", "success");

    };

    // Handle login
    loginBtn.onclick = () => {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!username || !password)
        return showMessage("Please enter all fields.", "error");

      const user = JSON.parse(localStorage.getItem(username));
      if (!user) {
        showMessage("Account not found. Please register first.", "error");
        switchToRegister();
        return;
      }

      if (user.password !== password)
        return showMessage("Incorrect password.", "error");

      localStorage.setItem("loggedInUser", username);
      showMessage(`Welcome back, ${username}!`, "success");
      setTimeout(() => hideModal(), 1000);
    };

    // Add toggle listener dynamically
    function addToggleListener() {
      const link = document.getElementById("toggleLink");
      if (link.textContent.includes("Login")) {
        link.onclick = (e) => {
          e.preventDefault();
          switchToLogin();
        };
      } else {
        link.onclick = (e) => {
          e.preventDefault();
          switchToRegister();
        };
      }
    }

    // Show modal only if user not logged in
    if (!localStorage.getItem("loggedInUser")) {
      showModal();
      switchToRegister();
    }

    // Optional logout function
    window.logoutUser = function () {
      localStorage.removeItem("loggedInUser");
      showModal();
      switchToLogin();
    };
  });
