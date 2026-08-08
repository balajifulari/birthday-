/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 900);

});


/* =========================================
   ELEMENTS
========================================= */

const opening =
    document.getElementById("opening");

const main =
    document.getElementById("main");

const enterBtn =
    document.getElementById("enterBtn");

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");


/* =========================================
   ENTER WEBSITE
========================================= */

enterBtn.addEventListener("click", () => {

    opening.classList.add("hide");

    main.classList.add("visible");

    document.body.classList.remove("locked");

    music.play().catch(() => {});

    startParticles();

});


/* =========================================
   MUSIC
========================================= */

let musicPlaying = false;

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicBtn.innerHTML = "♫";

    } else {

        music.play();

        musicPlaying = true;

        musicBtn.innerHTML = "Ⅱ";

    }

});


/* =========================================
   CANDLES
========================================= */

const blowBtn =
    document.getElementById("blowBtn");

const flames =
    document.querySelectorAll(".flame");

const wishText =
    document.getElementById("wishText");


blowBtn.addEventListener("click", () => {

    flames.forEach(flame => {

        flame.classList.add("off");

    });


    blowBtn.innerHTML =
        "Wish Made ✦";


    wishText.innerHTML =
        "May this wish find its way to you. ✨";


    createConfetti();

});


/* =========================================
   LETTER TYPING
========================================= */

const letterText =
`
Dear Birthday Star,

Today isn't just another day.

It's a reminder of how much happiness
one person can bring into the lives
around them.

I hope this new chapter brings you
beautiful moments, unexpected adventures,
peace in your heart, and countless reasons
to smile.

Never stop dreaming.

Never stop believing in yourself.

And most importantly,
never forget how special you are.

Happy Birthday. ✨

May your story continue to become
more beautiful with every chapter.
`;

const letterElement =
    document.getElementById("letterText");

let letterIndex = 0;

let letterStarted = false;


function typeLetter() {

    if (
        letterIndex <
        letterText.length
    ) {

        letterElement.textContent +=
            letterText.charAt(letterIndex);

        letterIndex++;

        setTimeout(
            typeLetter,
            25
        );

    }

}


/* =========================================
   INTERSECTION OBSERVER
========================================= */

const letterSection =
    document.querySelector(".letter-section");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !letterStarted
                ) {

                    letterStarted = true;

                    typeLetter();

                }

            });

        },
        {
            threshold: .25
        }
    );

observer.observe(letterSection);


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        "✦",
        "✧",
        "✺",
        "♡",
        "✦"
    ];

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        piece.style.position =
            "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-30px";

        piece.style.color =
            Math.random() > .5
                ? "#d6b46a"
                : "#e6a5b8";

        piece.style.fontSize =
            15 + Math.random() * 20 + "px";

        piece.style.zIndex =
            "9999";

        piece.style.pointerEvents =
            "none";

        document.body.appendChild(piece);


        const duration =
            2500 + Math.random() * 2500;


        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh)
                         rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-out"
            }
        );


        setTimeout(() => {

            piece.remove();

        }, duration);

    }

}


/* =========================================
   BACKGROUND PARTICLES
========================================= */

function createParticle() {

    const particle =
        document.createElement("div");

    particle.style.position =
        "fixed";

    particle.style.width =
        "2px";

    particle.style.height =
        "2px";

    particle.style.background =
        "#ffffff";

    particle.style.borderRadius =
        "50%";

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.top =
        Math.random() * 100 + "vh";

    particle.style.opacity =
        Math.random();

    particle.style.pointerEvents =
        "none";

    particle.style.zIndex =
        "1";

    document.body.appendChild(
        particle
    );


    particle.animate(
        [
            {
                opacity: .1,
                transform: "scale(.5)"
            },
            {
                opacity: 1,
                transform: "scale(1.5)"
            },
            {
                opacity: .1,
                transform: "scale(.5)"
            }
        ],
        {
            duration:
                2000 +
                Math.random() * 3000,

            iterations: Infinity
        }
    );

}


function startParticles() {

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        createParticle();

    }

}


/* =========================================
   FIREWORK ENGINE
========================================= */

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");


let fireworks = [];

let sparks = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        canvas.offsetHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   CREATE FIREWORK
========================================= */

function createFirework(
    x,
    y
) {

    const colors = [
        "#d6b46a",
        "#e6a5b8",
        "#ffffff",
        "#9f8cff",
        "#6ee7f9"
    ];

    const color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            2 +
            Math.random() * 6;


        sparks.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 1,

            color: color

        });

    }

}


/* =========================================
   FIREWORK ANIMATION
========================================= */

function animateFireworks() {

    ctx.fillStyle =
        "rgba(3,3,5,.18)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    sparks.forEach(
        (spark, index) => {

            spark.x +=
                spark.vx;

            spark.y +=
                spark.vy;

            spark.vy +=
                .045;

            spark.life -=
                .012;


            ctx.globalAlpha =
                spark.life;

            ctx.fillStyle =
                spark.color;


            ctx.beginPath();

            ctx.arc(
                spark.x,
                spark.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fill();


            if (
                spark.life <= 0
            ) {

                sparks.splice(
                    index,
                    1
                );

            }

        }
    );


    ctx.globalAlpha = 1;

    requestAnimationFrame(
        animateFireworks
    );

}

animateFireworks();


/* =========================================
   FIREWORK BUTTON
========================================= */

const fireworkBtn =
    document.getElementById(
        "fireworkBtn"
    );


fireworkBtn.addEventListener(
    "click",
    () => {

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            setTimeout(() => {

                createFirework(

                    Math.random() *
                    canvas.width,

                    100 +
                    Math.random() *
                    canvas.height *
                    .55

                );

            }, i * 350);

        }

        createConfetti();

    }
);


/* =========================================
   AUTOMATIC SMALL FIREWORKS
========================================= */

const fireworksSection =
    document.querySelector(
        ".fireworks-section"
    );

let fireworksStarted = false;


const fireworksObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !fireworksStarted
                ) {

                    fireworksStarted = true;

                    automaticFireworks();

                }

            });

        },
        {
            threshold: .3
        }
    );


fireworksObserver.observe(
    fireworksSection
);


function automaticFireworks() {

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        setTimeout(() => {

            createFirework(

                Math.random() *
                canvas.width,

                120 +
                Math.random() *
                350

            );

        }, i * 600);

    }

}