//Tracery example by Allison Parrish
//But we'll also create a box to hold our lines as they move
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255); // Clear the background in each frame
  //This moves the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}

//This draws the word with each mouse click
function mouseClicked() {
  var grammar = tracery.createGrammar(grammarSource); //set up tracery library
  grammar.addModifiers(tracery.baseEngModifiers); //set up English grammar properly (capitals and a/an)
  var output = grammar.flatten("#origin#"); //creates sentence from grammar source
  let p = new Particle(mouseX, mouseY, output);
  particles.push(p);
}

// grammarSource is generated using:
// http://tracery.io/ 
// See the tutorial here: http://www.crystalcodepalace.com/traceryTut.html
var grammarSource = {
  "feeling": [
    "we will feel less alone",
    "make this sorrow go away",
    "fill the world with song",
    "the wolrd will be better",
    "we will share their joy",
    
  ],
  "origin": [
    "Ask the #breed# to #result# then #feeling#"
  ],
  "breed": [
    "Dodo",
    "Great Auk",
    "Passenger Pigeon",
    "Carolina Parakeet",
    "Moa",
    "Labrador Duck",
    "Ivory-billed Woodpecker",
    "Giant Moa",
    "New Zealand Quail",
    "Haast's Eagle",
    "Cuban Red Macaw",
    "Slender-billed Curlew",
    "Réunion ibis",
    "Conquered Lorikeet",
    "Pallas's Cormorant",
    "Réunion Owl",
    "Auckland Merganser",
    "Great Kākāpō",
    "Bush Wren",
    "Paradise Parrot",
    "Tahiti Sandpiper",
    "New Zealand Quail",
    "Choiseul Crested Pigeon",
    "Bonin Grosbeak"
  ],
  "result": [
    "fly.",
    "breed again",
    "build a nest for its young",
    "lay eggs for future generations",
    "feed their young",
    "live once more",
    "stay with us",
    "make the world fuller",
    "stop this sadness"
  ]
};

class Particle {
  constructor(x, y, text) {
    //This sets the x value to mouse position
    this.x = x;
    //This keeps the y at mouse position
    this.y = y;
    //This sets the range of x movement - try limiting it to + or -
    this.vx = random(-1, 1);
    //This sets the range of y movement - try limiting it to + or -
    this.vy = random(-1, 1);
    //This sets the text size to be consistent
    this.size = random(15, 20);
    //This sets the current line to the particle
    this.text = text;
    // Dissolve speed
    this.alpha = 255;
  }

  finished() {
    // Check if the particle has moved off the screen
    return (this.x < 0 || this.x > windowWidth || this.y < 0 || this.y > windowHeight);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // Decrease alpha to dissolve
    this.alpha -= 1;
  }

  show() {
    noStroke();
    textSize(this.size);
    //Try any web safe font
    textFont("garamond");
    //This centers the text on the click
    textAlign(CENTER, CENTER);
    //This sets the fill to blue with decreasing alpha
    fill(0, 0, 255, this.alpha);
    //This positions the text
    text(this.text, this.x, this.y);
  }
}