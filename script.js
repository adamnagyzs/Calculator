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

const buttonClear = document.getElementById("buttonClear");
buttonClear.addEventListener("click", clear);

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
