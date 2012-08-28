var headerList="H1 H2 H3 H4 H5 H6".split(" "),elements=[],headers=[],visible=[],iconThis="←",iconAll="↕",headerLinks=" <button class='this' title='Collapse this section'>"+iconThis+"</button> <button class='all' title='Collapse all sections at this level'>"+iconAll+"</button>",keyNext=106,keyPrev=107,keyNextUp=108,keyPrevUp=105,keyFirst=117,keyLast=109,keyAll=97,keyExpand=102,keyTheme=115,helpBoxText="<h3>Keyboard shortcuts</h3><ul><li><b>"+String.fromCharCode(keyNext)+
"</b>: Next section</li><li><b>"+String.fromCharCode(keyPrev)+"</b>: Previous section</li><li><b>return/enter</b>: Toggle active section</li><li><b>"+String.fromCharCode(keyNextUp)+"</b>: Next section up</li><li><b>"+String.fromCharCode(keyPrevUp)+"</b>: Previous section up</li><li><b>"+String.fromCharCode(keyFirst)+"</b>: First section</li><li><b>"+String.fromCharCode(keyLast)+"</b>: Last section</li><li><b>"+String.fromCharCode(keyAll)+"</b>: Toggle everything in this section</li><li><b>"+String.fromCharCode(keyExpand)+
"</b>: Expand all sections (do this before you search within the document)</li><li><b>"+String.fromCharCode(keyTheme)+"</b>: Switch theme (light/dark)</li></ul>";
window.onload=function(){document.documentElement.classList.add("light");elements=document.body.children;headers=getElements(headerList,!1);for(var a=0;a<headers.length;a++)headers[a].innerHTML+=headerLinks,headers[a].onclick=toggleHandler;makeActive(headers[0]);a=document.body.children[0];console.log("firstElement is a "+a.tagName+" and contains "+a.textContent);var b=document.createElement("div");b.classList.add("js-infobox");document.body.insertBefore(b,a);b.innerHTML=helpBoxText};
window.onkeypress=function(a){a=a||window.event;a=a.which||a.keyCode;0===visible.length?visible=getElements(headerList,!0):13===a?toggleHandler(whoIsActive()):a===keyAll&&toggleSame();if(a===keyNext)activateSame(visible,"down",1);else if(a===keyPrev)activateSame(visible,"up",1);else if(a===keyFirst)clearActive(visible),makeActive(visible[0]);else if(a===keyLast)clearActive(visible),makeActive(visible[visible.length-1]);else if(a===keyPrevUp)for(a=0;a<visible.length;a++){if(visible[a]===whoIsActive())for(var b=
a-1;0<=b;b--)if(getHeaderNum(whoIsActive())>getHeaderNum(visible[b])){clearActive(visible);makeActive(visible[b]);break}}else if(a===keyNextUp)for(a=0;a<visible.length;a++){if(visible[a]===whoIsActive())for(b=a+1;b<visible.length;b++)if(getHeaderNum(whoIsActive())>getHeaderNum(visible[b])){clearActive(visible);makeActive(visible[b]);break}}else if(a===keyExpand)for(;isAnythingHidden(headers);)for(a=0;a<headers.length;a++)headers[a].classList.contains("collapsed")&&toggleHandler(headers[a]);else a===
keyTheme&&(a=document.documentElement,a.classList.toggle("dark"),a.classList.toggle("light"))};function toggleHandler(a){var a=getTargets(a),b=whoIsActive();void 0===a.length?toggleMe(a):toggleSame();clearActive(headers);makeActive(b);visible=getElements(headerList,!0)}
function toggleMe(a){for(var b=getHeaderNum(a),c=0;c<elements.length;c++)if(elements[c]===a){b=compareHeaders(c,elements,b);if(isCollapsed(a)){toggleCollapse(a);for(c+=1;elements[c]!==b&&void 0!==elements[c];){var d=elements[c].tagName;if("H1"===d||"H2"===d||"H3"===d||"H4"===d||"H5"===d||"H6"===d)if(isCollapsed(elements[c])){d=getHeaderNum(elements[c]);d=compareHeaders(c,elements,d);for(elements[c].classList.remove("hidden");elements[c]!==d&&void 0!==elements[c];)c++}else elements[c].classList.remove("hidden"),
c++;else elements[c].classList.remove("hidden"),c++}}else{toggleCollapse(a);for(c+=1;elements[c]!==b&&void 0!==elements[c];)elements[c].classList.add("hidden"),c++}addToggler(a);break}}
function toggleSame(){var a=new Date,b=whoIsActive();if("H1"===b.tagName){var c=document.getElementsByTagName("H1");toggleHandler(b);if(isCollapsed(b))for(var d=0;d<c.length;d++)c[d]!==b&&!isCollapsed(c[d])&&toggleHandler(c[d]);else for(d=0;d<c.length;d++)c[d]!==b&&isCollapsed(c[d])&&toggleHandler(c[d])}else{toggleHandler(b);c=getHeaderNum(b);for(d=0;d<visible.length;d++)if(visible[d]===b){for(var e=0,f=d-1;getHeaderNum(visible[f])>=c;){var g=getHeaderNum(visible[f]);isCollapsed(b)?!isCollapsed(visible[f])&&
g===c?toggleHandler(visible[f]):e++:isCollapsed(visible[f])&&g===c?toggleHandler(visible[f]):e++;f--}for(d=d-e+1;getHeaderNum(visible[d])>=c;)e=getHeaderNum(visible[d]),isCollapsed(b)?!isCollapsed(visible[d])&&e===c&&toggleHandler(visible[d]):isCollapsed(visible[d])&&e===c&&toggleHandler(visible[d]),d++;break}}console.log((new Date).getTime()-a.getTime())}
function activateSame(a,b,c){if("down"===b)for(b=0;b<a.length-1;b++){if(a[b].classList.contains("active")){clearActive(a);makeActive(a[b+c]);break}}else for(b=a.length-1;0<b;b--)if(a[b].classList.contains("active")){clearActive(a);makeActive(a[b-c]);break}}function compareHeaders(a,b,c){for(a+=1;a<b.length;a++){if(a===b.length-1)return elements[elements.length];for(var d=0;d<headerList.length;d++)if(b[a].tagName===headerList[d]&&b[a].tagName.slice(1)<=c)return b[a]}}
function getTargets(a){if(isClick(a)){clearActive(headers);for(var b=0,c=0;c<headerList.length;c++)a.target.tagName===headerList[c]&&(b=1);if(1===b)return makeActive(a.target),a.target;if(a.target.classList.contains("all"))return makeActive(a.target.parentElement),document.getElementsByTagName(a.target.parentElement.tagName);makeActive(a.target.parentElement);return a.target.parentElement}return a}
function getElements(a,b){for(var c=0,d=[],e=0;e<elements.length;e++)for(var f=0;f<a.length;f++)elements[e].tagName===a[f]&&!elements[e].parentElement.classList.contains("js-infobox")&&(b?elements[e].classList.contains("hidden")||(d[c]=elements[e],c++):(d[c]=elements[e],c++));return d}function addToggler(a){a.onclick=toggleHandler}function isCollapsed(a){return a.classList.contains("collapsed")}function toggleCollapse(a){a.classList.toggle("collapsed")}
function getHeaderNum(a){return void 0===a.length?a.tagName.slice(1):a[0].tagName.slice(1)}function makeActive(a){a.classList.add("active");a.scrollIntoView()}function clearActive(a){for(var b=0;b<a.length;b++)a[b].classList.contains("active")&&a[b].classList.remove("active")}function isClick(a){if(void 0!==a.target)return!0}function whoIsActive(){return document.getElementsByClassName("active")[0]}
function isAnythingHidden(a){if(void 0===a.length)return a.classList.contains("collapsed");for(var b=0,c=0;c<a.length;c++)a[c].classList.contains("collapsed")&&b++;return 0<b?!0:!1};
