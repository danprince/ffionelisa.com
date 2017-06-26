var Modal = {
  index: -1,
  getModalByIndex: function(index) {
    return $('[data-index=' + index + ']');
  },
  getCurrentModal: function() {
    return Modal.getModalByIndex(Modal.index);
  },
  isShowing: function() {
    return Modal.index >= 0;
  },
  isHidden: function() {
    return Modal.index < 0;
  },
  show: function(index) {
    var modal = Modal.getModalByIndex(index);
    var overlay = modal.find('.overlay');

    Modal.index = index;
    overlay.fadeIn(300);
  },
  hide: function() {
    if (Modal.isHidden()) return;
    var modal = Modal.getCurrentModal();
    var overlay = modal.find('.overlay');

    Modal.index = -1;
    overlay.fadeOut(200);
  },
  jump: function(index) {
    if (Modal.isHidden()) return;
    var modal = Modal.getCurrentModal();
    var nextModal = Modal.getModalByIndex(index);
    var overlay = modal.find('.overlay');
    var nextOverlay = nextModal.find('.overlay');

    if (nextModal.length === 0) return;

    Modal.index = index;
    nextOverlay.show();
    overlay.fadeOut(200);

    nextOverlay
      .find('.modal')
      .hide()
      .fadeIn(300);
  },
  next: function() {
    Modal.jump(Modal.index + 1);
  },
  prev: function() {
    Modal.jump(Modal.index - 1);
  }
};

var Events = {
  touchStart: null,
  onModalClick: function(event) {
    var dataIndex = $(this).attr('data-index');
    var index = Number(dataIndex);
    if (Modal.isShowing()) return;
    Modal.hide();
    Modal.show(index);
  },
  onOverlayClick: function(event) {
    event.stopPropagation();
    if (event.target !== event.currentTarget) return;
    Modal.hide();
  },
  onKeyUp: function(event) {
    if (event.key === 'ArrowRight' || event.which === 39) Modal.next();
    if (event.key === 'ArrowLeft' || event.which === 37) Modal.prev();
  },
  onShowEnglish: function() {
    setLanguage('en');
  },
  onShowCymraeg: function() {
    setLanguage('cy');
  },
  onNextModal: function() {
    Modal.next();
  },
  onTouchStart: function(event) {
    Events.touchStart = event.touches[0];
  },
  onTouchEnd: function(event) {
    var touchEnd = event.changedTouches[0];
    var touchStart = Events.touchStart;

    if (touchEnd.screenX < touchStart.screenX) {
      return Modal.next();
    }

    if (touchEnd.screenX > touchStart.screenX) {
      Modal.prev();
    }
  },
  onToggleMobileMenu: function(event) {
    let nav = $('.site-nav');
    let showing = nav.attr('data-showing') === 'true';
    nav.attr('data-showing', !showing);
    $(document.body).attr('data-no-scroll', !showing);
  }
};

$(window).on('keyup', Events.onKeyUp);
$(window).on('touchstart', Events.onTouchStart);
$(window).on('touchend', Events.onTouchEnd);

$('.image-block').on('click', Events.onModalClick);
$('.overlay').on('click', Events.onOverlayClick),
$('.overlay-close').on('click', Events.onOverlayClick),
$('#lang-en').on('click', Events.onShowEnglish);
$('#lang-cy').on('click', Events.onShowCymraeg);
$('#mobile-menu').on('click', Events.onToggleMobileMenu);

