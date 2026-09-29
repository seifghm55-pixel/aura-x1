/* =========================================
   AURA X1 V2
   INTERACTIONS / MOTION / UI
========================================= */


/* ---------------- LOADER ---------------- */

document.body.classList.add("loading");

const loader = document.querySelector(".loader");
const loaderNumber = document.querySelector(".loader-number");
const loaderLine = document.querySelector(".loader-line span");

let progress = 0;

const loaderInterval = setInterval(() => {

  progress += Math.floor(Math.random() * 8) + 3;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);

    setTimeout(() => {
      loader.classList.add("hide");
      document.body.classList.remove("loading");
    }, 500);
  }

  loaderNumber.textContent =
    String(progress).padStart(3, "0");

  loaderLine.style.width = progress + "%";

}, 60);


/* ---------------- CUSTOM CURSOR ---------------- */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

window.addEventListener("mousemove", e => {

  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

});

function animateCursor() {

  ringX += (mouseX - ringX) * .12;
  ringY += (mouseY - ringY) * .12;

  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();


document.querySelectorAll("a, button, .magnetic, .swatch").forEach(el => {

  el.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-hover");
  });

});


/* ---------------- REVEAL ---------------- */

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: .12
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});


/* ---------------- MAGNETIC BUTTONS ---------------- */

document.querySelectorAll(".magnetic").forEach(button => {

  button.addEventListener("mousemove", e => {

    const rect = button.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    button.style.transform =
      `translate(${x * .12}px, ${y * .12}px)`;

  });

  button.addEventListener("mouseleave", () => {

    button.style.transform = "";

  });

});


/* ---------------- HERO PARALLAX ---------------- */

const heroProduct =
  document.querySelector(".hero-product");

window.addEventListener("mousemove", e => {

  if (window.innerWidth < 900) return;

  const x =
    (e.clientX / window.innerWidth - .5) * 2;

  const y =
    (e.clientY / window.innerHeight - .5) * 2;

  heroProduct.style.transform =
    `translate(${x * 20}px, ${y * 15}px)`;

});


/* ---------------- SCROLL PRODUCT ---------------- */

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  const hero = document.querySelector(".hero");

  if (!hero) return;

  const productImage =
    document.querySelector(".hero-headphones");

  if (scrollY < window.innerHeight) {

    const rotation =
      scrollY * .025;

    const scale =
      1.22 + scrollY * .0001;

    productImage.style.transform =
      `scale(${scale}) rotate(${rotation}deg)`;

  }

});


/* ---------------- ANC ---------------- */

const ancSlider =
  document.getElementById("ancSlider");

const ancValue =
  document.getElementById("ancValue");

const ancModes =
  document.querySelectorAll(".anc-modes button");

function updateANC(value) {

  ancSlider.value = value;

  ancValue.textContent =
    value + "%";

  ancModes.forEach(btn => {

    btn.classList.remove("active");

    if (
      Number(btn.dataset.value) ===
      Number(value)
    ) {

      btn.classList.add("active");

    }

  });

}

ancSlider.addEventListener("input", e => {

  updateANC(e.target.value);

});


ancModes.forEach(button => {

  button.addEventListener("click", () => {

    updateANC(button.dataset.value);

  });

});


/* ---------------- SOUND VISUALIZER ---------------- */

const visualBars =
  document.querySelectorAll(".visualizer i");

let soundActive = true;

function animateVisualizer() {

  if (!soundActive) {

    visualBars.forEach(bar => {
      bar.style.height = "8px";
    });

    return;

  }

  visualBars.forEach(bar => {

    const randomHeight =
      Math.floor(Math.random() * 60) + 8;

    bar.style.height =
      randomHeight + "px";

  });

  setTimeout(animateVisualizer, 180);

}

animateVisualizer();


const soundToggle =
  document.querySelector(".sound-toggle");

soundToggle.addEventListener("click", () => {

  soundActive = !soundActive;

  soundToggle.textContent =
    soundActive
      ? "SOUND ON"
      : "SOUND OFF";

  if (!soundActive) {

    visualBars.forEach(bar => {
      bar.style.animationPlayState = "paused";
    });

  } else {

    visualBars.forEach(bar => {
      bar.style.animationPlayState = "running";
    });

    animateVisualizer();

  }

});


/* ---------------- PLAYER ---------------- */

const playButton =
  document.querySelector(".play-button");

let playing = false;

playButton.addEventListener("click", () => {

  playing = !playing;

  playButton.textContent =
    playing
      ? "Ⅱ"
      : "▶";

  document.querySelector(".album-art")
    .style.animationPlayState =
    playing
      ? "running"
      : "paused";

});


/* ---------------- PROFILE ---------------- */

document.querySelectorAll(".profile").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".profile")
      .forEach(b => b.classList.remove("active"));

    button.classList.add("active");

  });

});


/* ---------------- COLOR CONFIGURATOR ---------------- */

const swatches =
  document.querySelectorAll(".swatch");

const colorName =
  document.getElementById("colorName");

const cartColor =
  document.getElementById("cartColor");

const configImage =
  document.getElementById("configImage");


const colorFilters = {

  graphite:
    "contrast(1.2) brightness(.72) saturate(.7)",

  silver:
    "contrast(1.05) brightness(1.12) grayscale(.15)",

  sand:
    "sepia(.35) brightness(1.05) saturate(.65)",

  red:
    "sepia(.8) saturate(3) hue-rotate(305deg) brightness(.8)",

  green:
    "sepia(.4) saturate(.8) hue-rotate(35deg) brightness(.75)"

};


swatches.forEach(swatch => {

  swatch.addEventListener("click", () => {

    swatches.forEach(s =>
      s.classList.remove("active")
    );

    swatch.classList.add("active");

    const color =
      swatch.dataset.color;

    colorName.textContent =
      color.toUpperCase();

    cartColor.textContent =
      color.toUpperCase();

    configImage.style.opacity = "0";

    setTimeout(() => {

      configImage.style.filter =
        colorFilters[color];

      configImage.style.opacity = "1";

    }, 200);

  });

});


/* ---------------- ADD TO CART ---------------- */

const cartButton =
  document.querySelector(".buy");

const cartPopup =
  document.querySelector(".cart-popup");

const cartClose =
  document.querySelector(".cart-close");

const navCart =
  document.querySelector(".nav-cart");

const cartCount =
  document.querySelector(".nav-cart b");

let cartItems = 0;

function openCart() {

  cartPopup.classList.add("show");

  document.body.style.overflow =
    "hidden";

}

function closeCart() {

  cartPopup.classList.remove("show");

  document.body.style.overflow =
    "";

}


cartButton.addEventListener("click", () => {

  cartItems++;

  cartCount.textContent =
    cartItems;

  openCart();

});


navCart.addEventListener("click", () => {

  if (cartItems > 0) {
    openCart();
  }

});


cartClose.addEventListener(
  "click",
  closeCart
);


cartPopup.addEventListener("click", e => {

  if (e.target === cartPopup) {
    closeCart();
  }

});


/* ---------------- IMAGE TILT ---------------- */

document.querySelectorAll(
  ".life-card, .player, .tech-card"
).forEach(card => {

  card.addEventListener("mousemove", e => {

    if (window.innerWidth < 900) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - .5) * -4;

    const rotateY =
      ((x / rect.width) - .5) * 4;

    card.style.transform =
      `perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* ---------------- SMOOTH ANCHORS ---------------- */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(link => {

  link.addEventListener("click", e => {

    const target =
      document.querySelector(
        link.getAttribute("href")
      );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});


/* ---------------- FINAL BUTTON ---------------- */

document.querySelector(".final-button")
  .addEventListener("click", () => {

    cartItems++;

    cartCount.textContent =
      cartItems;

    openCart();

  });


/* ---------------- KEYBOARD ---------------- */

document.addEventListener("keydown", e => {

  if (e.key === "Escape") {

    closeCart();

  }

});


/* ---------------- SMALL PARALLAX ---------------- */

const quoteOrb =
  document.querySelector(".quote-orb");

window.addEventListener("scroll", () => {

  if (!quoteOrb) return;

  const y =
    window.scrollY * .08;

  quoteOrb.style.transform =
    `translateY(${y}px)`;

});


console.log(
  "%c AURA X1 V2 ",
  "background:#c8ff35;color:#050505;padding:8px;font-weight:bold;"
);

console.log(
  "Experience sound differently."
);