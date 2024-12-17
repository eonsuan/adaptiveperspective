window.addEventListener('load', () => {
  const slider = document.querySelector('.control input[type="range"]');
  const images = document.querySelectorAll('.image');
  let isSliderChanging = false; 
  let isPageLoaded = true; 

  images.forEach((image, index) => {
    const randomX = Math.random() * 2 - 1; 
    const randomY = Math.random() * 2 - 1; 
    const randomRotationX = Math.random() * 360; 
    const randomRotationY = Math.random() * 360; 
    const randomRotationZ = Math.random() * 360; 

    image.dataset.directionX = randomX;
    image.dataset.directionY = randomY;
    image.dataset.posX = 0;
    image.dataset.posY = 0;
    image.dataset.rotationX = randomRotationX; 
    image.dataset.rotationY = randomRotationY;
    image.dataset.rotationZ = randomRotationZ;
  });

  slider.value = 0;

  function moveToTarget() {
    const value = (slider.value - slider.min) / (slider.max - slider.min);
    const distance = 100 - value * 100; 

    images.forEach((image, index) => {
      const currentPosX = parseFloat(image.dataset.posX);
      const currentPosY = parseFloat(image.dataset.posY);

      const directionX = image.dataset.directionX;
      const directionY = image.dataset.directionY;

      const targetX = (index + 1) * 50 * value; 
      const targetY = (index + 1) * 50 * value;

      const newPosX = currentPosX + directionX * distance * 0.05;
      const newPosY = currentPosY + directionY * distance * 0.05;
      if (Math.abs(currentPosX - targetX) < 0.1 && Math.abs(currentPosY - targetY) < 0.1) {
        image.dataset.posX = targetX;
        image.dataset.posY = targetY;
      } else {
        image.dataset.posX = newPosX;
        image.dataset.posY = newPosY;
      }

      const rotationX = image.dataset.rotationX + value * 180; 
      const rotationY = image.dataset.rotationY + value * 180;
      const rotationZ = image.dataset.rotationZ + value * 180;

      image.style.transform = `translate3d(${newPosX}px, ${newPosY}px, 0px) scale(${1 + value / 3}) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;
    });
  }

  function applyFloatingEffect() {
    const value = (slider.value - slider.min) / (slider.max - slider.min);
    if (value === 1) {
      images.forEach(image => {
        const directionX = image.dataset.directionX;
        const directionY = image.dataset.directionY;

        const currentPosX = parseFloat(image.dataset.posX);
        const currentPosY = parseFloat(image.dataset.posY);

        const newPosX = currentPosX + directionX * 0.1; 
        const newPosY = currentPosY + directionY * 0.1;

        image.dataset.posX = newPosX;
        image.dataset.posY = newPosY;

        image.style.transform = `translate3d(${newPosX}px, ${newPosY}px, 0px)`;
      });
    } else {
      images.forEach(image => {
        const directionX = -image.dataset.directionX; 
        const directionY = -image.dataset.directionY;

        const currentPosX = parseFloat(image.dataset.posX);
        const currentPosY = parseFloat(image.dataset.posY);

        const newPosX = currentPosX + directionX * 0.1; 
        const newPosY = currentPosY + directionY * 0.1;

        image.dataset.posX = newPosX;
        image.dataset.posY = newPosY;

        image.style.transform = `translate3d(${newPosX}px, ${newPosY}px, 0px)`;
      });
    }
  }

  function updateSliderColor() {
    const value = (slider.value - slider.min) / (slider.max - slider.min); 

    if (value === 0) {
      images.forEach(image => {
        image.style.transform = `translate3d(0, 0, 0) scale(1)`;
        image.style.opacity = 1;
        image.dataset.posX = 0;
        image.dataset.posY = 0;
      });
      slider.style.background = 'linear-gradient(to left, #ddd 100%, #000 100%)';
      return;
    }

    const colorStop = value * 100; 
    slider.style.background = `linear-gradient(to left, #ddd ${100 - colorStop}%, #000 ${100 - colorStop}%)`;

    if (isSliderChanging) {
      moveToTarget(); 
    }
  }

  slider.addEventListener('input', () => {
    isSliderChanging = true;
    isPageLoaded = false; 
    updateSliderColor();
  });

  slider.addEventListener('change', () => {
    isSliderChanging = false;
  });


  function animateImages() {
    if (!isSliderChanging && isPageLoaded) {
      return; 
    }
    if (!isSliderChanging) {
      applyFloatingEffect();
    }
    requestAnimationFrame(animateImages); 
  }

  animateImages();


  updateSliderColor();
});


/* 안내문 */
        const userAgent = navigator.userAgent;

        const isMac = /Macintosh/.test(userAgent);

        if (!isMac) {
            document.body.innerHTML = '<div class="construction">PC로 접속해주세요.</div>';
        }