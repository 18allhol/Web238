$(function () {

  $('a[href^="#"], .scroll-link').on('click', function (e) {
    const targetId = $(this).attr('href') || $(this).data('target');
    if (!targetId) return;

    const $target = $(targetId);
    if ($target.length) {
      e.preventDefault();
      $('html, body').animate(
        {
          scrollTop: $target.offset().top - 80
        },
        600
      );
    }
  });

  $('.faq-question').on('click', function () {
    $(this).toggleClass('open');
    $(this).next('.faq-answer').slideToggle(300);
  });

  const facts = [
    "Paris is often called the 'City of Light' because it was one of the first major cities to use street lighting.",
    "Many people enjoy simply sitting at a café terrace in Paris to people-watch and relax.",
    "The Seine River runs through the center of Paris and is lined with bridges and historic buildings.",
    "Some visitors spend an entire afternoon in just one Paris neighborhood instead of trying to see everything at once.",
    "Picnicking in a park with simple foods like bread, cheese, and fruit is a common, low-key way to enjoy the city."
  ];

  $('#random-fact').on('click', function () {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    const $box = $('#fact-box');

    $box.fadeOut(150, function () {
      $box.text(randomFact).fadeIn(200);
    });
  });

  let spotsHighlighted = false;

  $('#toggle-spots').on('click', function () {
    const $btn = $(this);
    $('.spot-card.must-see').each(function () {
      const $card = $(this);
      if (!spotsHighlighted) {
        $card.addClass('highlight').animate({ paddingLeft: '25px' }, 250);
      } else {
        $card.removeClass('highlight').animate({ paddingLeft: '15px' }, 250);
      }
    });

    spotsHighlighted = !spotsHighlighted;
    $btn.text(spotsHighlighted ? 'Unhighlight must-see spots' : 'Highlight must-see spots');
  });

  const $backToTop = $('#backToTop');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $backToTop.fadeIn(200);
    } else {
      $backToTop.fadeOut(200);
    }
  });

  $backToTop.on('click', function () {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      600
    );
  });

  $('#year').text(new Date().getFullYear());
});
