import {PALETTES, cardPaletteStyle} from './workspace.js';

export const DEFAULT_ACCESS = {theme:'system',colourVision:'workspace',textSize:'standard',contrast:'standard',reducedMotion:false,reduceEffects:false,shortcuts:false};
export const validAccess = p => p &&
  (p.theme===undefined||['light','dark','system'].includes(p.theme)) &&
  (p.colourVision===undefined||['workspace','blue-amber','monochrome'].includes(p.colourVision)) &&
  ['standard','large','largest'].includes(p.textSize) &&
  ['standard','high'].includes(p.contrast) &&
  typeof p.reducedMotion==='boolean' && typeof p.reduceEffects==='boolean' &&
  (p.shortcuts===undefined||typeof p.shortcuts==='boolean');

const ACCESS_TYPES = {
  'blue-amber': {feature:PALETTES.default.feature,bug:PALETTES.violet.bug},
  monochrome: {feature:['#172333','#CBD5E1','#334155'],bug:['#172333','#F1F5F9','#334155']},
};

// Personal colour choices override both task categories and urgency, without
// changing shared workspace colours or the underlying task meaning.
export function appearanceColours(palette='default',cardPalette='traffic',colourVision='workspace') {
  const types=ACCESS_TYPES[colourVision]||PALETTES[palette]||PALETTES.default;
  const cards=colourVision==='blue-amber'?'blue':colourVision==='monochrome'?'mono':cardPalette;
  return {...cardPaletteStyle(cards),
    '--feature-text':types.feature[0],'--feature-bg':types.feature[1],'--feature-border':types.feature[2],
    '--bug-text':types.bug[0],'--bug-bg':types.bug[1],'--bug-border':types.bug[2]};
}
