// Check if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Logout functionality
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});

// Modal handling
const modal = document.getElementById("editModal");
const span = document.getElementsByClassName("close")[0];

// Open the modal
function openModal() {
  modal.style.display = "block";
}

// Close the modal
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Generate unique ID
function generateID() {
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  let idCount = patients.length + 1;
  return "P-" + idCount.toString().padStart(3, "0");
}

// Add Patient form handling
document
  .getElementById("patient-add-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const patientID = generateID();
    const doctorID = document.getElementById("add-doctor-id").value;
    const name = document.getElementById("add-patient-name").value;
    const age = document.getElementById("add-patient-age").value;
    const illness = document.getElementById("add-patient-illness").value;

    const patient = {
      patientID,
      name,
      age,
      illness,
      doctorID,
    };

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));

    document.getElementById("patient-add-form").reset();
    renderPatientsTable();
  });

// Edit Patient form handling
document
  .getElementById("patient-edit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const patientID = document.getElementById("edit-patient-id").value;
    const doctorID = document.getElementById("edit-doctor-id").value;
    const name = document.getElementById("edit-patient-name").value;
    const age = document.getElementById("edit-patient-age").value;
    const illness = document.getElementById("edit-patient-illness").value;

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    const patientIndex = patients.findIndex((p) => p.patientID === patientID);

    if (patientIndex !== -1) {
      patients[patientIndex] = {
        patientID,
        name,
        age,
        illness,
        doctorID,
      };
      localStorage.setItem("patients", JSON.stringify(patients));
      renderPatientsTable();
    }

    modal.style.display = "none";
  });

// Render Patients table
function renderPatientsTable() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const tbody = document
    .getElementById("patients-table")
    .querySelector("tbody");
  tbody.innerHTML = "";

  patients.forEach((patient, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${patient.patientID}</td>
              <td>${patient.name}</td>
              <td>${patient.age}</td>
              <td>${patient.illness}</td>
              <td>${patient.doctorID}</td>
              <td>
                  <button onclick="editPatient(${index})">Edit</button>
                  <button onclick="deletePatient(${index})">Delete</button>
              </td>
          `;
    tbody.appendChild(row);
  });
}

// Edit Patient
function editPatient(index) {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = patients[index];

  document.getElementById("edit-patient-id").value = patient.patientID;
  document.getElementById("edit-patient-name").value = patient.name;
  document.getElementById("edit-patient-age").value = patient.age;
  document.getElementById("edit-patient-illness").value = patient.illness;
  document.getElementById("edit-doctor-id").value = patient.doctorID;

  openModal();
}

// Delete Patient
function deletePatient(index) {
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients.splice(index, 1);
  localStorage.setItem("patients", JSON.stringify(patients));
  renderPatientsTable();
}

document.addEventListener("DOMContentLoaded", function () {
  renderPatientsTable();
});
