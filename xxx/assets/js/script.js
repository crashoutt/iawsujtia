function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particlesContainer.appendChild(particle);
  }
}

function playMusicAndHideOverlay() {
  console.log('Overlay clicked, starting transition');
  const overlay = document.getElementById('overlay');
  const video = document.getElementById('background-video');
  const socialButtons = document.querySelectorAll('.social-button');

  video.volume = 0.3;
  video.muted = false;
  overlay.style.opacity = '0';
  overlay.style.transform = 'scale(0.8)';

  setTimeout(() => {
    console.log('Transition complete, hiding overlay and playing video');
    overlay.style.display = 'none';
    video.style.display = 'block';
    video.play().catch(error => {
      console.error('Video playback failed:', error);
      alert('Failed to play video. Ensure the video file has an audio track and is accessible.');
    });

    // Animate in social buttons with staggered delay
    socialButtons.forEach((button, i) => {
      setTimeout(() => {
        button.classList.add('animate');
      }, 150 + i * 100);
    });
  }, 800);
}

function initTypewriter() {
  const texts = [
    "archive swaggot",
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter-text');
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

function init3DTilt() {
  const card = document.querySelector('.profile-card');
  const wrapper = document.querySelector('.tilt-wrapper');
  
  wrapper.addEventListener('mousemove', function(e) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    
    requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(25px)`;
    });
  });
  
  wrapper.addEventListener('mouseenter', function() {
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
  });
  
  wrapper.addEventListener('mouseleave', function() {
    card.style.transition = 'transform 0.4s ease-out, box-shadow 0.3s ease';
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
}

function hideSocialButtons() {
  const socialButtons = document.querySelectorAll('.social-button');
  socialButtons.forEach(button => {
    button.classList.remove('animate');
    button.style.opacity = '0';
    button.style.transform = 'translateY(30px)';
    button.style.transition = 'none';
  });
}


document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  init3DTilt();
  hideSocialButtons(); // Ensure social buttons are hidden initially
  setTimeout(initTypewriter, 0);

  const overlay = document.getElementById('overlay');
  overlay.addEventListener('click', function() {
    playMusicAndHideOverlay();
    document.body.classList.add('entered');
  });
});
