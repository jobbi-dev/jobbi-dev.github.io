class PSWPAlbum extends Pswp {
  constructor({
    scope,
    target,
    options
  }) {
    super({
      scope,
      target,
      options
    });

    this.hashData = this._photoswipeParseHash();
    if (this.$target.length && this.hashData.pid && this.hashData.gid) {
      this._openPhotoSwipe({
        index: this.hashData.pid,
        galleryElement: this.$target.eq(this.hashData.gid - 1),
        disableAnimation: true,
        fromURL: true
      });
    }
  }

  run($el) {
    this._bindClickAlbumLinks($el);
  }

  _bindClickAlbumLinks($gallery) {
    $gallery.on('click', (e) => {
      e.preventDefault();
      this._openPhotoSwipe({
        index: 0,
        galleryElement: $gallery
      });
    });
  }

  _getItems($galleryElement) {
    const
      $items = $galleryElement.find('.js-album__items img'),
      items = [];

    $items.each(function () {
      const
        $el = $(this),
        item = {
          src: $el.attr('data-album-src'),
          w: $el.attr('width'),
          h: $el.attr('height'),
          title: $el.attr('data-title'),
        };
      items.push(item);
    });
    return items;
  }
}
