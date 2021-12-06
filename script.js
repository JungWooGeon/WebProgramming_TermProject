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
    /*
    $("body div").fadeIn(500, function () {
        $(this).animate({
            "top": "150px"
        },1000);
    });
    */

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
