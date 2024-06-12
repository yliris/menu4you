var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
  

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});

const popupOverlay = document.querySelector(".popup-overlay");
const skipButton = document.querySelector(".popup-container .skip-button");
const visitButton = document.querySelector(".popup-container .visit-button");

let remainingTime = 5;
let allowedToSkip = false;
let popupTimer;

const showAd = () => {
  popupOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
  popupTimer = setInterval(() => {
    skipButton.innerHTML = `Skip in ${remainingTime}s`;
    remainingTime--;

    if (remainingTime < 0) {
      allowedToSkip = true;
      skipButton.innerHTML = "Skip";
      clearInterval(popupTimer);
    }
  }, 1000);
};

const skipAd = () => {
  popupOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
  createPopupCookie();
};

skipButton.addEventListener("click", () => {
  if (allowedToSkip) {
    skipAd();
  }
});

const startTimer = () => {
  if (window.scrollY > 100) {
    showAd();
    window.removeEventListener("scroll", startTimer);
  }
};

if (!document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/)) {
  window.addEventListener("scroll", startTimer);
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const modal = document.getElementById('successModal');
  const modalContent = modal.querySelector('.modal-content');
  modal.style.display = 'block';
  document.body.classList.add('no-scroll');

  modal.offsetHeight;
  modal.classList.add('show');
  modalContent.classList.add('show');

  this.reset();
});

document.querySelector('.modal .close').addEventListener('click', function() {
  const modal = document.getElementById('successModal');
  const modalContent = modal.querySelector('.modal-content');
  modalContent.classList.remove('show');

  modal.addEventListener('transitionend', function() {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }, { once: true });
});

window.onclick = function(event) {
  const modal = document.getElementById('successModal');
  if (event.target == modal) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('show');

    modal.addEventListener('transitionend', function() {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, { once: true });
  }
}
