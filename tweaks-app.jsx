/* ===========================================================
   Sol Martínez — Tweaks app
   Mounts the Tweaks panel and applies visual directions
   (palette / type / shapes) to <html> data-attributes.
   The site's CSS reacts to those attributes.
   =========================================================== */

const PALETTES = {
  "bosque-lima":  ["#e3e84a", "#2b3f1c", "#dfe7c4"],   // verde bosque + lima (ref)
  "oliva":        ["#ecc948", "#3b3a1c", "#e7e2c2"],   // oliva + mostaza
  "bosque-coral": ["#e98a5f", "#284034", "#dce6cc"],   // verde + coral
  "marino":       ["#dfe84a", "#16373a", "#cfe2dd"],   // teal-navy + lima
};

const TYPE_MAP   = { "Geométrico": "geometrico", "Editorial": "editorial", "Suave": "suave" };
const SHAPE_MAP  = { "Curvo": "curvo", "Orgánico": "blob", "Recto": "recto" };

const SM_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#e3e84a", "#2b3f1c", "#dfe7c4"],
  "type": "Geométrico",
  "shapes": "Curvo"
}/*EDITMODE-END*/;

function SMTweaksApp() {
  const [t, setTweak] = useTweaks(SM_TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    const key = Object.keys(PALETTES).find(
      (k) => JSON.stringify(PALETTES[k]) === JSON.stringify(t.palette)
    ) || "bosque-lima";
    root.setAttribute("data-theme", key);
    root.setAttribute("data-type",  TYPE_MAP[t.type]   || "geometrico");
    root.setAttribute("data-shapes", SHAPE_MAP[t.shapes] || "curvo");
  }, [t.palette, t.type, t.shapes]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Paleta" />
      <TweakColor
        label="Colores"
        value={t.palette}
        options={Object.values(PALETTES)}
        onChange={(v) => setTweak("palette", v)}
      />
      <TweakSection label="Tipografía" />
      <TweakRadio
        label="Estilo"
        value={t.type}
        options={["Geométrico", "Editorial", "Suave"]}
        onChange={(v) => setTweak("type", v)}
      />
      <TweakSection label="Formas" />
      <TweakRadio
        label="Acentos"
        value={t.shapes}
        options={["Curvo", "Orgánico", "Recto"]}
        onChange={(v) => setTweak("shapes", v)}
      />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const el = document.createElement("div");
  el.id = "sm-tweaks-root";
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<SMTweaksApp />);
})();
