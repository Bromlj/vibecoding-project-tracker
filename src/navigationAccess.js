export const SHORTCUTS = [
  ['p', 'Projects'], ['b', 'Current project board'], ['t', 'Team'],
  ['m', 'Project milestones'], ['s', 'Appearance & settings'],
  ['a', 'Accessibility preferences'], ['h', 'Navigation & reading help'],
  ['n', 'Add task — on the board'], ['f', 'Find tasks — on the board'],
  ['1–4', 'Go to a board stage, in order'], ['j / k', 'Next / previous visible task'],
];

// Character shortcuts are opt-in and never take over editing or native widgets.
export function shortcutAction(event, {enabled, ready, boardVisible, modalOpen}) {
  if (!enabled || modalOpen || event.defaultPrevented || event.repeat || event.isComposing ||
      event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return null;
  if (event.target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"],[role="combobox"],[role="tab"],[role="slider"]')) return null;
  const key = event.key.toLowerCase();
  if (key === 'h') return 'help';
  if (key === 'a') return 'accessibility';
  if (!ready) return null;
  const pages = {p:'projects', b:'board', t:'members', m:'milestones', s:'settings'};
  if (pages[key]) return pages[key];
  if (!boardVisible) return null;
  return {n:'add', f:'search', j:'next', k:'previous', 1:'stage-0', 2:'stage-1', 3:'stage-2', 4:'stage-3'}[key] || null;
}

// Short utterances avoid platform limits without cutting words or Unicode pairs.
export function speechChunks(text, limit = 240) {
  const result = [];
  let chunk = '';
  for (const word of text.trim().split(/\s+/).filter(Boolean)) {
    if (chunk && Array.from(chunk + ' ' + word).length > limit) {
      result.push(chunk); chunk = '';
    }
    const chars = Array.from(word);
    while (chars.length > limit) {
      if (chunk) { result.push(chunk); chunk = ''; }
      result.push(chars.splice(0, limit).join(''));
    }
    const rest = chars.join('');
    if (rest) chunk += (chunk ? ' ' : '') + rest;
  }
  if (chunk) result.push(chunk);
  return result;
}
