(function () {
  const STORAGE_KEY = "siteConsentV1";

  // Minimal consent-mode stub for integrations that use gtag later.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  function getStored() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.choice) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function store(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        choice,
        at: new Date().toISOString()
      }));
    } catch {
      // ignore
    }
  }

  function loadScriptOnce(id, src, attrs) {
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.src = src;
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    }
    document.head.appendChild(s);
  }

  function initAds(choice) {
    const cfg = window.SITE_CONFIG || {};
    if (!cfg.adsenseClient || cfg.adsenseClient.includes("XXXX")) return;

    if (choice === "reject") {
      // Non-personalized ads
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 1;
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    } else {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted"
      });
    }

    loadScriptOnce(
      "adsbygoogle-js",
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(cfg.adsenseClient),
      { crossorigin: "anonymous" }
    );

    // Render ad units (after script loads, push is queued).
    const ins = document.querySelectorAll("ins.adsbygoogle");
    ins.forEach(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // ignore
      }
    });
  }

  function initAnalytics(choice) {
    const cfg = window.SITE_CONFIG || {};
    if (!cfg.plausibleDomain || cfg.plausibleDomain.includes("SEU-DOMINIO")) return;

    // Load analytics only with explicit accept.
    if (choice !== "accept") return;

    window.gtag("consent", "update", { analytics_storage: "granted" });

    loadScriptOnce("plausible-js", "https://plausible.io/js/script.js", {
      "data-domain": cfg.plausibleDomain
    });
  }

  function applyChoice(choice) {
    store(choice);
    initAds(choice);
    initAnalytics(choice);
  }

  function ensureBanner() {
    const existing = document.getElementById("consent-banner");
    if (existing) return existing;

    const banner = document.createElement("div");
    banner.id = "consent-banner";
    banner.className = "consent";
    banner.innerHTML = `
      <div class="consent-row">
        <strong>Privacidade e cookies</strong>
        <span></span>
      </div>
      <small>
        Usamos cookies/tecnologias semelhantes para exibir anúncios e medir uso do site.
        Você pode aceitar ou recusar. Veja a <a href="/privacy.html">Política de Privacidade</a>.
      </small>
      <div class="consent-row">
        <div class="consent-actions">
          <button type="button" class="btn-reject" id="consent-reject">Recusar</button>
          <button type="button" class="btn-accept" id="consent-accept">Aceitar</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector("#consent-accept").addEventListener("click", () => {
      banner.classList.remove("open");
      applyChoice("accept");
    });

    banner.querySelector("#consent-reject").addEventListener("click", () => {
      banner.classList.remove("open");
      applyChoice("reject");
    });

    return banner;
  }

  function init() {
    const stored = getStored();
    if (stored) {
      applyChoice(stored.choice);
      return;
    }

    const banner = ensureBanner();
    banner.classList.add("open");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
