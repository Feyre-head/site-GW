(function ($) {
  'use strict';

  const pluginName = 'liquidPreloader';
  let defaults = {
    animationType: 'fade',
    animationTargets: 'self',
    dir: 'x',
    stagger: 0,
    duration: 1400
  };

  class Plugin {
    constructor(element, options) {
      this._defaults = defaults;
      this._name = pluginName;
      this.options = $.extend({}, defaults, options);
      this.element = element;
      this.$element = $(element);
      this.animationTargets = this.getAnimationTargets();
      this.onPreloaderHiddenEvent = new CustomEvent('lqd-preloader-anim-done');
      this.onPageLoad();
    }

    getAnimationTargets() {
      const { animationTargets } = this.options;
      return animationTargets === 'self' ? this.element : document.querySelectorAll(animationTargets);
    }

    getAnimationProperties() {
      const { animationType } = this.options;
      return this[`${animationType}Properties`]();
    }

    fadeProperties() {
      return {
        animateIn: { opacity: [0, 1] },
        animateOut: { opacity: [1, 0] }
      };
    }

    slideProperties() {
      const { dir } = this.options;
      return {
        animateIn: { [dir]: ['100%', '0%'] },
        animateOut: { [dir]: ['0%', '-100%'] }
      };
    }

    scaleProperties() {
      const { dir } = this.options;
      const axis = `scale${dir.toUpperCase()}`;
      return {
        animateIn: { [axis]: [0, 1] },
        animateOut: { [axis]: [1, 0] }
      };
    }

    onPageLoad() {
      if (typeof $liquidBody !== 'undefined') {
        $liquidBody.addClass('lqd-page-loaded lqd-preloader-animations-started');
        $liquidBody.removeClass('lqd-page-leaving lqd-page-not-loaded');
      }
      this.hidePreloader();
    }

    hidePreloader() {
      const stagger = this.options.stagger / 1000;
      const duration = this.options.duration / 1000;
      const timeline = gsap.timeline({
        duration,
        ease: 'expo.out',
        stagger,
        onComplete: () => {
          this.$element.hide();
          if (typeof $liquidBody !== 'undefined') {
            $liquidBody.removeClass('lqd-preloader-animations-started');
            $liquidBody.addClass('lqd-preloader-animations-done');
          }
          $(this.animationTargets).css('transform', '');
          document.dispatchEvent(this.onPreloaderHiddenEvent);
        }
      });

      $(this.animationTargets).each((i, targetElement) => {
        const $targetElement = $(targetElement);
        if (targetElement.hasAttribute('data-animations')) {
          const animations = $targetElement.data('animations');
          timeline.to(targetElement, { ...animations }, stagger * i);
        } else {
          const animationProperties = this.getAnimationProperties().animateOut;
          const propName = Object.keys(animationProperties)[0];
          const [from, to] = animationProperties[propName];
          timeline.fromTo(targetElement, { [propName]: from }, { [propName]: to }, stagger * i);
        }
      });
    }
  }

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      const pluginOptions = {
        ...$(this).data('preloader-options'),
        ...options
      };
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, pluginOptions));
      }
    });
  };
})(jQuery);
