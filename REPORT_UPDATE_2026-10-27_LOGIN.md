# Report update: frontend login and exhaustive feature coverage

27 October 2026. This supplements, rather than renumbers, the report-aligned specification.

## New reported guidance

The student supplied classmates' written accounts of a lecturer call: a login screen is expected for a multiple-user product; explicit client requirements can cite the client as their inclusion rationale; write-up quality/density matters more than repetition. These are relayed accounts, not a universal written word-limit waiver. No new production-backend requirement is inferred.

## New frontend requirements

| ID | Requirement | Priority / source | Evidence boundary |
|---|---|---|---|
| FR-27 | Demonstrate login, validation, visible example identity, sign-out and an assessor-accessible guest route. | MVP interface for the intended multiple-user tool; later clarification relayed by the student. | PrototypeSignIn uses published fictional accounts and a sample password. It does not authenticate, protect records, change assignments or connect devices. |
| DR-14 | Keep the selected fictional preview identity in memory; never retain or transmit the entered sample password. | Supporting MVP interface data. | Preview clears on sign-out/reload. No real provider identity or credential store is created. |

The full editorial specification has 27 FR, 13 NFR and 14 DR identifiers (54 total). FR-19 now explicitly mentions already-existing optional briefing-completeness guidance; NFR-10 also applies to the prototype password boundary. Existing canonical identifiers remain unchanged.

## Runtime changes

Added `prototypeSession.js`, its tests, and `PrototypeSignIn.jsx`; integrated the preview entry/identity/sign-out in `App.jsx`. The public populated demo stays available without registration. `?demo=1&login=1` opens the login demonstration. Existing configured shared access is untouched and separate.

Only the example identities Alex Morgan, Sam Patel and Jordan Lee with the published sample password are matched. No genuine account credentials are checked or stored. The identity label explicitly says simulation.

## Verification

Source tests: 32 passed, 0 failed; production build passed. Public-site capture run: https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40510940407

The successful run exercised incorrect sample input, password visibility, two fictional identities, sign-out, reload clearing, guest bypass, and a narrow viewport. It asserted no network request and no localStorage mutation during the simulated sign-in. Eight genuine website screenshots were archived. The preceding run's selector failure remains in its raw manifest and is not described as a product failure or a complete pass.

Granular evidence runs also document previously omitted report details: empty and incomplete context guidance; project/member validation; attempt and demo-reset confirmations; selected-attempt output; matching/no-match/unassigned/combined filters; empty states; narrow task/context/team presentation; keyboard-tab/forced-colour states; and completed valid backup restoration in an isolated demo.

## Reporting boundary

The original feature inventory contains 422 numbered entries, including repeated controls and conditional shared-service paths; it is not 422 independently client-requested features. The revised report describes related interactions together and a companion mapping accounts for each original entry. Shared-service paths are explicitly conditional/not demonstrated, not silently counted as functioning frontend evidence. Full screen-reader/browser compatibility and current benchmark acceptance remain open. Client origin justifies inclusion; design deviations and added functionality still need clear reasoning.
