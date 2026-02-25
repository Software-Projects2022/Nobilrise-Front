// ========================== Smooth Scroll with Lenis ==========================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ========================== Header Scroll Effect ==========================
$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
    $("#header").addClass("scrolled");
  } else {
    $("#header").removeClass("scrolled");
  }
});

// ========================== Mobile Menu Toggle ==========================
$("#menuToggle").click(function () {
  $(this).toggleClass("active");
  $("#navMenu").toggleClass("active");
});

$(".nav-menu a").click(function () {
  $("#menuToggle").removeClass("active");
  $("#navMenu").removeClass("active");
});

// ========================== Active Link on Scroll ==========================
$(window).scroll(function () {
  var scrollPos = $(document).scrollTop();
  $(".nav-menu a").each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (
      refElement.length &&
      refElement.position() &&
      refElement.position().top <= scrollPos + 100 &&
      refElement.position().top + refElement.height() > scrollPos
    ) {
      $(".nav-menu a").removeClass("active");
      currLink.addClass("active");
    }
  });
});

// ========================== Testimonials Slick Slider ==========================
$(document).ready(function () {
  if ($(".testimonials-slider").length) {
    $(".testimonials-slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      rtl: true,
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 600,
      variableWidth: false,
      adaptiveHeight: false,
      cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  }
});

// ========================== Counter Animation ==========================
document.addEventListener("DOMContentLoaded", function () {
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    updateCounter();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".counter").forEach((counter) => {
    observer.observe(counter);
  });
});

// ========================== Filter Courses ==========================
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      courseCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
        } else {
          const category = card.getAttribute("data-category");
          card.style.display = category === filterValue ? "block" : "none";
        }
      });
    });
  });
});

// Booking modal
$(".open-modal").click(function (e) {
  e.preventDefault();
  $("#modalSessionType").text($(this).data("session"));
  $("#bookingModal").addClass("active");
  $("body").css({ overflow: "hidden", "padding-left": "0" });
});

$("#closeModal").click(function () {
  $("#bookingModal").removeClass("active");
  $("body").css("overflow", "");
});

$("#bookingModal").click(function (e) {
  if (e.target === this) {
    $("#bookingModal").removeClass("active");
    $("body").css("overflow", "");
  }
});

$(".booking-modal").click(function (e) {
  e.stopPropagation();
});

// منع الاسكرول من الـ modal ينتقل للصفحة
$(".booking-modal").on("wheel touchmove", function (e) {
  const el = this;
  const scrollTop = el.scrollTop;
  const scrollHeight = el.scrollHeight;
  const height = el.clientHeight;
  const delta = e.originalEvent.deltaY || 0;
  const atTop = scrollTop === 0 && delta < 0;
  const atBottom = scrollTop + height >= scrollHeight && delta > 0;
  if (atTop || atBottom) {
    e.preventDefault();
  }
  e.stopPropagation();
});

$(".time-slot").click(function () {
  $(".time-slot").removeClass("selected");
  $(this).addClass("selected");
});

$(".submit-btn-modal").click(function () {
  const selected = $(".time-slot.selected").text();
  if (!selected) {
    alert("من فضلك اختر وقت الجلسة");
    return;
  }
  alert("تم تأكيد الحجز! سيتم التواصل معك قريباً على الواتساب.");
  $("#bookingModal").removeClass("active");
  $("body").css("overflow", "");
});
