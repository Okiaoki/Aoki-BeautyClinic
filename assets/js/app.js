(function initLpPage() {
  var config = window.lpTrackingConfig || {};
  var hasGtag = Boolean(config.ga4Id || config.googleAdsId);
  var hasMeta = Boolean(config.metaPixelId);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  if (!config.gtmId && !config.ga4Id && !config.googleAdsId) {
    console.warn("[LP] Tracking IDs are empty. Set tracking-config.js before production release.");
  }

  if (config.gtmId) {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(config.gtmId);
    document.head.appendChild(gtmScript);
  }

  if (hasGtag) {
    var idForSrc = config.ga4Id || config.googleAdsId;
    var gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(idForSrc);
    document.head.appendChild(gtagScript);

    window.gtag("js", new Date());

    if (config.ga4Id) {
      window.gtag("config", config.ga4Id);
    }
    if (config.ga4SecondaryId) {
      window.gtag("config", config.ga4SecondaryId);
    }
    if (config.googleAdsId) {
      window.gtag("config", config.googleAdsId);
    }
  }

  if (hasMeta) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) {
        return;
      }
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) {
        f._fbq = n;
      }
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js"));
    window.fbq("init", config.metaPixelId);
    window.fbq("track", "PageView");
  }

  function trackEvent(name, params) {
    var payload = Object.assign({ event: name, page_type: "ad_lp" }, params || {});
    window.dataLayer.push(payload);

    if (window.gtag) {
      window.gtag("event", name, payload);
    }
  }

  function trackConversion(kind) {
    var label = kind === "web" ? config.googleAdsWebLabel : config.googleAdsTelLabel;

    if (config.googleAdsId && label && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: config.googleAdsId + "/" + label,
        value: 1,
        currency: "JPY"
      });
    }

    if (window.fbq) {
      window.fbq("track", "Lead", { source: kind });
    }
  }

  document.querySelectorAll("[data-track]").forEach(function (el) {
    var eventType = el.tagName === "SELECT" ? "change" : "click";
    el.addEventListener(eventType, function () {
      trackEvent(el.getAttribute("data-track"), {
        cta_text: (el.textContent || "").trim(),
        cta_type: el.getAttribute("data-conversion") || "none"
      });
      if (el.getAttribute("data-conversion")) {
        trackConversion(el.getAttribute("data-conversion"));
      }
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll("[data-reveal]").forEach(function (el) {
    observer.observe(el);
  });

  trackEvent("lp_view");
}());
