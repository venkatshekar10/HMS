document.addEventListener("DOMContentLoaded", function () {
  loadPatients();
  loadBills();
});

document
  .getElementById("billing-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const patientID = document.getElementById("billing-patient-id").value;
    const amount = document.getElementById("billing-amount").value;
    const date = new Date().toLocaleDateString();

    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const patient = patients.find((p) => p.patientID === patientID);

    if (patient) {
      const newBill = { patientID, name: patient.name, amount, date };
      let bills = JSON.parse(localStorage.getItem("bills")) || [];
      bills.push(newBill);
      localStorage.setItem("bills", JSON.stringify(bills));

      addBillToTable(newBill, bills.length - 1);
      document.getElementById("billing-form").reset();
    } else {
      alert("Selected patient ID does not exist.");
    }
  });

function loadPatients() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const select = document.getElementById("billing-patient-id");
  patients.forEach((patient) => {
    const option = document.createElement("option");
    option.value = patient.patientID;
    option.textContent = `${patient.patientID} - ${patient.name}`;
    select.appendChild(option);
  });
}

function addBillToTable(bill, index) {
  const table = document
    .getElementById("bills-table")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${bill.patientID}</td>
    <td>${bill.name}</td>
    <td>${bill.amount}</td>
    <td>${bill.date}</td>
    <td>
      <button onclick="editBill(${index})">Edit</button>
      <button onclick="deleteBill(${index})">Delete</button>
    </td>
  `;
}

function loadBills() {
  const bills = JSON.parse(localStorage.getItem("bills")) || [];
  bills.forEach((bill, index) => addBillToTable(bill, index));
}

function deleteBill(index) {
  let bills = JSON.parse(localStorage.getItem("bills")) || [];
  bills.splice(index, 1);
  localStorage.setItem("bills", JSON.stringify(bills));
  document
    .getElementById("bills-table")
    .getElementsByTagName("tbody")[0].innerHTML = "";
  loadBills(); // Reload bills to update the table
}

function editBill(index) {
  const bills = JSON.parse(localStorage.getItem("bills")) || [];
  const bill = bills[index];
  document.getElementById("edit-bill-index").value = index;
  document.getElementById("edit-bill-patient-id").value = bill.patientID;
  document.getElementById("edit-bill-amount").value = bill.amount;
  openEditModal();
}

function openEditModal() {
  document.getElementById("edit-bill-modal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("edit-bill-modal").style.display = "none";
}

document
  .getElementById("edit-bill-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const index = document.getElementById("edit-bill-index").value;
    const amount = document.getElementById("edit-bill-amount").value;
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    if (index >= 0 && index < bills.length) {
      bills[index].amount = amount;
      localStorage.setItem("bills", JSON.stringify(bills));
      document
        .getElementById("bills-table")
        .getElementsByTagName("tbody")[0].innerHTML = "";
      loadBills(); // Reload bills to update the table
      closeEditModal();
    } else {
      alert("Invalid bill index.");
    }
  });
