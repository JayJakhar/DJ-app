song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rigthWristY=0;
scoreLeft=0;
scoreRight=0;
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log("poseNet is initialized");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeft=results[0].pose.keypoints[9].score;
        scoreRight=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist= "+scoreLeft+" scorerightWrist= "+scoreRight);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+" leftWristY= "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightWristX+" rightWristY= "+rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreRight>0.2)
    {

    
    circle(rightWristX,rightWristY,20);
    if(rghtWristY>0 && rightWristY<=100)

    {

        document.getElementById("speed").innerHTML="Speed= 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML="Speed= 1x";
        song.rate(1);
    }
    
        else if(rightWristY>200 && rightWristY<=300)
        {
            document.getElementById("speed").innerHTML="Speed=1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY <=400)
        {
            document.getElementById("speed").innerHTML="Speed=2x";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500)
        {
            document.getElementById("speed").innerHTML="Speed=2.5x";
            song.rate(2.5);
        }
    }
        
        
    
    if(scoreLeft>0.2)
    {
    circle(leftWristX,leftWristY,20);
    innumberLeftWristY=Number(leftWristY);
    remove_decimals=floor(innumberLeftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);
    }
}
function preload()
{
    song=loadSound("music.mp3");
}
function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(2);
}