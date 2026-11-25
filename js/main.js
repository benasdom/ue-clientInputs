(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const PH='img/logo.png';
/* ---------- content ---------- */
const WORKS=['Ntoma Io','Chard Threads','Unix Events','Emperal Car rentals','UE learn','Cyber Earn Game','Seekers Realty GH','Wise Robotics'];
const IMGS=[1,2,5,6,7,8,9,11].map((a)=>`img/Screenshot (${850+a}).png`)
$('#shots').innerHTML=WORKS.map((w,i)=>`<figure class="shot"><div class="ph"><img src="${IMGS[i]||PH}" alt="${w} screenshot placeholder" loading="lazy"></div><figcaption><b>${w}</b><em>${i<4?'Website':i<7?'Feedback':'App'}</em></figcaption></figure>`).join('');
const STEPS=[['Tell us','Fill a short brief or message us on WhatsApp. It takes about three minutes.'],['We design','You see the look and feel in your brand colours before we build.'],['We build','Mobile-first, fast and tested on real phones.'],['Launch','We go live, hand over everything and stay close for support.']];
$('#steps').innerHTML=STEPS.map(([t,d])=>`<div class="step"><div class="ph"><img src="${IMGS[i]||PH}" alt="" loading="lazy"></div><div><h3>${t}</h3><p>${d}</p></div></div>`).join('');
const words=['Websites','Landing pages','Feedback systems','Mobile apps','Desktop apps','Datasets'];
const star='<svg viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg>';
const mq=$('#mq'),row=words.map(w=>`<span>${w}${star}</span>`).join('');mq.innerHTML=row+row+row+row;
/* ---------- SVG rings pattern ---------- */
$$('.rings').forEach(s=>{let d='';for(let r=0;r<7;r++)for(let c=0;c<10;c++){const x=c*130+(r%2?65:0),y=r*120+70;d+=`<path pathLength="1" d="M${x-45} ${y}A45 45 0 0 0 ${x+45} ${y}"/>`;}s.innerHTML=d});
const IC={grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',img:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/>',route:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.5"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'};
$$('[data-ic]').forEach(a=>a.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[a.dataset.ic]+'</svg>');
$$('.tile .ph').forEach(p=>p.insertAdjacentHTML('beforeend','<button class="go" data-open aria-label="Start a project">&#8599;</button>'));
const goTo=s=>{const t=$(s);if(!t)return;lenis?lenis.scrollTo(t,{offset:-80}):t.scrollIntoView({behavior:'smooth'})};
$$('[data-go]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();goTo(b.dataset.go)}));
const ind=$('#ind'),ics=$$('.icons a');
const moveInd=a=>{ics.forEach(x=>x.classList.toggle('on',x===a));if(a)ind.style.translate=(a.offsetLeft+a.offsetWidth/2-13)+'px 0'};moveInd(ics[0]);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)moveInd(ics.find(a=>a.getAttribute('href')=='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});['services','work','process','about'].forEach(i=>io.observe($('#'+i)));
let ni=0;const np=$('#np'),pg=$('#pg');const showN=d=>{ni=(ni+d+WORKS.length)%WORKS.length;np.textContent=WORKS[ni];pg.style.transition='none';pg.style.width='0';requestAnimationFrame(()=>requestAnimationFrame(()=>{pg.style.transition='width 4s linear';pg.style.width='100%'}))};
$('#pv').onclick=()=>showN(-1);$('#nx').onclick=()=>showN(1);showN(0);setInterval(()=>showN(1),4000);
const root=document.documentElement;
$('#theme').onclick=()=>{const t=root.dataset.theme=='dark'?'light':'dark';root.classList.add('tt');root.dataset.theme=t;try{localStorage.setItem('ue-theme',t)}catch(e){}$('meta[name=theme-color]').content=t=='dark'?'#061630':'#F2F7FB';setTimeout(()=>root.classList.remove('tt'),600)};
$('meta[name=theme-color]').content=root.dataset.theme=='dark'?'#061630':'#F2F7FB';
/* ---------- toast + pixel ---------- */
const toast=$('#toast');let tt;const say=(m,e)=>{toast.textContent=m;toast.className='on'+(e?' err':'');clearTimeout(tt);tt=setTimeout(()=>toast.className='',3500)};
const track=(n)=>{try{fbq('trackCustom',n)}catch(e){}};
$('#wa').onclick=()=>track('WhatsApp_Click');
/* ---------- motion ---------- */
let lenis;
if(window.gsap&&window.Lenis){
gsap.registerPlugin(ScrollTrigger);
if(!reduce){lenis=new Lenis({lerp:.085,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-70})}}));}
const tl=gsap.timeline({defaults:{ease:'power3.out'}});
tl.to('#navb',{strokeDashoffset:0,duration:1.2,ease:'power2.inOut'}).from('.scene',{y:60,opacity:0,duration:1},.1).from('.sc-svg image',{scale:1.15,transformOrigin:'center',duration:1.8},.1)
 .from('.hero h1 .l span',{yPercent:110,duration:1,stagger:.12},.6).to('.hero .rings path',{strokeDashoffset:0,duration:2,stagger:{each:.02,from:'random'}},.1)
 .from('.w:not(.glass)',{y:30,opacity:0,stagger:.08,duration:.8},.5);
if(!reduce){gsap.to('.glass',{y:-8,duration:3,yoyo:true,repeat:-1,ease:'sine.inOut'});
gsap.to('.hero .rings',{yPercent:18,ease:'none',scrollTrigger:{trigger:'.hero',scrub:true,start:'top top',end:'bottom top'}});
gsap.to(mq,{xPercent:-25,duration:30,repeat:-1,ease:'none'});
$$('.band .ph').forEach(p=>gsap.fromTo(p,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:'.band',scrub:true,start:'top bottom',end:'bottom top'}}));
$$('.shot').forEach((s,i,a)=>{if(i<a.length-1)gsap.to(s,{scale:.93,opacity:.55,ease:'none',scrollTrigger:{trigger:a[i+1],start:'top 90%',end:'top 84px',scrub:true}});
gsap.from($('.ph',s),{clipPath:'inset(12% 8% 12% 8% round 20px)',ease:'none',scrollTrigger:{trigger:s,start:'top 95%',end:'top 40%',scrub:true}})});
$$('.tile,.step,.collage .ph').forEach(e=>gsap.from(e,{y:50,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 88%'}}));
}
const pl=$('#pl'),pd=$('#pd');if(pl){const L=pl.getTotalLength?pl.getTotalLength():0;
ScrollTrigger.create({trigger:'#steps',start:'top 70%',end:'bottom 70%',scrub:true,onUpdate:s=>{pl.style.strokeDashoffset=1-s.progress;if(L&&pl.getPointAtLength){const p=pl.getPointAtLength(s.progress*L);pd.setAttribute('cx',p.x);pd.setAttribute('cy',p.y)}}})}
$$('[data-n]').forEach(n=>{const v=+n.dataset.n,o={v:0};ScrollTrigger.create({trigger:n,start:'top 90%',once:true,onEnter:()=>gsap.to(o,{v,duration:1.6,ease:'power2.out',onUpdate:()=>n.textContent=Math.round(o.v)+(v>=50?'+':'')})})});
const nav=$('#nav');ScrollTrigger.create({start:80,onUpdate:s=>nav.classList.toggle('small',s.scroll()>80)});
}
/* ---------- forms ---------- */
const FORMS={
website:{t:"Let's build something great.",steps:[
 ['About you',[['Name','Full name','text','e.g. Clark Kent'],['Email','Email address','email','you@domain.com'],['Phone','Phone number','tel','e.g. 0244000000']]],
 ['Your business',[['BusinessName','Business name','text','e.g. Unity Elites'],['BusinessLocation','Business location','text','e.g. Accra, Ghana'],['SitePurpose','What is the site for?','text','Sales, contacts, information…']]],
 ['Design and brand',[['ServiceList','Services offered','text','e.g. haircuts, styling'],['HasLogo','Existing logo?','text','Yes / No / Yes but need a new one'],['Colors','Brand colours','text','e.g. 60% grey, 30% gold, 10% black']]],
 ['Final details',[['SocialMedia','Social media or links','text','instagram.com/mybiz'],['AddFeatures','Features needed','text','booking, contact form, gallery…'],['PagesMessage','Message to your audience','text','Welcome, we make you look great']]]],ok:'Brief received. We will be in touch shortly.',wa:'Hi! I just submitted my website brief on your site'},
feedback:{t:'Set up customer feedback.',steps:[
 ['Your business',[['BusinessName','Business name','text',"e.g. Kwame's Barber Shop"],['BusinessType','Business type','text','Restaurant, Salon, Pharmacy…'],['Location','Location','text','e.g. East Legon, Accra']]],
 ['Feedback setup',[['FeedbackTypes','Feedback types you want','multi',['Complaints','Compliments','Suggestions','Star Ratings','General']],['AllowAnonymous','Allow anonymous feedback?','one',['Yes','No']],['TelegramHandle','Your Telegram username','text','@myusername']]],
 ['Your contact',[['OwnerName','Your name','text','e.g. Kwame Mensah'],['OwnerPhone','Phone or WhatsApp','tel','e.g. 0244000000'],['ExtraNotes','Anything else?','text','Optional',1]]]],ok:'Request received. We will set up your system within 24 hours.',wa:'Hi! I just submitted a feedback system request'}};
const modal=$('#modal'),sheet=$('#sheet');let cur,step,data;
const open=k=>{modal.classList.add('on');document.documentElement.classList.add('lock');lenis&&lenis.stop();k&&FORMS[k]?start(k):chooser()};
const close=()=>{modal.classList.remove('on');document.documentElement.classList.remove('lock');lenis&&lenis.start()};
const X='<button class="x" aria-label="Close">&times;</button>';
function chooser(){sheet.innerHTML=X+`<span class="kick">Get started</span><h2>What do you need?</h2><div class="choose"><button data-k="website"><b>Websites, apps, datasets</b><span>Tell us about your business. About 3 minutes.</span></button><button data-k="feedback"><b>Customer feedback system</b><span>Ratings, complaints and suggestions in Telegram.</span></button></div>`;
$$('[data-k]',sheet).forEach(b=>b.onclick=()=>{track('Form_'+b.dataset.k+'_Start');start(b.dataset.k)})}
function start(k){cur=k;step=0;data={};render()}
function render(){sheet.scrollTop=0;const F=FORMS[cur],S=F.steps[step],last=step==F.steps.length-1;
sheet.innerHTML=X+`<span class="kick">Step ${step+1} of ${F.steps.length}: ${S[0]}</span><h2>${F.t}</h2><div class="bar"><i style="width:${(step+1)/F.steps.length*100}%"></i></div>`+
S[1].map(([n,l,t,p,o])=>{if(t=='multi'||t=='one'){const sel=data[n]||(t=='one'?[p[0]]:[]);return `<div class="f" data-f="${n}" data-t="${t}"><label>${l}</label><div class="pills">${p.map(v=>`<button type="button" class="${sel.includes(v)?'on':''}">${v}</button>`).join('')}</div><small>Select at least one.</small></div>`}
return `<div class="f" data-f="${n}" data-o="${o||''}"><label for="i-${n}">${l}</label><input id="i-${n}" type="${t}" placeholder="${p}" value="${(data[n]||'').toString().replace(/"/g,'&quot;')}" autocomplete="off"><small>Please check this field.</small></div>`}).join('')+
`<div class="row">${step?'<button class="btn btn-o" data-b>Back</button>':'<span></span>'}<button class="btn btn-c" data-n>${last?'Submit':'Continue'}</button></div>`;
$$('.pills',sheet).forEach(p=>p.onclick=e=>{const b=e.target.closest('button');if(!b)return;const one=p.parentNode.dataset.t=='one';if(one)$$('button',p).forEach(x=>x.classList.remove('on'));b.classList.toggle('on',one||!b.classList.contains('on'))});
const bb=$('[data-b]',sheet);bb&&(bb.onclick=()=>{collect();step--;render()});$('[data-n]',sheet).onclick=next;
const f=$('input',sheet);f&&!matchMedia('(pointer:coarse)').matches&&setTimeout(()=>f.focus({preventScroll:true}),50)}
function collect(){$$('.f',sheet).forEach(f=>{const n=f.dataset.f;data[n]=f.dataset.t?$$('.pills .on',f).map(b=>b.textContent):$('input',f).value.trim()})}
const okv={email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),tel:v=>/^[\d\s+\-()]{6,}$/.test(v)};
function next(){collect();let bad=0;$$('.f',sheet).forEach(f=>{const n=f.dataset.f,v=data[n],i=$('input',f);let good=f.dataset.o?true:f.dataset.t?v.length>0:(okv[i.type]||(x=>x.length>0))(v);f.classList.toggle('bad',!good);if(!good)bad++});
if(bad){say('Please fill in all required fields.',1);return}
if(step<FORMS[cur].steps.length-1){step++;render();return}submit()}
async function submit(){const F=FORMS[cur],b=$('[data-n]',sheet);b.textContent='Sending…';b.disabled=true;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const text=`<b>${cur=='website'?'Website brief':'Feedback system request'}</b>\n`+F.steps.flatMap(s=>s[1]).map(([n])=>`${n}: ${esc([].concat(data[n]||'').join(', '))}`).join('\n');
try{const r=await fetch(`https://api.telegram.org/bot${UE.TG_TOKEN}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:UE.TG_CHAT,text,parse_mode:'HTML'})});if(!r.ok)throw 0;track('Form_'+cur+'_Submit');
sheet.innerHTML=X+`<div class="done"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" fill="none" stroke="#00AEEF" stroke-width="4"/><path d="M19 33l9 9 17-19" fill="none" stroke="#0B2447" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"><animate attributeName="stroke-dashoffset" to="0" dur=".7s" fill="freeze"/></path></svg><h2>Thank you.</h2><p class="lead">${F.ok}</p><a class="btn btn-c" target="_blank" rel="noopener" href="https://wa.me/${UE.WA}?text=${encodeURIComponent(F.wa)}">Follow up on WhatsApp</a></div>`;bindX()}
catch(e){b.textContent='Submit';b.disabled=false;say('Submission failed. Please try again.',1)}}
function bindX(){const x=$('.x',sheet);x&&(x.onclick=close)}
new MutationObserver(bindX).observe(sheet,{childList:true});
modal.addEventListener('click',e=>{if(e.target===modal)close()});addEventListener('keydown',e=>{if(e.key==='Escape')close()});
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.open)));
})();
