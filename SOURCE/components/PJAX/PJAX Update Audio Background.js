function PJAXUpdateAudioBackground(data) {
  return new Promise((resolve) => {
    const
      $nextContainer = $($.parseHTML(data.next.html)),
      $audioBackground = $('#js-audio-background'),
      $audioBackgroundOptions = $nextContainer.find('#js-audio-background__options');

    if (typeof window.AudioBackground !== 'undefined') {

      switch ($audioBackgroundOptions.data('options')) {
        case 'music_off':
          window.AudioBackground.fadeOut().then(() => {
            // the next page audio source is different
            // just update audio src but don't start playback
            if ($nextContainer.find('#js-audio-background').attr('src') !== $audioBackground.attr('src')) {
              syncAttributes($nextContainer.find('#js-audio-background'), $audioBackground);
            }

            window.AudioBackground.el.currentTime = 0;
            window.AudioBackground.el.pause();
            window.AudioBackground.controller.pause();
          });
          break;
        case 'play':
          // audio autoplay is enabled
          if (window.AudioBackground.el.autoplay === true) {

            // the next page audio source is different
            // fade out current volume, update src, start playback
            if ($nextContainer.find('#js-audio-background').attr('src') !== $audioBackground.attr('src')) {
              window.AudioBackground.fadeOut().then(() => {
                syncAttributes($nextContainer.find('#js-audio-background'), $audioBackground);
                window.AudioBackground.fadeIn();
              });
            }

            // the next page audio source is the same as current
            // reset position and start playback if it's paused
            if (window.AudioBackground.el.paused) {
              window.AudioBackground.el.currentTime = 0;
              window.AudioBackground.fadeIn();
            }

          } else { // audio autoplay is disabled

            if (window.AudioBackground.el.paused) { // playback is paused

              // the next page audio source is different
              // just update audio src but don't start playback
              if ($nextContainer.find('#js-audio-background').attr('src') !== $audioBackground.attr('src')) {
                syncAttributes($nextContainer.find('#js-audio-background'), $audioBackground);
              }

            } else { // playback is running

              // the next page audio source is different
              // fade out current volume, update src, start playback
              if ($nextContainer.find('#js-audio-background').attr('src') !== $audioBackground.attr('src')) {
                window.AudioBackground.fadeOut().then(() => {
                  syncAttributes($nextContainer.find('#js-audio-background'), $audioBackground);
                  window.AudioBackground.fadeIn();
                });
              }

            }

          }
          break;
        default:
          window.AudioBackground.el.currentTime = 0;
          window.AudioBackground.fadeIn();
          break;
      }
    }

    resolve(true);
  });
}
