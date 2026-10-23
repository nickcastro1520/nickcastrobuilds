var businesses = [
    {
      id:"carwash", n:"Irving Park Hand Car Wash", type:"Car wash",
      addr:"7413 W Irving Park Rd, Chicago 60634", phone:"(773) 625-9274",
      visit:"Visit ~10:30 AM (Mon-Sat 8-6; mid-morning weekday is slow)",
      issue:"Listed website redirects to a random survey / security-warning site.",
      addon:"Add-on: online booking form",
      pdf:"https://drive.google.com/file/d/1z8Nx_ZRTv-YC8yc1sblt7VYVs8b54dJT/view"
    },
    {
      id:"hanna", n:"Alterations by Hanna", type:"Tailor / alterations (cash only)",
      addr:"6027 W Irving Park Rd, Chicago 60634", phone:"(773) 343-1505",
      visit:"Visit ~11:00 AM (Mon-Fri 9-6, Sat 11-4)",
      issue:"Domain is dead \u2014 shows a 'recently registered' parking page. 4.8\u2605, 86 reviews.",
      addon:"Add-on: online booking form",
      pdf:"https://drive.google.com/file/d/14qSiz8QFWFPiFV8ciY09hL6mDzPkqShR/view"
    },
    {
      id:"shoe", n:"West Irving Shoe Repair", type:"Shoe repair",
      addr:"5903 W Irving Park Rd, Chicago 60634", phone:"(773) 736-8505",
      visit:"Visit ~11:20 AM (Tue-Sat 9-2, closed Mon/Sun \u2014 go early)",
      issue:"Free webs.com page won't load (500 error).",
      addon:"Add-on: Google Business Profile setup",
      pdf:"https://drive.google.com/file/d/1jGZdEHRZO1O3MByA6N0d1I71rWtUFKNI/view"
    },
    {
      id:"kars", n:"Kars Auto Repair", type:"Auto repair",
      addr:"5627 W Irving Park Rd, Chicago 60634", phone:"(708) 831-4878",
      visit:"Visit ~11:45 AM (Mon-Fri 7:30-6, Sat 7:30-3)",
      issue:"'Website' link just goes to Facebook with a login popup. 5.0\u2605.",
      addon:"Add-on: AI phone receptionist",
      pdf:"https://drive.google.com/file/d/1cjebPXGC7rRGoli6fkhwEKfMmCvwTuxd/view"
    },
    {
      id:"dutch", n:"Dutch Cleaners", type:"Dry cleaner (cash only)",
      addr:"5058 W Irving Park Rd, Chicago 60641", phone:"(773) 545-6174",
      visit:"Visit ~12:15 PM (Mon-Sat 7-6)",
      issue:"No website found \u2014 weakest case, verify in person.",
      addon:"Add-on: Google Business Profile setup",
      pdf:"https://drive.google.com/file/d/1F8ry0ue1gDzJbtDYqWzkBNLyRLeDZjzV/view"
    }
  ];

  var STORE = "walkin-outreach-visited";
  function getState(){ try{ return JSON.parse(localStorage.getItem(STORE)||"{}"); }catch(e){ return {}; } }
  function setState(s){ try{ localStorage.setItem(STORE, JSON.stringify(s)); }catch(e){} }

  function mapsUrl(addr){ return "https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(addr); }

  function render(){
    var state = getState();
    var wrap = document.getElementById("cards");
    wrap.innerHTML = "";
    var doneCount = 0;
    businesses.forEach(function(b, i){
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
          '<button class="btn visit'+(done?' on':'')+'" data-id="'+b.id+'">'+(done?'\u2713 Visited':'Mark as visited')+'</button>'+
        '</div>';
      wrap.appendChild(card);
    });
    document.getElementById("progress").textContent = doneCount+" of "+businesses.length+" visited";
    var btns = wrap.querySelectorAll("button.visit");
    btns.forEach(function(btn){
      btn.addEventListener("click", function(){
        var s = getState();
        var id = btn.getAttribute("data-id");
        if(s[id]){ delete s[id]; } else { s[id] = true; }
        setState(s);
        render();
      });
    });
  }
  render();
