var buttons = [['7','8','9','+'],['4','5','6','-'],['1','2','3','*'],['0','.','/']];

function addButtons(array){
  var base = document.getElementById('calculator');
  var row, button, buttonContent;
  for(var i = 0; i < buttons.length; i++){
    row = document.createElement('div');
    for(var j = 0; j < buttons[i].length; j++){
      button = document.createElement('button');
      buttonContent = document.createTextNode(array[i][j]);
      button.appendChild(buttonContent);
      button.className = 'cal-button';
      row.appendChild(button);
    }
    row.className = 'cal-row';
    base.appendChild(row);
  }
}

document.body.onload = addButtons(buttons);
