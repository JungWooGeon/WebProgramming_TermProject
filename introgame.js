/*
  글자 타이핑 효과는 https://gahyun-web-diary.tistory.com/2을 참고하여 구현하였음
  타이핑을 제외하고 fadein fadeout 화면 이동, timeout 등은 모두 직접 구현
*/

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
    setTimeout(function() {
      var tyInt = setInterval(typing,100); // 반복동작
    }, 3000);
    setTimeout(function() {
      // 타이핑 시작 5초 후에 fadein 을 사용하면서 예 아니오 버튼이 나타남
      $(".y_n_button").css("visibility", "visible");
      $(".y_n_button").css("animation", "fadein 10s");
      $(".y_n_button").css("-webkit-animation", "fadein 10s");
    }, 5000);
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

// y_n button click event
$("#y_button").click(function() {
  // 예 버튼 클릭 시 네비게이션 효과 사용하면서 첫 번째 게임페이지로 이동
  var url = "./firstgame.html";
  $("body div").animate({
      "opacity": "0",
      "top": "10px"
  },2000, function () {
      document.location.href = url;
  });

  return false;
});
$("#n_button").click(function() {
  // 아니오 버튼 클릭 시 네비게이션 효과 사용하면서 처음 소개 페이지로 이동
  var url = "./intro.html";
  $("body div").animate({
      "opacity": "0",
      "top": "10px"
  },2000, function () {
      document.location.href = url;
  });

  return false;
});
