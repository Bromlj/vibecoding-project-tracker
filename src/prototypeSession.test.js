import test from 'node:test';
import assert from 'node:assert/strict';
import { PROTOTYPE_ACCOUNTS, matchPrototypeAccount } from './prototypeSession.js';

test('prototype login accepts only published fictional examples', () => {
  for (const example of PROTOTYPE_ACCOUNTS) {
    assert.equal(matchPrototypeAccount(example.email, 'demo-only'), example);
    assert.equal(matchPrototypeAccount(example.email, 'wrong'), null);
  }
});
test('prototype login normalizes email without exposing a password in the identity', () => {
  const account = matchPrototypeAccount('  ALEX@EXAMPLE.TEST  ', 'demo-only');
  assert.equal(account.name, 'Alex Morgan');
  assert.deepEqual(Object.keys(account).sort(), ['email', 'id', 'name']);
});
test('prototype login rejects unknown or incomplete input', () => {
  assert.equal(matchPrototypeAccount('someone@real.invalid', 'demo-only'), null);
  assert.equal(matchPrototypeAccount('', ''), null);
  assert.equal(matchPrototypeAccount(null, 'demo-only'), null);
});
