$(document).ready(function() {
  // 시작하기 버튼 클릭 시 첫 번째 버튼이 나타남
  $("#start_button").click(function() {
    // 시작하기 버튼 클릭 시 html에서 구현했던 audio를 실행하는 함수를 실행
    playAudio();
    // 첫번째 버튼이 fadein 으로 나타남
    $("#first_button").css("visibility", "visible");
    $("#first_button").css("animation", "fadein 5s");

    /*
    setTimeout을 사용하여 '무궁화 꽃이 피었습니다'라는 말이 오디오에서 나올 때는
    removeEventListener를 통해 mousemove 이벤트를 없애주어 마우스를 움직일 수 있게
    하였고, '무궁화 꽃이 피었습니다'라는 말이 나오지 않을 때에는 게임 규칙 상
    마우스를 움직이면 안되므로 addEventListener를 통해 mousemove 이벤트를 설정하였음
    제한시간안에 미션에 성공하지 못하면 탈락하도록 하였음
    */
    setTimeout(function() {
      document.addEventListener('mousemove', fail);
    }, 5000);
    setTimeout(function() {
      document.removeEventListener('mousemove', fail);
    }, 8000);
    setTimeout(function() {
      document.addEventListener('mousemove', fail);
    }, 13000);
    setTimeout(function() {
      document.removeEventListener('mousemove', fail);
    }, 16000);
    setTimeout(function() {
      document.addEventListener('mousemove', fail);
    }, 22000);
    setTimeout(function() {
      document.removeEventListener('mousemove', fail);
    }, 25000);
    setTimeout(function() {
      document.addEventListener('mousemove', fail);
    }, 31000);
    setTimeout(function() {
      document.removeEventListener('mousemove', fail);
    }, 34000);
    setTimeout(function() {
      document.addEventListener('mousemove', fail);
    }, 37000);
    setTimeout(function() {
      document.removeEventListener('mousemove', fail);
    }, 40000);
    setTimeout(function() {
      document.addEventListener('mousemove', fail);
    }, 44000);
    setTimeout(function() {
      document.removeEventListener('mousemove', fail);
    }, 47000);
    setTimeout(function() {
      document.addEventListener('mousemove', fail);
    }, 50000);
    setTimeout(function() {
      document.removeEventListener('mousemove', fail);
      alert("제한시간이 경과되어 탈락되었습니다.");
      location.href = "./intro.html";
    }, 54000);
  });

  // 각 버튼을 클릭하면 다음 버튼이 나타나고, 마지막 버튼 클릭 시에
  // 게임에 통과하며 다음 단계로 넘어감
  $("#first_button").click(function() {
    $("#first_button").css("visibility", "hidden");
    $("#second_button").css("visibility", "visible");
    $("#second_button").css("animation", "fadein 5s");
  });
  $("#second_button").click(function() {
    $("#second_button").css("visibility", "hidden");
    $("#third_button").css("visibility", "visible");
    $("#third_button").css("animation", "fadein 5s");
  });
  $("#third_button").click(function() {
    $("#third_button").css("visibility", "hidden");
    $("#fourth_button").css("visibility", "visible");
    $("#fourth_button").css("animation", "fadein 5s");
  });
  $("#fourth_button").click(function() {
    $("#fourth_button").css("visibility", "hidden");
    $("#fifth_button").css("visibility", "visible");
    $("#fifth_button").css("animation", "fadein 5s");
  });
  $("#fifth_button").click(function() {
    $("#fifth_button").css("visibility", "hidden");
    $("#sixth_button").css("visibility", "visible");
    $("#sixth_button").css("animation", "fadein 5s");
  });
  $("#sixth_button").click(function() {
    $("#sixth_button").css("visibility", "hidden");
    $("#seventh_button").css("visibility", "visible");
    $("#seventh_button").css("animation", "fadein 5s");
  });
  $("#seventh_button").click(function() {
    pauseAudio();
    alert("첫 번째 게임에 통과하였습니다.");
    $("body div").animate({
        "opacity": "0",
        "top": "10px"
    },2000, function () {
        location.href = "./secondgame.html";
    });
  });
});

// audio실행과 중지는 https://www.w3schools.com/jsref/met_audio_play.asp를 참고함
var x = document.getElementById("audio");
function playAudio() {
  x.play();
}
function pauseAudio() {
  x.pause();
}
function fail() {
  alert("탈락하였습니다.");
  document.removeEventListener('mousemove', fail);
  location.href = "intro.html";
}

/*
  글자 타이핑 효과는 https://gahyun-web-diary.tistory.com/2을 참고하여 구현하였음
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
