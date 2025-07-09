import jQuery from 'jquery';
window.$ = jQuery;
window.jQuery = jQuery;
// This shim ensures that jQuery is globally available
// for other scripts that depend on it, especially in a Vite environment.   

console.log("scripts importados via vite.");
