async function loadUsers() {
  const tableBody = document.querySelector("#user-table tbody");
  tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();

    if (users.length === 0) {
      tableBody.innerHTML = "";
      return;
    }

    tableBody.innerHTML = users
      .map(
        (u) => `
        <tr>
          <td>${u.id}</td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
        </tr>`
      )
      .join("");
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan='4' style='color:red;'>Error: ${err.message}</td></tr>`;
  }
}

loadUsers();
