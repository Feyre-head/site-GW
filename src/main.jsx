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

// Carregar planos e atualizar DOM
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch('http://localhost:3001/api/planos');
    const planos = await res.json();

    const lista = document.getElementById("planos-lista");
    if (lista && planos.length > 0) {
      planos.forEach(p => {
        const item = document.createElement("li");
        item.textContent = `${p.nome} - R$ ${p.preco}`;
        lista.appendChild(item);
      });
    }
  } catch (err) {
    console.error("Erro ao buscar planos:", err);
  }
});

console.log("Scripts importados via Vite.");
