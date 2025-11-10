document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");
  const spinner = document.getElementById("loading-spinner");
  const result = document.getElementById("result");

  msg.textContent = "";
  result.textContent = "";

  spinner.style.display = "block";

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    spinner.style.display = "none";

    if (res.ok) {
      const data = await res.json();

      if (data.user && data.user.name) {
        result.textContent = `Welcome, ${data.user.name}!`;
      } else {
        alert(data.message);
        window.location.href = "/home";
      }
    } else {
      const err = await res.json();
      msg.textContent = err.message;
    }
  } catch (error) {
    spinner.style.display = "none";
    msg.textContent = "Network error";
  }
});
