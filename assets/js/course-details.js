// ===== Course Data =====
const courses = {
    1: {
        title: "دورة تطوير الذات الشاملة",
        category: "تطوير الذات",
        icon: "fas fa-lightbulb",
        desc: "رحلة متكاملة لاكتشاف قدراتك وتطوير مهاراتك لتحقيق النجاح والتميز في جميع مجالات حياتك.",
        rating: "4.8",
        newPrice: "1200 ج.م",
        oldPrice: "1500 ج.م",
        img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600"
    },
    2: {
        title: "فن التواصل الفعّال والإقناع",
        category: "المهارات الشخصية",
        icon: "fas fa-user-tie",
        desc: "تعلم مهارات التواصل الاحترافي وبناء العلاقات القوية والتأثير في الآخرين بشكل إيجابي.",
        rating: "5.0",
        newPrice: "1000 ج.م",
        oldPrice: "",
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600"
    },
    3: {
        title: "إدارة الوقت وتعزيز الإنتاجية",
        category: "التنمية البشرية",
        icon: "fas fa-brain",
        desc: "اكتشف أسرار إدارة الوقت بفعالية وزيادة إنتاجيتك بكفاءة عالية في العمل والحياة.",
        rating: "4.9",
        newPrice: "750 ج.م",
        oldPrice: "900 ج.م",
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600"
    },
    4: {
        title: "مهارات القيادة الاحترافية",
        category: "القيادة والإدارة",
        icon: "fas fa-chess-king",
        desc: "طور مهاراتك القيادية وقد فريقك بنجاح وحقق الأهداف بكفاءة عالية.",
        rating: "4.9",
        newPrice: "1800 ج.م",
        oldPrice: "",
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600"
    },
    5: {
        title: "الذكاء العاطفي والتحكم بالمشاعر",
        category: "التنمية البشرية",
        icon: "fas fa-heart",
        desc: "تعلم فهم مشاعرك والآخرين وطور قدرتك على التحكم العاطفي وبناء علاقات صحية.",
        rating: "4.7",
        newPrice: "850 ج.م",
        oldPrice: "",
        img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600"
    },
    6: {
        title: "التفكير الإبداعي وحل المشكلات",
        category: "المهارات الشخصية",
        icon: "fas fa-puzzle-piece",
        desc: "اكتسب مهارات التفكير الإبداعي والابتكار في حل المشكلات بأساليب عملية.",
        rating: "4.8",
        newPrice: "950 ج.م",
        oldPrice: "1300 ج.م",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
    }
};

// ===== Load Course from URL =====
document.addEventListener("DOMContentLoaded", function () {
    const id = parseInt(new URLSearchParams(window.location.search).get("id")) || 1;
    const c = courses[id] || courses[1];

    document.getElementById("cd-title").textContent = c.title;
    document.getElementById("cd-breadcrumb-title").textContent = c.title;
    document.getElementById("cd-category-text").textContent = c.category;
    document.getElementById("cd-category-icon").className = c.icon;
    document.getElementById("cd-desc").textContent = c.desc;
    document.getElementById("cd-rating").textContent = c.rating;
    document.getElementById("cd-new-price").textContent = c.newPrice;
    document.getElementById("cd-cover-img").src = c.img;
    document.getElementById("pay-modal-course-name").textContent = c.title;
    document.getElementById("pay-modal-price").textContent = c.newPrice;

    if (c.oldPrice) {
        document.getElementById("cd-old-price").textContent = c.oldPrice;
    } else {
        document.getElementById("cd-old-price").style.display = "none";
        document.getElementById("cd-discount-badge").style.display = "none";
    }
});

// ===== Header & Scroll =====
$(window).scroll(function () {
    $(this).scrollTop() > 50
        ? $("#header").addClass("scrolled")
        : $("#header").removeClass("scrolled");
    $(this).scrollTop() > 300
        ? $("#scrollTop").addClass("show")
        : $("#scrollTop").removeClass("show");
});

$("#menuToggle").click(function () {
    $(this).toggleClass("active");
    $("#navMenu").toggleClass("active");
});

$("#scrollTop").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 600);
});

// ===== Payment Modal =====
function openPayModal() {
    document.getElementById("payModal").classList.add("active");
    document.body.style.overflow = "hidden";
    // إيقاف Lenis مؤقتاً
    if (typeof lenis !== "undefined") lenis.stop();
}

function closePayModal() {
    document.getElementById("payModal").classList.remove("active");
    document.body.style.overflow = "";
    // تشغيل Lenis تاني
    if (typeof lenis !== "undefined") lenis.start();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("payModal").addEventListener("click", function (e) {
        if (e.target === this) closePayModal();
    });

    // منع الـ scroll من الـ modal يعدي للصفحة
    const modal = document.querySelector(".pay-modal");
    modal.addEventListener("wheel", function (e) {
        const atTop = this.scrollTop === 0 && e.deltaY < 0;
        const atBottom = this.scrollTop + this.clientHeight >= this.scrollHeight && e.deltaY > 0;
        if (atTop || atBottom) e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    modal.addEventListener("touchmove", function (e) {
        e.stopPropagation();
    }, { passive: true });
});

function selectMethod(el) {
    document.querySelectorAll(".pay-method").forEach(m => m.classList.remove("active"));
    el.classList.add("active");
}

// Format card number with spaces
document.addEventListener("DOMContentLoaded", function () {
    const cardInput = document.getElementById("card-number-input");
    if (cardInput) {
        cardInput.addEventListener("input", function () {
            let v = this.value.replace(/\D/g, "").substring(0, 16);
            this.value = v.replace(/(.{4})/g, "$1 ").trim();
        });
    }
});

function submitPayment() {
    alert("✅ تم الدفع بنجاح! سيتم التواصل معك قريباً لتفعيل الدورة.");
    closePayModal();
}
