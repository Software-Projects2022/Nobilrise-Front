
// ===== Payment Modal =====
function openPayModal() {
    document.getElementById("payModal").classList.add("active");
    document.body.style.overflow = "hidden";
    if (typeof lenis !== "undefined") lenis.stop();
}

// ===== closePayModal =====
function closePayModal() {
    document.getElementById("payModal").classList.remove("active");
    document.body.style.overflow = "";
    if (typeof lenis !== "undefined") lenis.start();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("payModal").addEventListener("click", function (e) {
        if (e.target === this) closePayModal();
    });

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