// Page script for /o-85kewn4w/ (kept out of the HTML so the site's Content-Security-Policy
// can block all inline scripts). Edit here, not in an inline <script> tag.
(function(){
var KEY='outreach-texted-v1';
var state={};try{state=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function count(){var n=document.querySelectorAll('#newest .card.done').length;
 document.getElementById('cnt').textContent=n+' of '+document.querySelectorAll('#newest .card').length+' texted';}
function fallbackCopy(t){
 var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');
 ta.style.position='fixed';ta.style.top='0';ta.style.left='0';ta.style.opacity='0';ta.style.fontSize='16px';
 document.body.appendChild(ta);
 var r=document.createRange();r.selectNodeContents(ta);var s=window.getSelection();s.removeAllRanges();s.addRange(r);
 ta.setSelectionRange(0,t.length);var ok=false;try{ok=document.execCommand('copy')}catch(e){}
 document.body.removeChild(ta);s.removeAllRanges();return ok;}
function flash(b,ok){var o=b.getAttribute('data-label');b.textContent=ok?'Copied!':'Press & hold the text to copy';
 if(ok)b.classList.add('ok');setTimeout(function(){b.textContent=o;b.classList.remove('ok')},1800);}
document.querySelectorAll('.card').forEach(function(c){
 var id=c.getAttribute('data-id'),cb=c.querySelector('input.texted');
 if(state[id]){cb.checked=true;c.classList.add('done')}
 cb.addEventListener('change',function(){if(cb.checked){state[id]=new Date().toISOString()}else{delete state[id]}
  c.classList.toggle('done',cb.checked);save();count();});
 c.querySelector('.copy').addEventListener('click',function(){
  var b=this,t=c.querySelector('.msg').textContent;
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(function(){flash(b,true)},function(){flash(b,fallbackCopy(t))});}
  else flash(b,fallbackCopy(t));});
});
var RKEY='outreach-replies-v1',BKEY='outreach-botsent-v1';
function load(k){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
function put(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var replies=load(RKEY),botsent=load(BKEY);
function info(c){return 'Business: '+c.getAttribute('data-name')+'\nArea: '+c.getAttribute('data-area')+'\nPhone: '+c.getAttribute('data-phone')+
 '\n\nMY ORIGINAL MESSAGE:\n'+c.querySelector('.msg').textContent+'\n\nTHEIR REPLY:\n'+(c.querySelector('.rtext').value.trim()||'(no reply pasted)');}
document.querySelectorAll('.card').forEach(function(c){
 var id=c.getAttribute('data-id'),ta=c.querySelector('.rtext'),badge=c.querySelector('.badge');
 if(replies[id])ta.value=replies[id];
 if(botsent[id])badge.hidden=false;
 ta.addEventListener('input',function(){if(ta.value)replies[id]=ta.value;else delete replies[id];put(RKEY,replies);});
 c.querySelector('.bot').addEventListener('click',function(ev){
  var subj='[Lead Reply] '+c.getAttribute('data-name')+' | '+c.getAttribute('data-phone');
  this.href='mailto:nickcastro1520@gmail.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(info(c));
  botsent[id]=new Date().toISOString();put(BKEY,botsent);badge.hidden=false;});
 c.querySelector('.chat').addEventListener('click',function(){
  var b=this,t=info(c);
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(function(){flash(b,true)},function(){flash(b,fallbackCopy(t))});}
  else flash(b,fallbackCopy(t));});
});
document.getElementById('hide').addEventListener('click',function(){
 var on=document.body.classList.toggle('hidedone');this.textContent=on?'Show texted':'Hide texted';
 document.querySelectorAll('.card.done').forEach(function(c){c.style.display=on?'none':''});});
document.getElementById('reset').addEventListener('click',function(){
 if(!confirm('Clear all "texted" checkmarks on this phone?'))return;state={};save();
 document.querySelectorAll('.card').forEach(function(c){c.classList.remove('done');c.style.display='';c.querySelector('input.texted').checked=false});count();});
count();
})();
