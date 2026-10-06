// Page script for /l-fvrz2i6i/ (kept out of the HTML so the site's Content-Security-Policy
// can block all inline scripts). Edit here, not in an inline <script> tag.
(function(){
  'use strict';
  var STORE='nc_ai_study_v1';
  function load(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){return{}}}
  function save(s){try{localStorage.setItem(STORE,JSON.stringify(s))}catch(e){}}
  var state=load();
  if(!state.done) state.done={};
  if(!state.fc) state.fc={};

  var menuBtn=document.getElementById('menuBtn');
  var drawer=document.getElementById('drawer');
  var backdrop=document.getElementById('backdrop');
  function closeMenu(){drawer.classList.remove('open');backdrop.classList.remove('show');backdrop.hidden=true;menuBtn.setAttribute('aria-expanded','false')}
  function openMenu(){drawer.classList.add('open');backdrop.hidden=false;requestAnimationFrame(function(){backdrop.classList.add('show')});menuBtn.setAttribute('aria-expanded','true')}
  menuBtn.addEventListener('click',function(){drawer.classList.contains('open')?closeMenu():openMenu()});
  backdrop.addEventListener('click',closeMenu);
  drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu)});

  var TOPICS=['tokens','context','embeddings','vectordb','rag','mcp','agents','prompting','finetune','hallucinations','temperature','evals','automation','guardrails','cost'];
  function updateProg(){
    var n=0;TOPICS.forEach(function(t){if(state.done[t])n++});
    var pct=Math.round(n/TOPICS.length*100);
    document.getElementById('gprog').style.width=pct+'%';
    document.getElementById('gprogTxt').textContent=pct+'%';
    TOPICS.forEach(function(t){
      var el=document.querySelector('.topic[data-topic="'+t+'"]');
      if(el) el.classList.toggle('done',!!state.done[t]);
    });
  }
  document.querySelectorAll('.mark-done').forEach(function(btn){
    btn.addEventListener('click',function(){
      var t=btn.getAttribute('data-topic');
      state.done[t]=true;save(state);updateProg();
      btn.textContent='Got it';btn.disabled=true;
    });
  });
  updateProg();
  TOPICS.forEach(function(t){
    if(state.done[t]){
      var b=document.querySelector('.mark-done[data-topic="'+t+'"]');
      if(b){b.textContent='Got it';b.disabled=true}
    }
  });

  function approxTokens(text){
    var raw=text.match(/\S+|\s+/g)||[];
    var out=[];
    raw.forEach(function(piece){
      if(/^\s+$/.test(piece)){out.push(piece);return}
      var parts=piece.match(/[\w']+|[^\w\s]+/g)||[piece];
      parts.forEach(function(p){
        if(p.length<=6 || /[^\w]/.test(p)){out.push(p);return}
        for(var i=0;i<p.length;i+=4) out.push(p.slice(i,i+4));
      });
    });
    return out.filter(function(t){return t.length});
  }
  function renderTok(){
    var text=document.getElementById('tokIn').value;
    var toks=approxTokens(text);
    var box=document.getElementById('tokOut');
    box.innerHTML='';
    toks.forEach(function(t){
      var s=document.createElement('span');
      s.className='tok';
      s.textContent=t.replace(/ /g,'\u2423');
      box.appendChild(s);
    });
    var count=toks.length;
    document.getElementById('tokCount').textContent=count;
    document.getElementById('tokChars').textContent=text.length;
    var cost=(count/1e6)*0.50;
    document.getElementById('tokCost').textContent=cost<0.0001?'~$0':('~$'+(cost<0.01?cost.toFixed(5):cost.toFixed(4)));
  }
  document.getElementById('tokIn').addEventListener('input',renderTok);
  renderTok();

  var BP_MAX=8000, bpUsed=0, bpList=[];
  var BP_ADD={sys:{label:'System prompt',n:400},job:{label:'Job post',n:1200},resume:{label:'Resume',n:2000},pdf:{label:'PDF dump',n:5000},chat:{label:'Chat history',n:1500}};
  function renderBp(){
    var pct=Math.min(100,bpUsed/BP_MAX*100);
    document.getElementById('bpBar').style.width=pct+'%';
    var box=document.getElementById('bpItems');box.innerHTML='';
    var running=0;
    bpList.forEach(function(it){
      running+=it.n;
      var d=document.createElement('span');
      d.className='bp-item'+(running>BP_MAX?' overflow':'');
      d.textContent=it.label+' ('+it.n+')';
      box.appendChild(d);
    });
    var msg=document.getElementById('bpMsg');
    if(bpUsed===0) msg.textContent='Empty backpack — add items.';
    else if(bpUsed<=BP_MAX) msg.textContent=bpUsed.toLocaleString()+' / '+BP_MAX.toLocaleString()+' tokens — fits.';
    else msg.textContent=bpUsed.toLocaleString()+' / '+BP_MAX.toLocaleString()+' — OVERFLOW. Oldest or fattest chunks get dropped or the call fails.';
  }
  document.querySelectorAll('[data-bp]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var k=btn.getAttribute('data-bp');
      var it=BP_ADD[k];
      bpList.push({label:it.label,n:it.n});
      bpUsed+=it.n;
      renderBp();
    });
  });
  document.getElementById('bpReset').addEventListener('click',function(){bpList=[];bpUsed=0;renderBp()});
  renderBp();

  var WORDS=[
    {w:'roofer',x:22,y:28},{w:'roofing',x:28,y:34},{w:'shingles',x:18,y:40},
    {w:'storm damage',x:32,y:22},{w:'plumber',x:20,y:70},{w:'pipe leak',x:26,y:78},
    {w:'Chicago',x:55,y:48},{w:'Pilsen',x:62,y:42},{w:'pizza',x:78,y:75},
    {w:'tacos',x:84,y:82},{w:'AI agent',x:70,y:18},{w:'RAG',x:78,y:24},
    {w:'embeddings',x:74,y:30},{w:'podcast',x:48,y:80},{w:'Roblox',x:42,y:88}
  ];
  var emap=document.getElementById('emap');
  WORDS.forEach(function(o,i){
    var b=document.createElement('button');
    b.type='button';b.className='edot';b.textContent=o.w;
    b.style.left=o.x+'%';b.style.top=o.y+'%';
    b.setAttribute('data-i',i);
    b.addEventListener('click',function(){selectEmbed(i)});
    emap.appendChild(b);
  });
  function dist(a,b){var dx=a.x-b.x,dy=a.y-b.y;return Math.sqrt(dx*dx+dy*dy)}
  function selectEmbed(i){
    var dots=emap.querySelectorAll('.edot');
    dots.forEach(function(d){d.classList.remove('active','near')});
    dots[i].classList.add('active');
    var base=WORDS[i];
    var ranked=WORDS.map(function(w,j){return{j:j,d:dist(base,w)}}).filter(function(o){return o.j!==i}).sort(function(a,b){return a.d-b.d});
    ranked.slice(0,3).forEach(function(o){dots[o.j].classList.add('near')});
    document.getElementById('enn').textContent='Nearest to "'+base.w+'": '+ranked.slice(0,3).map(function(o){return WORDS[o.j].w}).join(', ')+'. (Precomputed 2D toy map — real embeddings have hundreds of dimensions.)';
  }

  var CHUNKS=[
    {t:'We offer storm damage roof inspection and insurance help across Chicago.',tags:'storm roof chicago'},
    {t:'Tap-to-call mobile sites for local trades — roofing, plumbing, auto.',tags:'website mobile trades'},
    {t:'AI Visibility Check scores whether ChatGPT recommends your business.',tags:'ai visibility chatgpt score'},
    {t:'Spanish-speaking crews available for south and west side jobs.',tags:'spanish bilingual'},
    {t:'Roblox idea generator with core loop and monetization plan.',tags:'roblox game ideas'}
  ];
  function vSearch(){
    var q=(document.getElementById('vQuery').value||'').toLowerCase();
    var terms=q.split(/\W+/).filter(Boolean);
    var scored=CHUNKS.map(function(c){
      var hay=(c.t+' '+c.tags).toLowerCase();
      var s=0;terms.forEach(function(t){if(hay.indexOf(t)>=0)s++});
      return{c:c,s:s};
    }).sort(function(a,b){return b.s-a.s});
    var box=document.getElementById('vResults');box.innerHTML='';
    scored.slice(0,3).forEach(function(o,i){
      var d=document.createElement('div');
      d.className='rag-step on';
      d.innerHTML='<div class="n">'+(i+1)+'</div><div><strong>Chunk score '+o.s+'</strong><p>'+o.c.t+'</p></div>';
      box.appendChild(d);
    });
  }
  document.getElementById('vSearch').addEventListener('click',vSearch);
  vSearch();

  var ragI=-1;
  function ragShow(){
    document.querySelectorAll('#ragSteps .rag-step').forEach(function(el){
      el.classList.toggle('on', parseInt(el.getAttribute('data-i'),10)<=ragI);
    });
  }
  document.getElementById('ragNext').addEventListener('click',function(){ragI=Math.min(3,ragI+1);ragShow()});
  document.getElementById('ragReset').addEventListener('click',function(){ragI=-1;ragShow()});

  var agI=-1;
  function agShow(){
    document.querySelectorAll('#aloop .aloop-item').forEach(function(el){
      el.classList.toggle('on', parseInt(el.getAttribute('data-i'),10)<=agI);
    });
  }
  document.getElementById('agentNext').addEventListener('click',function(){agI=Math.min(4,agI+1);agShow()});
  document.getElementById('agentReset').addEventListener('click',function(){agI=-1;agShow()});

  var ftMsg={rag:'RAG (or tools). Keep facts outside the model.',ft:'Fine-tune or strong few-shot for house style.',both:'Both: RAG for facts + fine-tune/prompts for voice.'};
  document.querySelectorAll('.ft-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.getElementById('ftFb').textContent=ftMsg[btn.getAttribute('data-a')];
    });
  });

  var TEMP_EXAMPLES=[
    {max:0.3,text:'"Aguilar Roofing: solid Google presence, weak AI mentions. Fix: add LocalBusiness schema, clear service pages, earn 3 niche citations. Score ~42/100."'},
    {max:0.7,text:'"Think of AI search like a new Yellow Pages. Aguilar shows up for humans on Maps, but the robots still shrug. Here is a punchy fix plan…"'},
    {max:1.5,text:'"Imagine rooftops gossiping with satellites… Aguilar needs a neon billboard in latent space! Also maybe a mariachi schema orchestra?? (Too spicy — dial it down for clients.)"'}
  ];
  function renderTemp(){
    var v=parseFloat(document.getElementById('tempRange').value);
    document.getElementById('tempVal').textContent=v.toFixed(1);
    var pick=TEMP_EXAMPLES[0];
    if(v>1) pick=TEMP_EXAMPLES[2];
    else if(v>0.3) pick=TEMP_EXAMPLES[1];
    document.getElementById('tempOut').textContent=pick.text;
  }
  document.getElementById('tempRange').addEventListener('input',renderTemp);
  renderTemp();

  var CARDS=[
    {q:'Token',a:'A chunk of text the model reads/writes. Not always a full word. Usage is billed in tokens.'},
    {q:'Context window',a:'How much text fits in working memory at once — prompt + docs + reply share it.'},
    {q:'Embedding',a:'Meaning turned into numbers so similar ideas sit close together.'},
    {q:'Vector database',a:'Store embeddings; search by nearest meaning, not exact keywords.'},
    {q:'RAG',a:'Retrieve relevant docs first, then generate an answer grounded in them.'},
    {q:'MCP',a:'A standard plug so AI assistants can use tools/apps (Gmail, GitHub, etc.).'},
    {q:'Agent',a:'AI that plans, calls tools, observes, and loops until the goal is done.'},
    {q:'Temperature',a:'Randomness knobs. Low = precise. High = creative/chaotic.'},
    {q:'Hallucination',a:'Confident but false output. Fight with grounding, citations, low temp, checks.'},
    {q:'Fine-tune vs RAG',a:'RAG for changing facts. Fine-tune for style/skill. Most biz Q&A: RAG first.'},
    {q:'Evals',a:'A test set + rubric so you know prompt/model changes actually improved quality.'},
    {q:'Guardrails',a:'Policies and filters that block unsafe, private, or off-brand AI behavior.'}
  ];
  var fcI=0;
  var fcEl=document.getElementById('fc');
  function fcRender(){
    var c=CARDS[fcI];
    document.getElementById('fcQ').textContent=c.q;
    document.getElementById('fcA').textContent=c.a;
    fcEl.classList.remove('flipped');
    var got=state.fc[c.q]?' (known)':'';
    document.getElementById('fcCount').textContent=(fcI+1)+' / '+CARDS.length+got;
  }
  function fcFlip(){fcEl.classList.toggle('flipped')}
  fcEl.addEventListener('click',fcFlip);
  fcEl.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fcFlip()}});
  document.getElementById('fcNext').addEventListener('click',function(){fcI=(fcI+1)%CARDS.length;fcRender()});
  document.getElementById('fcPrev').addEventListener('click',function(){fcI=(fcI-1+CARDS.length)%CARDS.length;fcRender()});
  document.getElementById('fcGot').addEventListener('click',function(){state.fc[CARDS[fcI].q]=true;save(state);fcI=(fcI+1)%CARDS.length;fcRender()});
  document.getElementById('fcAgain').addEventListener('click',function(){state.fc[CARDS[fcI].q]=false;save(state);fcRender()});
  fcRender();

  var QUIZ=[
    {q:'What does RAG stand for (idea)?',opts:['Random Answer Generator','Retrieve docs, then generate an answer','Run All GPUs','Recursive Agent Graph'],a:1,why:'Retrieval-Augmented Generation = look up, then write.'},
    {q:'Tokens are…',opts:['Always whole words','Only output characters','Chunks of text the model reads/writes','Database rows'],a:2,why:'Models operate on tokens; words can split into multiple.'},
    {q:'Best first choice when company facts change weekly?',opts:['Fine-tune weekly','RAG (or tools) over the docs','Raise temperature','Remove the system prompt'],a:1,why:'RAG keeps facts outside the model weights.'},
    {q:'Low temperature is best for…',opts:['Wild brainstorming','Factual scoring and consistent drafts','Making more hallucinations','Longer context windows'],a:1,why:'Low temp is safer and more deterministic.'},
    {q:'MCP is most like…',opts:['A vector database','A USB-C standard for AI tools','A type of embedding','A Zapier competitor only'],a:1,why:'Shared protocol to plug tools into assistants.'},
    {q:'An agent typically…',opts:['Answers one shot with no tools','Plans, uses tools, observes, loops','Only fine-tunes models','Replaces the context window'],a:1,why:'Tool-using loop until the goal is met.'},
    {q:'Embeddings help you…',opts:['Bill GPU hours','Find similar meaning, not just keywords','Compress PNGs','Set temperature'],a:1,why:'Semantic similarity search.'},
    {q:'A hallucination is…',opts:['A GPU overheating','Confident false output','A type of RAG chunk','MCP auth failure'],a:1,why:'Sound right, be wrong — ground and verify.'}
  ];
  var qi=0,qRight=0,qAsked=0,qLocked=false;
  function quizRender(){
    qLocked=false;
    var item=QUIZ[qi];
    document.getElementById('quizQ').textContent=item.q;
    var box=document.getElementById('quizOpts');box.innerHTML='';
    document.getElementById('quizFb').textContent='';
    item.opts.forEach(function(opt,i){
      var b=document.createElement('button');
      b.type='button';b.className='q-opt';b.textContent=opt;
      b.addEventListener('click',function(){
        if(qLocked) return;qLocked=true;qAsked++;
        var ok=i===item.a;
        if(ok) qRight++;
        box.querySelectorAll('.q-opt').forEach(function(el,j){
          if(j===item.a) el.classList.add('correct');
          else if(j===i) el.classList.add('wrong');
        });
        document.getElementById('quizFb').textContent=(ok?'Correct. ':'Not quite. ')+item.why;
        document.getElementById('quizScore').textContent='Score '+qRight+'/'+qAsked;
      });
      box.appendChild(b);
    });
    document.getElementById('quizScore').textContent='Score '+qRight+'/'+qAsked;
  }
  document.getElementById('quizNext').addEventListener('click',function(){qi=(qi+1)%QUIZ.length;quizRender()});
  quizRender();

  var GLOSS=[
    ['Agent','AI that can use tools and loop toward a goal.'],
    ['Context window','Max text the model can consider at once.'],
    ['Embedding','Numeric fingerprint of meaning.'],
    ['Evals','Tests/rubrics to measure AI quality.'],
    ['Fine-tuning','Training a model further on your examples.'],
    ['Guardrails','Safety/policy filters around AI use.'],
    ['Hallucination','Confident but incorrect model output.'],
    ['Latency','How long until the user gets a response.'],
    ['LangChain','Popular framework for chaining LLM calls, tools, and agents.'],
    ['MCP','Model Context Protocol — standard tool/data plug for assistants.'],
    ['n8n / Make / Zapier','Automation platforms that can include AI steps.'],
    ['Prompt','Instructions + input you give the model.'],
    ['RAG','Retrieve relevant info, then generate an answer.'],
    ['Temperature','Controls randomness of outputs.'],
    ['Token','Unit of text the model processes; also how usage is billed.'],
    ['Vector database','Database optimized for nearest-neighbor embedding search.']
  ];
  function renderGloss(){
    var q=(document.getElementById('gSearch').value||'').toLowerCase();
    var box=document.getElementById('glossList');box.innerHTML='';
    GLOSS.filter(function(g){return !q||g[0].toLowerCase().indexOf(q)>=0||g[1].toLowerCase().indexOf(q)>=0}).forEach(function(g){
      var d=document.createElement('div');d.className='g-item';
      d.innerHTML='<strong>'+g[0]+'</strong><span>'+g[1]+'</span>';
      box.appendChild(d);
    });
  }
  document.getElementById('gSearch').addEventListener('input',renderGloss);
  renderGloss();
})();
