document.addEventListener("DOMContentLoaded", function () {
  const songs = document.querySelectorAll(".song-number");
  const kazenosasayakiDiv = document.querySelector("#kazenosasayaki");
  const kazenosasayakiAudio = document.querySelector("#kazenosasayaki-audio");
  const goodnightbabyDiv = document.querySelector("#goodnightbaby");
  const goodnightbabyAudio = document.querySelector("#goodnightbaby-audio");
  const progressBar = document.querySelector(".bar progress");
  const progressCircle = document.querySelector(".bar div:nth-of-type(2) div");
  const pauseBtn = document.querySelector(".play div:nth-of-type(2) button");
  const playIcon = document.querySelector(
    ".play div:nth-of-type(2) button:nth-of-type(1) svg:nth-of-type(1)"
  );
  const pauseIcon = document.querySelector(
    ".play div:nth-of-type(2) button:nth-of-type(1) svg:nth-of-type(2)"
  );
  const currentTimeline = document.querySelector(
    ".bar div:nth-of-type(1) span"
  );
  const endTimeline = document.querySelector(".bar div:nth-of-type(3) span");
  const nowSongImg = document.querySelector(".center-now-song img");
  const nowSongName = document.querySelector(
    ".center-now-song div span:nth-of-type(1)"
  );
  const nowSongArtists = document.querySelector(
    ".center-now-song div span:nth-of-type(2)"
  );
  const progressBarClick = document.querySelector(".bar div:nth-of-type(2)");
  const volumeBar = document.querySelector(".volume progress");
  const volumeBarClick = document.querySelector(".volume > div:nth-of-type(1)");
  const volumeBarCircle = document.querySelector(
    ".volume > div:nth-of-type(1) div"
  );

  let isPaused = true;
  let lastPlayedAudio = null;
  let currentVolume = 0.15;

  volumeBarClick.addEventListener("click", function (e) {
    const posX = e.offsetX;
    const volumeBarWidth = volumeBarClick.clientWidth;
    const clickedPercentage = posX / volumeBarWidth;
    volumeBarCircle.style.left = `${clickedPercentage * 100 - 1}%`;
    volumeBar.value = `${clickedPercentage * 100}`;
    if (lastPlayedAudio) {
      lastPlayedAudio.volume = clickedPercentage;
    }
    currentVolume = clickedPercentage;
  });

  progressBarClick.addEventListener("click", function (e) {
    if (lastPlayedAudio) {
      const posX = e.offsetX;
      const progressBarWidth = progressBarClick.clientWidth;
      const clickedPercentage = posX / progressBarWidth;
      const newTime = lastPlayedAudio.duration * clickedPercentage;
      const duration = lastPlayedAudio.duration;
      lastPlayedAudio.currentTime = newTime;
      progressBar.value = `${(newTime / duration) * 100}`;
      progressCircle.style.left = `${(newTime / duration) * 100 - 1}%`;
    }
  });

  pauseBtn.addEventListener("click", function () {
    if (isPaused) {
      lastPlayedAudio.play();
      pauseIcon.style.display = "none";
      playIcon.style.display = "inline";
      isPaused = false;
    } else {
      if (!goodnightbabyAudio.paused) {
        goodnightbabyAudio.pause();
      } else if (!kazenosasayakiAudio.paused) {
        kazenosasayakiAudio.pause();
      }
      pauseIcon.style.display = "inline";
      playIcon.style.display = "none";
      isPaused = true;
    }
  });

  kazenosasayakiDiv.addEventListener("dblclick", function () {
    if (!goodnightbabyAudio.paused) {
      goodnightbabyAudio.pause();
    }
    kazenosasayakiAudio.currentTime = 0;
    kazenosasayakiAudio.volume = currentVolume;
    kazenosasayakiAudio.play();
    pauseIcon.style.display = "none";
    playIcon.style.display = "inline";
    isPaused = false;
    lastPlayedAudio = kazenosasayakiAudio;
    endTimeline.textContent = secondsToMinutes(kazenosasayakiAudio.duration);
    nowSongImg.src = "./assets/청춘의 익사이트먼트.jpg";
    nowSongName.textContent = "바람의 속삭임";
    nowSongArtists.textContent = "아이묭";
  });

  setInterval(function () {
    if (lastPlayedAudio) {
      const currentTime = lastPlayedAudio.currentTime;
      const duration = lastPlayedAudio.duration;
      const progress = (currentTime / duration) * 100;
      progressBar.value = `${progress}`;
      progressCircle.style.left = `${progress - 1}%`;
      currentTimeline.textContent = secondsToMinutes(currentTime);
    }
  }, 1000);

  goodnightbabyDiv.addEventListener("dblclick", function () {
    if (!kazenosasayakiAudio.paused) {
      kazenosasayakiAudio.pause();
    }
    goodnightbabyAudio.currentTime = 0;
    goodnightbabyAudio.volume = currentVolume;
    goodnightbabyAudio.play();
    pauseIcon.style.display = "none";
    playIcon.style.display = "inline";
    isPaused = false;
    lastPlayedAudio = goodnightbabyAudio;
    endTimeline.textContent = secondsToMinutes(goodnightbabyAudio.duration);
    nowSongImg.src = "./assets/순간적 식스센스.jpg";
    nowSongName.textContent = "GOOD NIGHT BABY";
    nowSongArtists.textContent = "아이묭";
  });

  songs.forEach((song) => {
    song.addEventListener("click", function () {
      songs.forEach((othersong) => {
        if (othersong !== song) {
          othersong.style.backgroundColor = "";
        }
      });
      song.style.backgroundColor = "#ffffff59";
    });
  });

  function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    const formattedMinutes = String(minutes).padStart(1, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
});
