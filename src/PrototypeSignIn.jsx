import { useState } from 'react';
import Dialog from './Dialog.jsx';
import { button, primaryButton, input } from './ui';
import { PROTOTYPE_ACCOUNTS, PROTOTYPE_PASSWORD, matchPrototypeAccount } from './prototypeSession.js';

/** Frontend-only demo identity selection; it never authenticates or protects workspace data. */
export default function PrototypeSignIn({ onClose, onContinue }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const account = matchPrototypeAccount(email, password);
    if (!account) {
      setError('Email or password not recognised. Choose a demo account below to fill in the details.');
      return;
    }
    setPassword('');
    onContinue(account);
  }

  function fillDemo(account) {
    setEmail(account.email);
    setPassword(PROTOTYPE_PASSWORD);
    setError('');
  }

  return <Dialog title="Sign in" subtitle="Vibecoding Project Tracker" onClose={onClose} narrow>
    <form onSubmit={submit} autoComplete="off" noValidate>
      <div className="p-5 sm:p-7">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold" htmlFor="prototype-email">Email address</label>
            <input id="prototype-email" data-initial-focus required type="email" className={input} placeholder="name@example.com" value={email} onChange={event=>{setEmail(event.target.value);setError('');}} autoComplete="off" aria-invalid={Boolean(error)} aria-describedby={error?'prototype-login-error':undefined}/>
          </div>
          <div>
            <label className="block text-sm font-semibold" htmlFor="prototype-password">Password</label>
            <div className="relative">
              <input id="prototype-password" required type={showPassword?'text':'password'} className={input+' pr-20'} placeholder="Enter password" value={password} onChange={event=>{setPassword(event.target.value);setError('');}} autoComplete="off" spellCheck={false} aria-invalid={Boolean(error)} aria-describedby={error?'prototype-login-error':undefined}/>
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-3 py-2 text-sm font-semibold text-ink-muted hover:underline" aria-label={showPassword?'Hide password':'Show password'} aria-pressed={showPassword} onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide':'Show'}</button>
            </div>
          </div>
          {error&&<p id="prototype-login-error" role="alert" className="rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>}
          <button type="submit" className={primaryButton+' w-full py-3'}>Sign in</button>
        </div>
        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-sm font-semibold">Try a demo account</p>
          <p className="mt-1 text-sm text-ink-muted">Select a teammate to fill in the details.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PROTOTYPE_ACCOUNTS.map(account=><button key={account.id} type="button" className={button+' w-full'} aria-pressed={email===account.email&&password===PROTOTYPE_PASSWORD} onClick={()=>fillDemo(account)}>{account.name}{email===account.email&&password===PROTOTYPE_PASSWORD?' ✓':''}</button>)}
          </div>
          <p className="mt-4 text-xs text-ink-muted">Demo only — no real account is connected.</p>
        </div>
      </div>
    </form>
  </Dialog>;
}
