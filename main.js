function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(canvascheck);
    synth = window.speechSynthesis;
}
function clearcanvas(){
    background("white");
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
  strokeWeight(13);
  stroke("black");
  if(mouseIsPressed){
      line(pmouseX, pmouseY, mouseX, mouseY);
  }    
}
function canvascheck(){
   classifier.classify(canvas, gotresults);
}

function gotresults(error, results){
    if(error){
        console.error(error);
    }
    else{
        document.getElementById("Item_label").innerHTML = "label: " + results[0].label;
        document.getElementById("strength").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";

        utterthis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterthis);
    }
}