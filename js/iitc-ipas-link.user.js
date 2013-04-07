// ==UserScript==
// @id             iitc-plugin-ipas-link@eggershead
// @name           IITC Plugin: simulate an attack on portal
// @version        0.1.0.20130403.170000
// @namespace      https://github.com/xosofox/IPAS
// @updateURL      http://eggershead.com/IPAS/js/iitc-ipas-link.meta.js
// @downloadURL    http://eggershead.com/js/iitc-ipas-link.user.js
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.ipasLink = function() {};

window.plugin.ipasLink.setupCallback = function() {
      addHook('portalDetailsUpdated', window.plugin.ipasLink.addLink);
}

window.plugin.ipasLink.addLink = function(d) {
    $('.linkdetails').append('<aside><a href="http://eggershead.com/index.html#' + window.plugin.ipasLink.getHash(d.portalDetails) + '" target="ipaswindow">attack!</a></aside>');
}

window.plugin.ipasLink.getHash = function(d) {
    console.log(d);
    var hashParts=[];
    $.each(d.resonatorArray.resonators, function(ind, reso) {
        hashParts.push(reso.level + "," + reso.distanceToPortal + "," + reso.energyTotal);
    });
    console.log(d);
    return hashParts.join(";")+"|" + "r,c,0,v";
}

var setup =  function() {
  window.plugin.ipasLink.setupCallback();
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

