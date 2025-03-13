
  function adjustBodyPadding() {
    let headerHeight = document.querySelector('.header').offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';
  }

  window.onload = adjustBodyPadding;
  window.onresize = adjustBodyPadding;