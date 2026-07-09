(function () {
  "use strict";

  var WHATSAPP_NUMBER = "9647763003003";

  function buildWhatsAppLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  // ===== WhatsApp CTA buttons =====
  document.querySelectorAll(".whatsapp-cta").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var pkg = el.getAttribute("data-package") || "";
      var message = pkg
        ? "مرحبا، أنا مهتم بـ " + pkg + " من ENKIUM."
        : "مرحبا، أريد الاستفسار عن باقات ENKIUM.";
      window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    });
  });

  // ===== Contact form -> WhatsApp =====
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cf-name").value.trim();
      var phone = document.getElementById("cf-phone").value.trim();
      var pkg = document.getElementById("cf-package").value;

      var message =
        "مرحبا، اسمي " + name + " ورقمي " + phone +
        "، أنا مهتم بـ " + pkg + " من ENKIUM.";

      window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    });
  }

  // ===== Accordion =====
  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      var panel = trigger.closest(".accordion-item").querySelector(".accordion-panel");

      document.querySelectorAll(".accordion-trigger").forEach(function (t) {
        if (t !== trigger) {
          t.setAttribute("aria-expanded", "false");
          t.closest(".accordion-item").querySelector(".accordion-panel").style.maxHeight = null;
        }
      });

      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
    });
  });

  // ===== Scroll reveal =====
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ===== Savings counter animation =====
  var saveBadges = document.querySelectorAll(".badge-save[data-save]");
  if ("IntersectionObserver" in window && saveBadges.length) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    saveBadges.forEach(function (el) {
      counterIO.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-save"), 10);
    var duration = 900;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var value = Math.floor(progress * target);
      el.textContent = "توفير " + value + "%";
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = "توفير " + target + "%";
      }
    }
    requestAnimationFrame(step);
  }
})();
