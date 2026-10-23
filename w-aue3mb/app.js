var businesses = [
    {
      group:"web",
      id:"carwash", n:"Irving Park Hand Car Wash", type:"Car wash",
      addr:"7413 W Irving Park Rd, Chicago 60634", phone:"(773) 625-9274",
      visit:"Visit ~10:30 AM (Mon-Sat 8-6; mid-morning weekday is slow)",
      issue:"Listed website redirects to a random survey / security-warning site.",
      addon:"Add-on: online booking form",
      pdf:"https://drive.google.com/file/d/1z8Nx_ZRTv-YC8yc1sblt7VYVs8b54dJT/view"
    },
    {
      group:"web",
      id:"hanna", n:"Alterations by Hanna", type:"Tailor / alterations (cash only)",
      addr:"6027 W Irving Park Rd, Chicago 60634", phone:"(773) 343-1505",
      visit:"Visit ~11:00 AM (Mon-Fri 9-6, Sat 11-4)",
      issue:"Domain is dead \u2014 shows a 'recently registered' parking page. 4.8\u2605, 86 reviews.",
      addon:"Add-on: online booking form",
      pdf:"https://drive.google.com/file/d/14qSiz8QFWFPiFV8ciY09hL6mDzPkqShR/view"
    },
    {
      group:"web",
      id:"shoe", n:"West Irving Shoe Repair", type:"Shoe repair",
      addr:"5903 W Irving Park Rd, Chicago 60634", phone:"(773) 736-8505",
      visit:"Visit ~11:20 AM (Tue-Sat 9-2, closed Mon/Sun \u2014 go early)",
      issue:"Free webs.com page won't load (500 error).",
      addon:"Add-on: Google Business Profile setup",
      pdf:"https://drive.google.com/file/d/1jGZdEHRZO1O3MByA6N0d1I71rWtUFKNI/view"
    },
    {
      group:"web",
      id:"kars", n:"Kars Auto Repair", type:"Auto repair",
      addr:"5627 W Irving Park Rd, Chicago 60634", phone:"(708) 831-4878",
      visit:"Visit ~11:45 AM (Mon-Fri 7:30-6, Sat 7:30-3)",
      issue:"'Website' link just goes to Facebook with a login popup. 5.0\u2605.",
      addon:"Add-on: AI phone receptionist",
      pdf:"https://drive.google.com/file/d/1cjebPXGC7rRGoli6fkhwEKfMmCvwTuxd/view"
    },
    {
      group:"web",
      id:"dutch", n:"Dutch Cleaners", type:"Dry cleaner (cash only)",
      addr:"5058 W Irving Park Rd, Chicago 60641", phone:"(773) 545-6174",
      visit:"Visit ~12:15 PM (Mon-Sat 7-6)",
      issue:"No website found \u2014 weakest case, verify in person.",
      addon:"Add-on: Google Business Profile setup",
      pdf:"https://drive.google.com/file/d/1F8ry0ue1gDzJbtDYqWzkBNLyRLeDZjzV/view"
    },
    {
      group:"email",
      id:"ejauto", n:"E&J Auto Service", type:"Auto repair",
      addr:"5738 W Irving Park Rd, Chicago 60634",
      note:"Suggested note: \"I checked your domain this morning \u2014 your email has no protection at all, so anyone can send fake emails as you and your mail can land in spam. I can lock it down today.\"",
      issue:"Uses Google for email, but has NO SPF, NO DMARC, and NO DKIM \u2014 the domain is completely unprotected, so anyone can spoof their address.",
      price:"$150 \u2014 email authentication (SPF/DKIM/DMARC) setup",
      pdf:"https://drive.google.com/file/d/1xHm3EBupNIndCn1eQx9xfEEkDlrioHle/view"
    },
    {
      group:"email",
      id:"portage", n:"Portage Family Dental", type:"Dental office",
      addr:"4307 N Central Ave, Chicago 60634",
      note:"Suggested note: \"Your email is half set up \u2014 SPF is there, but there's no DMARC or DKIM, so scammers can still impersonate your practice to patients. Quick fix.\"",
      issue:"Microsoft 365 via GoDaddy. SPF is OK, but there's NO DMARC and NO DKIM \u2014 still spoofable; needs DMARC + DKIM added.",
      price:"$99\u2013150 \u2014 email authentication (DMARC/DKIM) setup",
      pdf:"https://drive.google.com/file/d/1AmE9K7dZyEIedPFmzh1sxnoxX793_KcC/view"
    },
    {
      group:"email",
      id:"filippini", n:"Filippini Family Dentistry", type:"Dental office",
      addr:"4228 N Central Ave, Chicago 60634",
      hours:"Open Sat 7am-1pm",
      note:"Suggested note: \"You send from Gmail, but your practice domain itself isn't locked \u2014 anyone can still forge email from it. I'll set it so nothing can send as your domain.\"",
      issue:"The domain doesn't receive mail (they send from filippiniddspc@gmail.com). Pitch locking the domain down with SPF -all + DMARC p=reject so no one can spoof it.",
      price:"$99 \u2014 domain email lockdown (SPF -all + DMARC reject)",
      pdf:"https://drive.google.com/file/d/1QIZTXn_cDkgqkAphqIu-MpKqTC_vxzIv/view"
    }
  ];

  function mapsUrl(addr){ return "https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(addr); }

  function makeStore(key){
    return {
      get:function(){ try{ return JSON.parse(localStorage.getItem(key)||"{}"); }catch(e){ return {}; } },
      set:function(s){ try{ localStorage.setItem(key, JSON.stringify(s)); }catch(e){} }
    };
  }

  var webStore = makeStore("walkin-outreach-visited");
  var emailStore = makeStore("walkin-email-security-visited");

  function renderWeb(){
    var store = webStore;
    var state = store.get();
    var list = businesses.filter(function(b){ return b.group==="web"; });
    var wrap = document.getElementById("cards");
    wrap.innerHTML = "";
    var doneCount = 0;
    list.forEach(function(b, i){
      var done = !!state[b.id];
      if(done) doneCount++;
      var card = document.createElement("div");
      card.className = "card" + (done ? " done" : "");
      card.innerHTML =
        '<div class="num">STOP '+(i+1)+'</div>'+
        '<h2>'+b.n+'</h2>'+
        '<div class="type">'+b.type+'</div>'+
        '<div class="meta"><span class="label">Address:</span> '+b.addr+'</div>'+
        '<div class="meta"><span class="label">Phone:</span> <a href="tel:'+b.phone.replace(/[^0-9+]/g,'')+'">'+b.phone+'</a></div>'+
        '<div class="meta"><span class="label">When:</span> '+b.visit+'</div>'+
        '<div class="issue"><span class="label">Verified issue:</span> '+b.issue+'</div>'+
        '<div class="addon"><strong>'+b.addon+'</strong></div>'+
        '<div class="pitch">Optional add-on pitch: $99 security check (scan + plain-English report; fixes quoted after).</div>'+
        '<div class="btns">'+
          '<a class="btn primary" href="'+mapsUrl(b.addr)+'" target="_blank" rel="noopener">Directions</a>'+
          '<a class="btn" href="'+b.pdf+'" target="_blank" rel="noopener">Print leave-behind</a>'+
          '<button class="btn visit'+(done?' on':'')+'" data-store="web" data-id="'+b.id+'">'+(done?'\u2713 Visited':'Mark as visited')+'</button>'+
        '</div>';
      wrap.appendChild(card);
    });
    document.getElementById("progress").textContent = doneCount+" of "+list.length+" visited";
  }

  function renderEmail(){
    var store = emailStore;
    var state = store.get();
    var list = businesses.filter(function(b){ return b.group==="email"; });
    var wrap = document.getElementById("cards2");
    wrap.innerHTML = "";
    var doneCount = 0;
    list.forEach(function(b, i){
      var done = !!state[b.id];
      if(done) doneCount++;
      var card = document.createElement("div");
      card.className = "card" + (done ? " done" : "");
      card.innerHTML =
        '<div class="num">EMAIL STOP '+(i+1)+'</div>'+
        '<h2>'+b.n+'</h2>'+
        '<div class="type">'+b.type+(b.hours?' &middot; <strong style="color:var(--warn)">'+b.hours+'</strong>':'')+'</div>'+
        '<div class="meta"><span class="label">Address:</span> '+b.addr+'</div>'+
        '<div class="issue"><span class="label">Verified DNS gap:</span> '+b.issue+'</div>'+
        '<div class="pitch">'+b.note+'</div>'+
        '<div class="addon"><strong>'+b.price+'</strong></div>'+
        '<div class="btns">'+
          '<a class="btn primary" href="'+mapsUrl(b.addr)+'" target="_blank" rel="noopener">Directions</a>'+
          '<a class="btn" href="'+b.pdf+'" target="_blank" rel="noopener">Print one-pager</a>'+
          '<button class="btn visit'+(done?' on':'')+'" data-store="email" data-id="'+b.id+'">'+(done?'\u2713 Visited':'Mark as visited')+'</button>'+
        '</div>';
      wrap.appendChild(card);
    });
    document.getElementById("progress2").textContent = doneCount+" of "+list.length+" visited";
  }

  function render(){
    renderWeb();
    renderEmail();
    document.querySelectorAll("button.visit").forEach(function(btn){
      btn.addEventListener("click", function(){
        var store = btn.getAttribute("data-store")==="email" ? emailStore : webStore;
        var s = store.get();
        var id = btn.getAttribute("data-id");
        if(s[id]){ delete s[id]; } else { s[id] = true; }
        store.set(s);
        render();
      });
    });
  }
  render();
