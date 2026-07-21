/**
 * Desktop browsers ignore viewport `maximumScale`, so block the manual zoom
 * gestures (Ctrl + wheel, Ctrl +/-/0, and the pinch trackpad gesture) via JS.
 */
export const DISABLE_ZOOM_SCRIPT = `(function(){try{var stop=function(e){e.preventDefault();};window.addEventListener("wheel",function(e){if(e.ctrlKey)stop(e);},{passive:false});window.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&(e.key==="+"||e.key==="-"||e.key==="="||e.key==="0"||e.code==="NumpadAdd"||e.code==="NumpadSubtract"||e.code==="Numpad0"))stop(e);},{passive:false});window.addEventListener("gesturestart",stop,{passive:false});window.addEventListener("gesturechange",stop,{passive:false});window.addEventListener("gestureend",stop,{passive:false});}catch(e){}})();`;
