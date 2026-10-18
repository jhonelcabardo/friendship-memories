
/* =========================================
   FRIENDSHIP MEMORIES WEBSITE
   Full Updated script.js
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- ELEMENTS ----------

  const gallery = document.getElementById("photoGallery");
  const counter = document.getElementById("photoCounter");
  const prevButton = document.getElementById("prevPhoto");
  const nextButton = document.getElementById("nextPhoto");

  const music = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");

  // Stop safely if the gallery is missing.
  if (!gallery) {
    console.error("Photo gallery element was not found.");
    return;
  }

  // ---------- PHOTO SETTINGS ----------

  const totalPhotos = 18;
  const slideDuration = 3000;

  const captions = [
    "Just Being Us 💗",
    "Happy Together 💜",
    "Silly Moments ✨",
    "Sweet Memories 🌷",
    "Little Adventures 💕",
    "Forever Friends 🫶",
    "Our Happy Place 🌸",
    "Laughing Together 😂",
    "Bestie Moments 💖",
    "Little Things, Big Memories ✨",
    "Smiles We Keep 💗",
    "Crazy but Unforgettable 💜",
    "Side by Side 🌷",
    "Our Kind of Happiness 🫶",
    "Memories Worth Keeping 💕",
    "Always Better Together ✨",
    "One for the Memories 💖",
    "To More Adventures! 💗"
  ];

  let currentPhoto = 0;
  let slideshowTimer = null;
  let isPaused = false;

  // ---------- CREATE THE 18 PHOTO CARDS ----------

  const photoCards = [];

  for (let index = 0; index < totalPhotos; index++) {
    const photoNumber = String(index + 1).padStart(2, "0");

    const card = document.createElement("div");
    card.className = "photo-card";

    const image = document.createElement("img");
    image.src = `images/photo${photoNumber}.jpg`;
    image.alt = `Friendship memory ${index + 1}`;
    image.loading = index === 0 ? "eager" : "lazy";
    image.decoding = "async";

    // Show a message if a picture cannot be loaded.
    image.addEventListener("error", () => {
      console.error(`Unable to load images/photo${photoNumber}.jpg`);

      image.alt = `Photo ${index + 1} could not be loaded`;
      image.style.objectFit = "contain";
      image.style.padding = "20px";
    });

    const overlay = document.createElement("div");
    overlay.className = "photo-overlay";

    const title = document.createElement("div");
    title.className = "photo-title";
    title.textContent = captions[index];

    overlay.appendChild(title);

    const number = document.createElement("span");
    number.className = "photo-number";
    number.textContent = `${index + 1} / ${totalPhotos}`;

    const heart = document.createElement("span");
    heart.className = "photo-heart";
    heart.textContent = "♡";
    heart.setAttribute("aria-hidden", "true");

    card.append(image, overlay, number, heart);
    gallery.appendChild(card);

    photoCards.push(card);
  }

  // ---------- SHOW ONE PHOTO AT A TIME ----------

  function showPhoto(index) {
    // Wrap around when reaching either end.
    currentPhoto = (index + totalPhotos) % totalPhotos;

    photoCards.forEach((card, cardIndex) => {
      card.classList.toggle("active", cardIndex === currentPhoto);
    });

    if (counter) {
      counter.textContent = `${currentPhoto + 1} / ${totalPhotos}`;
    }
  }

  // ---------- AUTOMATIC SLIDESHOW ----------

  function stopSlideshow() {
    if (slideshowTimer !== null) {
      clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  }

  function startSlideshow() {
    stopSlideshow();

    if (isPaused) return;

    slideshowTimer = setInterval(() => {
      showPhoto(currentPhoto + 1);
    }, slideDuration);
  }

  function nextPhoto() {
    showPhoto(currentPhoto + 1);
    startSlideshow();
  }

  function previousPhoto() {
    showPhoto(currentPhoto - 1);
    startSlideshow();
  }

  // ---------- PREVIOUS AND NEXT BUTTONS ----------

  if (prevButton) {
    prevButton.addEventListener("click", previousPhoto);
  }

  if (nextButton) {
    nextButton.addEventListener("click", nextPhoto);
  }

  // ---------- PAUSE WHILE THE USER IS AWAY ----------

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  // ---------- BACKGROUND MUSIC ----------

  async function toggleMusic() {
    if (!music || !musicButton) return;

    if (music.paused) {
      try {
        await music.play();
        musicButton.textContent = "♫ Pause Music";
        musicButton.setAttribute("aria-label", "Pause background music");
      } catch (error) {
        console.error("Music playback failed:", error);

        musicButton.textContent = "♫ Tap to Play";
        musicButton.setAttribute("aria-label", "Play background music");

        alert(
          "Music could not be played. Please check the song filename and try again."
        );
      }
    } else {
      music.pause();
      musicButton.textContent = "♫ Play Music";
      musicButton.setAttribute("aria-label", "Play background music");
    }
  }

  if (music && musicButton) {
    musicButton.addEventListener("click", toggleMusic);

    music.addEventListener("play", () => {
      musicButton.textContent = "♫ Pause Music";
      musicButton.setAttribute("aria-label", "Pause background music");
    });

    music.addEventListener("pause", () => {
      musicButton.textContent = "♫ Play Music";
      musicButton.setAttribute("aria-label", "Play background music");
    });

    music.addEventListener("ended", () => {
      musicButton.textContent = "♫ Play Music";
    });
  }

  // ---------- START THE WEBSITE ----------

  showPhoto(0);
  startSlideshow();

  console.log("Friendship Memories loaded successfully! 💜");
  console.log(`${totalPhotos} photos are ready for the slideshow.`);
});
