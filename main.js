song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Model Loaded.");
}

function gotPoses(results){
    if (results.length < 0){
        console.log("no results");
    }
    else {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        console.log(leftWristX);
        leftWristY = results[0].pose.leftWrist.y;
        console.log(leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        console.log(rightWristX);
        rightWristY = results[0].pose.rightWrist.y;
        console.log(rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 500, 400);
    
    fill("blue");
    stroke("blue");

    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = floor(Number (leftWristY));
    volume = InNumberleftWristY/500;
    console.log(volume);
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        
        if(rightWristY >0 && rightWristY <=100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }

        if(rightWristY >100 && rightWristY <=200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }

        if(rightWristY >200 && rightWristY <=300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }

        if(rightWristY >300 && rightWristY <=400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }

        if(rightWristY >400){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}