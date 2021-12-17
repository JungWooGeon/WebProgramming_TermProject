/*
  navigation과 관련된 부분은 https://www.youtube.com/watch?v=gXkqy0b4M5g&t=748s
  영상을 참고해서 기본적인 틀을 다졌고, 필요한 부분들(컴포넌트 위치, 색, 크기, 속도 등)을 변경하고 추가하였음
*/

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", ()=> {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate links
    navLinks.forEach((link, index)=> {
      if(link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    })

    // Burger Animation
    burger.classList.toggle("toggle");
  });
}

navSlide();

$(function () {
    $(".navi").click(function () {
        var url = $(this).attr("href");
        $("body div").animate({
            "opacity": "0",
            "top": "10px"
        },500, function () {
            document.location.href = url;
        });

        return false;
    });
});
