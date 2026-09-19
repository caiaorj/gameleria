# 🕹️ Gameleira

> Plante seu jogo, colhe plays. — o fliperama comunitário de jogos HTML.

Portal onde qualquer pessoa publica jogos em HTML: capa em grade + título, player em tela cheia, curtidas, contagem de partidas e publicação sem fricção (arquivo `.html` ou código colado).

![status](https://img.shields.io/badge/feito%20com-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-ff6b6b) ![zero build](https://img.shields.io/badge/build-zero-b7ee4f)

## Rodando localmente

É um site estático, sem build. Qualquer servidor funciona:

```bash
python3 -m http.server 8080
# ou: npx serve
```

E abrir `http://localhost:8080`.

## Estrutura

```
├── index.html    → estrutura: topbar, ticker, hero, grade, drawer de publicação, stage do jogador
├── styles.css    → design system (tokens OKLCH, componentes, responsivo, reduced-motion)
├── games.js      → 4 jogos embutidos jogáveis (Cobrinha, Tijolão, Memória, Jokenpô) + capas SVG
├── app.js        → estado, grade, busca, publicação, player, interstitial de anúncios
├── 404.html      → página de erro estilo "GAME OVER" de fliperama
├── robots.txt    → permissão total para crawlers + caminho do sitemap
├── sitemap.xml   → mapa do site para o Google
├── og-image.png  → imagem de compartilhamento (WhatsApp/redes/Google)
├── apple-touch-icon.png → ícone iOS
└── DESIGN.md     → brainstorm e design system (princípios aplicados)
```

## Como publicar um jogo

1. Botão **+ Publicar jogo** (abre o drawer lateral)
2. Título, autor, categoria, descrição
3. Capa: upload de imagem **ou** capa automática com emoji
4. Jogo: arquivo `.html` (drag-and-drop) ou código colado
5. O jogo roda isolado em `<iframe sandbox>` e fica salvo no navegador (localStorage)

> Para publicação compartilhada entre todos os visitantes, trocar `load()/save()` do `app.js` por uma API/banco (ex.: Supabase).

## Anúncios (interstitial)

A cada 3 partidas aparece uma tela de anúncio antes do jogo. Ajustes no topo da seção no `app.js`:

| Constante | Função | Padrão |
|---|---|---|
| `AD_EVERY` | anúncio a cada N partidas | 3 |
| `AD_MIN_GAP` | intervalo mínimo entre anúncios | 2 min |
| `AD_SECONDS` | duração da contagem | 5s |

Cole o código da sua rede de anúncios no bloco `#ads-slot` do `index.html` (marcado com 💰).

## Licença

Feito pela comunidade. Use, modifique, publique seus jogos.
