/** Fictional identities for the frontend login demonstration. Not authentication. */
export const PROTOTYPE_ACCOUNTS = Object.freeze([
  Object.freeze({ id: 'preview-alex', name: 'Alex Morgan', email: 'alex@example.test' }),
  Object.freeze({ id: 'preview-sam', name: 'Sam Patel', email: 'sam@example.test' }),
  Object.freeze({ id: 'preview-jordan', name: 'Jordan Lee', email: 'jordan@example.test' }),
]);
export const PROTOTYPE_PASSWORD = 'demo-only';

/** Match only the published fictional examples; never call a provider or persist input. */
export function matchPrototypeAccount(email, password) {
  if (typeof email !== 'string' || password !== PROTOTYPE_PASSWORD) return null;
  const normalized = email.trim().toLowerCase();
  return PROTOTYPE_ACCOUNTS.find(account => account.email === normalized) || null;
}
