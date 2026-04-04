// ========================== Smooth Scroll with Lenis ==========================

// إنشاء instance من Lenis للتحكم في الـ smooth scroll
const lenis = new Lenis({
  duration: 1.2, // مدة الحركة (كل ما زادت الحركة تبقى أنعم)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // نوع easing
});

// function بتتكرر كل frame لتحديث الـ scroll
function raf(time) {
  lenis.raf(time); // تحديث حركة Lenis
  requestAnimationFrame(raf); // loop مستمر
}

// تشغيل الـ animation
requestAnimationFrame(raf);


// ========================== Header Scroll Effect ==========================

// عند عمل scroll على الصفحة
$(window).scroll(function () {

  // لو المستخدم نزل أكتر من 50px
  if ($(this).scrollTop() > 50) {
    $("#header").addClass("scrolled"); // إضافة class لتغيير الشكل
  } else {
    $("#header").removeClass("scrolled"); // إزالة الـ class
  }
});


// ========================== Mobile Menu Toggle ==========================

// عند الضغط على زر القائمة
$("#menuToggle").click(function () {
  $(this).toggleClass("active"); // تغيير شكل الزر
  $("#navMenu").toggleClass("active"); // فتح/قفل القائمة
});

// عند الضغط على أي لينك داخل القائمة
$(".nav-menu a").click(function () {
  $("#menuToggle").removeClass("active"); // إغلاق الزر
  $("#navMenu").removeClass("active"); // إغلاق القائمة
});


// ========================== Active Link on Scroll ==========================

// تحديد اللينك النشط حسب السكروول
$(window).scroll(function () {

  var scrollPos = $(document).scrollTop(); // موقع السكروول

  $(".nav-menu a").each(function () {

    var currLink = $(this); // اللينك الحالي
    var refElement = $(currLink.attr("href")); // السيكشن المرتبط

    // لو السيكشن ظاهر في الشاشة
    if (
      refElement.length &&
      refElement.position() &&
      refElement.position().top <= scrollPos + 100 &&
      refElement.position().top + refElement.height() > scrollPos
    ) {
      $(".nav-menu a").removeClass("active"); // إزالة active من الكل
      currLink.addClass("active"); // إضافة active للي ظاهر
    }
  });
});


// ========================== Testimonials Slick Slider ==========================

$(document).ready(function () {

  // التأكد إن السلايدر موجود
  if ($(".testimonials-slider").length) {

    $(".testimonials-slider").slick({
      slidesToShow: 3, // عدد العناصر الظاهرة
      slidesToScroll: 1, // عدد العناصر في الحركة
      rtl: true, // دعم RTL
      dots: true, // نقاط تحت
      arrows: true, // أسهم
      infinite: true, // loop
      autoplay: true, // تشغيل تلقائي
      autoplaySpeed: 4000, // سرعة التشغيل
      speed: 600, // سرعة الانتقال
      variableWidth: false,
      adaptiveHeight: false,
      cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",

      // إعدادات الشاشات
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
          },
        },
      ],
    });
  }
});


// ========================== Counter Animation ==========================

document.addEventListener("DOMContentLoaded", function () {

  // function لتحريك العداد
  const animateCounter = (counter) => {

    const target = parseInt(counter.getAttribute("data-target")); // الرقم النهائي
    const duration = 2000; // مدة الأنيميشن
    const increment = target / (duration / 16); // الزيادة كل frame

    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString(); // تحديث الرقم
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString(); // الوصول للنهاية
      }
    };

    updateCounter();
  };

  // تشغيل العداد عند ظهور العنصر
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // مرة واحدة فقط
        }
      });
    },
    { threshold: 0.5 }
  );

  // تطبيق على كل العناصر
  document.querySelectorAll(".counter").forEach((counter) => {
    observer.observe(counter);
  });
});


// ========================== Filter Courses ==========================

document.addEventListener("DOMContentLoaded", function () {

  const filterBtns = document.querySelectorAll(".filter-btn"); // الأزرار
  const courseCards = document.querySelectorAll(".course-card"); // الكروت

  filterBtns.forEach((btn) => {

    btn.addEventListener("click", function () {

      // إزالة active من كل الأزرار
      filterBtns.forEach((b) => b.classList.remove("active"));

      // إضافة active للزر الحالي
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // فلترة الكروت
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


// ========================== Booking Modal ==========================

// فتح المودال
$(".open-modal").click(function (e) {

  e.preventDefault();

  $("#modalSessionType").text($(this).data("session")); // نوع الجلسة
  $("#bookingModal").addClass("active"); // إظهار المودال

  $("body").css({
    overflow: "hidden",
    "padding-left": "0",
  });
});

// غلق المودال بزر
$("#closeModal").click(function () {
  $("#bookingModal").removeClass("active");
  $("body").css("overflow", "");
});

// غلق بالضغط خارجه
$("#bookingModal").click(function (e) {
  if (e.target === this) {
    $("#bookingModal").removeClass("active");
    $("body").css("overflow", "");
  }
});

//  click من جوه المودا
$(".booking-modal").click(function (e) {
  e.stopPropagation();
});


// scroll 
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


// ========================== اختيار الوقت ==========================

//  time slot
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

  alert("تم تأكيد الحجز! سيتم التواصل معك قريباً");
  $("#bookingModal").removeClass("active");
  $("body").css("overflow", "");
});


// ========================== Profile Page ==========================

//  
function switchTab(name) {

  document.querySelectorAll(".p-tab").forEach(function (t, i) {
    t.classList.toggle("active", ["courses", "sessions"][i] === name);
  });

  document.querySelectorAll(".p-tab-content").forEach(function (c) {
    c.classList.remove("active");
  });

  document.getElementById("tab-" + name).classList.add("active");
}


function openModal(id) {
  document.getElementById("modal-" + id).classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    lenis.stop(); 
  } catch (e) {}
}

function closeModal(id) {
  document.getElementById("modal-" + id).classList.remove("open");
  document.body.style.overflow = "";

  try {
    lenis.start(); //  scroll 
  } catch (e) {}
}


// ========================== Toast ==========================

function showToast() {

  var t = document.getElementById("toast");

  t.classList.add("show");

  setTimeout(function () {
    t.classList.remove("show");
  }, 2200);
}


// ========================== Save Data ==========================

function saveMain() {

  document.getElementById("dispName").textContent =
    document.getElementById("f-name").value;

  document.getElementById("dispTitle").textContent =
    document.getElementById("f-title").value;

  document.getElementById("dispLocation").textContent =
    document.getElementById("f-location").value;

  document.getElementById("statCourses").textContent =
    document.getElementById("f-sc").value;

  document.getElementById("statDone").textContent =
    document.getElementById("f-sd").value;

  document.getElementById("statSessions").textContent =
    document.getElementById("f-ss").value;

  var parts = document.getElementById("f-name").value.trim().split(" ");
  var initials = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");

  var el = document.getElementById("avatarInitials");
  if (el) el.textContent = initials;

  closeModal("modal-main");
  showToast();
}


// ========================== Swiper ==========================

//  slider  Swiper
const swiper = new Swiper(".mySwiper", {
  loop: true, // loop
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "fade", 
  fadeEffect: {
    crossFade: true,
  },
});