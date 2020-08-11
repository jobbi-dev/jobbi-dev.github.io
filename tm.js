let canvas;
let video;
let classifier;
let flippedVideo;

let label = "...waiting";

function preload(){
  //add a link to your own data set here
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9_R9scb2/model.json');
}

function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 video = createCapture(VIDEO);
 video.size(640, 480);
 video.hide();

 flippedVideo = ml5.flipImage(video);

 classifyVideo();

}

function classifyVideo(){
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResults);
}

function gotResults(error, results){
  if(error){
    console.log(error);
    return
  }
  label = results[0].label;
  classifyVideo();
  console.log(results);
}

function draw() {
  background(0);
  image(video, 0, 0);

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width/2, height - 16);


}
