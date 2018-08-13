        var gridSize = 0;
        var gridArray = [];
        var adjacentNodes = [];
        var selectedNodes = [];
        var noofMovesUsed = 0;
        var noOfmoves = 0;
        var selectedColor = '';

                   //event listeners for color button
        document.getElementById("btnRed").addEventListener("click",function(){changeColor('red');},false);
        document.getElementById("btnBlue").addEventListener("click",function(){changeColor('blue')},false);
        document.getElementById("btnLightBlue").addEventListener("click",function(){changeColor('lightblue')},false);
        document.getElementById("btnGreen").addEventListener("click",function(){changeColor('green')},false);
        document.getElementById("btnGray").addEventListener("click",function(){changeColor('gray')},false);
        document.getElementById("btnPink").addEventListener("click",function(){changeColor('pink')},false);
    
        //event listeners for grid generators.

        document.getElementById("btnFourGrid").addEventListener("click",function(){createDynamicGrid(4,7)},false);
        document.getElementById("btnEightGrid").addEventListener("click",function(){createDynamicGrid(8,14)},false);
        document.getElementById("btnTwelveGrid").addEventListener("click",function(){createDynamicGrid(12,21)},false);
     
    
     
        //by default 4*4 table gets created 
        createDynamicGrid(4, 7);
        //default selection of the top left cells of the grid
        changeColor(gridArray[0], true);
    
    
        //function when user makes changes and an updated grid gets created.
        function createGridBySelection() {
    
          var divGrid = document.getElementById("divGrid");
          divGrid.innerHTML = "";
          var table = document.createElement('table'); //dynamic table element created.
          for (i = 0; i < gridArray.length; i++) {
            var tr, td;
            if (i == 0)
              tr = document.createElement('TR');
    
            td = document.createElement('TD');
    
            var colorFromGrid = gridArray[i];
            td.setAttribute('color', colorFromGrid);
            td.style = "background-color:" + colorFromGrid;
    
            //This condition means that these grids are in the selection.
            if (selectedNodes.includes(i)) //highlighted by border 
            {
              td.style.border = "2px solid black";
            }
    
            td.width = '200px';
            td.height = '50px';
            td.color = colorFromGrid;
            tr.appendChild(td);
            //if grid ends or not first time.
            if ((((i + 1) % gridSize) == 0) && i != 0) {
              table.appendChild(tr);
              tr = document.createElement('TR');
            }
          }
          divGrid.appendChild(table);//dynamic grid added to the div.
        }
    
        //function to create dynamic grid.
        function createDynamicGrid(arraySize, noofMoves) {
          selectedNodes = [];
          selectedNodes.push(0);//intialization.
          adjacentNodes=[];
          noofMovesUsed=0;
    
    
          var noOfMovesAvailable = document.getElementById('noOfMovesAvailable')
          noOfMovesAvailable.innerHTML = noofMoves;//number of moves available
          var noOfMovesdone = document.getElementById('noOfMovesdone')
          noOfMovesdone.innerHTML = 0;//reset to zero
          noOfmoves = noofMoves;
          var message = document.getElementById('paraMessage');
          message.innerHTML = '';
    
          gridSize = arraySize;//grid size 4 if 4*4
          var divGrid = document.getElementById("divGrid");
          divGrid.innerHTML = "";
          var table = document.createElement('table');
          gridArray = new Array(gridSize * gridSize);
    
          var colorArray = ['red', 'blue', 'lightblue', 'green', 'gray', 'pink'];
          //TABLE ROWS
          for (i = 0; i < gridArray.length; i++) {
    
            var tr, td;
            if (i == 0)
              tr = document.createElement('TR');
    
            td = document.createElement('TD');
            var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
            td.setAttribute('Colour', randomColor);
            td.style = "background-color:" + randomColor;
            td.width = '200px';
            td.height = '50px';
            td.colour = randomColor;
            tr.appendChild(td);
            gridArray[i] = randomColor;
    
            if ((((i + 1) % gridSize) == 0) && i != 0)//if grid ends or not first time.
            {
              table.appendChild(tr);
              tr = document.createElement('TR');
            }
          }
          divGrid.appendChild(table);
          //selecting first cell.
          selectedColor = gridArray[0];
    
          changeColor(gridArray[0], true);
        }
    
        //func to sort out adjacent nodes and color them as selected by the user.
        function getAllNodesandColorThem() {
          adjacentNodes = []; //adjacent nodes of a particular node.
          var adjacentNodesTemp = [];
          var selectedNodesTemp = [];
          //first we check the adjacent nodes of all the nodes that are in selection.
          //for the first time first node will be in the selection.
          for (var indexOuter = 0; indexOuter < selectedNodes.length; indexOuter++) {
            adjacentNodes = [];
            findAllAdjacentNode(selectedNodes[indexOuter] + 1);
            adjacentNodesTemp = adjacentNodes.slice(); //copied by value.
    
            //begins :sorting by color and 'if not existing in the selection nodes'
            for (let indexInner = 0; indexInner < adjacentNodes.length; indexInner++) {
    
              // First we sort those nodes that have the same color as clicked by user.
              if (!(gridArray[adjacentNodes[indexInner] - 1] == selectedColor)) {
                //first find the index of the value in temp array.
                var indexofElement = adjacentNodesTemp.indexOf(adjacentNodes[indexInner]);
                adjacentNodesTemp.splice(indexofElement, 1); //remove from temp adjacent nodes
    
              }
              // Second, we remove those nodes that are already in the selected nodes.
              else if (selectedNodes.includes(adjacentNodes[indexInner] - 1)) {
                //first find the index of the value in temp array.
                var indexofElement = adjacentNodesTemp.indexOf(adjacentNodes[indexInner]);
                adjacentNodesTemp.splice(indexofElement, 1); //remove from temp adjacent nodes
    
              }
              //here we can add new nodes to the selectedNodes array.
              else {
                //here it means this is the latest node to be added to the selection nodes.
                selectedNodes.push(adjacentNodes[indexInner] - 1);
              }
            } //ends :  sorting by color and 'if not existing in the selection nodes'
    
            adjacentNodes = adjacentNodesTemp.slice();
    
            selectedNodes = Array.from(new Set(selectedNodes)); //removing any reduntant value if any.
    
            //begins : loop to change the colors in the gridArray accroding to selectedNodes
            for (let indexSelected = 0; indexSelected < selectedNodes.length; indexSelected++) {
              gridArray[selectedNodes[indexSelected]] = selectedColor;
            } // ends : loop to change the colors in the gridArray accroding to selectedNodes.
    
          }//outer for loop ends
    
          //if there is no adjacent nodes to be traversed, loop out otherwise recursion occurs.
          if (adjacentNodes.length > 0)
            getAllNodesandColorThem();
    
        }
    
    
        //function to color cells on the basis of the button click.
        function changeColor(color, ifFirstTime) {
          //assign value of the color selected by the user to a global variable 
          selectedColor = color;
    
          //first node will automatically change to the colored intended by the user.
          gridArray[0] = selectedColor;
    
          if (!ifFirstTime)
            noofMovesUsed += 1;
    
          var moves = document.getElementById('noOfMovesdone');
          moves.innerHTML = noofMovesUsed;
    
    
          // if (noofMovesUsed <= noOfmoves) {
    
            //function which executes in a recursive manner till it finds all the nodes with the same color.
            getAllNodesandColorThem();
    
            //Create a new grid on the basis of the selected nodes.
            createGridBySelection();
    
            //begins : condition when selectedNodes are equal to the gridSize means User wins.
            if (selectedNodes.length == (gridSize * gridSize)) {
    
              var message = document.getElementById('paraMessage');
              message.innerHTML = 'You won !!!';
    
            }
    
          // }
          // else if((noofMovesUsed == noOfmoves) && selectedNodes.length == (gridSize * gridSize))
          // {
    
          //   var message = document.getElementById('paraMessage');
          //     message.innerHTML = 'You won !!!';
    
          // }
          // else {
          //   var message = document.getElementById('paraMessage');
          //   message.innerHTML = 'You lose the game !!!';
          // }
        }
    
        //function to get all the adjacent nodes of a particular node.
        function findAllAdjacentNode(node) {
          var block = gridSize;
    
          var Node = parseInt(node);
    
          var isFirstrow = false, isLastColumn = false, isLastRow = false;
          var isFirstColumn = false;
    
          if (Node % block == 0) {
            isLastColumn = true;
          }
    
          for (i = 1; i < block * i; i++) {
            if (Node <= (block * i)) {
              if (i == block) {
                isLastRow = true;
              }
              if (Node <= block) {
                isFirstrow = true;
              }
              if (Node == ((block * i) - (block) + (1))) {
                isFirstColumn = true;
              }
              break;
            }
            else
              continue;
          }
    
    
          if (isFirstrow) {
            if (isFirstColumn) {
              adjacentNodes.push(Node + 1);
              adjacentNodes.push(Node + block);
            }
            else if (isLastColumn) {
              adjacentNodes.push(Node - 1);
              adjacentNodes.push(Node + block);
            }
            else {
              adjacentNodes.push(Node - 1);
              adjacentNodes.push(Node + block);
              adjacentNodes.push(Node + 1);
            }
          }
    
          else if (isLastRow) {
            if (isFirstColumn) {
              adjacentNodes.push(Node + 1);
              adjacentNodes.push(Node - block);
            }
            else if (isLastColumn) {
              adjacentNodes.push(Node - 1);
              adjacentNodes.push(Node - block);
            }
            else {
              adjacentNodes.push(Node - 1);
              adjacentNodes.push(Node - block);
              adjacentNodes.push(Node + 1);
            }
    
          }
          else {
            if (isFirstColumn) {
              adjacentNodes.push(Node - block);
              adjacentNodes.push(Node + 1);
              adjacentNodes.push(Node + block);
            }
            else if (isLastColumn) {
              adjacentNodes.push(Node - 1);
              adjacentNodes.push(Node - block);
              adjacentNodes.push(Node + block);
            }
            else {
              adjacentNodes.push(Node - 1);
              adjacentNodes.push(Node - block);
              adjacentNodes.push(Node + 1);
              adjacentNodes.push(Node + block);
            }
          }
        }