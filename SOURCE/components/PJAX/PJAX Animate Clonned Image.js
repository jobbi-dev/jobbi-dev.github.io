function PJAXAnimateClonnedImage(data, duration = 2.0) {
  return new Promise((resolve) => {
    const
      tl = new gsap.timeline(),
      $nextContainer = $(data.next.container),
      $curtain = $('#js-page-transition-curtain'),
      $nextMasthead = $nextContainer.find('.section-masthead'),
      background = $nextMasthead.attr('data-background-color'),
      $target = $nextMasthead.find('.js-transition-img'),
      $clone = $('.clone'),
      bgClone = $clone.find('.js-transition-img__transformed-el'),
      bgTarget = $target.find('.js-transition-img__transformed-el'),
      bgTargetProperties = bgTarget.css(['transform', 'width', 'height', 'transformOrigin']),
      {
        top,
        left,
        width,
        height,
      } = $target.get(0).getBoundingClientRect();

    if (!$target.length || !$clone.length) {
      resolve(true);
      return;
    }

    tl
      .setCurtain($curtain, {
        background
      })
      .set($clone, {
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .add([
        gsap.to(bgClone, {
          paddingBottom: 0,
          transform: bgTargetProperties.transform,
          width: bgTargetProperties.width,
          height: bgTargetProperties.height,
          duration: 1.2,
          ease: 'expo.inOut',
          transition: 'none',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
        }),
        gsap.to($clone, {
          transform: $target.css('transform'),
          transformOrigin: 'center center',
          top,
          left,
          width,
          height,
          duration: 1.2,
          ease: 'expo.inOut',
          transition: 'none',
          onComplete: () => {
            Scroll.scrollToTop();
          }
        }),
        gsap.effects.moveCurtain($curtain, {
          y: '0%',
          duration: 1.2
        }),
        gsap.to($clone, {
          borderRadius: $target.css('borderRadius'),
          duration: 0.6
        })
      ])
      .to($nextContainer, {
        duration: 0.2,
        clearProps: 'all',
        autoAlpha: 1,
      }, '-=0.3')
      .setCurtain($curtain)
      .add(() => {
        resolve(true)
      })
      .totalDuration(duration);

  });
}
