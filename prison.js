let num = 10

// get random number 
function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
}

// shuffle array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}



let prisonners = []

let names = []
// set names to make into objects
for (let i = 0; i < num; i++) {
    names.push("prisonner"+i)
}

// turn names into objects and give name id, opened, found
for (let i = 0; i < names.length; i++) {    
    names[i] = new Object();
    names[i].name = "prisonner"+(i+1)
    names[i].id = i+1
    names[i].opened = 0
    names[i].found = false
    prisonners.push(names[i])
}

let boxNames = []
// set boxes to make into objects
for (let i = 0; i < num; i++) {
    boxNames.push("box"+i)
}

let boxes = []
// turn boxes into objects and give them name, content, opened
for (let i = 0; i < num; i++) {
    boxNames[i] = new Object();
    boxNames[i].name = "box"+(i+1)
    boxNames[i].opened = false

    boxNames[i].content = i+1

    boxes.push(boxNames[i])
}

// randomize box numbers

let numbers = []
// start with array of numbers from 1 - max
for (let i = 1; i <= num; i++) {
    numbers.push(i)
}
shuffle(numbers)

// put random nums in box
for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.content = numbers[i]
}

// =============================================

// did prisonner find their number
function checkIfFound(prisonner, box){
    if (prisonner.id === box.content) {
        return true
    } else{return false}
}

