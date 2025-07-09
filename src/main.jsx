// src/shims/jquery-global.js
import jQuery from 'jquery';
window.$ = jQuery;
window.jQuery = jQuery;
// This shim ensures that jQuery is globally available
// for other scripts that depend on it, especially in a Vite environment.   


(function($) {
    const originalFind = $.fn.find;

    $.fn.find = function(selector) {
      try {
        return originalFind.call(this, selector);
      } catch (e) {
        if (selector && typeof selector === "string" && e.message.includes("Syntax error")) {
          try {
            const escaped = CSS.escape(selector);
            return originalFind.call(this, escaped);
          } catch {
            console.warn("Erro ao escapar seletor inválido:", selector);
            return this;
          }
        } else {
          throw e;
        }
      }
    };
  })(jQuery);

// Aguarde o carregamento do jQuery antes de carregar outros imports
(async () => {
  // await import ('../assets/vendors/fresco/js/fresco.js');   
  
  await import ('../assets/js/demo/start-hub-4.js');
  await import ('../assets/js/demo/start-hub-8.js');
  await import ('../assets/js/demo/start-hub-x.js');
  await import ('../assets/vendors/fontfaceobserver.js');

})();


// import '../assets/vendors/fresco/js/fresco.js';   
// import '../assets/js/demo/start-hub-4.js';
// import '../assets/js/demo/start-hub-8.js';
// import '../assets/js/demo/start-hub-x.js';
// import '../assets/vendors/fontfaceobserver.js';

console.log("scripts importados via vite.");
