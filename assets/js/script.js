// Sélection des éléments du DOM
const navbarMenu = document.getElementById("menu"); // Sélectionne le menu de la barre de navigation
const burgerMenu = document.getElementById("burger"); // Sélectionne l'icône de menu hamburger
const headerMenu = document.getElementById("header"); // Sélectionne l'en-tête de la page

// Ouvrir ou fermer le menu de navigation en cliquant sur l'icône hamburger
if (burgerMenu && navbarMenu) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("is-active"); // Ajoute ou supprime la classe "is-active" pour l'icône hamburger
    navbarMenu.classList.toggle("is-active"); // Ajoute ou supprime la classe "is-active" pour le menu de navigation
  });
}

// Fermer le menu de navigation en cliquant sur les liens du menu
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-active"); // Supprime la classe "is-active" de l'icône hamburger
    navbarMenu.classList.remove("is-active"); // Supprime la classe "is-active" du menu de navigation
  });
});

// Modifier l'arrière-plan de l'en-tête lors du défilement
window.addEventListener("scroll", () => {
  if (this.scrollY >= 85) {
    headerMenu.classList.add("on-scroll"); // Ajoute la classe "on-scroll" à l'en-tête lors du défilement vers le bas
  } else {
    headerMenu.classList.remove("on-scroll"); // Supprime la classe "on-scroll" de l'en-tête lors du retour en haut de la page
  }
});

// Fixer le menu de navigation en cas de redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (navbarMenu.classList.contains("is-active")) {
      navbarMenu.classList.remove("is-active"); // Supprime la classe "is-active" du menu de navigation si la largeur de la fenêtre dépasse 768 pixels
    }
  }
});

let minuteur; // Déclaration de minuteur en dehors de la fonction reboursF

function reboursF() {
  let bodyEv = document.getElementById("rebour");
  let titleEv = document.getElementById("titleEvent");
  let day = document.getElementById("day");
  let day_label = document.getElementById("day_label");
  let hours = document.getElementById("hours");
  let hours_label = document.getElementById("hours_label");
  let minute = document.getElementById("minute");
  let minute_label = document.getElementById("minute_label");
  let second = document.getElementById("second");
  let second_label = document.getElementById("second_label");
  let now = new Date();
  let opening = new Date("July 01, 2024 22:00:00");

  let total_seconds = (opening - now) / 1000;

  if (total_seconds > 0) {
    let nb_days = Math.floor(total_seconds / (60 * 60 * 24));
    let nb_hours = Math.floor(
      (total_seconds - nb_days * 60 * 60 * 24) / (60 * 60)
    );
    let nb_minutes = Math.floor(
      (total_seconds - (nb_days * 60 * 60 * 24 + nb_hours * 60 * 60)) / 60
    );
    let nb_seconds = Math.floor(
      total_seconds -
        (nb_days * 60 * 60 * 24 + nb_hours * 60 * 60 + nb_minutes * 60)
    );

    day.textContent = caractere(nb_days);
    hours.textContent = caractere(nb_hours);
    minute.textContent = caractere(nb_minutes);
    second.textContent = caractere(nb_seconds);

    day_label.textContent = genre(nb_days, "Jour");
    hours_label.textContent = genre(nb_hours, "Heure");
    minute_label.textContent = genre(nb_minutes, "Minute");
    second_label.textContent = genre(nb_seconds, "Seconde");
  }

  if (total_seconds <= 0) {
    clearInterval(minuteur);
    bodyEv.style.backgroundImage = "";
    day.textContent = 0;
    hours.textContent = 0;
    minute.textContent = 0;
    second.textContent = 0;
    titleEv.innerHTML = ";";
  }
}

function genre(nb, libelle) {
  return nb > 1 ? libelle + "s" : libelle;
}

function caractere(nb) {
  return nb < 10 ? "0" + nb : nb;
}

// Utilisation de setInterval pour appeler reboursF toutes les 1000ms
minuteur = setInterval(reboursF, 1000);

// Appel initial de reboursF
reboursF();

// Initialisation de GSAP pour les animations
gsap.registerPlugin(ScrollTrigger, Draggable);

// Création d'une liste des sections pour le carrousel
let sections = gsap.utils.toArray(".panel");

// Configuration du carrousel avec GSAP
gsap.to(sections, {
  xPercent: -80 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#right",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: "+=3500",
  },
});

const cardsContainer = document.querySelector(".card-carousel");
const cardsController = document.querySelector(
  ".card-carousel + .image-container"
);

// Définition de la classe pour gérer le carrousel de cartes
class DraggingEvent {
  constructor(target = undefined) {
    this.target = target;
  }

  event(callback) {
    let handler;

    this.target.addEventListener("mousedown", (e) => {
      e.preventDefault();

      handler = callback(e);

      window.addEventListener("mousemove", handler);

      document.addEventListener("mouseleave", clearDraggingEvent);

      window.addEventListener("mouseup", clearDraggingEvent);

      function clearDraggingEvent() {
        window.removeEventListener("mousemove", handler);
        window.removeEventListener("mouseup", clearDraggingEvent);

        document.removeEventListener("mouseleave", clearDraggingEvent);

        handler(null);
      }
    });

    this.target.addEventListener("touchstart", (e) => {
      handler = callback(e);

      window.addEventListener("touchmove", handler);

      window.addEventListener("touchend", clearDraggingEvent);

      document.body.addEventListener("mouseleave", clearDraggingEvent);

      function clearDraggingEvent() {
        window.removeEventListener("touchmove", handler);
        window.removeEventListener("touchend", clearDraggingEvent);

        handler(null);
      }
    });
  }

  // Obtenir la distance que l'utilisateur a glissée
  getDistance(callback) {
    function distanceInit(e1) {
      let startingX, startingY;

      if ("touches" in e1) {
        startingX = e1.touches[0].clientX;
        startingY = e1.touches[0].clientY;
      } else {
        startingX = e1.clientX;
        startingY = e1.clientY;
      }

      return function (e2) {
        if (e2 === null) {
          return callback(null);
        } else {
          if ("touches" in e2) {
            return callback({
              x: e2.touches[0].clientX - startingX,
              y: e2.touches[0].clientY - startingY,
            });
          } else {
            return callback({
              x: e2.clientX - startingX,
              y: e2.clientY - startingY,
            });
          }
        }
      };
    }

    this.event(distanceInit);
  }
}

class CardCarousel extends DraggingEvent {
  constructor(container, controller = undefined) {
    super(container);

    // Éléments du DOM
    this.container = container;
    this.controllerElement = controller;
    this.cards = container.querySelectorAll(".card");

    // Données du carrousel
    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
    this.xScale = {};

    // Réajustement en cas de redimensionnement
    window.addEventListener("resize", this.updateCardWidth.bind(this));

    if (this.controllerElement) {
      this.controllerElement.addEventListener(
        "keydown",
        this.controller.bind(this)
      );
    }

    // Initialisation
    this.build();

    // Lier l'événement de glissement
    super.getDistance(this.moveCards.bind(this));
  }

  updateCardWidth() {
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;

    this.build();
  }

  build(fix = 0) {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex;
      const scale = this.calcScale(x);
      const scale2 = this.calcScale2(x);
      const zIndex = -Math.abs(i - this.centerIndex);

      const leftPos = this.calcPos(x, scale2);

      this.xScale[x] = this.cards[i];

      this.updateCards(this.cards[i], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  controller(e) {
    const temp = { ...this.xScale };

    if (e.keyCode === 39) {
      // Flèche gauche
      for (let x in this.xScale) {
        const newX =
          parseInt(x) - 1 < -this.centerIndex
            ? this.centerIndex
            : parseInt(x) - 1;

        temp[newX] = this.xScale[x];
      }
    }

    if (e.keyCode == 37) {
      // Flèche droite
      for (let x in this.xScale) {
        const newX =
          parseInt(x) + 1 > this.centerIndex
            ? -this.centerIndex
            : parseInt(x) + 1;

        temp[newX] = this.xScale[x];
      }
    }

    this.xScale = temp;

    for (let x in temp) {
      const scale = this.calcScale(x),
        scale2 = this.calcScale2(x),
        leftPos = this.calcPos(x, scale2),
        zIndex = -Math.abs(x);

      this.updateCards(this.xScale[x], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  calcPos(x, scale) {
    let formula;

    if (x < 0) {
      formula = (scale * 100 - this.cardWidth) / 2;

      return formula;
    } else if (x > 0) {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    } else {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    }
  }

  updateCards(card, data) {
    if (data.x || data.x == 0) {
      card.setAttribute("data-x", data.x);
    }

    if (data.scale || data.scale == 0) {
      card.style.transform = `scale(${data.scale})`;

      if (data.scale == 0) {
        card.style.opacity = data.scale;
      } else {
        card.style.opacity = 1;
      }
    }

    if (data.leftPos) {
      card.style.left = `${data.leftPos}%`;
    }

    if (data.zIndex || data.zIndex == 0) {
      if (data.zIndex == 0) {
        card.classList.add("highlight");
      } else {
        card.classList.remove("highlight");
      }

      card.style.zIndex = data.zIndex;
    }
  }

  calcScale2(x) {
    let formula;

    if (x <= 0) {
      formula = 1 - (-1 / 5) * x;

      return formula;
    } else if (x > 0) {
      formula = 1 - (1 / 5) * x;

      return formula;
    }
  }

  calcScale(x) {
    const formula = 1 - (1 / 5) * Math.pow(x, 2);

    if (formula <= 0) {
      return 0;
    } else {
      return formula;
    }
  }

  checkOrdering(card, x, xDist) {
    const original = parseInt(card.dataset.x);
    const rounded = Math.round(xDist);
    let newX = x;

    if (x !== x + rounded) {
      if (x + rounded > original) {
        if (x + rounded > this.centerIndex) {
          newX =
            x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex;
        }
      } else if (x + rounded < original) {
        if (x + rounded < -this.centerIndex) {
          newX =
            x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
        }
      }

      this.xScale[newX + rounded] = card;
    }

    const temp = -Math.abs(newX + rounded);

    this.updateCards(card, { zIndex: temp });

    return newX;
  }

  moveCards(data) {
    let xDist;

    if (data != null) {
      this.container.classList.remove("smooth-return");
      xDist = data.x / 250;
    } else {
      this.container.classList.add("smooth-return");
      xDist = 0;

      for (let x in this.xScale) {
        this.updateCards(this.xScale[x], {
          x: x,
          zIndex: Math.abs(Math.abs(x) - this.centerIndex),
        });
      }
    }

    for (let i = 0; i < this.cards.length; i++) {
      const x = this.checkOrdering(
          this.cards[i],
          parseInt(this.cards[i].dataset.x),
          xDist
        ),
        scale = this.calcScale(x + xDist),
        scale2 = this.calcScale2(x + xDist),
        leftPos = this.calcPos(x + xDist, scale2);

      this.updateCards(this.cards[i], {
        scale: scale,
        leftPos: leftPos,
      });
    }
  }
}

// Initialisation du carrousel de cartes
const carousel = new CardCarousel(cardsContainer);

// Effet de fond animé sur la page d'accueil
VANTA.BIRDS({
  el: ".banner-section",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  scaleMobile: 1.0,
  colorMode: "letiance",
});

// Initialisation des animations avec AOS
AOS.init({
  easing: "ease-out-back",
  duration: 2000,
});

// Fonction pour cacher le message de cookie et enregistrer le consentement
function acceptCookies() {
  let cookieMessage = document.getElementById("cookie-message");
  cookieMessage.style.display = "none";
  localStorage.setItem("cookiesAccepted", "true");
}

// Vérifie si l'utilisateur a déjà accepté les cookies
window.onload = function () {
  let cookiesAccepted = localStorage.getItem("cookiesAccepted");
  if (!cookiesAccepted) {
    let cookieMessage = document.getElementById("cookie-message");
    cookieMessage.style.display = "block";
  }
};

// Gestion des modales
let modal = document.getElementById("modalContainer");
let btn1 = document.getElementById("btnModal1");
let btn2 = document.getElementById("btnModal2");
let btn3 = document.getElementById("btnModal3");

function openModal() {
  modal.style.display = "block";
}

btn1.addEventListener("click", function () {
  openModal();
});

btn2.addEventListener("click", function () {
  openModal();
});

btn3.addEventListener("click", function () {
  openModal();
});

let span = document.querySelector(".close-modal");

span.addEventListener("click", function () {
  modal.style.display = "none";
});

// Afficher ou masquer le bouton de retour en haut en fonction de la position de défilement
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  let scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Faire défiler vers le haut du document lorsque le bouton est cliqué
document
  .getElementById("scrollToTopBtn")
  .addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

// Sélection du commutateur de thème et récupération du thème actuel
const toggleSwitch = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Appliquer le thème actuel lors du chargement de la page
if (currentTheme) {
  document.body.className =
    currentTheme === "dark" ? "theme-dark" : "theme-light";

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

// Fonction pour changer de thème
function switchTheme(e) {
  if (e.target.checked) {
    document.body.className = "theme-dark"; // Appliquer le thème sombre
    localStorage.setItem("theme", "dark"); // Enregistrer le thème sombre dans le stockage local
  } else {
    document.body.className = "theme-light"; // Appliquer le thème clair
    localStorage.setItem("theme", "light"); // Enregistrer le thème clair dans le stockage local
  }
}

// Écouter les changements de commutateur de thème
toggleSwitch.addEventListener("change", switchTheme, false);
