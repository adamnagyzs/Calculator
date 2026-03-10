function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

resultContainer = document.getElementById("resultContainer");

let firstNum = "";
let secondNum = "";
let operator = "";
let currentElement = "";

const numberButtons = document.querySelectorAll(".numberButton");

const buttonClear = document.getElementById("buttonClear");
buttonClear.addEventListener("click", () => {
  firstNum = "";
  secondNum = "";
  operator = "";
  resultContainer.textContent = "";
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!operator) {
      firstNum += button.textContent;
      currentElement = firstNum;
    } else {
      secondNum += button.textContent;
      currentElement = secondNum;
    }
    resultContainer.textContent = `${firstNum} ${operator} ${secondNum}`;
  });
});

const operatorButtons = document.querySelectorAll(".operatorButton");

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!operator) {
      resultContainer.textContent = firstNum;
      operator = button.textContent;
      resultContainer.textContent += ` ${operator} `;
      currentElement = operator;
    } else if (operator && secondNum) {
      firstNum = operations[operator](Number(firstNum), Number(secondNum));
      secondNum = "";
      operator = button.textContent;
      resultContainer.textContent = `${firstNum} ${operator}`;
    }
  });
});

const operations = {
  "+": add,
  "-": subtract,
  x: multiply,
  "÷": divide,
};

const equalButton = document.getElementById("equalButton");
equalButton.addEventListener("click", () => {
  firstNum = operations[operator](Number(firstNum), Number(secondNum));
  secondNum = "";
  operator = "";
  resultContainer.textContent = firstNum;
});
