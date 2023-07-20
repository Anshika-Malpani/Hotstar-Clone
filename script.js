let movies = [
  {
    name: "Secret Invasion",
    des:
      "A group of evil Skrulls has infiltrated all aspects of life on Earth, and if someone doesn't intervene and stop them, they'll control the planet before the heroes even realize what's going on",
    image: "images/Secret Invasion.png",
    video: "videos/SI.mp4"
  },
  {
    name: "Night Manager",
    des:
      "Former Indian Navy Lieutenant Shantanu Shaan Sengupta, is currently working as a night manager in a premiere star hotel in Dhaka, amidst the Rohingya genocide in 2017. ",
    image: "images/Night Manager.png",
    video: "videos/NM.mp4"
  },
  {
    name: 'falcon and the winter soldier',
    des: 'Sam Wilson/Falcon and Bucky Barnes/Winter Soldier team up in a global adventure that tests their abilities -- and their patience.',
    image: 'images/slider 2.PNG',
    video: "videos/Falcon.mp4"
  },
  {
    name: 'loki',
    des: 'The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of “Avengers: Endgame.”',
    image: 'images/slider 1.PNG',
    video: "videos/loki.mp4"
  },
  {
    name: 'wanda vision',
    des: 'WandaVision is a new Marvel Studios series that follows Wanda Maximoff and Vision — two super-powered beings living their ideal suburban life, which is disrupted when a series of mysterious events begin to unfold. ',
    image: 'images/slider 3.PNG',
    video: "videos/WV.mp4"
  },
  {
    name: 'raya and the last dragon',
    des: 'Kelly Marie Tran as Raya, the fierce and virtuous warrior princess of Heart who has been training to become a Guardian of the Dragon Gem.',
    image: 'images/slider 4.PNG',
    video: "videos/Raya.mp4"
  },
  {
    name: 'luca',
    des: 'A young boy experiences an unforgettable seaside summer on the Italian Riviera filled with gelato, pasta and endless scooter rides.',
    image: 'images/slider 5.PNG',
    video: "videos/luca.mp4"
  }
];
const carousel = document.querySelector('.carousel');
let sliders = [];
let slideIndex = 0;
let isVideoPlaying = false;
let isVideoMuted = true;
let slideInterval;
let muteButton;
let unmuteButton;

const createSlide = () => {
  if (slideIndex >= movies.length) {
    slideIndex = 0;
  }

  let slide = document.createElement('div');
  let videoElement = document.createElement('video');
  let sourceElement = document.createElement('source');
  let imgElement = document.createElement('img');
  let content = document.createElement('div');
  let h1 = document.createElement('h1');
  let p = document.createElement('p');

  imgElement.appendChild(document.createTextNode(''));
  h1.appendChild(document.createTextNode(movies[slideIndex].name));
  p.appendChild(document.createTextNode(movies[slideIndex].des));
  content.appendChild(h1);
  content.appendChild(p);
  slide.appendChild(content);
  slide.appendChild(imgElement);
  carousel.appendChild(slide);

  // Add event listeners to start and stop the video when hovered
  slide.addEventListener('mouseover', function () {
    if (!isVideoPlaying) {
      videoElement.style.display = 'block'; // Show the video
      videoElement.play();
      isVideoPlaying = true;
      clearInterval(slideInterval); // Pause the carousel from sliding
    }
  });

  slide.addEventListener('mouseout', function () {
    if (isVideoPlaying) {
      videoElement.pause();
      isVideoPlaying = false;
      videoElement.style.display = 'none'; // Hide the video when not playing
      slideInterval = setInterval(() => {
        createSlide();
      }, 3000); // Resume sliding the carousel
    }
  });

  // Custom mute button
  muteButton = document.createElement('button');
  muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  muteButton.className = 'mute-button';
  muteButton.addEventListener('click', function () {
    if (!isVideoMuted) {
      videoElement.muted = true;
      isVideoMuted = true;
    }
  });

  // Custom unmute button with Font Awesome icon
  unmuteButton = document.createElement('button');
  unmuteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  unmuteButton.className = 'unmute-button';
  unmuteButton.addEventListener('click', function () {
    if (isVideoMuted) {
      videoElement.muted = false;
      isVideoMuted = false;
    }
  });

  // Append the buttons to the slide
  slide.appendChild(muteButton);
  slide.appendChild(unmuteButton);

  imgElement.src = movies[slideIndex].image;
  videoElement.loop = true; // Loop the video
  videoElement.muted = true; // Mute the video for autoplay to work on some browsers
  videoElement.style.display = 'none'; // Hide the video initially

  sourceElement.src = movies[slideIndex].video;
  sourceElement.type = 'video/mp4';
  videoElement.appendChild(sourceElement);

  slide.appendChild(videoElement);

  slideIndex++;

  slide.className = 'slider';
  content.className = 'slide-content';
  h1.className = 'movie-title';
  p.className = 'movie-des';

  sliders.push(slide);

  if (sliders.length) {
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 1)}% - ${30 * (sliders.length - 1)}px)`;
  }
};

// Create the first slide with the first image visible
createSlide();

// Start sliding the carousel after a delay of 3000ms (3 seconds)
slideInterval = setInterval(() => {
  createSlide();
}, 3000);





// video cards

const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(item => {
  item.addEventListener('mouseover', () => {
    let video = item.children[1];
    video.play();
  })
  item.addEventListener('mouseleave', () => {
    let video = item.children[1];
    video.pause();
  })
})

// cards sliders

let cardContainers = document.querySelectorAll('.card-container');
let preBtns = document.querySelectorAll('.pre-btn');
let nxtBtns = document.querySelectorAll('.nxt-btn');

cardContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtns[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth - 200;
  })

  preBtns[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth + 200;
  })
})
