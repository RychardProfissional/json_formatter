# json_formatter

Site estático com ferramentas de JSON (formatar, validar, minify, escape/unescape, JSON↔CSV, JSONL).

## Rodar localmente

```zsh
cd /home/fundacao-mt/Documents/repositories/personal/json_formatter
python3 -m http.server 8080
```

Abra:
- `http://localhost:8080/`

## Configurar monetização e analytics

Em cada página, ajuste `window.SITE_CONFIG`:
- `adsenseClient`: seu `ca-pub-...`
- `plausibleDomain`: seu domínio no Plausible

Os scripts de anúncios/analytics só carregam após o consentimento (banner LGPD).
