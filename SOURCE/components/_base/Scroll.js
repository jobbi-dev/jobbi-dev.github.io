class Scroll {
  static getEasingScroll(pos) {
    if (pos === 0) return 0;
    if (pos === 1) return 1;
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
    return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
  }

  static scrollTo({
    x = 0,
    y = 0,
    duration = 0
  }) {
    if (typeof window.SB !== 'undefined') {
      window.SB.scrollTo(x, y, duration, {
        easing: (pos) => Scroll.getEasingScroll(pos)
      });
    } else {
      $('html, body').animate({
        scrollLeft: x,
        scrollTop: y
      }, duration);
    }
  }

  static scrollToTop() {

    // safari fix
    try {
      window.top.scrollTo(0, 0);
    } catch (error) {}

    if (typeof window.SB !== 'undefined') {
      window.SB.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }

    // window.pageYOffset = 0;
  }

  static getScrollTop() {
    if (typeof window.SB !== 'undefined') {
      window.lastTop = window.SB.scrollTop;
    } else {
      window.lastTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    }

    return window.lastTop;
  }

  static restoreScrollTop() {
    if (typeof window.SB !== 'undefined') {
      setTimeout(() => {
        window.SB.scrollTop = window.lastTop;
      }, 100);
    } else {
      $('html, body').animate({
        scrollTop: window.lastTop
      });
    }
  }

  static lock(lock = true) {
    const lockClass = 'body_lock-scroll';

    if (lock === true) {
      if (typeof window.SB !== 'undefined') {
        window.SB.updatePluginOptions('lockscroll', {
          lock: true
        });
      }

      window.$body.addClass(lockClass);
    }

    if (lock === false) {
      window.$body.removeClass(lockClass);

      if (typeof window.SB !== 'undefined') {
        window.SB.updatePluginOptions('lockscroll', {
          lock: false
        });
      }
    }
  }
}
