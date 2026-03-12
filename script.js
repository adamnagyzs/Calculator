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
  if (b !== 0) {
    return a / b;
  } else {
    divideByZero = true;
  }
  return null;
}

function clear() {
  firstNum = "";
  secondNum = "";
  operator = "";
  divideByZero = false;
  resultContainer.textContent = "";
}

function pressNumbers(e) {
  const button = e.target;

  if (!operator) {
    firstNum += button.textContent;
  } else {
    secondNum += button.textContent;
  }
  updateDisplay();
}

function pressOperators(e) {
  const button = e.target;
  const clickedOperator = button.textContent;

  if (!firstNum) return;

  if (secondNum) {
    const result = operations[operator](Number(firstNum), Number(secondNum));
    if (divideByZero) {
      clear();
      resultContainer.textContent = "Cannot divide with 0";
      return;
    }
    firstNum = result;
    secondNum = "";
  }

  operator = clickedOperator;

  resultContainer.textContent = `${firstNum} ${operator}`;
}

function pressEqual() {
  if (!secondNum) {
    return;
  }
  firstNum = operations[operator](Number(firstNum), Number(secondNum));
  if (divideByZero) {
    clear();
    resultContainer.textContent = "Cannot divide with 0";
  } else {
    secondNum = "";
    operator = "";
    resultContainer.textContent = firstNum;
  }
}

function pressDot() {
  if (!operator) {
    if (!firstNum.includes(".")) {
      if (firstNum === "") {
        firstNum = "0";
      }
      firstNum += ".";
    }
  } else {
    if (!secondNum.includes(".")) {
      if (secondNum === "") {
        secondNum = "0";
      }
      secondNum += ".";
    }
  }

  updateDisplay();
}

function pressDel() {
  if (!operator) {
    firstNum = firstNum.slice(0, -1);
  } else if (operator && !secondNum) {
    operator = "";
  } else {
    secondNum = secondNum.slice(0, -1);
  }

  updateDisplay();
}

function updateDisplay() {
  resultContainer.textContent = `${firstNum} ${operator} ${secondNum}`;
}

const operations = {
  "+": add,
  "-": subtract,
  x: multiply,
  "÷": divide,
};

const resultContainer = document.getElementById("resultContainer");

let firstNum = "";
let secondNum = "";
let operator = "";
let divideByZero = false;

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clear);

const numberButtons = document.querySelectorAll(".numberButton");
numberButtons.forEach((button) => {
  button.addEventListener("click", pressNumbers);
});

const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach((button) => {
  button.addEventListener("click", pressOperators);
});

const equalButton = document.getElementById("equalButton");
equalButton.addEventListener("click", pressEqual);

const dotButton = document.getElementById("dotButton");
dotButton.addEventListener("click", pressDot);

const delButton = document.getElementById("delButton");
delButton.addEventListener("click", pressDel);

document.addEventListener("keydown", (e) => {
  const btn = document.querySelector(`[data-key="${e.key}"]`);
  if (btn) btn.click();
});
