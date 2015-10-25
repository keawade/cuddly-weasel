/* global math */
// Variables
var buttons = [['7','8','9','+'],['4','5','6','-'],['1','2','3','*'],['0','.','=','/']];
var theme = 'dark';
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

  heading(header);
  calculator(main);
  themeButtons(footer);

  var about = document.createElement('p');
  about.appendChild(document.createTextNode('Created by keawade'));
  footer.appendChild(about);
}

function heading(head) {
  // Add heading to header
  var title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'Calculon';
  head.appendChild(title);
}

function calculator(base) {
  // Add calculator wrapper div
  var calculatorWrap = document.createElement('div');
  calculatorWrap.id = 'calculator';
  base.appendChild(calculatorWrap);

  // Add input box
  var box = document.createElement('input');
  box.className = 'cal-box';
  box.id = 'cal-box';
  calculatorWrap.appendChild(box);

  // Add calculator buttons
  for(var i = 0; i < buttons.length; i++) {
    for(var j = 0; j < buttons[i].length; j++) {
      var buttonContent = buttons[i][j];
      var button = document.createElement('button');
      button.className = 'cal-button';
      button.id = buttonContent;
      button.appendChild(document.createTextNode(buttonContent));
      button.addEventListener('click', function(event) {
        // If clicked button is a number
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
            box.value = math.eval(box.value);
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
      }, false);
      calculatorWrap.appendChild(button);
    }
  }
  // If Enter/Return is pressed, click '=' to evaluate
  document.onkeypress = function(key){
    console.log(key);
    if(key.keyCode == 13){
      document.getElementById('=').click();
    }
  }
}

function themeButtons(base) {
  var themeWrapper = document.createElement('div');
  themeWrapper.id = 'theme-changer';
  base.appendChild(themeWrapper);

  var toggle = document.createElement('button');
  toggle.id = 'toggle';
  toggle.className = 'toggle';
  toggle.appendChild(document.createTextNode('Toggle Theme'));
  toggle.addEventListener('click', switchTheme, false);
  themeWrapper.appendChild(toggle);
}

function switchTheme() {
  var current = document.getElementsByTagName("link").item(2);
  if(theme == 'light') {
    theme = 'dark';
    changeCSS('themes/dark.css', 2);
  } else {
    theme = 'light';
    changeCSS('themes/light.css', 2);
  }
}

function changeCSS(cssFile, cssLinkIndex) {
  var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", cssFile);
  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

document.body.onload = prep();
