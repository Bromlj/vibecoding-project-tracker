export const ANCHORS = [
 {id:'presentation',label:'Presentation'}, {id:'demo',label:'Demo'},
 {id:'report',label:'Report'}, {id:'documentation',label:'Documentation'},
];
export function safeUrl(value) {
 if (typeof value!=='string' || !/^https?:\/\//i.test(value.trim())) return false;
 try {const url=new URL(value.trim());return ['http:','https:'].includes(url.protocol)&&!url.username&&!url.password;}catch{return false;}
}
export function initialAnchors() { return ANCHORS.map(a=>({...a,url:null})); }
export function validAnchors(value) {
 return Array.isArray(value)&&value.length===4&&new Set(value.map(a=>a?.id)).size===4&&value.every(a=>
  a&&ANCHORS.some(slot=>slot.id===a.id&&slot.label===a.label)&&(a.url===null||safeUrl(a.url))
 );
}
