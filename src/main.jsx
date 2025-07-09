import jQuery from 'jquery';
window.$ = jQuery;
window.jQuery = jQuery;
// This shim ensures that jQuery is globally available
// for other scripts that depend on it, especially in a Vite environment.   

  (function($){
    const oldFind = $.fn.find;
    $.fn.find = function(selector){
      try {
        return oldFind.call(this, selector);
      } catch (e) {
        if (selector && typeof selector === "string") {
          try {
            return oldFind.call(this, CSS.escape(selector));
          } catch {
            console.warn("Seletor escapado com falha:", selector);
            return this;
          }
        }
        throw e;
      }
    };
  })(jQuery);



console.log("scripts importados via vite.");
