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

  // 2) Dropdown FILTERS (genre + year)
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

  // 5) FILTER selector use: highlight featured cards that HAVE an <img>
  $(".card.featured:has(img)").css("box-shadow", "0 16px 44px rgba(124,92,255,0.35)");

  // 6) Featured Gallery (working version)
  (function gallery() {
    const $gallery = $("#gallery");
    if (!$gallery.length) return;

    const $slides = $gallery.find(".slide");
    const $dots   = $gallery.find(".dot");
    if ($slides.length < 2) return;

    let i = 0;

    function goTo(next) {
      if (next === i) return;
      const $current = $slides.eq(i);
      const $next    = $slides.eq(next);

      // dots state
      $dots.removeClass("is-active").eq(next).addClass("is-active");

      // fade transition
      $current.stop(true, true).fadeOut(250, function () {
        $current.removeClass("is-active");
        $next.fadeIn(250).addClass("is-active");
      });
      i = next;
    }

    function next() { goTo((i + 1) % $slides.length); }
    function prev() { goTo((i - 1 + $slides.length) % $slides.length); }

    // init
    $slides.hide().eq(0).show().addClass("is-active");
    $dots.removeClass("is-active").eq(0).addClass("is-active");

    // buttons
    $gallery.find(".next").on("click", next);
    $gallery.find(".prev").on("click", prev);

    // dots
    $dots.each(function (idx) { $(this).on("click", function () { goTo(idx); }); });

    // keyboard
    $gallery.attr("tabindex", "0").on("keydown", function (e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    });

    // touch swipe
    let startX = null;
    $gallery.find(".slides").on("touchstart", function (e) {
      startX = e.originalEvent.touches[0].clientX;
    });
    $gallery.find(".slides").on("touchend", function (e) {
      if (startX == null) return;
      const endX = e.originalEvent.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      startX = null;
    });
  })();
});
