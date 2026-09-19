/* ════════════════════════════════════════════════════════════
   GAMELEIRA — jogos embutidos (roda direto na grade)
   Cada jogo é um documento HTML completo, isolado em iframe sandbox.
   ════════════════════════════════════════════════════════════ */

/* ---------- capas (SVG) ---------- */

var COVER_COBRINHA = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
"<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360' viewBox='0 0 480 360'>" +
"<rect width='480' height='360' fill='#0d2b22'/>" +
"<circle cx='434' cy='52' r='64' fill='#8dff57' opacity='.09'/>" +
"<circle cx='42' cy='330' r='72' fill='#8dff57' opacity='.07'/>" +
"<circle cx='118' cy='168' r='24' fill='#ff5d5d'/>" +
"<path d='M118 146 q6 -14 18 -17' stroke='#7a4a21' stroke-width='6' fill='none' stroke-linecap='round'/>" +
"<ellipse cx='140' cy='130' rx='13' ry='7' fill='#8dff57' transform='rotate(24 140 130)'/>" +
"<g>" +
"<rect x='40' y='260' width='40' height='40' rx='10' fill='#2f8f3a'/>" +
"<rect x='84' y='260' width='40' height='40' rx='10' fill='#37a341'/>" +
"<rect x='128' y='260' width='40' height='40' rx='10' fill='#37a341'/>" +
"<rect x='172' y='260' width='40' height='40' rx='10' fill='#43b94a'/>" +
"<rect x='216' y='260' width='40' height='40' rx='10' fill='#43b94a'/>" +
"<rect x='260' y='260' width='40' height='40' rx='10' fill='#54d158'/>" +
"<rect x='304' y='260' width='40' height='40' rx='10' fill='#54d158'/>" +
"<rect x='304' y='216' width='40' height='40' rx='10' fill='#6ade6a'/>" +
"<rect x='304' y='172' width='40' height='40' rx='10' fill='#6ade6a'/>" +
"<rect x='260' y='172' width='40' height='40' rx='10' fill='#7bee72'/>" +
"<rect x='212' y='170' width='44' height='44' rx='12' fill='#8dff57'/>" +
"<circle cx='226' cy='184' r='4.5' fill='#0d2b22'/>" +
"<circle cx='226' cy='202' r='4.5' fill='#0d2b22'/>" +
"</g>" +
"</svg>");

var COVER_TIJOLAO = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
"<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360' viewBox='0 0 480 360'>" +
"<rect width='480' height='360' fill='#1c2148'/>" +
"<g>" +
"<rect x='18' y='30' width='52' height='18' rx='4' fill='#ff5d8f'/><rect x='74' y='30' width='52' height='18' rx='4' fill='#ff5d8f'/><rect x='130' y='30' width='52' height='18' rx='4' fill='#ff5d8f'/><rect x='186' y='30' width='52' height='18' rx='4' fill='#ff5d8f'/><rect x='298' y='30' width='52' height='18' rx='4' fill='#ff5d8f'/><rect x='354' y='30' width='52' height='18' rx='4' fill='#ff5d8f'/><rect x='410' y='30' width='52' height='18' rx='4' fill='#ff5d8f'/>" +
"<rect x='18' y='52' width='52' height='18' rx='4' fill='#ffb703'/><rect x='74' y='52' width='52' height='18' rx='4' fill='#ffb703'/><rect x='186' y='52' width='52' height='18' rx='4' fill='#ffb703'/><rect x='242' y='52' width='52' height='18' rx='4' fill='#ffb703'/><rect x='298' y='52' width='52' height='18' rx='4' fill='#ffb703'/><rect x='410' y='52' width='52' height='18' rx='4' fill='#ffb703'/>" +
"<rect x='74' y='74' width='52' height='18' rx='4' fill='#aef04c'/><rect x='130' y='74' width='52' height='18' rx='4' fill='#aef04c'/><rect x='186' y='74' width='52' height='18' rx='4' fill='#aef04c'/><rect x='298' y='74' width='52' height='18' rx='4' fill='#aef04c'/><rect x='354' y='74' width='52' height='18' rx='4' fill='#aef04c'/>" +
"<rect x='18' y='96' width='52' height='18' rx='4' fill='#5dd9ff'/><rect x='130' y='96' width='52' height='18' rx='4' fill='#5dd9ff'/><rect x='186' y='96' width='52' height='18' rx='4' fill='#5dd9ff'/><rect x='242' y='96' width='52' height='18' rx='4' fill='#5dd9ff'/><rect x='354' y='96' width='52' height='18' rx='4' fill='#5dd9ff'/><rect x='410' y='96' width='52' height='18' rx='4' fill='#5dd9ff'/>" +
"<rect x='74' y='118' width='52' height='18' rx='4' fill='#c792ff'/><rect x='130' y='118' width='52' height='18' rx='4' fill='#c792ff'/><rect x='242' y='118' width='52' height='18' rx='4' fill='#c792ff'/><rect x='298' y='118' width='52' height='18' rx='4' fill='#c792ff'/><rect x='410' y='118' width='52' height='18' rx='4' fill='#c792ff'/>" +
"</g>" +
"<circle cx='382' cy='262' r='4' fill='#fff6ea' opacity='.3'/>" +
"<circle cx='358' cy='238' r='7' fill='#fff6ea' opacity='.55'/>" +
"<circle cx='330' cy='210' r='11' fill='#fff6ea'/>" +
"<rect x='180' y='298' width='120' height='16' rx='8' fill='#fff6ea'/>" +
"</svg>");

var COVER_MEMORIA = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
"<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360' viewBox='0 0 480 360'>" +
"<rect width='480' height='360' fill='#ff6b6b'/>" +
"<g font-family='Arial,Helvetica,sans-serif' font-weight='bold' text-anchor='middle'>" +
"<rect x='35' y='28' width='92' height='92' rx='14' fill='#fff6ea'/><text x='81' y='94' font-size='40' fill='#ff6b6b'>?</text>" +
"<rect x='141' y='28' width='92' height='92' rx='14' fill='#fff6ea'/><text x='187' y='96' font-size='48'>🍒</text>" +
"<rect x='247' y='28' width='92' height='92' rx='14' fill='#fff6ea'/><text x='293' y='94' font-size='40' fill='#ff6b6b'>?</text>" +
"<rect x='353' y='28' width='92' height='92' rx='14' fill='#fff6ea'/><text x='399' y='94' font-size='40' fill='#ff6b6b'>?</text>" +
"<rect x='35' y='134' width='92' height='92' rx='14' fill='#fff6ea'/><text x='81' y='202' font-size='48'>👾</text>" +
"<rect x='141' y='134' width='92' height='92' rx='14' fill='#fff6ea'/><text x='187' y='200' font-size='40' fill='#ff6b6b'>?</text>" +
"<rect x='247' y='134' width='92' height='92' rx='14' fill='#fff6ea'/><text x='293' y='202' font-size='48'>🚀</text>" +
"<rect x='353' y='134' width='92' height='92' rx='14' fill='#fff6ea'/><text x='399' y='200' font-size='40' fill='#ff6b6b'>?</text>" +
"<rect x='35' y='240' width='92' height='92' rx='14' fill='#fff6ea'/><text x='81' y='308' font-size='40' fill='#ff6b6b'>?</text>" +
"<rect x='141' y='240' width='92' height='92' rx='14' fill='#fff6ea'/><text x='187' y='306' font-size='40' fill='#ff6b6b'>?</text>" +
"<rect x='247' y='240' width='92' height='92' rx='14' fill='#fff6ea'/><text x='293' y='308' font-size='48'>🎲</text>" +
"<rect x='353' y='240' width='92' height='92' rx='14' fill='#fff6ea'/><text x='399' y='306' font-size='40' fill='#ff6b6b'>?</text>" +
"</g>" +
"</svg>");

var COVER_JOKENPO = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
"<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360' viewBox='0 0 480 360'>" +
"<rect width='480' height='360' fill='#ffb703'/>" +
"<g fill='#8a5a00' opacity='.35'>" +
"<path d='M40 40l10 22 22 10-22 10-10 22-10-22-22-10 22-10z'/>" +
"<path d='M430 280l8 18 18 8-18 8-8 18-8-18-18-8 18-8z'/>" +
"</g>" +
"<circle cx='118' cy='196' r='74' fill='#fff3d6' stroke='#8a5a00' stroke-width='5'/>" +
"<circle cx='242' cy='148' r='88' fill='#fff3d6' stroke='#8a5a00' stroke-width='5'/>" +
"<circle cx='364' cy='196' r='74' fill='#fff3d6' stroke='#8a5a00' stroke-width='5'/>" +
"<g font-family='Arial,Helvetica,sans-serif' text-anchor='middle'>" +
"<text x='118' y='222' font-size='68'>✊</text>" +
"<text x='242' y='178' font-size='82'>✋</text>" +
"<text x='364' y='222' font-size='68'>✌️</text>" +
"</g>" +
"</svg>");

/* ---------- jogo 1: cobrinha ---------- */

var GAME_COBRINHA = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
html,body{margin:0;height:100%;overflow:hidden;background:#0d2b22;color:#eafff2;font-family:"Trebuchet MS",system-ui,sans-serif}
.wrap{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:12px;box-sizing:border-box}
.hud{display:flex;gap:20px;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase}
.hud b{color:#8dff57}
canvas{background:#0a2019;border:3px solid #8dff57;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.4);max-width:min(94vw,66vh);max-height:66vh;touch-action:none}
.tip{font-size:12px;opacity:.65}
.veil{position:fixed;inset:0;display:none;place-items:center;background:rgba(4,18,13,.84);text-align:center;padding:16px}
.veil.on{display:grid}
.veil h2{margin:0 0 6px;font-size:26px}
.veil p{margin:0 0 16px;opacity:.8}
.veil button{font:inherit;font-weight:800;font-size:15px;background:#8dff57;color:#083317;border:0;border-radius:10px;padding:11px 22px;cursor:pointer}
</style>
</head>
<body>
<div class="wrap">
  <div class="hud"><span>🍎 Pontos <b id="sc">0</b></span><span>🏆 Recorde <b id="rc">0</b></span></div>
  <canvas id="cv" width="440" height="440"></canvas>
  <div class="tip">Setas ou WASD para mover · no celular, deslize o dedo</div>
</div>
<div class="veil" id="veil">
  <div><h2 id="vt">Fim de jogo!</h2><p id="vs"></p><button id="btn">Jogar de novo ↻</button></div>
</div>
<script>
(function(){
var cv=document.getElementById('cv'),cx=cv.getContext('2d');
var N=22,cell=cv.width/N;
var snake,dir,queue,food,score,dead,timer,speed;
var sc=document.getElementById('sc'),rc=document.getElementById('rc');
var veil=document.getElementById('veil'),vt=document.getElementById('vt'),vs=document.getElementById('vs'),btn=document.getElementById('btn');
var best=0;try{best=+localStorage.getItem('cobrinha-best')||0;}catch(e){}
rc.textContent=best;
function place(){do{food={x:(Math.random()*N)|0,y:(Math.random()*N)|0};}while(snake.some(function(s){return s.x===food.x&&s.y===food.y;}));}
function reset(){snake=[{x:10,y:11},{x:9,y:11},{x:8,y:11}];dir={x:1,y:0};queue=[];score=0;dead=false;speed=130;sc.textContent='0';veil.className='veil';place();clearInterval(timer);timer=setInterval(step,speed);}
function step(){
  if(queue.length)dir=queue.shift();
  var h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
  if(h.x<0||h.y<0||h.x>=N||h.y>=N||snake.some(function(s){return s.x===h.x&&s.y===h.y;}))return over();
  snake.unshift(h);
  if(h.x===food.x&&h.y===food.y){score++;sc.textContent=score;place();
    if(speed>70){speed-=3;clearInterval(timer);timer=setInterval(step,speed);}}
  else snake.pop();
  draw();
}
function draw(){
  cx.fillStyle='#0a2019';cx.fillRect(0,0,cv.width,cv.height);
  cx.fillStyle='rgba(141,255,87,.07)';
  for(var i=0;i<N;i+=2)for(var j=0;j<N;j+=2)cx.fillRect(i*cell,j*cell,cell,cell);
  cx.fillStyle='#ff5d5d';
  cx.beginPath();cx.arc(food.x*cell+cell/2,food.y*cell+cell/2,cell*.36,0,7);cx.fill();
  for(var k=snake.length-1;k>=0;k--){var s=snake[k];
    cx.fillStyle=k===0?'#eaffd6':'#8dff57';
    cx.fillRect(s.x*cell+1.5,s.y*cell+1.5,cell-3,cell-3);}
}
function over(){dead=true;clearInterval(timer);
  if(score>best){best=score;try{localStorage.setItem('cobrinha-best',best);}catch(e){}rc.textContent=best;}
  vt.textContent='Fim de jogo!';
  vs.textContent='Você fez '+score+(score===1?' ponto.':' pontos.')+' Aperte Enter para voltar.';
  veil.className='veil on';}
function turn(x,y){if(x===-dir.x&&y===-dir.y)return;
  var last=queue.length?queue[queue.length-1]:dir;
  if(x===last.x&&y===last.y)return;
  queue.push({x:x,y:y});if(queue.length>2)queue.shift();}
window.addEventListener('keydown',function(e){
  var k=e.key.toLowerCase();
  if(k==='arrowup'||k==='w'){turn(0,-1);e.preventDefault();}
  else if(k==='arrowdown'||k==='s'){turn(0,1);e.preventDefault();}
  else if(k==='arrowleft'||k==='a'){turn(-1,0);e.preventDefault();}
  else if(k==='arrowright'||k==='d'){turn(1,0);e.preventDefault();}
  else if(k==='enter'&&dead)reset();
});
btn.addEventListener('click',reset);
var ts=null;
cv.addEventListener('pointerdown',function(e){ts=[e.clientX,e.clientY];});
cv.addEventListener('pointerup',function(e){if(!ts)return;var dx=e.clientX-ts[0],dy=e.clientY-ts[1];ts=null;
  if(Math.max(Math.abs(dx),Math.abs(dy))<18)return;
  if(Math.abs(dx)>Math.abs(dy))turn(dx>0?1:-1,0);else turn(0,dy>0?1:-1);});
reset();
})();
</script>
</body>
</html>`;

/* ---------- jogo 2: tijolão ---------- */

var GAME_TIJOLAO = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
html,body{margin:0;height:100%;overflow:hidden;background:#141838;color:#eef0ff;font-family:"Trebuchet MS",system-ui,sans-serif}
.wrap{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:12px;box-sizing:border-box}
.hud{display:flex;gap:20px;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase}
.hud b{color:#ffd166}
canvas{background:#1c2148;border:3px solid #5dd9ff;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.4);max-width:min(96vw,90vh);max-height:70vh;touch-action:none;cursor:none}
.tip{font-size:12px;opacity:.65}
</style>
</head>
<body>
<div class="wrap">
  <div class="hud"><span>❤️ Vidas <b id="lv">3</b></span><span>⭐ Pontos <b id="pt">0</b></span></div>
  <canvas id="cv" width="480" height="360"></canvas>
  <div class="tip">Mouse, dedo ou setas ← → · clique/toque para lançar a bola</div>
</div>
<script>
(function(){
var cv=document.getElementById('cv'),cx=cv.getContext('2d');
var W=cv.width,H=cv.height;
var COLS=8,ROWS=5,GAP=6,TOP=44,BH=18;
var BW=(W-GAP*(COLS+1))/COLS;
var COLORS=['#ff5d8f','#ffb703','#aef04c','#5dd9ff','#c792ff'];
var bricks,pad,ball,lives,score,state,keys={};
var lv=document.getElementById('lv'),pt=document.getElementById('pt');
function build(){bricks=[];for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++)bricks.push({x:GAP+c*(BW+GAP),y:TOP+r*(BH+GAP),a:true,c:COLORS[r]});}
function serve(){ball={x:W/2,y:H-70,r:7,vx:(Math.random()<.5?-1:1)*3.3,vy:-3.9};}
function reset(){build();pad={w:88,h:13,x:(W-88)/2};lives=3;score=0;lv.textContent=lives;pt.textContent=0;state='ready';serve();}
cv.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();
  pad.x=Math.max(0,Math.min(W-pad.w,(e.clientX-r.left)*(W/r.width)-pad.w/2));});
cv.addEventListener('pointerdown',function(){
  if(state==='ready'){state='play';}
  else if(state==='over'||state==='win'){reset();state='play';}});
window.addEventListener('keydown',function(e){
  if(e.key==='ArrowLeft'){keys.l=1;e.preventDefault();}
  if(e.key==='ArrowRight'){keys.r=1;e.preventDefault();}
  if(e.key===' '&&state!=='play'){if(state==='over'||state==='win')reset();state='play';e.preventDefault();}});
window.addEventListener('keyup',function(e){
  if(e.key==='ArrowLeft')keys.l=0;
  if(e.key==='ArrowRight')keys.r=0;});
function loop(){
  if(state==='play'){
    if(keys.l)pad.x=Math.max(0,pad.x-7);
    if(keys.r)pad.x=Math.min(W-pad.w,pad.x+7);
    ball.x+=ball.vx;ball.y+=ball.vy;
    if(ball.x<ball.r){ball.x=ball.r;ball.vx*=-1;}
    if(ball.x>W-ball.r){ball.x=W-ball.r;ball.vx*=-1;}
    if(ball.y<ball.r){ball.y=ball.r;ball.vy*=-1;}
    if(ball.vy>0&&ball.y+ball.r>=H-28&&ball.y+ball.r<=H-10&&ball.x>=pad.x-ball.r&&ball.x<=pad.x+pad.w+ball.r){
      var hit=(ball.x-(pad.x+pad.w/2))/(pad.w/2);
      ball.vy=-Math.abs(ball.vy);ball.vx=hit*4.6;}
    if(ball.y>H+24){lives--;lv.textContent=lives;
      if(lives<=0)state='over';else{state='ready';serve();}}
    for(var i=0;i<bricks.length;i++){var b=bricks[i];if(!b.a)continue;
      if(ball.x+ball.r>b.x&&ball.x-ball.r<b.x+BW&&ball.y+ball.r>b.y&&ball.y-ball.r<b.y+BH){
        b.a=false;score++;pt.textContent=score;
        var ox=Math.min(ball.x+ball.r-b.x,b.x+BW-(ball.x-ball.r));
        var oy=Math.min(ball.y+ball.r-b.y,b.y+BH-(ball.y-ball.r));
        if(ox<oy)ball.vx*=-1;else ball.vy*=-1;
        break;}}
    if(bricks.every(function(b){return !b.a;}))state='win';
  }
  cx.fillStyle='#1c2148';cx.fillRect(0,0,W,H);
  for(var k=0;k<bricks.length;k++){var bb=bricks[k];if(!bb.a)continue;
    cx.fillStyle=bb.c;cx.fillRect(bb.x,bb.y,BW,BH);}
  cx.fillStyle='#fff6ea';
  cx.fillRect(pad.x,H-26,pad.w,pad.h);
  cx.beginPath();cx.arc(ball.x,ball.y,ball.r,0,7);cx.fill();
  cx.textAlign='center';
  if(state==='ready'){cx.font='bold 20px "Trebuchet MS",sans-serif';cx.fillStyle='#fff6ea';
    cx.fillText('Clique ou toque para lançar!',W/2,H/2+30);}
  if(state==='over'){cx.font='bold 30px "Trebuchet MS",sans-serif';cx.fillStyle='#ff5d8f';
    cx.fillText('FIM DE JOGO',W/2,H/2);
    cx.font='bold 16px "Trebuchet MS",sans-serif';cx.fillStyle='#fff6ea';
    cx.fillText('Pontos: '+score+' — clique para tentar de novo',W/2,H/2+30);}
  if(state==='win'){cx.font='bold 30px "Trebuchet MS",sans-serif';cx.fillStyle='#aef04c';
    cx.fillText('VOCÊ DERRUBOU TUDO! 🎉',W/2,H/2);
    cx.font='bold 16px "Trebuchet MS",sans-serif';cx.fillStyle='#fff6ea';
    cx.fillText('Pontos: '+score+' — clique para jogar de novo',W/2,H/2+30);}
  requestAnimationFrame(loop);
}
reset();requestAnimationFrame(loop);
})();
</script>
</body>
</html>`;

/* ---------- jogo 3: memória ---------- */

var GAME_MEMORIA = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
html,body{margin:0;min-height:100%;background:#ff6b6b;color:#5c1a2e;font-family:"Trebuchet MS",system-ui,sans-serif}
body{display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}
.wrap{display:flex;flex-direction:column;align-items:center;gap:14px}
.hud{display:flex;gap:22px;font-weight:700;font-size:15px;letter-spacing:.06em;text-transform:uppercase;color:#fff6ea}
.grid{display:grid;grid-template-columns:repeat(4,minmax(54px,84px));gap:10px}
.card{aspect-ratio:1;perspective:600px;cursor:pointer;border:0;background:none;padding:0}
.inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .38s cubic-bezier(.22,1,.36,1)}
.card.flip .inner{transform:rotateY(180deg)}
.face{position:absolute;inset:0;display:grid;place-items:center;border-radius:12px;backface-visibility:hidden;border:3px solid #5c1a2e;font-size:clamp(22px,6vw,34px);font-weight:800}
.front{background:#5c1a2e;color:#ff9db1}
.back{background:#fff6ea;transform:rotateY(180deg)}
.card.ok .back{background:#c9f27e}
.win{font-weight:800;font-size:16px;color:#fff6ea;min-height:24px;text-align:center}
button{font:inherit;font-weight:800;font-size:14px;background:#fff6ea;color:#5c1a2e;border:3px solid #5c1a2e;border-radius:10px;padding:9px 18px;cursor:pointer}
</style>
</head>
<body>
<div class="wrap">
  <div class="hud"><span>🎯 Jogadas <b id="mv">0</b></span><span>⏱️ Tempo <b id="tm">0s</b></span></div>
  <div class="grid" id="grid"></div>
  <div class="win" id="win"></div>
  <button id="btn">Embaralhar de novo ↻</button>
</div>
<script>
(function(){
var EMO=['🍒','👾','🚀','🎲','🍕','🎧','🌵','⚡'];
var grid=document.getElementById('grid'),mv=document.getElementById('mv'),tm=document.getElementById('tm'),winEl=document.getElementById('win'),btn=document.getElementById('btn');
var first=null,lock=false,moves=0,matched=0,t0=0,tk=null;
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=(Math.random()*(i+1))|0;var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function newGame(){
  grid.innerHTML='';first=null;lock=false;moves=0;matched=0;t0=0;mv.textContent='0';winEl.textContent='';tm.textContent='0s';
  if(tk){clearInterval(tk);tk=null;}
  var deck=shuffle(EMO.concat(EMO));
  deck.forEach(function(em){
    var b=document.createElement('button');b.className='card';b.dataset.v=em;
    b.setAttribute('aria-label','Carta virada para baixo');
    b.innerHTML='<span class="inner"><span class="face front">?</span><span class="face back">'+em+'</span></span>';
    b.addEventListener('click',function(){flip(b);});
    grid.appendChild(b);
  });
}
function tick(){tm.textContent=((Date.now()-t0)/1000|0)+'s';}
function flip(b){
  if(lock||b.classList.contains('flip'))return;
  if(!t0){t0=Date.now();tk=setInterval(tick,250);}
  b.classList.add('flip');
  if(!first){first=b;return;}
  moves++;mv.textContent=moves;
  if(first.dataset.v===b.dataset.v){
    first.classList.add('ok');b.classList.add('ok');first=null;matched+=2;
    if(matched===16){clearInterval(tk);winEl.textContent='🎉 Venceu em '+moves+' jogadas e '+tm.textContent+'!';}
  }else{
    lock=true;var a=first;first=null;
    setTimeout(function(){a.classList.remove('flip');b.classList.remove('flip');lock=false;},750);
  }
}
btn.addEventListener('click',newGame);
newGame();
})();
</script>
</body>
</html>`;

/* ---------- jogo 4: jokenpô ---------- */

var GAME_JOKENPO = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
html,body{margin:0;min-height:100%;background:#ffb703;color:#5c3a00;font-family:"Trebuchet MS",system-ui,sans-serif}
body{display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}
.wrap{display:flex;flex-direction:column;align-items:center;gap:18px;max-width:460px;width:100%}
h1{margin:0;font-size:clamp(24px,5vw,34px);letter-spacing:.02em;text-align:center}
.arena{display:flex;align-items:center;justify-content:center;gap:clamp(14px,5vw,34px);width:100%}
.hand{display:flex;flex-direction:column;align-items:center;gap:8px}
.palm{width:clamp(84px,24vw,120px);height:clamp(84px,24vw,120px);display:grid;place-items:center;font-size:clamp(44px,13vw,64px);background:#fff3d6;border:4px solid #5c3a00;border-radius:24px}
.hand span{font-weight:800;font-size:13px;letter-spacing:.1em;text-transform:uppercase}
.vs{font-weight:800;font-size:20px}
.shake .palm{animation:shake .3s ease-in-out 3}
@keyframes shake{50%{transform:translateY(-16px) rotate(-8deg)}}
.result{min-height:30px;font-size:19px;font-weight:800;text-align:center}
.picks{display:flex;gap:12px}
.picks button{font-size:34px;width:74px;height:74px;background:#fff3d6;border:4px solid #5c3a00;border-radius:18px;cursor:pointer;transition:transform .12s}
.picks button:hover{transform:translateY(-4px)}
.placar{font-weight:800;background:#5c3a00;color:#ffd166;padding:8px 18px;border-radius:999px;font-size:15px}
</style>
</head>
<body>
<div class="wrap">
  <h1>PEDRA, PAPEL E TESOURA</h1>
  <div class="arena">
    <div class="hand" id="hv"><div class="palm" id="pv">✊</div><span>Você</span></div>
    <div class="vs">VS</div>
    <div class="hand" id="hm"><div class="palm" id="pm">✊</div><span>Máquina</span></div>
  </div>
  <div class="result" id="res">Escolha sua arma 👇</div>
  <div class="picks">
    <button data-k="0" aria-label="Pedra">✊</button>
    <button data-k="1" aria-label="Papel">✋</button>
    <button data-k="2" aria-label="Tesoura">✌️</button>
  </div>
  <div class="placar" id="pl">Você 0 × 0 Máquina</div>
</div>
<script>
(function(){
var OPTS=[{n:'Pedra',e:'✊'},{n:'Papel',e:'✋'},{n:'Tesoura',e:'✌️'}];
var pv=document.getElementById('pv'),pm=document.getElementById('pm');
var res=document.getElementById('res'),pl=document.getElementById('pl');
var hv=document.getElementById('hv'),hm=document.getElementById('hm');
var you=0,cpu=0,busy=false;
function winOf(a,b){return (a===0&&b===2)||(a===1&&b===0)||(a===2&&b===1);}
document.querySelectorAll('.picks button').forEach(function(b){
  b.addEventListener('click',function(){
    if(busy)return;busy=true;
    var y=+b.dataset.k,m=(Math.random()*3)|0;
    res.textContent='Pedra… papel… tesoura!';
    pv.textContent='✊';pm.textContent='✊';
    hv.classList.add('shake');hm.classList.add('shake');
    setTimeout(function(){
      hv.classList.remove('shake');hm.classList.remove('shake');
      pv.textContent=OPTS[y].e;pm.textContent=OPTS[m].e;
      if(y===m){res.textContent='🤝 Empate! De novo.';}
      else if(winOf(y,m)){you++;res.textContent='🎉 '+OPTS[y].n+' vence! Ponto seu.';}
      else{cpu++;res.textContent='🤖 '+OPTS[m].n+' da máquina… dessa vez foi ela.';}
      pl.textContent='Você '+you+' × '+cpu+' Máquina';
      busy=false;
    },950);
  });
});
})();
</script>
</body>
</html>`;

/* ---------- catálogo embutido ---------- */

var BUILTIN_GAMES = [
  {
    id: 'g-cobrinha',
    title: 'Cobrinha Neon',
    author: 'Estúdio Gameleira',
    cat: 'Arcade',
    desc: 'A clássica cobrinha com fome de maçãs. Não bate em você mesma!',
    howto: 'Deslize o dedo no tabuleiro (ou use setas/WASD) para virar. Coma as maçãs para crescer e ganhar pontos — bater na parede ou em você mesma encerra a partida.',
    cover: COVER_COBRINHA,
    html: GAME_COBRINHA,
    createdAt: Date.UTC(2026, 8, 8),
    builtin: true,
    mobile: true
  },
  {
    id: 'g-tijolao',
    title: 'Tijolão',
    author: 'Estúdio Gameleira',
    cat: 'Ação',
    desc: 'Quebre todos os blocos com a bolinha. Mira fina, reflexo rápido.',
    howto: 'Arraste o dedo (ou mova o mouse / use ← →) para controlar a raquete. Toque ou clique para lançar a bola. Você tem 3 vidas — derrube todos os tijolos para vencer.',
    cover: COVER_TIJOLAO,
    html: GAME_TIJOLAO,
    createdAt: Date.UTC(2026, 8, 11),
    builtin: true,
    mobile: true
  },
  {
    id: 'g-memoria',
    title: 'Memória Turbo',
    author: 'Estúdio Gameleira',
    cat: 'Puzzle',
    desc: '16 cartas, 8 pares. Ache tudo no menor tempo possível.',
    howto: 'Toque em duas cartas por vez para virá-las. Se formarem par, ficam abertas; se não, viram de novo. Ache os 8 pares com o mínimo de jogadas e de tempo.',
    cover: COVER_MEMORIA,
    html: GAME_MEMORIA,
    createdAt: Date.UTC(2026, 8, 14),
    builtin: true,
    mobile: true
  },
  {
    id: 'g-jokenpo',
    title: 'Jokenpô Relâmpago',
    author: 'Estúdio Gameleira',
    cat: 'Retrô',
    desc: 'Pedra, papel e tesoura contra uma máquina convencida.',
    howto: 'Toque em ✊, ✋ ou ✌️ para escolher sua jogada. Pedra quebra tesoura, tesoura corta papel e papel embrulha pedra. Empate não pontua pra ninguém.',
    cover: COVER_JOKENPO,
    html: GAME_JOKENPO,
    createdAt: Date.UTC(2026, 8, 16),
    builtin: true,
    mobile: true
  }
];
