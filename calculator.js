var buttons = [['7','8','9','+'],['4','5','6','-'],['1','2','3','*'],['0','.','=','/']];

function addBox(base){
  var box = document.createElement('input');
  box.className = 'cal-box';
  base.appendChild(box);
}

function addButtons(base, array){
  var row, button, buttonContent;
  for(var i = 0; i < buttons.length; i++){
//    row = document.createElement('div');
    for(var j = 0; j < buttons[i].length; j++){
      button = document.createElement('button');
      buttonContent = document.createTextNode(array[i][j]);
      button.appendChild(buttonContent);
      button.className = 'cal-button';
      base.appendChild(button);
    }
//    row.className = 'cal-row';
//    base.appendChild(row);
  }
}

function prep(){
  var title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'Calculon';
  document.body.appendChild(title);

  var container = document.createElement('div');
  container.id = 'calculator';
  document.body.appendChild(container);

  var baseDiv = document.getElementById('calculator');

  addBox(baseDiv);
  addButtons(baseDiv, buttons);
}

document.body.onload = prep();
