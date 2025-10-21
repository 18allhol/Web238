console.log("jQuery script is connected!");

$(function () {
  // 0) Footer year
  $("#year").text(new Date().getFullYear());

  // 1) Real-time SEARCH
  $("#search").on("input", function () {
    const q = $(this).val().trim().toLowerCase();
    $(".card").each(function () {
      const $card = $(this);
      const hay = (
        String($card.data("name")) + " " +
        String($card.data("genre")) + " " +
        String($card.data("country"))
      ).toLowerCase();
      $card.toggle(hay.indexOf(q) !== -1);
    });
  });

  // 2) Dropdown FILTERS (genre + year, combined)
  $("#genreSelect, #yearSelect").on("change", function () {
    const genre = $("#genreSelect").val();
    const year  = $("#yearSelect").val();
    $(".card").each(function () {
      const $c = $(this);
      const gOk = !genre || String($c.data("genre")) === genre;
      const yOk = !year  || String($c.data("year")) === year;
      $c.toggle(gOk && yOk);
    });
  });

  // 3) Biography expand/collapse (interactive + animation)
  $(".expand").on("click", function () {
    const $btn  = $(this);
    const $more = $btn.closest(".card-body").find(".more");
    $more.slideToggle(220, function () {
      const isOpen = $more.is(":visible");
      $btn.attr("aria-expanded", String(isOpen));
      $btn.text(isOpen ? "Hide bio" : "Biography");
      if (isOpen) { $more.removeAttr("hidden"); } else { $more.attr("hidden", "hidden"); }
    });
  });

  // 4) Hide/Show all cards (interactive + animation)
  $("#toggleCards").on("click", function () {
    const $btn = $(this);
    const anyVisible = $(".card:visible").length > 0;
    if (anyVisible) {
      $(".card").fadeOut(180);
      $btn.text("Show All").attr("aria-pressed", "true");
    } else {
      $(".card").fadeIn(220);
      $btn.text("Hide All").attr("aria-pressed", "false");
    }
  });

  // 5) FILTER selector use (visible): highlight featured cards that HAVE an <img>
  $(".card.featured:has(img)").css("box-shadow", "0 16px 44px rgba(124,92,255,0.35)");

  // --- 6) Featured Gallery (3+ images, user-controlled, animated) ---
  (function gallery() {
    // Only run if the gallery exists
    if (!$("#gallery").length) return;

    const $slides = $("#gallery .slide");
    const $dots   = $("#gallery .dot");
    let i = 0;

    function goTo(next, animate = true) {
      if (next === i) return;
      const $current = $slides.eq(i);
      const $next    = $slides.eq(next);

      // Update dots
      $dots.removeClass("is-active").attr("aria-selected", "false")
           .eq(next).addClass("is-active").attr("aria-selected", "true");

      // Animate transition
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !animate) {
        $current.removeClass("is-active").hide();
        $next.show().addClass("is-active");
      } else {
        $current.stop(true, true).fadeOut(200, function () {
          $current.removeClass("is-active");
          $next.stop(true, true).fadeIn(220).addClass("is-active");
        });
      }

      i = next;
    }

    function next() { goTo((i + 1) % $slides.length); }
    function prev() { goTo((i - 1 + $slides.length) % $slides.length); }

    // Init
    $slides.hide().removeClass("is-active").eq(0).show().addClass("is-active");
    $dots.removeClass("is-active").attr("aria-selected", "false").eq(0).addClass("is-active").attr("aria-selected", "true");

    // Buttons
    $("#gallery .next").on("click", next);
    $("#gallery .prev").on("click", prev);

    // Dots
    $dots.each(function (idx) {
      $(this).on("click", function () { goTo(idx); });
    });

    // Keyboard (left/right)
    $("#gallery").attr("tabindex", "0").on("keydown", function (e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    });

    // Touch swipe (basic)
    let startX = null;
    $("#gallery .slides").on("touchstart", function (e) {
      startX = e.originalEvent.touches[0].clientX;
    });
    $("#gallery .slides").on("touchend", function (e) {
      if (startX == null) return;
      const endX = e.originalEvent.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      startX = null;
    });
  })();
});
