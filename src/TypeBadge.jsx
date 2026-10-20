export default function TypeBadge({ type }) {
  const bug = type === 'bug';
  return <span style={{color:bug?'var(--bug-text, #9F1239)':'var(--feature-text, #1D4ED8)',backgroundColor:bug?'var(--bug-bg, #FFF1F2)':'var(--feature-bg, #EFF6FF)',borderColor:bug?'var(--bug-border, #FECDD3)':'var(--feature-border, #BFDBFE)'}} className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold">
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {bug?<><rect x="7" y="6" width="10" height="14" rx="5"/><path d="M9 3l2 3m4-3l-2 3M3 10h4m10 0h4M3 16h4m10 0h4M12 6v14"/></>:<><path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/></>}
    </svg>{bug?'Bug':'Feature'}
  </span>;
}
