/* ====== MENU SHOW ============ MENU HIDDEN ====== */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* ====== MENU SHOW ====== */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* ====== MENU HIDDEN ====== */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// ===== REMOVE MENU MOBILE =====
const navLink = document.querySelectorAll(".nav-link");
const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

// ===== CHANGE BACKGROUND HEADER =====
const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 20
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
};

window.addEventListener("scroll", () => {
  scrollHeader();
});

// ===== SCROLL SECTIONS ACTIVE LINK=====
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".nav-menu a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active-link");
    } else {
      sectionClass.classList.remove("active-link");
    }
  });
};

window.addEventListener("scroll", () => {
  scrollActive();
});
// ===== SCROLL ABOUT ANIMATION =====
const gradientSpans = document.querySelectorAll(".text-gradient");

const animateGradientsOnScroll = () => {
  const viewportHeight = window.innerHeight;
  gradientSpans.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const startPos = viewportHeight;
    const endPos = viewportHeight / 2; // Hieu ung hoan thanh khi text ơ giua man hinh
    const animationDistance = startPos - endPos;
    const currentTravel = startPos - rect.top; // Tinh toanTien do (0 -> 1)

    const progress = currentTravel / animationDistance;
    const clampedProgress = Math.max(0, Math.min(1, progress)); // Giu gia tri khoang 0-1

    const percent = clampedProgress * 100;
    span.style.backgroundSize = `${percent}% 100%`;
  });
};

window.addEventListener("scroll", () => {
  animateGradientsOnScroll();
});

// ===== ANIMATION =====
document.addEventListener("DOMContentLoaded", function () {
  const defaultDelay = 400;

  function setupStaggeredReveal(selector, interval) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      const baseDelay = parseInt(el.dataset.delay) || defaultDelay;
      el.dataset.delay = baseDelay + index * interval;
    });
  }
  // --- Thiet lap 'interval' ---
  setupStaggeredReveal(".services-card, .work-card", 100);

  // --- Tao IntersectionObserver ---
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || defaultDelay;

        el.style.transitionDelay = `${delay}ms`;
        el.classList.add("visible");
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // --- Tim all phan tu .reveal  ---
  const elementsToReveal = document.querySelectorAll(".reveal");
  elementsToReveal.forEach((el) => {
    observer.observe(el);
  });
});

// ===== DARK LIGHT THEME =====
window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    if (theme == "light") {
      document.body.classList.add("light-theme");
      toggleBtn.classList.remove("ri-sun-line");
      toggleBtn.classList.add("ri-moon-line");
    } else {
      document.body.classList.remove("light-theme");
      toggleBtn.classList.add("ri-sun-line");
      toggleBtn.classList.remove("ri-moon-line");
    }

    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    applyTheme(isLight ? "dark" : "light");
  });
});

// ===== EMAIL JS =====
const contactForm = document.getElementById("contact-form"),
  contactName = document.getElementById("contact-name"),
  contactEmail = document.getElementById("contact-email"),
  contactMessage = document.getElementById("contact-message"),
  message = document.getElementById("message");

const sendMail = (e) => {
  e.preventDefault();

  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactMessage === ""
  ) {
    message.textContent = "Vui lòng điền đầy đủ thông tin";
    setTimeout(() => {
      message.textContent = "";
    }, 3000);
  } else {
    emailjs
      .sendForm(
        "service_1l80z12",
        "template_sdhumjh",
        "#contact-form",
        "fYsRuwg1MBR5B7eUc"
      )
      .then(
        () => {
          message.textContent = "Đã gửi thành công ✔";
          setTimeout(() => {
            message.textContent = "";
          }, 5000);
        },
        (error) => {
          alert("Lỗi!", error);
        }
      );

    contactName.value = "";
    contactEmail.value = "";
    contactMessage.value = "";
  }
};

contactForm.addEventListener("submit", sendMail);

// ===== TYPE EFFECT =====
document.addEventListener("DOMContentLoaded", function () {
  const textsToType = ["FullStack Developer"];
  const typingSpeed = 100;
  const deletingSpeed = 100;
  const delayAtEnd = 500;

  const targetElement = document.querySelector(".home-job");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = textsToType[textIndex];
    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (isDeleting) {
      // ----- ĐANG XOA -----
      targetElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        currentSpeed = 500;
      }
    } else {
      // ----- ĐANG GO -----
      targetElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      // sau khi gõ xong
      if (charIndex === currentText.length) {
        isDeleting = true;
        currentSpeed = delayAtEnd; // Cho cuoi cau
      }
    }
    setTimeout(typeEffect, currentSpeed);
  }
  typeEffect();
});

// ===== COUNT UP =====
document.addEventListener("DOMContentLoaded", function () {
  const animationDuration = 2000; // 2s

  // Ham thuc hien
  function startCountUp(el) {
    const targetText = el.textContent;
    const target = parseFloat(targetText);

    // Bo qua neu ko phai la so
    if (isNaN(target)) {
      console.error("Giá trị trong <count-up> không phải là số:", targetText);
      return;
    }

    // Kiem so that phan hay ko ?
    const decimals = (targetText.split(".")[1] || "").length;

    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / animationDuration, 1);

      const easeOutValue = 1 - Math.pow(1 - percentage, 3);
      let currentValue = easeOutValue * target;

      // Dinh dang so (lam tron or so thap phan)
      if (decimals > 0) {
        el.textContent = currentValue.toFixed(decimals);
      } else {
        el.textContent = Math.round(currentValue);
      }

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = targetText;
      }
    }

    // dem tu 0
    el.textContent = decimals > 0 ? (0).toFixed(decimals) : 0;
    requestAnimationFrame(animate);
  }

  // --- IntersectionObserver kich hoat khi cuon toi ---
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          startCountUp(el); // bat dau
          observer.unobserve(el); // Dem 1 lan
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Tim the <count-up>
  const elementsToCount = document.querySelectorAll("count-up");
  elementsToCount.forEach((el) => {
    observer.observe(el);
  });
});

/*=============== SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUpBtn = document.getElementById("scroll-up-btn");
  // Khi cuon trang qua 400px
  if (this.scrollY >= 400) {
    scrollUpBtn.classList.add("show-scroll");
  } else {
    scrollUpBtn.classList.remove("show-scroll");
  }
};

window.addEventListener("scroll", scrollUp);
