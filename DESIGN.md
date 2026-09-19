# 🕹️ GAMELEIRA — Brainstorm & Design System

> "Plante seu jogo, colha plays." — um fliperama comunitário de jogos HTML.
> Site onde qualquer pessoa publica jogos em HTML com capa em grade + título (estilo Click Jogos), moderno e divertido.

---

## 1. O desafio

Uma vitrine de jogos HTML feita pela comunidade. Dois trabalhos principais:

1. **Grade de capas + título** — o coração do site. A capa é o cartaz do jogo; o título, o letreiro.
2. **Publicação sem fricção** — enviar HTML, montar capa, entrar na grade em ~1 minuto.

Público: gente que faz joguinhos em HTML/JS e quer um palco; gente que só quer jogar.

## 2. Brainstorm de conceito

| Ideia | Veredicto |
|---|---|
| Nome "ArcadeHub", "GamePortal" | Genérico, cara de template ❌ |
| Nome **GAMELEIRA** (game + gameleira, a árvore) | Brasileiro, memorável, rende metáfora de "plantar/colher" ✅ |
| Tema escuro com neon | Anti-padrão clássico de IA ("neon on dark") ❌ |
| **Tema claro, caixa de brinquedo / fliperama de bairro** | Distintivo, quente, divertido ✅ |
| Capas geradas por placeholder cinza | Triste. Capas automáticas com emoji + gradiente ✅ |

**A frase que lembra:** *"o fliperama de bairro que cabe no seu navegador".*

## 3. Direção estética (Impeccable: escolha um extremo e comprometa-se)

- **Propósito:** vitrine + publicação de jogos HTML da comunidade.
- **Tom:** *playful / toy-like* com pegada neo-brutalista suave — bordas grossas de tinta, sombras duras deslocadas, stickers tortos, letreiros. Nada de vidro fosco, nada de gradiente em texto.
- **Restrições:** site estático (roda em qualquer hospedagem), sem dependências de build, jogos rodam em `<iframe sandbox>`, persistência em `localStorage`.
- **Diferencial (a coisa inesquecível):** o site inteiro parece um fliperama de papelão pintado à mão — fita adesiva, carimbos, sombras duras — mas com acabamento de produto. Ticker de letreiro, stickers rotacionados, capas flutuantes no hero.

## 4. Tokens de design

### Cor (OKLCH, neutros tingidos de ameixa/creme — zero preto/branco puro)

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `oklch(96.5% .025 92)` | fundo creme quente |
| `--paper-2` | `oklch(93% .04 92)` | faixas alternadas |
| `--card` | `oklch(99% .012 92)` | superfície dos cards |
| `--ink` | `oklch(26% .06 298)` | "tinta" ameixa-azulada |
| `--ink-2` | `oklch(44% .05 298)` | texto secundário |
| `--tomato` | `oklch(63% .23 29)` | ação primária (publicar/jogar) |
| `--pink` | `oklch(67% .26 356)` | curtidas, destaques |
| `--lime` | `oklch(86% .23 132)` | ticker reverso, sucesso |
| `--cyan` | `oklch(80% .13 206)` | foco de teclado |
| `--amber` | `oklch(86% .16 86)` | stickers, segmentos |

Cada **categoria** tem cor de chip própria (Arcade=lima, Ação=tomate, Puzzle=ciano, Esporte=âmbar, Estratégia=violeta, Retrô=rosa, Outros=tinta) — a sombra dura do card assume a cor da categoria no hover, dando variedade à grade sem quebrar o sistema.

### Tipografia

- **Display:** `Bungee` (letreiro de fliperama — impossível confundir com template).
- **Corpo/UI:** `Space Grotesk` 400/500/700.
- Escala fluida com `clamp()` (h1: `clamp(2rem, 5.4vw, 4rem)`), poucos tamanhos, alto contraste.

### Forma & espaço

- Base 4px: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 72`; `gap` em vez de margins; respiro variado (hero apertado → catálogo folgado).
- Raios: `8 / 12 / 18px`. Borda-padrão: `2.5px solid ink`.
- **Sombra assinatura:** dura e deslocada — `4px 4px 0 ink` → hover `8px 8px 0 cor-da-categoria` (nada de `0 4px 6px rgba(0,0,0,.1)`).

### Movimento (só `transform`/`opacity`, easing quart-out)

| Momento | Duração |
|---|---|
| Feedback de botão | 120–130ms |
| Chips, likes, toggles | 150–180ms |
| Drawer de publicação | 340ms |
| Entrada dos cards (stagger 30ms/card) | 500ms |
| Ticker | 26s linear, pausa no hover |
| Capas flutuantes do hero | 6–8s alternate |

`prefers-reduced-motion: reduce` corta tudo. Zero bounce/elastic.

## 5. Componentes

- **Topbar sticky:** logo com badge torto, busca em pílula, um único botão primário ("Publicar jogo" — hierarquia: nem tudo é primário).
- **Ticker:** letreiro lime sobre tinta com frases do produto, loop infinito por duplicata + `translateX(-50%)`.
- **Hero assimétrico:** texto à esquerda (eyebrow → h1 com marca-texto torto → sub → CTAs → linha de estatísticas ao vivo), capas reais de jogos flutuando à direita + sticker circular "100% GRÁTIS".
- **Card de jogo:** capa 4:3 com tag de categoria e pílula "▶ JOGAR" que sobe no hover (sempre visível em touch), título, autor, plays e curtir. Hover: levanta, sombra cresce e ganha a cor da categoria.
- **Grade:** `repeat(auto-fill, minmax(195px,1fr))`, entrada em cascata.
- **Chips de categoria + ordenação** separados do título por divisória tracejada (ritmo, não cards dentro de cards).
- **Drawer de publicar** (não modal genérico): título/autor/categoria/descrição → capa (upload OU automática com emoji) → jogo (arquivo .html com dropzone OU colar código) → validação inline → toast + destaque pulsante no card recém-publicado.
- **Stage do jogador:** tomada de tela cheia com barra (voltar, título, curtir, tela cheia) e iframe `sandbox="allow-scripts"` — jogos publicados não tocam a origem do site.
- **Empty state que ensina:** "Nenhum jogo por aqui… ainda!" + CTA de publicar.

## 6. Checklist anti-slop aplicado

| Anti-padrão evitado | O que fizemos |
|---|---|
| Dark mode + neon por padrão | Tema claro quente, tinta ameixa |
| Fonte Inter/Roboto | Bungee + Space Grotesk |
| Texto com gradiente | Marca-texto sólido rotacionado |
| Glassmorphism | Zero blur; bordas e sombras duras |
| Sombras genéricas suaves | Sombras duras deslocadas, coloridas no hover |
| Grade de cards idênticos com ícone+titulo+texto | Cards de jogo são conteúdo real; seções "como funciona" usam lista numerada, não cards |
| Hero centralizado com métricas | Hero assimétrico; stats são uma frase ao vivo |
| Tudo botão primário | 1 primário, resto ghost/links |
| Modais para tudo | Drawer lateral + stage fullscreen |
| Animar layout | Só `transform`/`opacity` + `translate` |
| Bounce/elastic | Quart-out em tudo |
| Esconder função no mobile | Busca, publicar e jogar existem em qualquer tela |

## 7. Arquitetura

```
gameleira/
├── index.html    → estrutura semântica, drawer, stage, ticker
├── styles.css    → tokens OKLCH + todos os componentes
├── games.js      → 4 jogos embutidos jogáveis + capas SVG
├── app.js        → estado, grade, busca, drawer, stage, localStorage
└── DESIGN.md     → este documento
```

- Jogos publicados ficam em `localStorage` (capa redimensionada para 512×384, HTML até 3 MB).
- Jogos rodam em iframe **sandbox sem `allow-same-origin`** — código publicado não acessa o site.
- Caminho para produção multiusuário de verdade: trocar `load()/save()` por uma API (ex.: Supabase Storage para HTML/capas + Postgres para metadados, curtidas e contagens). A interface já está pronta para isso.
