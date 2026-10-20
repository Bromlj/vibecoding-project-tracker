// Icons repeat adjacent text; their shapes are deliberately excluded from speech.
export default function Icon({name, size=20, className=''}) {
  const paths = {
    projects:<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>,
    team:<><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3H3Zm13-17a3 3 0 0 1 0 6m3 11h2v-3a6 6 0 0 0-4-5"/></>,
    settings:<><path d="m9 3-.5 3-2 1-2.8-1-2 3.5L4 12l-2.3 2.5 2 3.5 2.8-1 2 1 .5 3h6l.5-3 2-1 2.8 1 2-3.5L20 12l2.3-2.5-2-3.5-2.8 1-2-1L15 3Z"/><circle cx="12" cy="12" r="3"/></>,
    plus:<path d="M12 5v14M5 12h14"/>,
    back:<path d="m14 6-6 6 6 6"/>,
    arrow:<path d="M4 12h16m-6-6 6 6-6 6"/>,
    copy:<><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V3H4v13h4"/></>,
    review:<><path d="M14 21H4V3h10l5 5v5M14 3v5h5"/><circle cx="17" cy="17" r="3"/><path d="m19 19 3 3"/></>,
    menu:<path d="M3 6h18M3 12h18M3 18h18"/>,
    calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    close:<path d="m6 6 12 12M6 18 18 6"/>,
    shield:<><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/></>,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]||paths.projects}</svg>;
}
