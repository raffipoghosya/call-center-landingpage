$(() => {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        navText: ['<span class="lnr lnr-arrow-up"></span>', '<span class="lnr lnr-arrow-down"></span>'],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: true,
                margin: 0
            },
            1000: {
                items: 2,
                nav: true
            }
        }
    });
    new WOW().init();

    // Add event listener for the contact form submission
    let contactForm = document.querySelector("form");
    contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = {
        username: document.querySelector('[name="username"]').value,
        email: document.querySelector('[name="email"]').value,
        subject: document.querySelector('[name="subject"]').value,
        message: document.querySelector('[name="message"]').value,
    };

    fetch('https://script.google.com/macros/s/AKfycbz0dlpceK9tsRxJft4_G5N7dOX_hlQYjwi12DGJ137Ri542O3V4vP_rkM3QwLZeJ7OqdA/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors'
    })
        .then(response => console.log(response.ok))
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });

});

let stickyTop = document.querySelector(".header-nav");
function scrolled() {
    stickyTop.classList.toggle("active", window.scrollY >= 200);
}
window.addEventListener("scroll", scrolled);

let bars = document.querySelector(".header-nav .bars");
let navSite = document.querySelector(".nav-site");
bars.onclick = function () {
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
        navSite.classList.add("active");
    } else {
        navSite.classList.remove("active");
    }
};

window.onmouseup = function (e) {
    if (!navSite.contains(e.target) && !bars.contains(e.target)) {
        navSite.classList.remove("active");
        bars.classList.remove("active");
    }
};

let allLinks = document.querySelectorAll("ul li a.link-to");
let block = document.querySelectorAll(".block");
allLinks.forEach((el) => {
    el.onclick = function (e) {
        e.preventDefault();
        allLinks.forEach((el) => el.classList.remove("active"));
        this.classList.add("active");
        scrollToElement(this);
    };
});

function toggleClass() {
    block.forEach((el) => {
        if (window.scrollY >= el.offsetTop) {
            allLinks.forEach((el) => {
                el.classList.remove("active");
            });
            document.querySelector("ul.menu li a[data-scroll=" + el.id + "]").classList.add("active");
        }
    });
}
window.addEventListener("scroll", toggleClass);
let allMobileLinks = document.querySelectorAll(".nav-site ul li a.link-to");
allMobileLinks.forEach((el) => {
    el.onclick = function (e) {
        e.preventDefault();
        allMobileLinks.forEach((el) => el.classList.remove("activeMobile"));
        this.classList.add("activeMobile");
        scrollToElement(el);
    };
});

function toggleClassMobile() {
    block.forEach((el) => {
        if (window.scrollY >= el.offsetTop) {
            allMobileLinks.forEach((el) => {
                el.classList.remove("activeMobile");
            });
            document.querySelector(".nav-site ul li a[data-scroll=" + el.id + "]").classList.add("activeMobile");
        }
    });
}
window.addEventListener("scroll", toggleClassMobile);

// scroll to element when click on link
function scrollToElement(el) {
    let goScroll = document.querySelector("#" + el.getAttribute("data-scroll")).offsetTop;
    scrollTo({
        top: goScroll,
        behavior: "smooth"
    });
}

let closeBars = document.querySelector(".nav-site .bars");
closeBars.onclick = function () {
    navSite.classList.remove("active");
    bars.classList.remove("active");
};

let counterCount = document.querySelector(".counter");
let countIncrease = document.querySelectorAll(".count");
let stopCounter = false;
let speed = 100;

function scrolledCounter() {
    if (
        this.scrollY >= counterCount.offsetTop - 350 &&
        this.scrollY <= counterCount.offsetTop + counterCount.offsetHeight - 350
    ) {
        if (!stopCounter) countIncrease.forEach((el) => counter(el));
        stopCounter = true;
    }
}

window.addEventListener("scroll", scrolledCounter);

function counter(el) {
    setInterval(() => {
        let target = Number(el.getAttribute("data-count"));
        let numContent = Number(el.textContent);
        let increase = target / speed ;
        if (target > numContent) {
            el.textContent = Math.floor(increase + numContent);
        }
    });
}


let goUp = document.querySelector(".up");

window.onscroll = function () {
    goUp.classList.toggle("active", this.scrollY >= 550);
};

goUp.onclick = function () {
    scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

let copyRight = document.querySelector(".copy-right span");
copyRight.innerHTML = new Date().getFullYear();
