const player = document.getElementById("player");
const playerButton = document.getElementById("playerButton");
const playerTitle = document.getElementById("playerTitle");
const playerTime = document.getElementById("playerTime");
const progressBar = document.getElementById("progressBar");

let audio = null;
let currentTrack = null;


/* =========================
   TRACKS
========================= */

document.querySelectorAll(".track").forEach(track => {

    const button = track.querySelector(".play-button");

    button.addEventListener("click", () => {

        const audioFile = track.dataset.audio;

        if (!audioFile) {

            player.classList.add("active");

            playerTitle.textContent = "file unavailable";

            return;
        }


        if (currentTrack === track && audio) {

            if (audio.paused) {

                audio.play();

            } else {

                audio.pause();

            }

            return;
        }


        if (audio) {
            audio.pause();
        }


        audio = new Audio(audioFile);

        currentTrack = track;

        playerTitle.textContent =
            track.querySelector("h3").textContent;

        player.classList.add("active");

        audio.play();


        audio.addEventListener("timeupdate", updateProgress);


        audio.addEventListener("ended", () => {

            progressBar.style.width = "0%";

            playerButton.textContent = "▶";

        });

    });

});


/* =========================
   PLAYER BUTTON
========================= */

playerButton.addEventListener("click", () => {

    if (!audio) return;


    if (audio.paused) {

        audio.play();

        playerButton.textContent = "Ⅱ";

    } else {

        audio.pause();

        playerButton.textContent = "▶";

    }

});


/* =========================
   PROGRESS
========================= */

function updateProgress() {

    if (!audio) return;


    const progress =
        (audio.currentTime / audio.duration) * 100;


    progressBar.style.width =
        `${progress}%`;


    playerButton.textContent =
        audio.paused ? "▶" : "Ⅱ";


    playerTime.textContent =
        formatTime(audio.currentTime);

}


function formatTime(seconds) {

    if (!seconds || isNaN(seconds)) {
        return "00:00";
    }


    const minutes =
        Math.floor(seconds / 60);


    const remaining =
        Math.floor(seconds % 60);


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remaining).padStart(2, "0")
    );

}


/* =========================
   MEMORY BUTTON
========================= */

const restoreButton =
    document.getElementById("restoreButton");


restoreButton.addEventListener("click", () => {

    restoreButton.textContent =
        "ERROR 0x00000004";


    setTimeout(() => {

        restoreButton.textContent =
            "DO NOT RESTORE";

    }, 2000);

});


/* =========================
   RANDOM GLITCH
========================= */

setInterval(() => {

    const title =
        document.querySelector(".hero h1");


    if (Math.random() > 0.92) {

        title.style.transform =
            "translateX(-7px) skewX(-4deg)";


        setTimeout(() => {

            title.style.transform =
                "translateX(-7px)";

        }, 80);

    }

}, 1500);