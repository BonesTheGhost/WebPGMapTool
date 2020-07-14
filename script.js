console.log("[script.js]:: Attached and working properly!");

//Test string:: ####################$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbccccccccccccccccccccddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffgggggggggggggggggggghhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkllllllllllllllllllllmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnnnooooooooooooooooooooppppppppppppppppppppqqqqqqqqqqqqqqqqqqqq

//global scope so they can be referenced in later logic and update from anywhere.
let mapHeight = 1;
let mapWidth = 1;
let tooManyCharacters = false;

let totalChars = mapHeight * mapWidth;
let charCursor = 0;

//an array to hold the chars of textarea to increment through later.
let textAreaContent = [];

let column = [];

//global map container
let mapArray = [];

//get Parameters and display map input.
document.getElementById("createInputButton").onclick = function() {
  mapHeight = document.getElementById("mapHeight").value;
  mapWidth = document.getElementById("mapWidth").value;

  totalChars = mapHeight * mapWidth;
  console.log("[Map Dimensions (H x W) : total chars]:: ", mapHeight, " x ", mapWidth, " : ", totalChars);

  //update the textarea size for easier input.
  //Spent a TON of time messing with this. Textarea does NOT scale consistently... period.
  document.getElementById("mapInput").setAttribute("rows", mapHeight);
  document.getElementById("mapInput").setAttribute("cols", mapWidth);
  //display the text area.
  document.getElementById("mapInput").setAttribute("class", "show textarea");
}

document.getElementById("mapInput").onkeyup = function() {
  if(charLimit(this.value)){
    console.log("too many characters!")
  };
}

//This reads the stuff in the input area and spreads into textAreaContent[].
document.getElementById("generateButton").onclick = function() {

  if(!tooManyCharacters){
    //grab the entire string with no \n or spaces
  contentString = document.getElementById("mapInput").value.split("");
  //spread it into textAreaContent (split may be redundant).
  textAreaContent = [...contentString];
  console.log(textAreaContent);
  
  createMapData();
  }else{
    document.getElementById("outputSection").innerHTML = "too many characters too generate!";
  }
  
}

function charLimit(currentChars){
  if(currentChars.length > totalChars){
    tooManyCharacters = true;
    return true;
  } else
  return false;
}

//Copies each character of textAreaContent[] of nth (mapWidth) index into a column array. Then pushes all columns into mapArray[].
sortColumns = () => {
  for(i=0; i<mapWidth; i++){
    //reset the column container
    column=[];

    for(charCursor; charCursor<totalChars; charCursor+=mapHeight){
      let char = textAreaContent[charCursor];
      column.push(char);
    }
    charCursor++;

    mapArray.push(column);
  }
}

createMapData = () => {

  sortColumns();

  console.log("[mapArray]:: ", mapArray);
}