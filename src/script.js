function fetchDataAndDisplayTable() {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        const cryptoPairs = getTop10CryptoPairs(data);
        displayTable(cryptoPairs, data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  
  function getTop10CryptoPairs(data) {
    const cryptoPairs = Object.keys(data);
    const sortedPairs = cryptoPairs.sort((a, b) => parseFloat(data[b].last) - parseFloat(data[a].last));
    return sortedPairs.slice(0, 10);
  }
  
  function displayTable(cryptoPairs, data) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";
  
    cryptoPairs.forEach((pair, index) => {
      const rowData = data[pair];
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${pair}</td>
        <td>${rowData.last}</td>
        <td>${rowData.buy}</td>
        <td>${rowData.sell}</td>
        <td>${rowData.volume}</td>
      `;
      tableBody.appendChild(row);
    });
  
    const selectElements = document.querySelectorAll(".subMenu .base_unit");
  
    selectElements.forEach((select) => {
      select.innerHTML = ""; 
      cryptoPairs.forEach((pair) => {
        const baseUnit = data[pair].base_unit;
        const optionElement = document.createElement("option");
        optionElement.value = baseUnit;
        optionElement.textContent = baseUnit.toUpperCase();
        select.appendChild(optionElement);
      });
    });
  
  }
  
  fetchDataAndDisplayTable();
  
  const body = document.querySelector("body");
  const toggle = document.getElementById("toggle");
  toggle.onclick = function () {
    toggle.classList.toggle("active");
    body.classList.toggle("active");
  };
  
  let seconds = document.querySelector("#time .seconds");
  let ss = document.querySelector("#time #ss");
  let sec_dot = document.querySelector("#time .sec_dot");
  
  let countdown = 60;
  
  let countdownInterval = setInterval(function () {
    seconds.innerHTML = countdown < 10 ? "0" + countdown : countdown;
    ss.style.strokeDashoffset = 220 - (220 * countdown) / 120;
    countdown--;
  
    if (countdown < 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
  