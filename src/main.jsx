//  Importar jQuery globalmente
import jQuery from 'jquery';
window.$ = jQuery;
window.jQuery = jQuery;

//  $.find com seletor 
(function ($) {
  const oldFind = $.fn.find;
  $.fn.find = function (selector) {
    try {
      return oldFind.call(this, selector);
    } catch (e) {
      if (selector && typeof selector === "string") {
        try {
          return oldFind.call(this, CSS.escape(selector));
        } catch {
          console.warn("Falha ao escapar seletor:", selector);
          return this;
        }
      }
      throw e;
    }
  };
})(jQuery);

// Ignorar links com hash que não são seletores válidos (ex: /#/rotas de SPA)
$(function () {
  $('a[href^="#"]').each(function () {
    const href = $(this).attr('href');

    // Ignora hashes com "/" (como "#/login")
    if (href.includes('/')) return;

    try {
      if ($(href).length > 0) {
        // Aqui você pode adicionar lógica se quiser — por exemplo:
        // console.log('Elemento com ID válido:', href);
      }
    } catch (e) {
      console.warn('Erro ao usar seletor no href:', href);
    }
  });
});


console.log("Scripts importados via Vite.");
