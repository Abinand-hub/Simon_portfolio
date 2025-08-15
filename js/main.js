(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    //Carosoul
    // JavaScript to ensure seamless looping
        const track = document.getElementById('carousel-track');
        
        // Reset animation to start when it reaches the end
        track.addEventListener('animationiteration', () => {
            track.style.animation = 'none';
            track.offsetHeight; // Trigger reflow
            track.style.animation = 'scroll 20s linear infinite';
        });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    //Card
    const sliderWrap = document.querySelector(".career-slider-wrap");
const cards = document.querySelectorAll(".career-card");
const prevBtn = document.querySelector(".career-prev");
const nextBtn = document.querySelector(".career-next");

let currentIndex = 0;

function updateCarousel() {
    sliderWrap.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

// Counter animation
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // 2 seconds
    const stepTime = 20;
    let count = 0;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(count) + (counter.dataset.target.includes('%') ? '%' : '+');
    }, stepTime);
}

// Trigger animation when in view
function handleScroll() {
    document.querySelectorAll(".count").forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !counter.dataset.animated) {
            counter.dataset.animated = "true";
            animateCounter(counter);
        }
    });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);  

//Plan

document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.plan-card');
        const snakePath = document.querySelector('.snake-path');
        const container = document.querySelector('.plans-container');

        function updateSnakePath() {
            const pathPoints = [];
            const containerRect = container.getBoundingClientRect();
            const isMobile = window.innerWidth <= 768;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const x = isMobile
                    ? containerRect.width / 2 - containerRect.left
                    : index % 2 === 0
                    ? rect.right - containerRect.left
                    : rect.left - containerRect.left;
                const y = rect.top + rect.height / 2 - containerRect.top - 40;
                pathPoints.push({ x, y });
            });

            let pathD = `M${pathPoints[0].x},${pathPoints[0].y}`;
            for (let i = 1; i < pathPoints.length; i++) {
                pathD += ` L${pathPoints[i].x},${pathPoints[i].y}`;
            }
            snakePath.setAttribute('d', pathD);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        const cardIndex = parseInt(entry.target.dataset.index);
                        if (cardIndex > 1) {
                            snakePath.classList.add(`segment-${cardIndex - 1}`);
                        }
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach(card => {
            observer.observe(card);
        });

        updateSnakePath();
        window.addEventListener('resize', updateSnakePath);
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });
    
    //Slider

    document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.card-slider');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateSlider() {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    updateSlider();
});

//scroll

// JavaScript to ensure smooth infinite scrolling
        const scroll = document.querySelector('.scroll');
        
        // Reset animation when it reaches the end to prevent visible jump
        scroll.addEventListener('animationiteration', () => {
            scroll.style.animation = 'none';
            scroll.offsetHeight; // Trigger reflow
            scroll.style.animation = 'scroll 20s linear infinite';
        });

    
})(jQuery);

