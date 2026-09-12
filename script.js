const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

const calculate = (n1, operator, n2) => {
  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);

  if (operator === 'add') return num1 + num2;
  if (operator === 'subtract') return num1 - num2;
  if (operator === 'multiply') return num1 * num2;
  if (operator === 'divide') return num1 / num2;
};

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return;

  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;

  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

  if (!action) {
    if (displayedNum === '0' || previousKeyType === 'operator') {
      display.textContent = keyContent; 
    } else {
      display.textContent = displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType = 'number';
  }

  if (action === 'decimal') {
    if (previousKeyType === 'operator') {
      display.textContent = '0.';
    } else if (!displayedNum.includes('.')) {
      display.textContent = displayedNum + '.';
    }
    calculator.dataset.previousKeyType = 'decimal';
  }

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    key.classList.add('is-depressed'); 
    calculator.dataset.previousKeyType = 'operator';
    calculator.dataset.firstValue = displayedNum; 
    calculator.dataset.operator = action;         
  }

  if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue && operator) {
      display.textContent = calculate(firstValue, operator, secondValue);
    }
    calculator.dataset.previousKeyType = 'calculate';
  }

  if (action === 'clear') {
    display.textContent = '0';
    delete calculator.dataset.firstValue;
    delete calculator.dataset.operator;
    delete calculator.dataset.previousKeyType;
  }
});