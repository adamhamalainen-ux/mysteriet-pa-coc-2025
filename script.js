document.addEventListener("DOMContentLoaded", () => {
  // Hämta alla luckor och modalelement
  const doors = document.querySelectorAll(".door");
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeBtn = document.getElementById("closeModal");

  if (!modal || !modalVideo || !closeBtn || doors.length === 0) {
    console.warn("Kunde inte hitta alla element (modal, video eller luckor).");
    return;
  }

  let currentZoomedDoor = null;

  // När man klickar på en lucka
  doors.forEach((door) => {
    door.addEventListener("click", () => {
      // Ta bort zoom/gömd-klass från ev. tidigare lucka
      if (currentZoomedDoor) {
        currentZoomedDoor.classList.remove("zoomed", "hidden-door");
      }

      // Zooma den klickade luckan
      door.classList.add("zoomed");
      // Göm luckan medan videon visas
      door.classList.add("hidden-door");

      currentZoomedDoor = door;

      // Hämta videosökväg från data-attributet (t.ex. "film1.mp4")
      const videoSrc = door.dataset.video;
      if (videoSrc) {
        modalVideo.src = videoSrc;
        modal.classList.remove("hidden");
        modalVideo.load();
        // Försök autoplay – vissa webbläsare kan blockera, men det gör inget om det misslyckas
        modalVideo.play().catch(() => {});
      }
    });
  });

  // Stäng modal
  function closeModal() {
    modal.classList.add("hidden");
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";

    // Återställ alla luckor så de syns igen
    doors.forEach((door) => {
      door.classList.remove("zoomed", "hidden-door");
    });

    currentZoomedDoor = null;
  }

  closeBtn.addEventListener("click", closeModal);

  // Stäng om man klickar på bakgrunden
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });
});
