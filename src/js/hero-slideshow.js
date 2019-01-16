$(document).ready(function() {
  var images = [
    'assets/images/hero-1.jpg',
    'assets/images/hero-4.jpg',
    'assets/images/hero-3.jpg',
  ];

  var heroImage = $('#hero');
  if (!heroImage) return;

  var i = 1;
  function changeHeroImage() {
    var currImage = images[i];
    ++i;
    if (i == images.length) i = 0;
    heroImage.css('background-image', 'url(' + currImage + ')');
    heroImage.fadeIn(1000);
  }

  function transitionImages() {
    heroImage.fadeOut(1000, changeHeroImage);
  }

  setInterval(transitionImages, 7000);
});
