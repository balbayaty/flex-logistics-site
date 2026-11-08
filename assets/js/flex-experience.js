/* FLEX BEYOND MOVEMENT // Experience controller
   No external APIs, no fake live data, no forms sent without user action.
*/
(() => {
  "use strict";
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = { lang: "en", theme: "dark", route: "dubai", question: "chem" };
  const originals = new Map();

  const translations = {
    skip:"تجاوز إلى المحتوى",
    navApproach:"منهجنا",navNetwork:"الممرات",navIntelligence:"الذكاء",navCapabilities:"قدراتنا",
    startMission:"خطّط لشحنتك",
    heroEyebrow:"المستقبل يتحرك بطريقة مختلفة",
    heroOne:"الحدود",heroTwo:"صُنعت",heroThree:"لنتجاوزها.",
    heroDesc:"حين تلتقي الخدمات اللوجستية الميدانية بذكاء القرار، تتحول التعقيدات إلى وضوح. تجربة مترابطة للتخزين والنقل العابر للحدود وما بينهما.",
    explorePossibilities:"اكتشف إمكانياتك",exploreCorridors:"استكشف شبكة الممرات",
    heroBottom:"نبدأ من احتياجات رحلتك، لا من كتيب خدماتنا.",
    mapDemo:"تصور تفاعلي · ليست بيانات حية",selectedConnection:"المسار المختار",
    mapBottom:"المسار توضيحي / للاستكشاف",
    railOne:"الشبكة الفعلية",railTwo:"الذكاء الرقمي",railThree:"القرار البشري",
    approachKicker:"شركة لوجستية بفكر مختلف",
    approachTitle:"ننقل البضائع.<br><span class='muted-phrase'>ونفهم التعقيد.</span>",
    approachLead:"أفضل تجربة لوجستية هي التي يستند فيها كل تحرك ميداني إلى قرار واضح يستند إلى الأدلة.",
    physicalKicker:"العالم الميداني",physicalTitle:"بنية تحتية تتحرك.",
    physicalText:"تخزين ومناولة مواد كيميائية وشحن وتنسيق عبر الحدود، وفق طبيعة البضائع واحتياجات التشغيل الفعلية.",
    learnCapabilities:"استكشف القدرات",
    digitalKicker:"طبقة الذكاء",digitalTitle:"معلومات تتحول إلى فهم.",
    digitalText:"رؤية تتطور عبر BlueDXP وHazalyze لتحويل المستندات والأحداث والاستثناءات إلى معرفة لوجستية قابلة للتنفيذ.",
    seeIntelligence:"اختبر فكرة الذكاء",
    humanKicker:"التميّز البشري",humanTitle:"خبرة تصنع الفارق.",
    humanText:"مشغّلون ومهندسون ومخططون يدركون ما قد يفوت لوحة البيانات. تبقى القرارات المهمة مدعومة بالأدلة ويوافق عليها الإنسان.",
    talkExpert:"ناقش احتياجاتك",
    networkKicker:"ذكاء الممرات",networkTitle:"كل حدود.<br><span class='muted-phrase'>وراءها ألف قرار.</span>",
    networkLead:"استكشف أربعة ممرات تجارية كنماذج. هذه الاعتبارات توضيحية وليست حالة المنافذ المباشرة أو عروض أسعار.",
    consoleNotice:"وضع المحاكاة — ليست بيانات مباشرة",
    routingSnapshot:"ملخص المسار",routeBorder:"المنفذ الحدودي",routeCargo:"نوع الحمولة",
    routeChecks:"متطلبات يجب التحقق منها",routeBackup:"سؤال الجاهزية البديلة",
    briefThisLane:"جهّز طلباً لهذا المسار",routeFootnote:"يتطلب التحقق التشغيلي قبل الانطلاق.",
    stepOrigin:"المنشأ",stepOriginText:"جاهزية البضائع والمستندات",
    stepGate:"الحدود",stepGateText:"التصاريح والعبور والجمارك",
    stepDestination:"الوجهة",stepDestinationText:"الاستلام ومراحل التسليم",
    loopLogic:"القيمة أن تعرف ما قد يوقف الشاحنة قبل تحركها.",
    routeDisclaimer:"هذا تصور تشغيلي بصري. المسارات تخطيطية، ولا توجد هنا واجهات متصلة لحالة الجمارك أو المنافذ أو التسعير أو التتبع أو اللوائح.",
    intelligenceTitle:"البيانات في كل مكان.<br><span class='muted-phrase'>أما الوضوح فنادر.</span>",
    intelligenceLead:"تخيل أن تسأل منظومتك اللوجستية سؤالاً، فترى المسار والمتطلبات والخطوة التالية بوضوح. هذه الرؤية التي نعمل على بنائها.",
    insightOne:"المستندات تتحول إلى بيانات منظمة",
    insightTwo:"الاستثناءات تصبح واضحة مبكراً",
    insightThree:"القرارات تصبح قابلة للتفسير",
    aiDisclaimer:"عرض تصوري، وليس قرار امتثال معتمداً أو تكاملاً حياً مع الذكاء الاصطناعي.",
    askLabel:"اسأل منظومتك",askTitle:"ما الذي ينبغي التحقق منه قبل تحرك الشحنة؟",
    questionChem:"جاهزية تخزين المواد الكيميائية",questionBorder:"تدقيق مستندات العبور",questionVisibility:"رؤية أحداث الشحنة",
    responseConcept:"مثال توضيحي لاستجابة النظام",responseFooter:"التحقق البشري يبقى ضرورياً.",
    capKicker:"البيئة التي نعمل فيها",capTitle:"التعقيد هو<br><span class='muted-phrase'>نقطة انطلاقنا.</span>",
    capLead:"منهج مترابط بين المرافق والشحن والتنسيق التنظيمي، يُصمم وفق احتياجات منتجاتك وأعمالك.",
    capChemTitle:"تخزين المواد الكيميائية والصناعية",
    capChemText:"تقييم قبول المواد ونشرات السلامة والمناولة والتوزيع المخطط.",
    capFreightTitle:"النقل البري عبر الحدود",
    capFreightText:"شحنات كاملة وجزئية ومتخصصة مع تخطيط المسارات والمستندات.",
    capTechTitle:"رؤية Hazalyze وBlueDXP",
    capTechText:"نحو امتثال مترابط ورؤية لسير العمل ودعم القرار.",
    closingEye:"الخطوة التالية تبدأ من هنا",
    closingTitle:"لا تكتف بالتقدم.<br><em>تجاوز الحدود.</em>",
    closingDesc:"أخبرنا عن وجهتك. سنساعدك في تحديد النقاش اللوجستي الأنسب.",
    closingButton:"ابدأ رحلتك التالية",
    footerLine:"حلول حركة تتشكل حول الإمكانيات.",officialSite:"الموقع الرسمي",contactUs:"تواصل مع فليكس",
    dialogTitle:"لنصمم خطوتك القادمة.",dialogIntro:"أنشئ ملخص استفسار بسيطاً. يفتح هذا العرض تطبيق البريد لديك، ولا يرسل بياناتك أو يحفظها.",
    fieldLane:"الممر المطلوب",fieldCargo:"طبيعة البضائع",fieldDescription:"ما المطلوب إنجازه؟",
    briefNoticeTitle:"لبداية حوار مهني حقيقي.",briefNoticeDesc:"دون وعود غير مدعومة عن وقت العبور أو المنافذ أو الطاقة التخزينية.",
    prepareEmail:"حضّر رسالة الاستفسار",
    formHint:"سيُفتح تطبيق البريد إن كان متاحاً. لم يرسل العرض أي رسالة مباشرة."
  };
  const htmlKeys = new Set(["approachTitle","networkTitle","intelligenceTitle","capTitle","closingTitle"]);
  const routeData = {
    dubai: {
      code:"DXB",label:"DMM → DXB",destination:"Dammam → Dubai",gateway:"Al Batha / Ghuwaifat",
      cargo:"FTL / Industrial",checks:"Documents · importer · slot",backup:"Restrictions and border readiness",
      desc:"Al Batha / Al Ghuwaifat crossing. Coordinate cargo paperwork, importer readiness, carrier permissions and delivery slot.",
      ar:{gateway:"البطحاء / الغويفات",cargo:"شاحنة كاملة / صناعي",checks:"المستندات · المستورد · موعد التسليم",backup:"القيود وجاهزية المنفذ",desc:"منفذ البطحاء / الغويفات. نسق مستندات الشحنة وجاهزية المستورد وتصاريح الناقل وموعد التسليم."}
    },
    kuwait:{
      code:"KWI",label:"DMM → KWI",destination:"Dammam → Kuwait",gateway:"Al Khafji / Al Ruqi",
      cargo:"FMCG / Chemical-dependent",checks:"Importer · permits · declaration",backup:"Commodity-specific clearance",
      desc:"Choose the crossing based on shipment specifics. Review importer documentation and any product-specific permits before releasing the truck.",
      ar:{gateway:"الخفجي / الرقعي",cargo:"سلع استهلاكية / وفق نوع المادة",checks:"المستورد · التصاريح · البيان",backup:"التخليص حسب نوع البضاعة",desc:"اختر المنفذ بناءً على تفاصيل الشحنة، وراجع مستندات المستورد والتصاريح المطلوبة قبل تحريك الشاحنة."}
    },
    amman:{
      code:"AMM",label:"DMM → AMM",destination:"Dammam → Amman",gateway:"Al Haditha / Al Omari",
      cargo:"B2B / Palletized",checks:"Customs · receiving · transport",backup:"Crossing and consignee readiness",
      desc:"Plan the Saudi–Jordan transit, export/import document handover and final receiving appointment as one connected chain.",
      ar:{gateway:"الحديثة / العمري",cargo:"شحن تجاري / منصات",checks:"الجمارك · الاستلام · النقل",backup:"جاهزية المنفذ والمستلم",desc:"نسق العبور السعودي الأردني وتسليم مستندات التصدير والاستيراد وموعد الاستلام النهائي ضمن خطة واحدة."}
    },
    baghdad:{
      code:"BGW",label:"DMM → BGW",destination:"Dammam → Baghdad",gateway:"Arar or Jordan transit (subject to feasibility)",
      cargo:"Industrial / B2B",checks:"Entry · conformity · relay",backup:"Carrier handover and availability",
      desc:"Evaluate feasible entry options, commodity conformity documentation and whether a relay or truck handover is needed.",
      ar:{gateway:"عرعر أو العبور عبر الأردن وفق الإمكانية",cargo:"صناعي / شحن تجاري",checks:"الدخول · المطابقة · التبديل",backup:"تسليم الشاحنات والتوافر",desc:"قيّم خيارات الدخول المتاحة، ومستندات المطابقة للمواد، والحاجة إلى تبديل الشاحنات أو الحمولة."}
    }
  };
  const examples = {
    chem: {
      en:"Begin with the safety data sheet, classification, packaging and storage compatibility. Confirm available approved space and the site-specific acceptance conditions.",
      ar:"ابدأ بنشرة بيانات السلامة وتصنيف المادة وطريقة التعبئة وملاءمة موقع التخزين. تحقق من المساحة المصرح باستخدامها وشروط القبول الخاصة بالموقع."
    },
    border: {
      en:"Confirm the importer of record, tariff classification, invoice and packing list. Identify product-specific approvals and validate the border's current requirements with the responsible parties.",
      ar:"تحقق من المستورد المسجل والتصنيف الجمركي والفاتورة وقائمة التعبئة. حدد موافقات المنتجات الخاصة، وتأكد من متطلبات المنفذ الحالية مع الأطراف المعنية."
    },
    visibility: {
      en:"Agree a common milestone model: pickup, gate-out, border arrival, customs release and delivered. Capture a timestamp and evidence source for each event before promising customer visibility.",
      ar:"اتفق على نموذج موحد للمراحل: الاستلام، الخروج، الوصول للمنفذ، الإفراج الجمركي والتسليم. وثّق وقت كل حدث ومصدر الدليل قبل الوعد بالرؤية التشغيلية."
    }
  };

  function readStore(k) { try{return localStorage.getItem(k);}catch{return null;} }
  function writeStore(k,v){try{localStorage.setItem(k,v);}catch{}}
  function translate() {
    $$("[data-i18n]").forEach(el=>{
      const key=el.dataset.i18n;
      if(!originals.has(el)) originals.set(el,htmlKeys.has(key)?el.innerHTML:el.textContent);
      if(state.lang==="ar" && translations[key]!=null){
        if(htmlKeys.has(key))el.innerHTML=translations[key];else el.textContent=translations[key];
      }else{
        if(htmlKeys.has(key))el.innerHTML=originals.get(el);else el.textContent=originals.get(el);
      }
    });
    const isArabic=state.lang==="ar";
    root.lang=isArabic?"ar":"en";root.dir=isArabic?"rtl":"ltr";
    const langIcon='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M7 5h12v12"/></svg>';
    $("#langToggle").innerHTML=isArabic?"English <span class='globe-icon'>"+langIcon+"</span>":"العربية <span class='globe-icon'>"+langIcon+"</span>";
    $("#missionDetails").placeholder=isArabic?"اكتب الموقع والوجهة ونوع البضائع والكمية والموعد المطلوب...":"Tell us the origin, destination, cargo volume and required date...";
    renderRoute();
    renderExample();
    updateMissionOptions();
    const themeButton=$("#themeToggle");
    if(themeButton)themeButton.setAttribute("aria-label",isArabic?"تبديل المظهر":"Switch visual theme");
  }
  function updateMissionOptions(){
    const lane=$("#missionLane"),cargo=$("#missionCargo");
    if(!lane||!cargo)return;
    const ls=state.lang==="ar"?["الدمام ← دبي","الدمام ← الكويت","الدمام ← عمّان","الدمام ← بغداد","تخزين في الدمام","أخرى / مناقشة"]:["Dammam → Dubai","Dammam → Kuwait","Dammam → Amman","Dammam → Baghdad","Warehousing in Dammam","Other / discuss"];
    const cs=state.lang==="ar"?["بضائع صناعية","مواد كيميائية / مراجعة السلامة","سلع استهلاكية","بضائع أخرى"]:["Industrial goods","Chemicals / SDS review","FMCG / consumer goods","Other cargo"];
    [...lane.options].forEach((o,i)=>o.textContent=ls[i]);
    [...cargo.options].forEach((o,i)=>o.textContent=cs[i]);
  }
  function renderRoute(){
    const route=routeData[state.route];if(!route)return;
    $("#routeDestCode").textContent=route.code;
    $("#mapCurrentLabel").innerHTML="DMM <span>→</span> "+route.code;
    $("#routeDescription").textContent=state.lang==="ar"?route.ar.desc:route.desc;
    for(const key of ["gateway","cargo","checks","backup"]){
      const el=$("#route"+key.charAt(0).toUpperCase()+key.slice(1));
      if(el)el.textContent=state.lang==="ar"?route.ar[key]:route[key];
    }
    $$("[data-route]").forEach(b=>{
      const on=b.dataset.route===state.route;
      b.classList.toggle("is-active",on);
      b.setAttribute("aria-pressed",String(on));
    });
    $$(".route-line").forEach(p=>p.classList.toggle("is-active",p.id==="route-"+state.route));
    const lane=$("#missionLane");if(lane){
      const v=route.destination;
      if([...lane.options].some(o=>o.value===v))lane.value=v;
    }
  }
  function setRoute(route) {if(!routeData[route])return;state.route=route;renderRoute();}

  function renderExample(){
    const data=examples[state.question];if(!data)return;
    const el=$("#aiResponse");if(el){
      el.style.opacity="0.35";
      window.setTimeout(()=>{el.textContent=data[state.lang];el.style.opacity="1";},120);
    }
    $$("[data-question]").forEach(b=>{
      const on=b.dataset.question===state.question;
      b.classList.toggle("is-selected",on);
      b.setAttribute("aria-pressed",String(on));
    });
  }
  function setQuestion(key){if(!examples[key])return;state.question=key;renderExample();}
  function setTheme(theme){
    state.theme=theme==="light"?"light":"dark";
    root.dataset.theme=state.theme;
    writeStore("flexx-theme",state.theme);
    const icon=$("#themeToggle");
    if(icon)icon.title=state.theme==="light"?"Switch to dark":"Switch to light";
  }

  function setupReveals(){
    const els=$$(".reveal");
    if(reduceMotion.matches||!("IntersectionObserver" in window)){els.forEach(x=>x.classList.add("is-visible"));return;}
    const io=new IntersectionObserver(entries=>{
      for(const e of entries)if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target);}
    },{threshold:.07,rootMargin:"0px 0px 40px 0px"});
    els.forEach(el=>io.observe(el));
    window.setTimeout(()=>$$(".hero .reveal").forEach(el=>el.classList.add("is-visible")),400);
  }
  function setupScroll(){
    let pending=false;
    const update=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      $("#scrollProgress").style.width=(Math.min(1,window.scrollY/max)*100).toFixed(2)+"%";
      $("#siteHeader").classList.toggle("is-scrolled",window.scrollY>40);
      pending=false;
    };
    window.addEventListener("scroll",()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});
    window.addEventListener("resize",update,{passive:true});update();
  }
  function setupMapPulse(){
    const active=()=>$("#route-"+state.route);
    const dot=$("#movingPulse"),halo=$("#movingPulseHalo");
    if(!dot||!halo)return;
    if(reduceMotion.matches){dot.style.display="none";halo.style.display="none";return;}
    const speed=4800;let start=performance.now();
    const tick=(now)=>{
      if(!document.hidden){
        const path=active();
        if(path&&typeof path.getTotalLength==="function"){
          const len=path.getTotalLength();
          const p=path.getPointAtLength(((now-start)%speed)/speed*len);
          dot.setAttribute("cx",p.x);dot.setAttribute("cy",p.y);
          halo.setAttribute("cx",p.x);halo.setAttribute("cy",p.y);
        }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function setupParticles(){
    const canvas=$("#particles");if(!canvas||reduceMotion.matches)return;
    const ctx=canvas.getContext("2d",{alpha:true});if(!ctx)return;
    let W=0,H=0,dpr=1,points=[];
    function resize(){
      dpr=Math.min(window.devicePixelRatio||1,2);
      W=window.innerWidth;H=window.innerHeight;
      canvas.width=Math.ceil(W*dpr);canvas.height=Math.ceil(H*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count=W<600?20:W<1100?32:49;
      points=Array.from({length:count},()=>({x:Math.random()*W,y:Math.random()*H,r:.45+Math.random()*1.1,vy:.06+Math.random()*.19,phase:Math.random()*6.3}));
    }
    let prior=0;
    function animate(t){
      requestAnimationFrame(animate);
      if(document.hidden||t-prior<28)return;
      prior=t;
      ctx.clearRect(0,0,W,H);
      const light=root.dataset.theme==="light";
      const color=light?"115,104,86":"160,178,201";
      for(const p of points){
        p.y-=p.vy;if(p.y<0)p.y+=H;
        ctx.beginPath();ctx.fillStyle="rgba("+color+","+(0.15+Math.sin(t/1200+p.phase)*.1)+")";ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      }
    }
    window.addEventListener("resize",resize,{passive:true});resize();requestAnimationFrame(animate);
  }
  function setupMission(){
    const dialog=$("#missionDialog"), form=$("#missionForm"), close=$("#dialogClose");
    if(!dialog||!form)return;
    const open=()=>{
      renderRoute();
      if(!dialog.open&&typeof dialog.showModal==="function")dialog.showModal();
      else dialog.setAttribute("open","");
    };
    $$("[data-open-mission]").forEach(b=>b.addEventListener("click",open));
    close.addEventListener("click",()=>dialog.close?.());
    dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close?.();});
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const lane=$("#missionLane").value,cargo=$("#missionCargo").value,details=$("#missionDetails").value.trim();
      const subject="FLEX Logistics / New movement enquiry";
      const body=["Hello FLEX Logistics,","","I would like to discuss a logistics requirement.","","Corridor / service: "+lane,"Cargo profile: "+cargo,"Details: "+(details||"Please contact me to clarify."),"","Sent from the FLEX immersive design preview. Not a confirmed booking."].join("\n");
      $("#formStatus").textContent=state.lang==="ar"?translations.formHint:"Your email app should open. Nothing has been sent by this preview.";
      const href="mailto:info@scsflex.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
      window.location.href=href;
    });
  }
  function setupControls(){
    $("#langToggle").addEventListener("click",()=>{
      state.lang=state.lang==="en"?"ar":"en";writeStore("flexx-lang",state.lang);translate();
    });
    $("#themeToggle").addEventListener("click",()=>setTheme(state.theme==="dark"?"light":"dark"));
    $$("[data-route]").forEach(el=>el.addEventListener("click",()=>setRoute(el.dataset.route)));
    $$("[data-question]").forEach(el=>el.addEventListener("click",()=>setQuestion(el.dataset.question)));
    const menu=$("#mobileMenu"),toggle=$("#menuToggle");
    toggle.addEventListener("click",()=>{
      const next=menu.hidden;menu.hidden=!next;toggle.setAttribute("aria-expanded",String(next));
    });
    $$("a",menu).forEach(link=>link.addEventListener("click",()=>{
      menu.hidden=true;toggle.setAttribute("aria-expanded","false");
    }));
    document.addEventListener("keydown",e=>{
      if(e.key==="Escape"&&!menu.hidden){menu.hidden=true;toggle.setAttribute("aria-expanded","false");}
    });
    document.addEventListener("click",e=>{
      if(!menu.hidden&&!e.target.closest(".site-header")){menu.hidden=true;toggle.setAttribute("aria-expanded","false");}
    });
  }
  function init(){
    const storedLang=readStore("flexx-lang");state.lang=storedLang==="ar"?"ar":"en";
    const storedTheme=readStore("flexx-theme");state.theme=storedTheme==="light"?"light":"dark";
    setTheme(state.theme);setupControls();translate();setupReveals();setupScroll();setupMapPulse();setupParticles();setupMission();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
