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

  // ── Reveal animation ──
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

  // ── Number counter animation ──
  function animateCount(el, target, duration) {
    var start = 0;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-target"), 10);
        animateCount(el, target, 1800);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".count[data-target]").forEach(function (el) {
    countObserver.observe(el);
  });

  // ── Sticky header shadow on scroll ──
  var header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  // ── SP Hero scroll reveal ──
  if (window.innerWidth <= 780) {
    var heroOverlay = document.querySelector(".hero-overlay");
    var heroContent = document.querySelector(".hero-content");
    var heroSpLogo  = document.querySelector(".hero-sp-logo");
    if (heroOverlay && heroContent) {
      var spThreshold = window.innerHeight * 0.38;
      function updateSpHero() {
        var progress = Math.min(window.scrollY / spThreshold, 1);
        var eased = 1 - Math.pow(1 - progress, 2.5);
        heroOverlay.style.opacity = eased;
        heroContent.style.opacity = eased;
        if (heroSpLogo) {
          heroSpLogo.style.opacity = 1 - eased;
        }
      }
      updateSpHero();
      window.addEventListener("scroll", updateSpHero, { passive: true });
    }
  }

  // ── Lightbox ──
  var lightbox       = document.getElementById("lightbox");
  var lightboxImg    = document.getElementById("lightbox-img");
  var lightboxLabel  = document.getElementById("lightbox-label");
  var lightboxClose  = document.getElementById("lightbox-close");
  var lightboxPrev   = document.getElementById("lightbox-prev");
  var lightboxNext   = document.getElementById("lightbox-next");
  var lightboxDotsEl = document.getElementById("lightbox-dots");

  var lbImages = [];
  var lbIndex  = 0;

  function lbBuildDots() {
    lightboxDotsEl.innerHTML = "";
    lbImages.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "lightbox-dot" + (i === lbIndex ? " is-active" : "");
      dot.setAttribute("aria-label", lbImages[i].label);
      dot.addEventListener("click", function () { if (i !== lbIndex) lbGo(i); });
      lightboxDotsEl.appendChild(dot);
    });
  }

  function lbUpdateDisplay() {
    var cur = lbImages[lbIndex];
    lightboxImg.src   = cur.src;
    lightboxImg.alt   = cur.alt;
    lightboxLabel.textContent = cur.label;
    lightboxPrev.disabled = lbIndex === 0;
    lightboxNext.disabled = lbIndex === lbImages.length - 1;
    lightboxDotsEl.querySelectorAll(".lightbox-dot").forEach(function (d, i) {
      d.classList.toggle("is-active", i === lbIndex);
    });
  }

  function lbGo(newIndex) {
    lightboxImg.style.opacity   = "0";
    lightboxImg.style.transform = "scale(0.94)";
    setTimeout(function () {
      lbIndex = newIndex;
      lbUpdateDisplay();
      lightboxImg.style.opacity   = "1";
      lightboxImg.style.transform = "scale(1)";
    }, 200);
  }

  function openLightbox(images, startIndex) {
    lbImages = images;
    lbIndex  = startIndex;
    lbBuildDots();
    lbUpdateDisplay();
    lightboxImg.style.opacity   = "1";
    lightboxImg.style.transform = "scale(1)";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (lightbox && lightboxImg) {
    // 各case-photosをグループ化してクリック登録
    document.querySelectorAll(".case-photos").forEach(function (caseEl) {
      var imgs = caseEl.querySelectorAll("img");
      var imageData = [];
      imgs.forEach(function (img) {
        var cap = img.closest("figure") && img.closest("figure").querySelector("figcaption");
        imageData.push({ src: img.src, alt: img.alt, label: cap ? cap.textContent.trim() : "" });
      });
      imgs.forEach(function (img, i) {
        img.addEventListener("click", function () { openLightbox(imageData, i); });
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", function () { if (lbIndex > 0) lbGo(lbIndex - 1); });
    lightboxNext.addEventListener("click", function () { if (lbIndex < lbImages.length - 1) lbGo(lbIndex + 1); });

    // 背景クリックで閉じる
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // キーボード操作
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft"  && lbIndex > 0)                    lbGo(lbIndex - 1);
      if (e.key === "ArrowRight" && lbIndex < lbImages.length - 1)  lbGo(lbIndex + 1);
    });

    // スワイプ操作（SP）
    var touchStartX = 0;
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 48) {
        if (diff > 0 && lbIndex < lbImages.length - 1) lbGo(lbIndex + 1);
        if (diff < 0 && lbIndex > 0)                   lbGo(lbIndex - 1);
      }
    }, { passive: true });
  }

  trackEvent("lp_view");
}());
