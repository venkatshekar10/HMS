// Check if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Logout functionality
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});

// Search form handling
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const patientID = document.getElementById("search-patient-id").value;
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const patient = patients.find((p) => p.patientID === patientID);

    const tbody = document
      .getElementById("search-results-table")
      .querySelector("tbody");
    tbody.innerHTML = "";

    if (patient) {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${patient.patientID}</td>
              <td>${patient.name}</td>
              <td>${patient.age}</td>
              <td>${patient.illness}</td>
              <td>${patient.doctorID}</td>
          `;
      tbody.appendChild(row);
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td colspan="5">No patient found with ID: ${patientID}</td>
          `;
      tbody.appendChild(row);
    }
  });
