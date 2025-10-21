
console.log("jQuery script is connected!");

$(function () {
 
  $("#year").text(new Date().getFullYear());

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
  $(".card.featured:has(img)").css("box-shadow", "0 16px 44px rgba(124,92,255,0.35)");
});
