const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");

// Open Close Navbar Menu on Click Burger
if (burgerMenu && navbarMenu) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });
}

// Close Navbar Menu on Click Menu Links
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
  });
});

// Change Header Background on Scrolling
window.addEventListener("scroll", () => {
  if (this.scrollY >= 85) {
    headerMenu.classList.add("on-scroll");
  } else {
    headerMenu.classList.remove("on-scroll");
  }
});

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (navbarMenu.classList.contains("is-active")) {
      navbarMenu.classList.remove("is-active");
    }
  }
});

// Show or hide the scroll-to-top button based on scroll position
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

// Scroll to the top of the document when the button is clicked
document
  .getElementById("scrollToTopBtn")
  .addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

const toggleSwitch = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.body.className =
    currentTheme === "dark" ? "theme-dark" : "theme-light";

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
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

    // Afficher ou masquer le bouton de retour en haut en fonction de la position du défilement
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      let scrollToTopBtn = document.getElementById("scrollToTopBtn");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        scrollToTopBtn.style.display = "block"; // Affiche le bouton de retour en haut si la position du défilement dépasse 20 pixels
      } else {
        scrollToTopBtn.style.display = "none"; // Masque le bouton de retour en haut si la position du défilement est inférieure ou égale à 20 pixels
      }
    }

    // Défiler vers le haut du document lorsque le bouton est cliqué
    document
      .getElementById("scrollToTopBtn")
      .addEventListener("click", function () {
        document.body.scrollTop = 0; // Pour les navigateurs Chrome, Firefox, IE et Opera
        document.documentElement.scrollTop = 0; // Pour Safari
      });

    // Thème sombre ou clair
    const toggleSwitch = document.getElementById("theme-toggle"); // Sélectionne le bouton de bascule pour le thème
    const currentTheme = localStorage.getItem("theme"); // Récupère le thème actuel enregistré dans le stockage local du navigateur

    if (currentTheme) {
      // Si un thème est déjà enregistré dans le stockage local
      document.body.className =
        currentTheme === "dark" ? "theme-dark" : "theme-light"; // Applique le thème sombre ou clair en fonction de la valeur récupérée dans le stockage local

      if (currentTheme === "dark") {
        toggleSwitch.checked = true; // Coche le bouton de bascule si le thème sombre est actif
      }
    }

    // Fonction pour changer de thème
    function switchTheme(e) {
      if (e.target.checked) {
        // Si le bouton de bascule est activé
        document.body.className = "theme-dark"; // Applique le thème sombre à tout le corps du document
        localStorage.setItem("theme", "dark"); // Enregistre le thème sombre dans le stockage local du navigateur
      } else {
        // Si le bouton de bascule est désactivé
        document.body.className = "theme-light"; // Applique le thème clair à tout le corps du document
        localStorage.setItem("theme", "light"); // Enregistre le thème clair dans le stockage local du navigateur
      }
    }

    toggleSwitch.addEventListener("change", switchTheme, false); // Ajoute un écouteur d'événements pour le changement de thème lors du basculement du bouton

    document.body.className = "theme-dark";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.className = "theme-light";
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
