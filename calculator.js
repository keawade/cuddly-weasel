// Double array for button layout
var buttons = [['7','8','9','+'],['4','5','6','-'],['1','2','3','*'],['0','.','=','/']];

function prep(){
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

// Add heading to header
  var title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'Calculon';
  header.appendChild(title);

// Add container to page
  document.body.appendChild(container);

// Add calculator wrapper div
  calculatorWrap = document.createElement('div');
  calculatorWrap.id = 'calculator';
  main.appendChild(calculatorWrap);

// Add input box
  var box = document.createElement('input');
  box.className = 'cal-box';
  calculatorWrap.appendChild(box);

// Add calculator buttons
  for(var i = 0; i < buttons.length; i++){
    for(var j = 0; j < buttons[i].length; j++){
      var button = document.createElement('button');
      button.className = 'cal-button';
      button.appendChild(document.createTextNode(buttons[i][j]));
      calculatorWrap.appendChild(button);
    }
  }
}

document.body.onload = prep();
