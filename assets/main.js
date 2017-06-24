$('.image-block').on({
  'click': showModal,
  'touchstart': showModal
});

$('.overlay').on({
  'click': hideModal,
  'touchstart': hideModal
});

var activeModal = null;

function showModal() {
  if (activeModal == null) {
    activeModal = $(this).find('.overlay');
    activeModal.fadeIn(200);
  }
}

function hideModal() {
  activeModal.fadeOut(200, function() {
    activeModal = null;
  });
}
