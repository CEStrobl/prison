let num = 100
let maxOpened = num/2

let mode = "text"

function narrate(text) {
    if(mode === "text"){
        narrate = console.log
    }
}

function silence() {
    narrate = function() {}
}

function unsilence() {
    narrate = function (text) {
        if(mode === "text"){
            narrate = console.log
        }
    }
}


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



let prisoners = []

let names = []
// set names to make into objects
for (let i = 0; i < num; i++) {
    names.push("prisoner"+i)
}

// turn names into objects and give name id, opened, found
for (let i = 0; i < names.length; i++) {    
    names[i] = new Object();
    names[i].name = "prisoner"+(i+1)
    names[i].id = i+1
    names[i].opened = 0
    names[i].found = false
    prisoners.push(names[i])
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

function closeAllBoxes() {
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        box.opened = false
    }
}

let results = []

// method 1: look through first half boxes
function method1(){

    let foundIds = 0

    for (let i = 0; i < prisoners.length; i++) {
        const prisoner = prisoners[i];

        narrate(">> It's ", prisoner.name, "'s turn.")
        
        
        let looking = true
        
        while (looking) {
            for (let o = 0; o < boxes.length; o++) {
                const box = boxes[o];
                box.opened = true
                prisoner.opened++
                narrate("     ", box.name,"had", box.content, "inside.")
                
                if (box.content === prisoner.id) {
                    narrate("     ", box.content, "matches the prisoner's id ", prisoner.id)
                    narrate("     Because of that, moving on to the next prisoner.")
                    narrate("     ")
                    narrate("     ")
                    prisoner.found = true
                    foundIds++
                    looking = false
                    o = num*10
                    break
                } else if(prisoner.opened === maxOpened) {
                    narrate("     ")
                    narrate("     Reached max boxes opened. Moving on.")
                    narrate("     ")
                    looking = false
                    o = num*10
                    break
                }
            }
        }


        closeAllBoxes()

    }

    narrate("  ===  Total Ids Found ", foundIds, " out of ", num, " prisoners", "  ===  ")
    results.push(foundIds)
}



// method 2: go to the box that the content tells you to. 
function method2(){

    let foundIds = 0

    for (let i = 0; i < prisoners.length; i++) {
        const prisoner = prisoners[i];

        narrate(">> It's ", prisoner.name, "'s turn.")

        let firstBox = boxes[getRandom(0,boxes.length)]

        firstBox.opened = true
        prisoner.opened++
        narrate("     ", firstBox.name,"had", firstBox.content, "inside.")

        let target = firstBox.content
        for (let o = 0; o < maxOpened; o++) {

            let box = boxes[target-1]

            box.opened = true
            prisoner.opened++
            narrate("     ", box.name,"had", box.content, "inside.")

            if (box.content === prisoner.id) {
                narrate("     ", box.content, "matches the prisoner's id ", prisoner.id)
                narrate("     Because of that, moving on to the next prisoner.")
                narrate("     ")
                narrate("     ")
                prisoner.found = true
                foundIds++
                o = num*10
                break
            } else if(prisoner.opened === maxOpened) {
                narrate("     ")
                narrate("     Reached max boxes opened. Moving on.")
                narrate("     ")
                o = num*10
                break
            }

            target = box.content
            
        }

        closeAllBoxes()

    }

    narrate("  ===  Total Ids Found ", foundIds, " out of ", num, " prisoners", "  ===  ")
    results.push(foundIds)
}

method2()


function findTheAverage(array){
    let sum = 0
    for (let index = 0; index < array.length; index++) {
        const x = array[index];
        sum+=x
    }
    sum/=array.length
    return sum
}


let runtime = 10000

for (let i = 0; i < runtime; i++) {
    silence()
    method2()
}
unsilence()
narrate("     ")
narrate("     ")
narrate("  ===  Average IDs found", findTheAverage(results), "  ===  ")


