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

resultContainer = document.getElementById("resultContainer");

let firstNum = "";
let secondNum = "";
let operator = "";
let divideByZero = false;

const numberButtons = document.querySelectorAll(".numberButton");

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clear);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!operator) {
      firstNum += button.textContent;
    } else {
      secondNum += button.textContent;
    }
    resultContainer.textContent = `${firstNum} ${operator} ${secondNum}`;
  });
});

const operatorButtons = document.querySelectorAll(".operatorButton");

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
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
  if (divideByZero) {
    clear();
    resultContainer.textContent = "Cannot divide with 0";
  } else {
    secondNum = "";
    operator = "";
    resultContainer.textContent = firstNum;
  }
});
const dotButton = document.getElementById("dotButton");

dotButton.addEventListener("click", () => {
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

  resultContainer.textContent = `${firstNum} ${operator} ${secondNum}`;
});

const delButton = document.getElementById("delButton");

delButton.addEventListener("click", () => {
  if (!operator) {
    firstNum = firstNum.slice(0, -1);
  } else if (operator && !secondNum) {
    operator = "";
  } else {
    secondNum = secondNum.slice(0, -1);
  }

  resultContainer.textContent = `${firstNum} ${operator} ${secondNum}`;
});
