$(document).ready(function() {
  // 이미지를 클릭했을 경우 선택한 이미지를 제외하고, 다른 이미지들은 삭제.
  // 그 후 그림을 그릴 수 있는 canvas가 나타남.
  $("img").click(function() {
    var images = $("img");
    for(var i = 0; i < images.length; i++) {
      if (images[i] != this)
        images[i].remove();
    }
    $("#myCanvas").show();
    $("#submit").show();
    $("img").css("marginLeft", "18%");

    // 타이핑할 정보를 변경한 후 다시 타이핑함.
    // '선택한 모양을 따라 그려주세요.' 라는 문구가 재출력됨
    $(".typing-txt ul").empty();
    $(".typing-txt ul").html("<li>선택한 모양을 오른쪽 공간에 따라 그린 후</li><li>'제출' 버튼을 누르고 잠시만 기다려주세요.</li>");
    $(".typing ul").empty();
    $(".typing ul").html("<li></li><li></li>");

    typingIdx=0;
    liIndex = 0;
    liLength = $(".typing-txt>ul>li").length;
    typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
    typingTxt = typingTxt.split("");
    var tyInt = setInterval(typing,100);
  });

  $("#submit").click(function() {
    var tmp = $("img")[0].src.split("/");
    tmp = tmp[tmp.length-1].split(".")[0];
    image_name = tmp;
    init().then(() => {
      predict();
    });
  });
});

var image_name = "";

var typingBool = false;
var typingIdx=0;
var liIndex = 0;
var liLength = $(".typing-txt>ul>li").length;
var tyInt;

// 타이핑될 텍스트를 가져온다
var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
typingTxt = typingTxt.split(""); // 한글자씩 자른다.
if(typingBool == false) { // 타이핑이 진행되지 않았다면
    typingBool = true;
    var tyInt = setInterval(typing,100); // 반복동작
}

function typing() {
  $(".typing ul li").removeClass("on");
  $(".typing ul li").eq(liIndex).addClass("on");

  if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복
    $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]); // 한글자씩 이어준다.
    typingIdx++;
  } else{
    if(liIndex<liLength-1) {
      //다음문장으로  가기위해 인덱스를 1증가
      liIndex++;
      //다음문장을 타이핑하기위한 셋팅
      typingIdx=0;
      typingBool = false;
      typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

      //다음문장 타이핑전 1초 쉰다
       clearInterval(tyInt);
        //타이핑종료

       setTimeout(function(){
         //1초후에 다시 타이핑 반복 시작
          tyInt = setInterval(typing,100);
        },1000);
    } else if(liIndex==liLength-1){

     //마지막 문장까지 써지면 반복종료
       clearInterval(tyInt);
    }
  }
}



// 출처 : https://kkk-kkk.tistory.com/entry/%EC%98%88%EC%A0%9C-11-11-%EB%A7%88%EC%9A%B0%EC%8A%A4-%EB%93%9C%EB%9E%98%EA%B9%85%EC%9C%BC%EB%A1%9C-%EC%BA%94%EB%B2%84%EC%8A%A4%EC%97%90-%EA%B7%B8%EB%A6%BC-%EA%B7%B8%EB%A6%AC%EA%B8%B0
// canvas에 마우스로 그림그리기
var canvas, context;
function init_canvas() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

    context.lineWidth = 2; // 선 굵기를 2로 설정
    context.strokeStyle = "blue";

    // 마우스 리스너 등록. e는 MouseEvent 객체
    canvas.addEventListener("mousemove", function (e) { move(e) }, false);
    canvas.addEventListener("mousedown", function (e) { down(e) }, false);
    canvas.addEventListener("mouseup", function (e) { up(e) }, false);
    canvas.addEventListener("mouseout", function (e) { out(e) }, false);
}

var startX=0, startY=0; // 드래깅동안, 처음 마우스가 눌러진 좌표
var drawing=false;
function draw(curX, curY) {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(curX, curY);
    context.stroke();
}
function down(e) {
    startX = e.offsetX; startY = e.offsetY;
    drawing = true;
}
function up(e) { drawing = false; }
function move(e) {
    if(!drawing) return; // 마우스가 눌러지지 않았으면 리턴
    var curX = e.offsetX, curY = e.offsetY;
    draw(curX, curY);
    startX = curX; startY = curY;
}
function out(e) { drawing = false; }

init_canvas();


// teachable machine
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/o--Hr7b4S/";

let model, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(canvas, false);
    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].className == image_name) {
        // 만약 고른 이미지의 도형과 그린 이미지의 도형이 90%이상 같을 경우 통과
        if (prediction[i].probability.toFixed(2) >= 0.9) {
            alert("두 번째 게임에 통과하였습니다.");
        } else {
            alert("실패하였습니다.");
        }
        location.href = "./intro.html";
      }
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    }
}
