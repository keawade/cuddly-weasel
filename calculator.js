/* global math */
// Variables
var buttons = ['7','8','9','+','4','5','6','-','1','2','3','*','0','.','=','/'];
var lastNum = '=';

function prep() {
  // Create base elements for the page
  var container = document.createElement('div');
  var header = document.createElement('div');
  var nav = document.createElement('div');
  var main = document.createElement('div');
  var aside = document.createElement('div');
  var footer = document.createElement('div');

  // Apply IDs to the base elements
  container.id = 'container';
  header.id = 'header';
  nav.id = 'nav';
  main.id = 'main';
  aside.id = 'aside';
  footer.id = 'footer';

  // Append main elements to container
  container.appendChild(header);
  container.appendChild(nav);
  container.appendChild(main);
  container.appendChild(aside);
  container.appendChild(footer);

  // Add container to page
  document.body.appendChild(container);

  header.appendChild(heading());
  main.appendChild(calculator());
  footer.appendChild(themeButton());

  var about = document.createElement('p');
  about.appendChild(document.createTextNode('Created by @keawade'));
  footer.appendChild(about);
}

function heading() {
  // Add heading to header
  var title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'Calculon';
  return title;
}

function calculator() {
  // Add calculator wrapper div
  var calculatorWrap = document.createElement('div');
  calculatorWrap.id = 'calculator';

  // Add input box
  var box = document.createElement('input');
  box.className = 'cal-box';
  box.id = 'cal-box';
  calculatorWrap.appendChild(box);

  // Add calculator buttons
  buttons.forEach(function(buttonContent){
    var button = document.createElement('button');
    button.className = 'cal-button';
    button.id = buttonContent;
    button.appendChild(document.createTextNode(buttonContent));
    button.addEventListener('click', handleButton, false);
    calculatorWrap.appendChild(button);
  })
  return calculatorWrap;
}

// If Enter/Return is pressed, click '=' to evaluate
document.addEventListener('keypress', function(key){
  var keyString = String.fromCharCode(key.charCode);
  if(key.keyCode == 13){
    document.getElementById('=').click();
  } else if (/[0-9]|[/*-+=.]/.test(keyString)) {
    document.getElementById(keyString).click();
  }
}, false);

function handleButton(event) {
  // If clicked button is a number
  var box = document.getElementById('cal-box');
  var clickedElem = event.target.id;
  if(!isNaN(clickedElem)) {
    // If last operation was math.eval then start new string
    if(lastNum == 'new') {
      box.value = '';
    }
    // Append new value
    box.value = box.value + clickedElem;
    lastNum = clickedElem;
  // If clicked button is not a number
  } else {
    // If clicked button is '='
    if(clickedElem == '=') {
      // Evaluate current string
      box.value = math.eval(box.value);
      // Note that the last operation was an eval
      lastNum = 'new';
    // If clicked button is an operation
    } else {
      // If the last button clicked was a number, allow the operator to be appended
      if(!isNaN(lastNum)) {
        box.value = box.value + clickedElem;
        lastNum = clickedElem;
      }
    }
  }
  // Remove keyboard focus on button
  this.blur();
}

function themeButton() {
  var themeWrapper = document.createElement('div');
  themeWrapper.id = 'theme-changer';

  var toggle = document.createElement('button');
  toggle.id = 'toggle';
  toggle.className = 'toggle';
  toggle.appendChild(document.createTextNode('Toggle Theme'));
  toggle.addEventListener('click', switchTheme, false);
  themeWrapper.appendChild(toggle);
  return themeWrapper;
}

function switchTheme() {
  theme = document.body.className;
  if(theme == 'theme-light') {
    document.body.className = 'theme-dark';
  } else {
    document.body.className = 'theme-light';
  }
}

document.body.onload = prep();
