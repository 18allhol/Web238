// Allyvia Holland
console.log("jQuery script is connected!");
$(function () {
  // Footer year
  $("#year").text(new Date().getFullYear());

  // 1) Search filter (text matches name/genre/country)
  $("#search").on("input", function () {
    const q = $(this).val().trim().toLowerCase();

    // Using .filter() plus :contains case-insensitive approximation
    // We'll manually check text for robust matching
    $(".card").each(function () {
      const $card = $(this);
      const hay = (
        $card.data("name") + " " +
        $card.data("genre") + " " +
        $card.data("country")
      ).toLowerCase();

      $card.toggle(hay.indexOf(q) !== -1);
    });
  });

  // 2) Dropdown filters (genre + year, combined)
  $("#genreSelect, #yearSelect").on("change", function () {
    const genre = $("#genreSelect").val();
    const year  = $("#yearSelect").val();

    $(".card").each(function () {
      const $c = $(this);
      const gOk = !genre || $c.data("genre") === genre;
      const yOk = !year  || String($c.data("year")) === year;
      $c.toggle(gOk && yOk);
    });
  });

  // 3) Expand/Collapse bios with animation
  $(".expand").on("click", function () {
    const $btn = $(this);
    const $more = $btn.closest(".card-body").find(".more");

    // slideToggle is the required "effect"
    $more.slideToggle(220, function () {
      const isOpen = $more.is(":visible");
      $btn.attr("aria-expanded", isOpen);
      $btn.text(isOpen ? "Hide bio" : "Read bio");
    });
  });

  // 4) Hide/Show all cards with label toggle + fade
  $("#toggleCards").on("click", function () {
    const $btn = $(this);
    const anyVisible = $(".card:visible").length > 0;
    if (anyVisible) {
      $(".card").fadeOut(180);
      $btn.text("Show All");
    } else {
      $(".card").fadeIn(220);
      $btn.text("Hide All");
    }
  });

  // 5) Example of a FILTER selector to highlight “featured” cards that HAVE an image node
  //    This demonstrates jQuery’s :has() filter.
  $(".card.featured:has(img)").css("box-shadow", "0 16px 44px rgba(124,92,255,0.35)");

  // Optional: hover focus state with jQuery
  $(".card img").on("mouseenter", function () {
    $(this).stop(true).animate({ opacity: 0.85 }, 150);
  }).on("mouseleave", function () {
    $(this).stop(true).animate({ opacity: 1 }, 150);
  });
});
