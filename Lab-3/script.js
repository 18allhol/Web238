// jQuery required features for the assignment are implemented below.
// Includes:
//  - jQuery selectors (class, id, attribute)
//  - At least one FILTER pseudo-selector (:has)
//  - jQuery effects/animation (slideToggle, fadeIn/out)
//  - Real-time search + dropdown filters
console.log("jQuery script is connected!");

$(function () {
  // Footer year
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
  }); // closed properly

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

  // 3) Interactive component + animation: BIO toggle
  $(".expand").on("click", function () {
    const $btn  = $(this);
    const $more = $btn.closest(".card-body").find(".more");
    $more.slideToggle(220, function () {
      const isOpen = $more.is(":visible");
      $btn.attr("aria-expanded", isOpen);
      $btn.text(isOpen ? "Hide bio" : "Biography");
      if (isOpen) { $more.removeAttr("hidden"); } else { $more.attr("hidden", "hidden"); }
    });
  });

  // 4) NEW interactive control + animation: Hide/Show all cards
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
});
