document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Initialize tsParticles (v2 syntax)
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#6b8afd", "#89a3ff", "#a6b9ff"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        outModes: {
          default: "out"
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#6b8afd",
        opacity: 0.2,
        width: 1
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      }
    },
    detectRetina: true
  });

  // --- DOM Elements ---
  const datePicker = document.getElementById("date-picker");
  const randomBtn = document.getElementById("randomBtn");
  const loader = document.getElementById("loader");
  const errorMessageEl = document.getElementById("error-message");

  const imageEl = document.getElementById("apod-image");
  const videoEl = document.getElementById("apod-video");
  const titleEl = document.getElementById("apod-title");
  const explanationEl = document.getElementById("apod-explanation");
  const copyrightEl = document.getElementById("copyright");

  const hdBtn = document.getElementById("hdBtn");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const introOverlay = document.getElementById("introOverlay");
  const mainContainer = document.getElementById("mainContainer");
  const recentApodsList = document.getElementById("recentApodsList");
  const marsWeatherEl = document.getElementById("marsWeather");
  const spaceFactsEl = document.getElementById("spaceFacts");
  const nasaMissionsEl = document.getElementById("nasaMissions");

  const today = new Date().toISOString().split("T")[0];
  datePicker.max = today;
  datePicker.value = today;

  // NASA API key (you can replace with your own)
  const apiKey = "FycA5kfbrZx6uedypwy8HVTL3hJRbSBNJOeggVP5";

  // Initialize Splide carousel (even if initially empty)
  const splide = new Splide("#recentApods", {
    type: "slide",
    perPage: 4,
    perMove: 1,
    gap: "1rem",
    breakpoints: {
      1200: {
        perPage: 3
      },
      900: {
        perPage: 2
      },
      600: {
        perPage: 1
      }
    },
    pagination: false,
    arrows: true,
    drag: true
  }).mount();

  // Initialize ISS Map
  let issMap;
  let issMarker;

  function initMap() {
    issMap = L.map("iss-map").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(issMap);

    const issIcon = L.divIcon({
      html:
        '<div style="background-color: #6b8afd; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(107, 138, 253, 0.7);"></div>',
      className: "iss-marker",
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    issMarker = L.marker([0, 0], { icon: issIcon }).addTo(issMap);
  }

  // --- APOD Fetch ---
  async function getApod(date) {
    if (errorMessageEl) {
      errorMessageEl.textContent = "";
      errorMessageEl.classList.add("hidden");
    }

    loader.style.display = "flex";
    imageEl.style.display = "none";
    videoEl.style.display = "none";

    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API Error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
      const data = await response.json();
      updateAPODUI(data);
    } catch (error) {
      console.error(error.message);
      loader.style.display = "none";
      if (errorMessageEl) {
        errorMessageEl.textContent =
          "Error loading NASA data. Please try another date.";
        errorMessageEl.classList.remove("hidden");
      }
    }
  }

  // --- Update APOD UI ---
  function updateAPODUI(data) {
    // Set text first
    titleEl.textContent = data.title || "";
    explanationEl.textContent = data.explanation || "";
    copyrightEl.textContent = data.copyright
      ? `© ${data.copyright}`
      : "";

    // Animate text
    gsap.fromTo(
      titleEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      explanationEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );

    gsap.fromTo(
      copyrightEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.4 }
    );

    if (data.media_type === "image") {
      const img = new Image();
      img.onload = () => {
        imageEl.src = data.url;
        imageEl.style.display = "block";
        videoEl.style.display = "none";
        hdBtn.style.display = "block";

        hdBtn.onclick = () => {
          modalImage.src = data.hdurl || data.url;
          modal.style.display = "block";
          gsap.fromTo(
            modalImage,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        };

        loader.style.display = "none";

        gsap.fromTo(
          imageEl,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      };
      img.onerror = () => {
        loader.style.display = "none";
        if (errorMessageEl) {
          errorMessageEl.textContent =
            "Unable to load image. Please try a different date.";
          errorMessageEl.classList.remove("hidden");
        }
      };
      img.src = data.url;
    } else if (data.media_type === "video") {
      videoEl.src = data.url;
      videoEl.style.display = "block";
      imageEl.style.display = "none";
      hdBtn.style.display = "none";
      loader.style.display = "none";

      gsap.fromTo(
        videoEl,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    } else {
      loader.style.display = "none";
      if (errorMessageEl) {
        errorMessageEl.textContent =
          "Unsupported media type returned by NASA API.";
        errorMessageEl.classList.remove("hidden");
      }
    }
  }

  // --- Fetch recent APODs for carousel ---
  async function getRecentApods() {
    const dates = [];
    const baseDate = new Date();

    for (let i = 0; i < 10; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    try {
      const promises = dates.map((date) =>
        fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
        ).then((response) => response.json())
      );

      const results = await Promise.all(promises);

      const images = results.filter(
        (item) => item && item.media_type === "image" && !item.error
      );

      recentApodsList.innerHTML = "";
      images.forEach((item) => {
        const slide = document.createElement("li");
        slide.className = "splide__slide";
        slide.innerHTML = `
          <img src="${item.url}" alt="${item.title}" />
          <div class="slide-title">${item.title}</div>
        `;
        slide.addEventListener("click", () => {
          datePicker.value = item.date;
          getApod(item.date);
          lenis.scrollTo(0, { duration: 1 });
        });
        recentApodsList.appendChild(slide);
      });

      splide.refresh();
    } catch (error) {
      console.error("Error loading recent APODs:", error);
    }
  }

  // --- Mars Weather (placeholder static data) ---
  async function getMarsWeather() {
    try {
      const weatherData = [
        { name: "Temperature", value: "-63", unit: "°C" },
        { name: "Pressure", value: "718", unit: "Pa" },
        { name: "Wind Speed", value: "4.3", unit: "m/s" },
        { name: "Season", value: "Winter", unit: "" }
      ];

      marsWeatherEl.innerHTML = "";
      weatherData.forEach((item) => {
        const card = document.createElement("div");
        card.className = "weather-card";
        card.innerHTML = `
          <h3>${item.name}</h3>
          <div class="weather-value">${item.value}<span class="weather-unit">${item.unit}</span></div>
        `;
        marsWeatherEl.appendChild(card);
      });

      gsap.fromTo(
        ".weather-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    } catch (error) {
      console.error("Error loading Mars weather:", error);
    }
  }

  // --- Space Facts ---
  function loadSpaceFacts() {
    const facts = [
      {
        title: "The Moon is Drifting Away",
        content:
          "The Moon is moving approximately 3.8 cm away from Earth every year due to tidal interactions."
      },
      {
        title: "A Day on Venus",
        content:
          "Venus has the longest day of any planet in our solar system - it takes 243 Earth days to rotate once on its axis."
      },
      {
        title: "Water in Space",
        content:
          "There is a massive water vapor cloud in space that holds 140 trillion times the water in Earth's oceans."
      },
      {
        title: "Neutron Stars",
        content:
          "A neutron star is so dense that a teaspoon of its material would weigh about 10 million tons on Earth."
      }
    ];

    spaceFactsEl.innerHTML = "";
    facts.forEach((fact) => {
      const card = document.createElement("div");
      card.className = "fact-card";
      card.innerHTML = `
        <h3>${fact.title}</h3>
        <p>${fact.content}</p>
      `;
      spaceFactsEl.appendChild(card);
    });

    gsap.fromTo(
      ".fact-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }

  // --- ISS Location ---
  async function getISSLocation() {
    try {
      const response = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544"
      );
      const data = await response.json();

      document.getElementById(
        "iss-location"
      ).textContent = `Latitude: ${data.latitude.toFixed(
        2
      )}°, Longitude: ${data.longitude.toFixed(2)}°`;
      document.getElementById(
        "iss-velocity"
      ).textContent = `Velocity: ${data.velocity.toFixed(2)} km/h`;
      document.getElementById(
        "iss-altitude"
      ).textContent = `Altitude: ${data.altitude.toFixed(2)} km`;
      document.getElementById(
        "iss-visibility"
      ).textContent = `Visibility: ${data.visibility}`;

      if (issMap && issMarker) {
        issMarker.setLatLng([data.latitude, data.longitude]);
        issMap.setView([data.latitude, data.longitude], 3);
      }
    } catch (error) {
      console.error("Error loading ISS location:", error);
    }
  }

  // --- NASA Missions ---
  function loadNASAMissions() {
    const missions = [
      {
        name: "Artemis Program",
        status: "upcoming",
        description:
          "NASA's program to return humans to the Moon and establish a sustainable presence there by the end of the decade.",
        date: "2025",
        type: "Lunar Exploration"
      },
      {
        name: "James Webb Space Telescope",
        status: "active",
        description:
          "The premier observatory of the next decade, serving thousands of astronomers worldwide to study the universe.",
        date: "2021",
        type: "Space Telescope"
      },
      {
        name: "Perseverance Rover",
        status: "active",
        description:
          "Part of NASA's Mars 2020 mission, it is searching for signs of ancient life and collecting samples for future return to Earth.",
        date: "2021",
        type: "Mars Rover"
      },
      {
        name: "DART Mission",
        status: "completed",
        description:
          "The Double Asteroid Redirection Test successfully demonstrated asteroid deflection technology by impacting Dimorphos.",
        date: "2022",
        type: "Planetary Defense"
      }
    ];

    nasaMissionsEl.innerHTML = "";
    missions.forEach((mission) => {
      const card = document.createElement("div");
      card.className = "mission-card";
      card.innerHTML = `
        <h3>${mission.name}</h3>
        <span class="mission-status status-${mission.status}">
          ${mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
        </span>
        <p>${mission.description}</p>
        <div class="mission-details">
          <span>${mission.date}</span>
          <span>${mission.type}</span>
        </div>
      `;
      nasaMissionsEl.appendChild(card);
    });

    gsap.fromTo(
      ".mission-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }

  // --- Random Date ---
  function getRandomDate() {
    const start = new Date("1995-06-16").getTime();
    const end = new Date().getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toISOString().split("T")[0];
  }

  // --- Event Listeners ---
  datePicker.addEventListener("change", (e) => getApod(e.target.value));

  randomBtn.addEventListener("click", () => {
    const randomDate = getRandomDate();
    datePicker.value = randomDate;
    getApod(randomDate);
  });

  // Modal close
  const closeBtn = document.getElementById("closeBtn");

  function hideModal() {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.style.display = "none";
        modal.style.opacity = 1;
      }
    });
  }

  closeBtn.addEventListener("click", hideModal);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      hideModal();
    }
  });

  // --- Intro Animation ---
  function playIntroAnimation() {
    const tl = gsap.timeline();

    tl.fromTo(
      ".planet",
      { scale: 0, rotation: 0 },
      { scale: 1, rotation: 360, duration: 1.5, ease: "back.out(1.7)" }
    );

    tl.fromTo(
      ".rocket",
      {
        x: -200,
        y: 200,
        rotation: 45
      },
      {
        motionPath: {
          path: [
            { x: -200, y: 200 },
            { x: 0, y: 0 },
            { x: 200, y: -200 }
          ],
          curviness: 1.5
        },
        rotation: 0,
        duration: 2,
        ease: "power2.inOut"
      },
      "-=1"
    );

    tl.to(introOverlay, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        introOverlay.style.display = "none";
        gsap.to(mainContainer, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        });
      }
    });
  }

  // --- Initialize App ---
  function initApp() {
    playIntroAnimation();
    initMap();
    getApod(today);
    getRecentApods();
    getMarsWeather();
    loadSpaceFacts();
    loadNASAMissions();

    getISSLocation();
    setInterval(getISSLocation, 5000);

    // Scroll-trigger for sections
    gsap.utils.toArray(".section").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }

  initApp();
});

