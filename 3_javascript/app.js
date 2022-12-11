const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const inputDiv = document.getElementById("input");
const formDiv = document.getElementById("form");
const outputDiv = document.querySelector(".output");
const tableDiv = document.getElementById("table");
tableDiv.style.opacity = 0;

function addingOption(country, currency, selectDiv) {
   let optionDiv = document.createElement("option");
   optionDiv.setAttribute("value", currency);
   optionDiv.append(country);
   selectDiv.append(optionDiv);
}

for (let x in data.rates) {
   addingOption(x, Number(data.rates[x].replace(",", "")), fromSelect);
   addingOption(x, Number(data.rates[x].replace(",", "")), toSelect);
}

function fromTableFun(value, select) {
   return value + " " + select.options[select.options.selectedIndex].innerText;
}

function addingTableData(date, fromValue, toValue) {
   tableDiv.innerHTML += `<tr>
   <td>${date}</td>
   <td>${fromValue}</td>
   <td>${toValue}</td>
</tr>`;
}

function saveTable() {
   localStorage.setItem("record", tableDiv.innerHTML);
}

formDiv.addEventListener("submit", function (e) {
   e.preventDefault();
   let inputValue = inputDiv.value;
   let fromValue = fromSelect.value;
   let toValue = toSelect.value;

   let outputValue = (inputValue * fromValue) / toValue;
   let tableDate = new Date().toLocaleString();

   if (fromValue == 1 && toValue != 1) {
      let toFixOutput = outputValue.toFixed(5);
      outputDiv.innerText = toFixOutput;

      let fromTable = fromTableFun(inputValue, fromSelect);
      let toTable = fromTableFun(toFixOutput, toSelect);
      addingTableData(tableDate, fromTable, toTable);
      saveTable();
   } else {
      let toFixOutput = outputValue.toFixed(2);
      outputDiv.innerText = toFixOutput;

      let fromTable = fromTableFun(inputValue, fromSelect);
      let toTable = fromTableFun(toFixOutput, toSelect);
      addingTableData(tableDate, fromTable, toTable);
      saveTable();
   }

   inputDiv.value = "";
   inputDiv.focus();
   fromSelect.value = 1;
   toSelect.value = 1;
   tableDiv.style.opacity = 1;
});

window.addEventListener("load", () => {
   if (localStorage.getItem("record")) {
      tableDiv.style.opacity = 1;
      tableDiv.innerHTML = localStorage.getItem("record");
   }
});
