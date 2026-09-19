/* ════════════════════════════════════════════════════════════
   GAMELEIRA — lógica do fliperama
   estado · grade · busca · drawer de publicação · stage de jogo
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ---------- constantes ---------- */
  var LS_KEY = 'gameleira:v1';
  var MAX_GAME = 3 * 1024 * 1024; // 3 MB
  var CATS = [
    { id: 'Arcade',     bg: '#b7ee4f', ink: '#1d3a05' },
    { id: 'Ação',       bg: '#ff6b6b', ink: '#fff3ea' },
    { id: 'Puzzle',     bg: '#6fd7f7', ink: '#093049' },
    { id: 'Esporte',    bg: '#ffc94d', ink: '#4a3202' },
    { id: 'Estratégia', bg: '#a58bff', ink: '#f4efff' },
    { id: 'Retrô',      bg: '#ff8fce', ink: '#54102f' },
    { id: 'Outros',     bg: '#3a3560', ink: '#f4f1ea' }
  ];
  var CAT_MAP = {};
  CATS.forEach(function (c) { CAT_MAP[c.id] = c; });
  var EMOJIS = ['👾', '🚀', '🐍', '🏀', '🧩', '🎲', '⚔️', '🍕', '🛸', '🐙'];

  /* ---------- estado ---------- */
  var db = load();
  var liked = new Set(db.liked || []);
  var state = { cat: 'Todos', q: '', sort: 'recentes', mobileOnly: false };
  var stageId = null;
  var publishOpen = false;

  // formulário de publicação
  var coverImage = null;   // dataURL enviada pelo usuário
  var gameSrc = 'file';    // 'file' | 'code'
  var gameFileText = null;
  var emoji = '👾';

  /* ---------- persistência ---------- */
  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(LS_KEY));
      if (d && Array.isArray(d.user)) {
        if (!d.meta || typeof d.meta !== 'object') d.meta = {};
        return d;
      }
    } catch (e) { /* primeiro acesso */ }
    return { user: [], meta: {}, liked: [] };
  }
  function save() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ user: db.user, meta: db.meta, liked: Array.from(liked) }));
    } catch (e) {
      toast('⚠️ Espaço do navegador cheio — tente uma capa menor.');
    }
  }

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function xmlEsc(s) {
    return String(s).replace(/[<>&"']/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c];
    });
  }
  function fmt(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + ' mil';
    return String(n);
  }
  function hashStr(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }
  function metaOf(id) {
    if (!db.meta[id]) db.meta[id] = { plays: 0, likes: 0 };
    return db.meta[id];
  }
  function allGames() { return BUILTIN_GAMES.concat(db.user); }
  function byId(id) {
    return allGames().filter(function (g) { return g.id === id; })[0];
  }
  function toastEl() { return $('#toast'); }
  var toastTimer = null;
  function toast(msg) {
    var t = toastEl();
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2800);
  }

  /* ---------- capa automática ---------- */
  function autoCover() {
    var title = ($('#p-title').value.trim() || 'SEM TÍTULO').toUpperCase().slice(0, 16);
    var P = [
      ['#ff6b6b', '#ffb703'], ['#5dd9ff', '#8f7bff'], ['#b7ee4f', '#22c39a'],
      ['#ffc94d', '#ff7ac3'], ['#a58bff', '#ff6b6b'], ['#22c39a', '#5dd9ff']
    ];
    var pair = P[hashStr(title + emoji) % P.length];
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360' viewBox='0 0 480 360'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='" + pair[0] + "'/><stop offset='1' stop-color='" + pair[1] + "'/>" +
      "</linearGradient></defs>" +
      "<rect width='480' height='360' fill='url(#g)'/>" +
      "<circle cx='416' cy='58' r='84' fill='#fff6ea' opacity='.16'/>" +
      "<circle cx='48' cy='322' r='64' fill='#1d1b2e' opacity='.12'/>" +
      "<text x='240' y='176' font-size='112' text-anchor='middle'>" + emoji + "</text>" +
      "<rect x='40' y='240' width='400' height='66' rx='14' fill='#1d1b2e' opacity='.85'/>" +
      "<text x='240' y='283' font-family='Arial,Helvetica,sans-serif' font-size='28' font-weight='bold' fill='#fff6ea' text-anchor='middle'>" + xmlEsc(title) + "</text>" +
      "</svg>";
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function updateCoverPreview() {
    $('#cover-preview').src = coverImage || autoCover();
  }

  /* ---------- render: chips ---------- */
  function renderChips() {
    var chips = $('#chips');
    chips.innerHTML = '';
    var games = allGames();
    // se a categoria filtrada ficou vazia (ex.: jogo removido), volta para "Todos"
    if (state.cat !== 'Todos' && !games.some(function (g) { return g.cat === state.cat; })) {
      state.cat = 'Todos';
    }
    ['Todos'].concat(CATS.map(function (c) { return c.id; })).forEach(function (c) {
      var n = c === 'Todos' ? games.length : games.filter(function (g) { return g.cat === c; }).length;
      if (c !== 'Todos' && n === 0) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (state.cat === c ? ' on' : '');
      b.innerHTML = esc(c) + '<span class="n">' + n + '</span>';
      b.addEventListener('click', function () {
        state.cat = c;
        renderChips();
        renderGrid();
      });
      chips.appendChild(b);
    });
  }

  /* ---------- render: grade ---------- */
  function cardEl(g, i) {
    var m = metaOf(g.id);
    var cat = CAT_MAP[g.cat] || CAT_MAP['Outros'];
    var el = document.createElement('article');
    el.className = 'card';
    el.style.setProperty('--i', Math.min(i, 10));
    el.style.setProperty('--acc', cat.bg);
    el.innerHTML =
      '<button class="cover" data-play="' + g.id + '" aria-label="Jogar ' + esc(g.title) + '">' +
        '<img src="' + g.cover + '" alt="">' +
        '<span class="cat-tag" style="background:' + cat.bg + ';color:' + cat.ink + '">' + esc(g.cat) + '</span>' +
        (g.mobile === true ? '<span class="mob-tag" title="Funciona no celular">📱</span>' : '') +
        '<span class="play-pill">▶ JOGAR</span>' +
      '</button>' +
      '<div class="meta">' +
        '<h3>' + esc(g.title) + '</h3>' +
        '<p class="author">por ' + esc(g.author) + '</p>' +
        '<div class="foot">' +
          '<span class="plays">🎮 ' + fmt(m.plays) + '</span>' +
          '<button class="like' + (liked.has(g.id) ? ' on' : '') + '" data-like="' + g.id + '" aria-label="Curtir ' + esc(g.title) + '">♥ ' + fmt(m.likes) + '</button>' +
          (g.builtin ? '' : '<button class="del" data-del="' + g.id + '">remover</button>') +
        '</div>' +
      '</div>';
    return el;
  }

  function renderGrid() {
    var grid = $('#grade');
    var list = allGames().filter(function (g) {
      return state.cat === 'Todos' || g.cat === state.cat;
    });
    if (state.mobileOnly) {
      list = list.filter(function (g) { return g.mobile !== false; });
    }
    if (state.q) {
      var q = state.q.toLowerCase();
      list = list.filter(function (g) {
        return (g.title + ' ' + g.author + ' ' + g.cat + ' ' + (g.desc || '')).toLowerCase().indexOf(q) !== -1;
      });
    }
    var s = state.sort;
    list.sort(function (a, b) {
      if (s === 'plays') return metaOf(b.id).plays - metaOf(a.id).plays;
      if (s === 'likes') return metaOf(b.id).likes - metaOf(a.id).likes;
      if (s === 'az') return a.title.localeCompare(b.title, 'pt-BR');
      return b.createdAt - a.createdAt;
    });
    grid.innerHTML = '';
    $('#empty').hidden = list.length > 0;
    list.forEach(function (g, i) { grid.appendChild(cardEl(g, i)); });
    $('#count').textContent = list.length + (list.length === 1 ? ' jogo na grade' : ' jogos na grade');
  }

  function renderStats() {
    var games = allGames(), plays = 0, likes = 0;
    games.forEach(function (g) {
      var m = metaOf(g.id);
      plays += m.plays;
      likes += m.likes;
    });
    $('#stat-games').textContent = games.length;
    $('#stat-plays').textContent = fmt(plays);
    $('#stat-likes').textContent = fmt(likes);
  }

  /* ---------- curtir / remover ---------- */
  function toggleLike(id) {
    var m = metaOf(id);
    if (liked.has(id)) { liked.delete(id); m.likes = Math.max(0, m.likes - 1); }
    else { liked.add(id); m.likes++; }
    save();
    $$('[data-like="' + id + '"]').forEach(function (b) {
      b.classList.toggle('on', liked.has(id));
      b.textContent = '♥ ' + fmt(m.likes);
    });
    renderStats();
    syncStageLike();
  }

  function removeGame(id) {
    var g = byId(id);
    if (!g || g.builtin) return;
    if (!confirm('Remover "' + g.title + '" da grade? Isso não tem volta.')) return;
    db.user = db.user.filter(function (x) { return x.id !== id; });
    delete db.meta[id];
    liked.delete(id);
    save();
    renderChips();
    renderGrid();
    renderStats();
    toast('🗑️ Jogo removido da grade.');
  }

  $('#grade').addEventListener('click', function (e) {
    var play = e.target.closest('[data-play]');
    if (play) { requestPlay(play.dataset.play); return; }
    var like = e.target.closest('[data-like]');
    if (like) { toggleLike(like.dataset.like); return; }
    var del = e.target.closest('[data-del]');
    if (del) { removeGame(del.dataset.del); }
  });

  /* ---------- interstitial (anúncio antes do jogo) ----------
     💰 Ajuste fino aqui embaixo:
     AD_EVERY   → anúncio a cada N partidas
     AD_MIN_GAP → intervalo mínimo entre anúncios
     AD_SECONDS → duração da contagem regressiva                    */
  var AD_EVERY = 3;
  var AD_MIN_GAP = 2 * 60 * 1000;
  var AD_SECONDS = 5;

  var adState = loadAdState();
  var pendingGame = null;
  var adTimerInt = null;

  function loadAdState() {
    try { return JSON.parse(localStorage.getItem('gameleira:ads')) || { count: 0, last: 0 }; }
    catch (e) { return { count: 0, last: 0 }; }
  }
  function saveAdState() {
    try { localStorage.setItem('gameleira:ads', JSON.stringify(adState)); } catch (e) {}
  }
  function adFree() {
    // VIP sem anúncios: troque para → return localStorage.getItem('gameleira:vip') === '1'
    return false;
  }

  function requestPlay(id) {
    adState.count++;
    var due = adState.count >= AD_EVERY && (Date.now() - adState.last > AD_MIN_GAP);
    if (adFree() || !due) { saveAdState(); openStage(id); return; }
    adState.count = 0;
    adState.last = Date.now();
    saveAdState();
    pendingGame = id;
    showInterstitial();
  }

  function showInterstitial() {
    $('#interstitial').classList.add('open');
    document.body.classList.add('locked');
    var secs = AD_SECONDS;
    var cd = $('#ads-countdown'), skip = $('#ads-skip'), bar = $('#ads-timer-bar');
    skip.disabled = true;
    skip.textContent = 'Aguarde ' + secs + 's…';
    cd.textContent = 'Seu jogo abre em ' + secs + ' segundos';
    // reinicia a barra de progresso
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = '';
    clearInterval(adTimerInt);
    adTimerInt = setInterval(function () {
      secs--;
      if (secs <= 0) {
        clearInterval(adTimerInt);
        cd.textContent = 'Pronto! Bora jogar 🎮';
        skip.disabled = false;
        skip.textContent = '▶ JOGAR AGORA';
        skip.focus();
      } else {
        cd.textContent = 'Seu jogo abre em ' + secs + ' segundos';
        skip.textContent = 'Aguarde ' + secs + 's…';
      }
    }, 1000);
  }

  function finishInterstitial() {
    clearInterval(adTimerInt);
    $('#interstitial').classList.remove('open');
    document.body.classList.remove('locked');
    var id = pendingGame;
    pendingGame = null;
    if (id) openStage(id);
  }

  function cancelInterstitial() {
    // usuário desistiu (Esc) → volta para a grade sem abrir o jogo
    clearInterval(adTimerInt);
    $('#interstitial').classList.remove('open');
    document.body.classList.remove('locked');
    pendingGame = null;
  }

  $('#ads-skip').addEventListener('click', function () {
    if (!this.disabled) finishInterstitial();
  });

  /* ---------- stage (jogador) ---------- */
  function openStage(id) {
    var g = byId(id);
    if (!g) return;
    stageId = id;
    var m = metaOf(id);
    m.plays++;
    save();
    $('#stage-name').textContent = g.title;
    $('#stage-author').textContent = 'por ' + g.author + ' · ' + g.cat;
    syncStageLike();
    $('#stage-frame').srcdoc = g.html;
    $('#stage').classList.add('open');
    document.body.classList.add('locked');
    $('#stage-back').focus();
    // atualiza plays do card sem re-renderizar tudo
    var cover = document.querySelector('[data-play="' + id + '"]');
    if (cover) {
      var card = cover.closest('.card');
      var p = card && card.querySelector('.plays');
      if (p) p.textContent = '🎮 ' + fmt(m.plays);
    }
    renderStats();
  }

  function closeStage() {
    if (!stageId) return;
    stageId = null;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(function () {});
    }
    var f = $('#stage-frame');
    f.removeAttribute('srcdoc');
    f.src = 'about:blank';
    $('#stage').classList.remove('open');
    document.body.classList.remove('locked');
  }

  function syncStageLike() {
    if (!stageId) return;
    var b = $('#stage-like');
    b.classList.toggle('on', liked.has(stageId));
    $('#stage-likes').textContent = fmt(metaOf(stageId).likes);
  }

  $('#stage-back').addEventListener('click', closeStage);
  $('#stage-like').addEventListener('click', function () { if (stageId) toggleLike(stageId); });
  $('#stage-full').addEventListener('click', function () {
    var w = $('#frame-wrap');
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (w.requestFullscreen) w.requestFullscreen();
    else if (w.webkitRequestFullscreen) w.webkitRequestFullscreen();
  });

  /* ---------- drawer de publicação ---------- */
  var overlay = $('#overlay'), drawer = $('#drawer');

  function openDrawer() {
    publishOpen = true;
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.classList.add('locked');
    setTimeout(function () { $('#p-title').focus(); }, 160);
  }
  function closeDrawer() {
    publishOpen = false;
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    if (!$('#stage').classList.contains('open')) document.body.classList.remove('locked');
  }
  $$('[data-open-publish]').forEach(function (b) { b.addEventListener('click', openDrawer); });
  $$('[data-close-publish]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($('#interstitial').classList.contains('open')) cancelInterstitial();
      else if ($('#stage').classList.contains('open')) closeStage();
      else if (publishOpen) closeDrawer();
    }
  });

  /* --- seletor de emoji da capa automática --- */
  var emojiRow = $('#emoji-row');
  EMOJIS.forEach(function (em) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'emoji-btn' + (em === emoji ? ' on' : '');
    b.textContent = em;
    b.setAttribute('aria-label', 'Emoji ' + em);
    b.addEventListener('click', function () {
      emoji = em;
      $$('#emoji-row .emoji-btn').forEach(function (x) { x.classList.toggle('on', x === b); });
      updateCoverPreview();
    });
    emojiRow.appendChild(b);
  });

  $('#p-title').addEventListener('input', function () {
    if (!coverImage) updateCoverPreview();
  });

  /* --- upload de capa --- */
  $('#btn-cover-upload').addEventListener('click', function () { $('#p-cover-file').click(); });
  $('#btn-cover-auto').addEventListener('click', function () {
    coverImage = null;
    $('#cover-mode-hint').textContent = 'Sem imagem? A capa sai automática, com emoji e título:';
    updateCoverPreview();
  });
  $('#p-cover-file').addEventListener('change', function (e) {
    var f = e.target.files[0];
    if (!f) return;
    if (!f.type.match(/^image\//)) { toast('⚠️ A capa precisa ser uma imagem.'); return; }
    shrinkImage(f, 512, 384).then(function (url) {
      coverImage = url;
      updateCoverPreview();
      $('#cover-mode-hint').textContent = 'Capa personalizada no ar. Quer trocar? É só enviar outra.';
      toast('🖼️ Capa carregada!');
    }).catch(function () { toast('⚠️ Não consegui ler essa imagem.'); });
  });

  function shrinkImage(file, w, h) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () {
        var img = new Image();
        img.onload = function () {
          var cv = document.createElement('canvas');
          cv.width = w; cv.height = h;
          var cx = cv.getContext('2d');
          var scale = Math.max(w / img.width, h / img.height);
          var sw = w / scale, sh = h / scale;
          cx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, w, h);
          res(cv.toDataURL('image/jpeg', .85));
        };
        img.onerror = rej;
        img.src = fr.result;
      };
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  /* --- origem do jogo: arquivo ou código --- */
  $$('#src-seg button').forEach(function (b) {
    b.addEventListener('click', function () {
      gameSrc = b.dataset.src;
      $$('#src-seg button').forEach(function (x) { x.classList.toggle('on', x === b); });
      $('#src-file').hidden = gameSrc !== 'file';
      $('#src-code').hidden = gameSrc !== 'code';
    });
  });

  var dz = $('#dropzone'), gf = $('#p-game-file');
  dz.addEventListener('click', function () { gf.click(); });
  dz.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); gf.click(); }
  });
  ['dragover', 'dragenter'].forEach(function (ev) {
    dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.add('drag'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.remove('drag'); });
  });
  dz.addEventListener('drop', function (e) {
    var f = e.dataTransfer && e.dataTransfer.files[0];
    if (f) readGameFile(f);
  });
  gf.addEventListener('change', function () {
    if (gf.files[0]) readGameFile(gf.files[0]);
  });

  function readGameFile(f) {
    var okName = /\.(html?|txt)$/i.test(f.name) || String(f.type).indexOf('html') !== -1 || f.type === 'text/plain';
    if (!okName) { toast('⚠️ Manda um arquivo .html, por favor.'); return; }
    if (f.size > MAX_GAME) { toast('⚠️ Arquivo grande demais (máx. 3 MB).'); return; }
    var fr = new FileReader();
    fr.onload = function () {
      gameFileText = fr.result;
      $('#fname').textContent = '✅ ' + f.name;
      setGameError(false);
    };
    fr.readAsText(f);
  }

  /* --- validação + envio --- */
  function setInvalid(id, bad) { $('#' + id).classList.toggle('invalid', bad); }
  function setGameError(bad) { $('#f-game').classList.toggle('invalid', bad); }

  ['p-title', 'p-author'].forEach(function (id) {
    $('#' + id).addEventListener('input', function () {
      setInvalid(id === 'p-title' ? 'f-title' : 'f-author', false);
    });
  });
  $('#p-code').addEventListener('input', function () { setGameError(false); });

  $('#pub-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var title = $('#p-title').value.trim();
    var author = $('#p-author').value.trim();
    var ok = true;

    setInvalid('f-title', title.length < 2);
    setInvalid('f-author', !author);
    if (title.length < 2 || !author) ok = false;

    var gameHtml = gameSrc === 'file' ? gameFileText : $('#p-code').value.trim();
    var hasGame = !!gameHtml && gameHtml.length > 40;
    setGameError(!hasGame);
    if (!hasGame) ok = false;
    if (gameHtml && gameHtml.length > MAX_GAME) {
      toast('⚠️ Código grande demais (máx. 3 MB).');
      ok = false;
    }
    if (!ok) {
      var bad = $('.field.invalid');
      if (bad) bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var g = {
      id: 'u-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: title.slice(0, 40),
      author: author.slice(0, 30),
      cat: $('#p-cat').value,
      desc: $('#p-desc').value.trim().slice(0, 160),
      mobile: $('#p-mobile').checked,
      cover: coverImage || autoCover(),
      html: gameHtml,
      createdAt: Date.now(),
      builtin: false
    };
    db.user.push(g);
    metaOf(g.id);
    save();

    // volta para a visão geral onde o jogo novo aparece
    state.cat = 'Todos'; state.q = ''; state.sort = 'recentes';
    $('#q').value = ''; $('#sort').value = 'recentes';
    renderChips(); renderGrid(); renderStats();
    closeDrawer();
    resetForm();
    toast('🎉 "' + g.title + '" está no ar!');

    var cov = document.querySelector('[data-play="' + g.id + '"]');
    if (cov) {
      var card = cov.closest('.card');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('just-published');
      setTimeout(function () { card.classList.remove('just-published'); }, 2800);
    }
  });

  function resetForm() {
    $('#pub-form').reset();
    coverImage = null;
    gameFileText = null;
    emoji = '👾';
    gameSrc = 'file';
    $('#fname').textContent = '';
    $('#src-file').hidden = false;
    $('#src-code').hidden = true;
    $$('#src-seg button').forEach(function (x) { x.classList.toggle('on', x.dataset.src === 'file'); });
    $$('#emoji-row .emoji-btn').forEach(function (x, i) { x.classList.toggle('on', i === 0); });
    $('#cover-mode-hint').textContent = 'Sem imagem? A capa sai automática, com emoji e título:';
    $$('.field.invalid').forEach(function (f) { f.classList.remove('invalid'); });
    updateCoverPreview();
  }

  /* ---------- busca + ordenação ---------- */
  var qTimer = null;
  $('#q').addEventListener('input', function (e) {
    clearTimeout(qTimer);
    qTimer = setTimeout(function () {
      state.q = e.target.value.trim();
      renderGrid();
    }, 120);
  });
  $('#sort').addEventListener('change', function (e) {
    state.sort = e.target.value;
    renderGrid();
  });
  $('#filter-mobile').addEventListener('click', function () {
    state.mobileOnly = !state.mobileOnly;
    this.classList.toggle('on', state.mobileOnly);
    this.setAttribute('aria-pressed', String(state.mobileOnly));
    renderGrid();
  });

  /* ---------- hero: capas flutuantes ---------- */
  function heroArt() {
    var picks = [BUILTIN_GAMES[0], BUILTIN_GAMES[1], BUILTIN_GAMES[2]];
    ['art-1', 'art-2', 'art-3'].forEach(function (id, i) {
      var img = $('#' + id);
      if (img && picks[i]) img.src = picks[i].cover;
    });
  }

  /* ---------- boot ---------- */
  renderChips();
  renderGrid();
  renderStats();
  heroArt();
  updateCoverPreview();
})();
