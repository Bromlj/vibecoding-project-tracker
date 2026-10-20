export const DUE_STYLES = {
  safe: 'bg-due-safe', warning: 'bg-due-warning', overdue: 'bg-due-overdue', neutral: 'bg-due-neutral',
};
export function dueState(task, now = new Date()) {
  if (task.status==='done') return { id:'neutral', card:'complete', label:'Complete' };
  if (!task.dueDate) return { id:'neutral', card:'plain', label:'No due date' };
  // A date-only input means the end of that LOCAL calendar day, not UTC midnight.
  const deadline = new Date(task.dueDate+'T23:59:59.999');
  if (Number.isNaN(deadline.getTime())) return {id:'neutral',card:'plain',label:'Check due date'};
  const hours = (deadline.getTime()-now.getTime())/3600000;
  if (hours<0) return {id:'overdue',card:'urgent',label:'Overdue'};
  if (hours<=24) return {id:'warning',card:'soon',label:'Due within 24 hours'};
  if (hours<=48) return {id:'warning',card:'soon',label:'Due soon'};
  return {id:'safe',card:'plain',label:'On track'};
}
export function displayDate(value) {
  return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric'}).format(new Date(value+'T12:00:00'));
}
