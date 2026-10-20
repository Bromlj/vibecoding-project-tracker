import { useState } from 'react';
import { STAGES, seedTasks } from './data';
export { STAGES, TEAM } from './data';

export default function App() {
  const [tasks] = useState(seedTasks);
  return <div className="min-h-screen bg-surface-page text-ink-primary">
    <a href="#board" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to board</a>
    <header className="border-b border-slate-200 bg-white px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-[1600px]">
        <h1 className="text-3xl font-semibold tracking-tight">Vibecoding Project Tracker<span className="text-brand-accent">.</span></h1>
        <p className="mt-2 text-ink-muted">From intent to ship. Keep the task and its context together.</p>
      </div>
    </header>
    <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div><h2 id="board-title" className="text-2xl font-semibold">Project board</h2>
        <p className="mt-1 text-sm text-ink-muted">Demo workspace · {tasks.length} tasks · four stages</p></div>
        <p className="text-sm text-ink-muted">Team names are demo placeholders.</p>
      </div>
      <section id="board" aria-labelledby="board-title" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((stage,index)=><section key={stage.id} aria-labelledby={'stage-'+stage.id} className="min-w-0">
          <div className="mb-4 flex items-center gap-3 border-b-2 border-slate-300 pb-3">
            <span className="h-2 w-2 rounded-full bg-brand-primary" aria-hidden="true"/>
            <h3 id={'stage-'+stage.id} className="font-semibold">{stage.label}</h3>
            <span className="ml-auto text-sm tabular-nums text-ink-muted">{tasks.filter(t=>t.status===stage.id).length}<span className="sr-only"> tasks</span></span>
          </div>
          <ul className="space-y-3">{tasks.filter(t=>t.status===stage.id).map(task=><li key={task.id} className="rounded-xl border border-slate-300 bg-white p-4">
            <p className="mb-3 font-mono text-xs text-ink-muted">{task.id}</p>
            <h4 className="font-semibold">{task.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{task.description}</p>
            <p className="mt-6 border-t border-slate-200 pt-3 text-sm text-ink-muted">Assigned to {task.assignee}</p>
          </li>)}</ul>
          {!tasks.some(t=>t.status===stage.id)&&<p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-ink-muted">No tasks here yet.</p>}
        </section>)}
      </section>
    </main>
    <footer className="mx-auto max-w-[1600px] px-4 pb-8 text-sm text-ink-muted sm:px-8">Sample tasks are synthetic demonstration data.</footer>
  </div>;
}
