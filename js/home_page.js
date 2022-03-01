let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  empPayrollList = getEmployeeDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
});

const getEmployeeDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

const createInnerHtml = () => {
  const headerHtml = `<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>`;
  if (empPayrollList.length == 0) return;
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of empPayrollList) {
    innerHtml = `${innerHtml} 
  <tr> 
    <td>
      <img class="profile" src="../assets/${empPayrollData._profilePic}" alt="">
    </td> 
    <td>${empPayrollData._name}</td> 
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td> 
    <td>₹ ${empPayrollData._salary}</td> 
    <td>${empPayrollData._startDate}</td> 
    <td> 
      <img name="${empPayrollData._id}" onClick="remove(${empPayrollData._id})" src="../assets/icons/delete-black-18dp.svg" alt="delete">
      <img name="${empPayrollData._id}" onclick="update(${empPayrollData._id})" src="../assets/icons/create-black-18dp.svg" alt="edit">    
    </td> 
  </tr>`;
  }
  document.querySelector("#display").innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
  }
  return deptHtml;
};

const remove = (node) => {
  console.log(node)
  let empPayrollData = empPayrollList.find(empData => empData._id == node); 
  if (!empPayrollData) 
    return; 
  const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id); 
  empPayrollList.splice(index, 1); 
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList)); 
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  console.log("Deleted")
  createInnerHtml(); 
} 

const update=(node)=>{
  localStorage.setItem("empEdit",node)
  window.location.replace("../pages/form.html")
}