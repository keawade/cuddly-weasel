/* global math */
// Variables
var buttons = ['7', '8', '9', '+',
  '4', '5', '6', '-',
  '1', '2', '3', '*',
  '0', '.', '=', '/',
  'sin', 'cos', '^', 'sqrt',
  'tan', 'cot', '(', ')',
  'e^','ln','clr', '<-','pi'
];

// e^x
// ln()
// Closing paraenthesis bug

var lastNum = 'new';
var answer;
var autoclear = false;

function renderContent() {
  // Create base elements for the page
  var container = createElement('div', '', {
    id: 'container'
  });
  var header = createElement('div', '', {
    id: 'header'
  });
  var nav = createElement('div', '', {
    id: 'nav'
  });
  var main = createElement('div', '', {
    id: 'main'
  });
  var aside = createElement('div', '', {
    id: 'aside'
  });
  var footer = createElement('div', '', {
    id: 'footer'
  });

  // Append main elements to container
  container.appendChild(header);
  container.appendChild(nav);
  container.appendChild(main);
  container.appendChild(aside);
  container.appendChild(footer);

  // Insert content
  header.appendChild(createElement('h1', 'Calculator', {
    className: 'title'
  }));
  main.appendChild(calculator());
  footer.appendChild(footerButtons());
  footer.appendChild(about());

  // Add container to page
  document.body.appendChild(container);
  //document.getElementById('cal-box').focus();
}

function createElement(type, textContent, options) {
  var elem = document.createElement(type);
  elem.textContent = textContent;
  if (options) {
    for (var option in options) {
      elem[option] = options[option];
    }
  }
  return elem;
}

function calculator() {
  var calculatorWrap = createElement('div', '', {
    id: 'calculator'
  }); // Add calculator wrapper div
  calculatorWrap.appendChild(createElement('input', '', {
    className: 'cal-box',
    id: 'cal-box'
  })); // Add input box
  buttons.forEach(function(buttonContent) {
    var button = createElement('button', buttonContent, {
      className: 'cal-button',
      id: buttonContent
    });
    button.addEventListener('click', handleButton, false);
    calculatorWrap.appendChild(button);
  }); // Add calculator buttons
  return calculatorWrap;
}

function footerButtons() {
  var btnWrapper = createElement('div', '');

  var span = createElement('span', 'OFF', { id: 'spantxt' });
  var autoclr = createElement('button', 'Auto Clear: ', { className: 'auto-false', id: 'autoclr' });
  autoclr.addEventListener('click', function(event){
    if(autoclr.className == 'auto-false'){
      autoclr.className = 'auto-true';
      span.textContent = 'ON';
      autoclear = true;
    } else {
      autoclr.className = 'auto-false';
      span.textContent = 'OFF';
      autoclear = false;
    }
  }, false);
  autoclr.appendChild(span);

  var toggle = createElement('button', 'Toggle Theme', { className: 'toggle', id: 'toggle' });
  toggle.addEventListener('click', function(event){
    theme = document.body.className;
    if (theme == 'theme-light') {
      document.body.className = 'theme-dark';
    } else {
      document.body.className = 'theme-light';
    }
  }, false);

  btnWrapper.appendChild(autoclr);
  btnWrapper.appendChild(toggle);
  return btnWrapper;
}

function about() {
  var about = createElement('div','');

  var math = createElement('p', 'Solutions calculated using ');
  math.appendChild(createElement('a', 'math.js', { href: 'http://mathjs.org/'} ));
  about.appendChild(math);

  var creator = createElement('p', 'Created by ');
  creator.appendChild(createElement('a', '@keawade', { href: 'https://github.com/keawade' }));
  about.appendChild(creator);

  return about;
}

// Need to rewrite keypress to be more efficient

// If Enter/Return is pressed, click '=' to evaluate
document.addEventListener('keypress', function(key) {
  var keyString = String.fromCharCode(key.charCode);
  if (key.keyCode == 13) {
    document.getElementById('=').click();
  } else if (/[0-9]|[-/*+=.^()]/.test(keyString)) {
    document.getElementById(keyString).click();
  } else if (key.keyCode == 8) {
    var box = document.getElementById('cal-box')
    if (box === document.activeElement) {
      //
    } else {
      if (box.value == '') {
        // Do nothing
      } else {
        document.getElementById('<-').click();
      }
    }
  } // keyCode 46 is Delete
}, false);

function handleButton(event) {
  var box = document.getElementById('cal-box');

  if (!(box === document.activeElement)) {
    // Solve
    if(autoclear){
      if(lastNum == '=') {
        box.value = '';
      }
    }
    if (event.target.id == '=') {
      var temp = box.value.replace(/ln\(/g, 'log(');
      answer = math.eval(temp);
      if (!isNaN(answer)) {
        box.value = answer;
        if(autoclear){
          lastNum = '=';
        } else {
          lastNum = answer;
        }
      }
    // Clear
    } else if (event.target.id == 'clr') {
      box.value = '';
      lastNum = 'new';
    // Backspace
    } else if (event.target.id == '<-') {
      box.value = box.value.substring(0, box.value.length - 1);
      lastNum = box.value.charAt(box.value.length - 1);
    // Numbers
    } else if (/[0-9]/.test(event.target.id)) {
      box.value = box.value + event.target.id;
      lastNum = event.target.id;
    // Symbols
    } else if (/[-/*+.]/.test(event.target.id)) {
      if(!(/new|[-/*+.]/.test(lastNum))){
        box.value = box.value + event.target.id;
        lastNum = event.target.id;
      }
    } else if (event.target.id == '^'){
      if (/[0-9]|\)/.test(lastNum)) {
        box.value = box.value + '^(';
      }
    } else if (/[\(\)]/.test(event.target.id)) {
      box.value = box.value + event.target.id;
      lastNum = event.target.id;
    // Trig Functions
    } else if (/sin|cos|tan|cot|sqrt|e\^|ln/.test(event.target.id)) {
      box.value = box.value + event.target.id + '('
      lastNum = '(';
    } else if (/pi/.test(event.target.id)){
      box.value = box.value + '(pi)';
      lastNum = ')';
    }
    this.blur();
  }
}
/*

if(!isNaN(event.target.id)) {
  // If last operation was math.eval then start new string
  if(lastNum == 'new') {
    box.value = '';
  }
  // Append new value
  box.value = box.value + event.target.id;
  lastNum = event.target.id;
// If clicked button is not a number
} else {
  // If clicked button is '='
  if(event.target.id == '=') {
    // Evaluate current string
    answer = math.eval(box.value)
    if(isNaN(answer)){
      //
    } else {
      box.value = answer;
    }
    // Note that the last operation was an eval
    lastNum = 'new';
  // If clicked button is an operation
  } else {
    // If the last button clicked was a number, allow the operator to be appended
    if(!isNaN(lastNum)) {
      box.value = box.value + event.target.id;
      lastNum = event.target.id;
    }
  }
}
// Remove keyboard focus on button
this.blur();
} if(event.target.id == '=') {
// Evaluate current string
answer = math.eval(box.value)
if(isNaN(answer)){
  //
} else {
  box.value = answer;
}
// Note that the last operation was an eval
lastNum = 'new';
*/

renderContent();
