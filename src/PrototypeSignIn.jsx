import { useState } from 'react';
import Dialog from './Dialog.jsx';
import { button, primaryButton, input } from './ui';
import { PROTOTYPE_ACCOUNTS, PROTOTYPE_PASSWORD, matchPrototypeAccount } from './prototypeSession.js';

/** Interactive frontend-only sign-in. It does not authenticate or protect workspace data. */
export default function PrototypeSignIn({ onClose, onContinue }) {
  const [email, setEmail] = useState(PROTOTYPE_ACCOUNTS[0].email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    const account = matchPrototypeAccount(email, password);
    if (!account) {
      setError('Incorrect details. Choose an example account and use the demo password.');
      return;
    }
    setPassword('');
    onContinue(account);
  }
  return <Dialog title="Sign in to the prototype" subtitle="Vibecoding Project Tracker" onClose={onClose}>
    <form onSubmit={submit} autoComplete="off" noValidate>
      <div className="p-5 sm:p-7">
        <label className="block font-medium">Example account<select data-initial-focus className={input} value={PROTOTYPE_ACCOUNTS.some(a=>a.email===email)?email:''} onChange={event=>{setEmail(event.target.value);setError('');}}><option value="" disabled>Choose an example</option>{PROTOTYPE_ACCOUNTS.map(account=><option key={account.id} value={account.email}>{account.name} — {account.email}</option>)}</select></label>
        <p className="mt-2 text-sm text-ink-muted">Demo accounts only. Password: <code>{PROTOTYPE_PASSWORD}</code>.</p>
        <label className="mt-5 block font-medium" htmlFor="prototype-email">Example email</label>
        <input id="prototype-email" className={input} type="email" value={email} onChange={event=>setEmail(event.target.value)} autoComplete="off" aria-invalid={Boolean(error)} aria-describedby={error?'prototype-login-error':undefined}/>
        <label className="mt-5 block font-medium" htmlFor="prototype-password">Sample password</label>
        <input id="prototype-password" className={input} type={showPassword?'text':'password'} value={password} onChange={event=>setPassword(event.target.value)} autoComplete="off" spellCheck={false} aria-invalid={Boolean(error)} aria-describedby={error?'prototype-login-error':undefined}/>
        <label className="mt-3 flex min-h-11 items-center gap-3"><input className="h-5 w-5" type="checkbox" checked={showPassword} onChange={event=>setShowPassword(event.target.checked)}/>Show sample password</label>
        {error&&<p id="prototype-login-error" role="alert" className="mt-3 rounded-lg border border-red-400 bg-red-50 p-3 text-red-900">{error}</p>}
      </div>
      <footer className="dialog-actions"><button type="button" className={button} onClick={onClose}>Continue without signing in</button><button className={primaryButton}>Sign in to preview</button></footer>
    </form>
  </Dialog>;
}
