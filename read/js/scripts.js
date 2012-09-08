var headerList="H1 H2 H3 H4 H5 H6".split(" "),elements=[],headers=[],visible=[],iconThis="←",iconAll="↕",headerLinks=" <button class='this' title='Collapse this section'>"+iconThis+"</button> <button class='all' title='Collapse all sections at this level'>"+iconAll+"</button>",keyNext=106,keyPrev=107,keyNextUp=111,keyPrevUp=105,keyFirst=117,keyLast=109,keyAll=97,keyExpand=102,keyTheme=115,url;
window.onload=function(){document.documentElement.classList.add("dark");elements=document.body.children;visible=headers=getElements(headerList,!1);for(var a=0;a<headers.length;a++)headers[a].innerHTML+=headerLinks,headers[a].onclick=toggleHandler;headers[0].classList.add("active");a=headers[0].getAttribute("id");null===a&&(headers[0].setAttribute("id","startOfContent"),a="startOfContent");a='<aside><p><a href="#'+a+'" title="Skip to content">Skip to content</a></p><h3>Keyboard shortcuts</h3><ul><li><b>'+
String.fromCharCode(keyNext)+"</b>: Next section</li><li><b>"+String.fromCharCode(keyPrev)+"</b>: Previous section</li><li><b>return/enter</b>: Toggle active section</li><li><b>"+String.fromCharCode(keyNextUp)+"</b>: Next section (one level up)</li><li><b>"+String.fromCharCode(keyPrevUp)+"</b>: Previous section (one level up)</li><li><b>"+String.fromCharCode(keyFirst)+"</b>: First section</li><li><b>"+String.fromCharCode(keyLast)+"</b>: Last section</li><li><b>"+String.fromCharCode(keyAll)+"</b>: Toggle everything in this section</li><li><b>"+
String.fromCharCode(keyExpand)+"</b>: Expand all sections (do this before you search within the document)</li><li><b>"+String.fromCharCode(keyTheme)+"</b>: Switch theme (light/dark)</li></ul></aside>";url=window.location.toString();var c=url.indexOf("#");if(-1!==c){var b=url.slice(c+1);url=url.slice(0,c);c=document.getElementById(b);yesHeaderTag(c.tagName)&&(clearActive(headers),makeActive(c))}c=document.body.children[0];b=document.createElement("div");b.classList.add("js-infobox");document.body.insertBefore(b,
c);b.innerHTML=a};
window.onkeypress=function(a){a=a||window.event;a=a.which||a.keyCode;13===a?toggleHandler(whoIsActive()):a===keyAll&&toggleSame();if(a===keyNext)activateSame(visible,"down",1);else if(a===keyPrev)activateSame(visible,"up",1);else if(a===keyFirst)clearActive(visible),makeActive(visible[0]);else if(a===keyLast)clearActive(visible),makeActive(visible[visible.length-1]);else if(a===keyPrevUp)for(a=0;a<visible.length;a++){if(visible[a]===whoIsActive()){for(a-=1;0<=a;a--)if(getHeaderNum(whoIsActive())>getHeaderNum(visible[a])){clearActive(visible);
makeActive(visible[a]);break}break}}else if(a===keyNextUp)for(a=0;a<visible.length;a++){if(visible[a]===whoIsActive()){for(a+=1;a<visible.length;a++)if(getHeaderNum(whoIsActive())>getHeaderNum(visible[a])){clearActive(visible);makeActive(visible[a]);break}break}}else if(a===keyExpand)for(;isAnythingHidden(headers);)for(a=0;a<headers.length;a++)headers[a].classList.contains("collapsed")&&toggleHandler(headers[a]);else a===keyTheme&&(a=document.documentElement,a.classList.toggle("dark"),a.classList.toggle("light"))};
function toggleHandler(a){var c;isClick(a)?(clearActive(visible),yesHeaderTag(a.target.tagName)?(c=a.target,c.classList.add("active")):a.target.classList.contains("all")?(c=document.getElementsByTagName(a.target.parentElement.tagName),a.target.parentElement.classList.add("active")):(c=a.target.parentElement,c.classList.add("active"))):c=a;void 0===c.length?toggleMe(c):toggleSame();a=whoIsActive();makeActive(a);visible=getElements(headerList,!0)}
function toggleMe(a){for(var c=getHeaderNum(a),b=0;b<elements.length;b++)if(elements[b]===a){c=compareHeaders(b,elements,c);if(isCollapsed(a)){toggleCollapse(a);for(b+=1;elements[b]!==c&&void 0!==elements[b];)if(yesHeaderTag(elements[b].tagName))if(isCollapsed(elements[b])){var e=getHeaderNum(elements[b]),e=compareHeaders(b,elements,e);for(elements[b].classList.remove("hidden");elements[b]!==e&&void 0!==elements[b];)b++}else elements[b].classList.remove("hidden"),b++;else elements[b].classList.remove("hidden"),
b++}else{toggleCollapse(a);for(b+=1;elements[b]!==c&&void 0!==elements[b];)elements[b].classList.add("hidden"),b++}addToggler(a);break}}
function toggleSame(){var a=whoIsActive();if("H1"===a.tagName){var c=document.getElementsByTagName("H1");toggleHandler(a);if(isCollapsed(a))for(var b=0;b<c.length;b++)c[b]!==a&&!isCollapsed(c[b])&&toggleHandler(c[b]);else for(b=0;b<c.length;b++)c[b]!==a&&isCollapsed(c[b])&&toggleHandler(c[b])}else{toggleHandler(a);c=getHeaderNum(a);for(b=0;b<visible.length;b++)if(visible[b]===a){for(var e=0,d=b-1;getHeaderNum(visible[d])>=c;){var f=getHeaderNum(visible[d]);isCollapsed(a)?!isCollapsed(visible[d])&&
f===c?toggleHandler(visible[d]):e++:isCollapsed(visible[d])&&f===c?toggleHandler(visible[d]):e++;d--}for(b=b-e+1;getHeaderNum(visible[b])>=c;)e=getHeaderNum(visible[b]),isCollapsed(a)?!isCollapsed(visible[b])&&e===c&&toggleHandler(visible[b]):isCollapsed(visible[b])&&e===c&&toggleHandler(visible[b]),b++;break}}}function compareHeaders(a,c,b){for(a+=1;a<c.length;a++){if(a===c.length-1)return elements[elements.length];if(yesHeaderTag(c[a].tagName)&&c[a].tagName.slice(1)<=b)return c[a]}}
function addToggler(a){a.onclick=toggleHandler}function isCollapsed(a){return a.classList.contains("collapsed")}function toggleCollapse(a){a.classList.toggle("collapsed")}function getHeaderNum(a){return void 0===a.length?a.tagName.slice(1):a[0].tagName.slice(1)}function isClick(a){if(void 0!==a.target)return!0}function whoIsActive(){return document.getElementsByClassName("active")[0]}
function isAnythingHidden(a){if(void 0===a.length)return a.classList.contains("collapsed");for(var c=0,b=0;b<a.length;b++)a[b].classList.contains("collapsed")&&c++;return 0<c?!0:!1}function activateSame(a,c,b){if("down"===c)for(c=0;c<a.length-1;c++){if(a[c].classList.contains("active")){clearActive(a);makeActive(a[c+b]);break}}else for(c=a.length-1;0<c;c--)if(a[c].classList.contains("active")){clearActive(a);makeActive(a[c-b]);break}}
function makeActive(a){a.classList.add("active");var c=a.getAttribute("id");null!==c&&window.location.replace(url+"#"+c);a.scrollIntoView()}function clearActive(a){for(var c=0;c<a.length;c++)a[c].classList.contains("active")&&a[c].classList.remove("active")}
function getElements(a,c){for(var b=0,e=[],d=0;d<elements.length;d++)for(var f=0;f<a.length;f++)elements[d].tagName===a[f]&&!elements[d].parentElement.classList.contains("js-infobox")&&(c?elements[d].classList.contains("hidden")||(e[b]=elements[d],b++):(e[b]=elements[d],b++));return e}function yesHeaderTag(a){return"H1"===a||"H2"===a||"H3"===a||"H4"===a||"H5"===a||"H6"===a};
