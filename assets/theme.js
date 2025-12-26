(function () {
  var KEY = "siteThemeV1";

  function apply(theme) {
    if (!document.body) return;
    if (theme === "dark") document.body.setAttribute("data-theme", "dark");
    else document.body.removeAttribute("data-theme");
  }

  function getStored() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function store(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // ignore
    }
  }

  function inferDefault() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }

  function setButtonLabel(btn, theme) {
    if (!btn) return;
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    btn.textContent = theme === "dark" ? "Tema: Escuro" : "Tema: Claro";
  }

  function init() {
    var theme = getStored() || inferDefault();
    apply(theme);

    var btn = document.querySelector("[data-theme-toggle]");
    setButtonLabel(btn, theme);

    if (btn) {
      btn.addEventListener("click", function () {
        var current = document.body && document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        apply(next);
        store(next);
        setButtonLabel(btn, next);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
