(function () {
  function trackEvent(name, props) {
    // Plausible API: window.plausible(eventName, { props })
    if (typeof window.plausible === "function") {
      try { window.plausible(name, { props: props || {} }); } catch { /* ignore */ }
      return;
    }
  }

  window.trackEvent = trackEvent;

  function wireJsonFileUpload(options) {
    const fileBtn = document.getElementById("file-btn");
    const fileInput = document.getElementById("file-input");
    const inputEl = options && options.inputEl;
    if (!fileBtn || !fileInput || !inputEl) return;

    const setStatus = options.setStatus || (() => {});
    const updateStats = options.updateStats || (() => {});
    const onText = options.onText || (() => {});

    fileBtn.addEventListener("click", () => {
      try { fileInput.click(); } catch { /* ignore */ }
    });

    fileInput.addEventListener("change", async () => {
      const file = fileInput.files && fileInput.files[0];
      fileInput.value = "";
      if (!file) return;

      try {
        if (file.size && file.size > 5 * 1024 * 1024) {
          setStatus("Arquivo muito grande (máx. 5MB)", "error");
          return;
        }

        const text = await file.text();
        inputEl.value = text;
        updateStats(text);
        onText(text);
        setStatus("Arquivo carregado", "ok");
        trackEvent("upload_json");
      } catch {
        setStatus("Falha ao ler arquivo", "error");
      }
    });
  }

  function wireCommonEvents() {
    const btnFormat = document.getElementById("format-btn");
    const btnMinify = document.getElementById("minify-btn");
    const btnCopy = document.getElementById("copy-btn");
    const btnDownload = document.getElementById("download-btn");

    if (btnFormat) btnFormat.addEventListener("click", () => trackEvent("format"));
    if (btnMinify) btnMinify.addEventListener("click", () => trackEvent("minify"));
    if (btnCopy) btnCopy.addEventListener("click", () => trackEvent("copy"));
    if (btnDownload) btnDownload.addEventListener("click", () => trackEvent("download"));
  }

  function initJsonFormatterIfPresent() {
    if (document.body && document.body.getAttribute("data-tool-mode")) return;
    const inputEl = document.getElementById("json-input");
    const outputEl = document.getElementById("json-output");

    if (!inputEl || !outputEl) return;

    const copyBtn = document.getElementById("copy-btn");
    const downloadBtn = document.getElementById("download-btn");
    const indentSelect = document.getElementById("indent-select");
    const statusEl = document.getElementById("status");
    const charCountEl = document.getElementById("char-count");
    const lineCountEl = document.getElementById("line-count");
    const autoToggle = document.getElementById("auto-toggle");
    const persistToggle = document.getElementById("persist-toggle");

    let autoTimer = null;
    const STORAGE_KEY = (document.body.getAttribute("data-storage-key") || "jsonFormatterInput");

    const SAMPLE = '{\n  "produto": "Notebook",\n  "preco": 4500.99,\n  "disponivel": true,\n  "tags": ["tecnologia", "oferta"],\n  "estoque": {"local": "SP", "quantidade": 12}\n}';

    function updateStats(text) {
      if (charCountEl) charCountEl.textContent = `${text.length} chars`;
      if (lineCountEl) lineCountEl.textContent = `${text ? text.split(/\n/).length : 0} linhas`;
    }

    function setStatus(message, state) {
      if (!statusEl) return;
      statusEl.classList.remove("ok", "error");
      if (state) statusEl.classList.add(state);
      const label = statusEl.querySelector("span:nth-child(2)");
      if (label) label.textContent = message;
    }

    function persistInput(value) {
      if (!persistToggle || !persistToggle.checked) return;
      try { localStorage.setItem(STORAGE_KEY, value); } catch { /* ignore */ }
    }

    function scrollToOutput() {
      outputEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function processJson(mode) {
      const raw = inputEl.value.trim();
      if (!raw) {
        outputEl.textContent = "";
        if (copyBtn) copyBtn.disabled = true;
        if (downloadBtn) downloadBtn.disabled = true;
        setStatus("Cole um JSON para começar", "");
        return;
      }

      try {
        const parsed = JSON.parse(raw);
        const indent = mode === "pretty" ? Number((indentSelect && indentSelect.value) || 2) : 0;
        const formatted = JSON.stringify(parsed, null, indent);
        outputEl.textContent = formatted;
        setStatus(mode === "pretty" ? "JSON formatado" : "JSON compactado", "ok");
        if (copyBtn) copyBtn.disabled = false;
        if (downloadBtn) downloadBtn.disabled = false;
        inputEl.setCustomValidity("");
        inputEl.style.borderColor = "var(--border)";
        persistInput(raw);
        scrollToOutput();
      } catch (err) {
        outputEl.textContent = "";
        if (copyBtn) copyBtn.disabled = true;
        if (downloadBtn) downloadBtn.disabled = true;
        setStatus("Erro de sintaxe: " + (err && err.message ? err.message : "JSON inválido"), "error");
        inputEl.setCustomValidity(err && err.message ? err.message : "JSON inválido");
        inputEl.style.borderColor = "var(--error)";
      }
    }

    async function copyResult() {
      const text = outputEl.textContent;
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        if (copyBtn) {
          copyBtn.textContent = "Copiado!";
          setTimeout(() => { copyBtn.textContent = "Copiar"; }, 1500);
        }
        setStatus("Resultado copiado", "ok");
      } catch (err) {
        setStatus("Falha ao copiar", "error");
      }
    }

    function downloadResult() {
      const text = outputEl.textContent;
      if (!text) return;
      const ext = document.body.getAttribute("data-download-ext") || "json";
      const filename = document.body.getAttribute("data-download-name") || `saida.${ext}`;
      const mime = document.body.getAttribute("data-download-mime") || "application/json";

      const blob = new Blob([text], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      setStatus("Download iniciado", "ok");
    }

    function clearAll() {
      inputEl.value = "";
      outputEl.textContent = "";
      if (copyBtn) copyBtn.disabled = true;
      if (downloadBtn) downloadBtn.disabled = true;
      setStatus("Pronto", "");
      updateStats("");
      try {
        if (persistToggle && persistToggle.checked) localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
      inputEl.focus();
    }

    function loadSample() {
      inputEl.value = SAMPLE;
      updateStats(SAMPLE);
      processJson("pretty");
    }

    function scheduleAutoFormat() {
      if (!autoToggle || !autoToggle.checked) return;
      clearTimeout(autoTimer);
      autoTimer = setTimeout(() => processJson("pretty"), 500);
    }

    wireJsonFileUpload({
      inputEl,
      setStatus,
      updateStats,
      onText: (text) => {
        persistInput(text);
        processJson("pretty");
      }
    });

    const formatBtn = document.getElementById("format-btn");
    const minifyBtn = document.getElementById("minify-btn");
    const clearBtn = document.getElementById("clear-btn");
    const sampleBtn = document.getElementById("sample-btn");

    if (formatBtn) formatBtn.addEventListener("click", () => processJson("pretty"));
    if (minifyBtn) minifyBtn.addEventListener("click", () => processJson("compact"));
    if (copyBtn) copyBtn.addEventListener("click", copyResult);
    if (downloadBtn) downloadBtn.addEventListener("click", downloadResult);
    if (clearBtn) clearBtn.addEventListener("click", clearAll);
    if (sampleBtn) sampleBtn.addEventListener("click", loadSample);

    inputEl.addEventListener("input", () => {
      updateStats(inputEl.value);
      persistInput(inputEl.value);
      scheduleAutoFormat();
    });

    inputEl.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
        processJson("pretty");
      }
    });

    (function init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          inputEl.value = saved;
          updateStats(saved);
          processJson("pretty");
        } else {
          updateStats("");
        }
      } catch {
        updateStats("");
      }
      inputEl.focus();
    })();
  }

  function initToolTransformsIfPresent() {
    const mode = document.body.getAttribute("data-tool-mode");
    if (!mode) return;

    const inputEl = document.getElementById("json-input");
    const outputEl = document.getElementById("json-output");
    const statusEl = document.getElementById("status");
    const copyBtn = document.getElementById("copy-btn");
    const downloadBtn = document.getElementById("download-btn");

    function setStatus(message, state) {
      if (!statusEl) return;
      statusEl.classList.remove("ok", "error");
      if (state) statusEl.classList.add(state);
      const label = statusEl.querySelector("span:nth-child(2)");
      if (label) label.textContent = message;
    }

    function setOutput(text) {
      outputEl.textContent = text || "";
      if (copyBtn) copyBtn.disabled = !text;
      if (downloadBtn) downloadBtn.disabled = !text;
    }

    wireJsonFileUpload({
      inputEl,
      setStatus,
      onText: () => {
        setOutput("");
      }
    });

    function stringifyOrThrow(val, indent) {
      return JSON.stringify(val, null, indent);
    }

    function escapeForJsonString(text) {
      return JSON.stringify(String(text)).slice(1, -1);
    }

    function unescapeFromJsonString(text) {
      // Treat as JSON string literal.
      return JSON.parse('"' + String(text).replace(/"/g, '\\"') + '"');
    }

    function jsonToCsv(value) {
      const rows = Array.isArray(value) ? value : [value];
      if (!rows.length) return "";
      const objects = rows.map((r) => {
        if (r && typeof r === "object" && !Array.isArray(r)) return r;
        throw new Error("Para JSON→CSV, use um objeto ou array de objetos.");
      });

      const headers = Array.from(new Set(objects.flatMap((o) => Object.keys(o))));
      const esc = (v) => {
        if (v === null || v === undefined) return "";
        const s = typeof v === "string" ? v : JSON.stringify(v);
        const needs = /[\n\r,\"]/g.test(s);
        const q = s.replace(/\"/g, '"').replace(/"/g, '""');
        return needs ? `"${q}"` : q;
      };

      const lines = [];
      lines.push(headers.join(","));
      for (const obj of objects) {
        lines.push(headers.map((h) => esc(obj[h])).join(","));
      }
      return lines.join("\n");
    }

    function csvToJson(text) {
      const lines = String(text).split(/\r?\n/).filter((l) => l.trim().length);
      if (lines.length < 2) throw new Error("CSV precisa de header + pelo menos 1 linha.");
      const headers = lines[0].split(",").map((h) => h.trim());
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");
        const obj = {};
        headers.forEach((h, idx) => {
          obj[h] = (cols[idx] || "").trim();
        });
        data.push(obj);
      }
      return data;
    }

    function prettifyJsonl(text, indent) {
      const lines = String(text).split(/\r?\n/).filter((l) => l.trim().length);
      if (!lines.length) return "";
      const prettyLines = lines.map((line, idx) => {
        try {
          return stringifyOrThrow(JSON.parse(line), indent);
        } catch (e) {
          throw new Error(`Linha ${idx + 1}: JSON inválido`);
        }
      });
      return prettyLines.join("\n\n");
    }

    function run() {
      const raw = (inputEl && inputEl.value) ? inputEl.value : "";
      const trimmed = raw.trim();
      if (!trimmed) {
        setOutput("");
        setStatus("Cole um conteúdo para começar", "");
        return;
      }

      try {
        if (mode === "validator") {
          JSON.parse(trimmed);
          setOutput("JSON válido.");
          setStatus("JSON válido", "ok");
          return;
        }

        if (mode === "minify") {
          const parsed = JSON.parse(trimmed);
          setOutput(stringifyOrThrow(parsed, 0));
          setStatus("JSON compactado", "ok");
          return;
        }

        if (mode === "escape") {
          setOutput(escapeForJsonString(trimmed));
          setStatus("Texto escapado", "ok");
          return;
        }

        if (mode === "unescape") {
          setOutput(unescapeFromJsonString(trimmed));
          setStatus("Texto desescapado", "ok");
          return;
        }

        if (mode === "json-to-csv") {
          const parsed = JSON.parse(trimmed);
          setOutput(jsonToCsv(parsed));
          setStatus("CSV gerado", "ok");
          return;
        }

        if (mode === "csv-to-json") {
          const parsed = csvToJson(trimmed);
          setOutput(stringifyOrThrow(parsed, 2));
          setStatus("JSON gerado", "ok");
          return;
        }

        if (mode === "jsonl") {
          const indent = Number(document.body.getAttribute("data-jsonl-indent") || "2");
          setOutput(prettifyJsonl(trimmed, indent));
          setStatus("JSONL embelezado", "ok");
          return;
        }

        setStatus("Modo não suportado", "error");
      } catch (err) {
        setOutput("");
        setStatus("Erro: " + (err && err.message ? err.message : "Entrada inválida"), "error");
      }
    }

    const runBtn = document.getElementById("run-btn");
    const swapBtn = document.getElementById("swap-btn");
    const clearBtn = document.getElementById("clear-btn");

    if (runBtn) runBtn.addEventListener("click", () => {
      trackEvent(mode || "run");
      run();
    });

    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        const current = document.body.getAttribute("data-tool-mode");
        if (current === "json-to-csv") {
          document.body.setAttribute("data-tool-mode", "csv-to-json");
          document.getElementById("tool-title").textContent = "CSV → JSON";
          document.getElementById("tool-desc").textContent = "Converta CSV simples (sem aspas complexas) para JSON.";
          trackEvent("swap_csv_to_json");
        } else if (current === "csv-to-json") {
          document.body.setAttribute("data-tool-mode", "json-to-csv");
          document.getElementById("tool-title").textContent = "JSON → CSV";
          document.getElementById("tool-desc").textContent = "Converta JSON (objeto ou array de objetos) para CSV.";
          trackEvent("swap_json_to_csv");
        } else if (current === "escape") {
          document.body.setAttribute("data-tool-mode", "unescape");
          document.getElementById("tool-title").textContent = "Unescape JSON";
          document.getElementById("tool-desc").textContent = "Transforme sequências escapadas (\\n, \\t, \\\" ) em texto normal.";
          if (runBtn) runBtn.textContent = "Desescapar";
          trackEvent("swap_unescape");
        } else if (current === "unescape") {
          document.body.setAttribute("data-tool-mode", "escape");
          document.getElementById("tool-title").textContent = "Escape JSON";
          document.getElementById("tool-desc").textContent = "Escape textos para usar com segurança dentro de strings JSON.";
          if (runBtn) runBtn.textContent = "Escapar";
          trackEvent("swap_escape");
        } else {
          // fallback: no-op
        }
        setOutput("");
        setStatus("Pronto", "");
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (inputEl) inputEl.value = "";
        setOutput("");
        setStatus("Pronto", "");
        if (inputEl) inputEl.focus();
        trackEvent("clear");
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const text = outputEl.textContent;
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = "Copiado!";
          setTimeout(() => { copyBtn.textContent = "Copiar"; }, 1500);
          setStatus("Resultado copiado", "ok");
          trackEvent("copy");
        } catch {
          setStatus("Falha ao copiar", "error");
        }
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const text = outputEl.textContent;
        if (!text) return;
        const ext = document.body.getAttribute("data-download-ext") || "txt";
        const filename = document.body.getAttribute("data-download-name") || `saida.${ext}`;
        const mime = document.body.getAttribute("data-download-mime") || "text/plain";
        const blob = new Blob([text], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        setStatus("Download iniciado", "ok");
        trackEvent("download");
      });
    }

    if (!runBtn) {
      // Pages that reuse the formatter UI will initialize elsewhere.
      return;
    }

    setStatus("Pronto", "");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      wireCommonEvents();
      initJsonFormatterIfPresent();
      initToolTransformsIfPresent();
    });
  } else {
    wireCommonEvents();
    initJsonFormatterIfPresent();
    initToolTransformsIfPresent();
  }
})();
