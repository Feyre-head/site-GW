// ⬇️ Garante que jQuery esteja disponível globalmente
import $ from 'jquery';
window.$ = $;
window.jQuery = $;

// ⬇️ Scripts de terceiros
import '../assets/vendors/jquery-ui/jquery-ui.min.js';
import '../assets/vendors/bootstrap/js/bootstrap.min.js';
import '../assets/vendors/fastdom/fastdom.min.js';
import '../assets/vendors/fresco/js/fresco.js';
import '../assets/vendors/lity/lity.min.js';
import '../assets/vendors/gsap/minified/gsap.min.js';
import '../assets/vendors/gsap/utils/CustomEase.min.js';
import '../assets/vendors/gsap/minified/DrawSVGPlugin.min.js';
import '../assets/vendors/gsap/minified/ScrollTrigger.min.js';
import '../assets/vendors/draw-shape/liquidDrawShape.min.js';
import '../assets/vendors/animated-blob/liquidAnimatedBlob.min.js';
import '../assets/vendors/fontfaceobserver.js';
import '../assets/vendors/tinycolor-min.js';
import '../assets/vendors/gsap/utils/SplitText.min.js';
import '../assets/vendors/particles.min.js';
import '../assets/vendors/flickity/flickity.pkgd.min.js';
import '../assets/vendors/flickity/flickity-fade.min.js';
import '../assets/vendors/isotope/isotope.pkgd.min.js';
import '../assets/vendors/isotope/packery-mode.pkgd.min.js';

// ⬇️ Scripts específicos do projeto
import '../assets/js/liquid-gdpr.min.js';
import '../assets/js/theme.min.js';
import '../assets/js/liquid-ajax-contact-form.min.js';

// ℹ️ Ionicons ainda devem ser deixados no index.html via CDN
// pois são externos e não estão no seu projeto local

// ✅ Agora todos os scripts foram carregados corretamente!

console.log("Todos os scripts foram importados com sucesso via Vite.");
