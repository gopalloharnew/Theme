let mqDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

const html = document.querySelector("html");
const themeBox = document.querySelector(".theme-box");
const themeDropBtn = document.querySelector(".theme-drop-btn");
const themeOptions = [...document.querySelectorAll("[data-theme-option]")];

// Functions
// ThemeBox Functions
const openThemeBox = () => {
  themeBox.classList.toggle("theme-box-open");
};

const closeThemeBox = (e) => {
  if (!themeBox.contains(e.target)) {
    themeBox.classList.remove("theme-box-open");
  }
};

const setFavicon = (e) => {
  let faviconTheme = e.matches ? "Dark" : "Light";
  document.querySelector(
    'link[rel="icon"]'
  ).href = `icons/favicon/favicon-${faviconTheme}.png`;
};

const setColor = (e) => {
  let theme = e.matches ? "Dark" : "Light";
  html.dataset.theme = theme;
};

const setTheme = (themeName) => {
  themeOptions.forEach((themeOption) => {
    themeOption.classList.toggle(
      "active-theme-option",
      themeOption.dataset.themeOption === themeName
    );
  });

  mqDarkTheme.removeEventListener("change", setColor);
  localStorage.setItem("theme", themeName);

  if (themeName === "Device") {
    mqDarkTheme.addEventListener("change", setColor);
    setColor(mqDarkTheme);
  } else {
    html.dataset.theme = themeName;
  }
};

// Main

document.addEventListener("click", closeThemeBox);
themeDropBtn.addEventListener("click", openThemeBox);

// Favicon
setFavicon(mqDarkTheme);
mqDarkTheme.addEventListener("change", setFavicon);

// Theme
if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "Device");
}

setTheme(localStorage.getItem("theme"));

themeOptions.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    setTheme(themeOption.dataset.themeOption);
  });
});
