import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const designsDir = path.join(root, '.stitch', 'designs');
const outputPath = path.join(root, 'resources', 'style-guide.json');

const DESIGN_FILES = {
  blue: 'blue-theme.html',
  light: 'light-theme.html',
  polished: 'polished.html',
};

function extractTailwindConfig(html) {
  const match = html.match(/tailwind\.config\s*=\s*([\s\S]*?)\s*<\/script>/);
  if (!match) {
    throw new Error('No se encontró tailwind.config en el HTML de Stitch');
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function readDesignTokens(filename) {
  const filePath = path.join(designsDir, filename);
  const html = fs.readFileSync(filePath, 'utf8');
  const config = extractTailwindConfig(html);

  return {
    source: `.stitch/designs/${filename}`,
    colors: config.theme?.extend?.colors ?? {},
    spacing: config.theme?.extend?.spacing ?? {},
    fontFamily: config.theme?.extend?.fontFamily ?? {},
    fontSize: config.theme?.extend?.fontSize ?? {},
    borderRadius: config.theme?.extend?.borderRadius ?? {},
  };
}

const themes = Object.fromEntries(
  Object.entries(DESIGN_FILES).map(([key, file]) => [key, readDesignTokens(file)]),
);

const styleGuide = {
  generatedAt: new Date().toISOString(),
  sourceProject: '11807919067244186268',
  themes,
  reactMapping: {
    note: 'Los componentes en src/ usan tokens CSS (--color-*) mapeados desde estos valores de Stitch.',
    unifiedAccentToken: 'primary-fixed',
    dataAttribute: 'data-theme',
    themeIds: {
      blue: 'blue',
      light: 'light',
    },
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(styleGuide, null, 2)}\n`);
console.log(`style-guide.json generado en ${outputPath}`);
