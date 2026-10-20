// Keep Tab/Shift+Tab within the current modal's visible controls.
// Native dialog makes the page inert; this also avoids a focus stop on browser chrome.
export function containDialogFocus(event) {
 if(event.key!=='Tab') return;
 const nodes=[...event.currentTarget.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href],[tabindex="0"]')]
  .filter(node=>node.getClientRects().length && node.type!=='hidden');
 if(!nodes.length){event.preventDefault();event.currentTarget.focus();return;}
 const first=nodes[0], last=nodes.at(-1);
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
}
