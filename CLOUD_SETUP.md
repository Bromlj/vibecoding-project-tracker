# Optional shared access — free Supabase and Vercel

Local workspace setup, members, multiple projects, tasks, milestones and preferences work without registration. Shared sign-in/database code is implemented. On 20 October the supplied project URL and public key were checked successfully against Supabase Auth. **The tracker tables are not installed and GitHub/Google/GitLab providers are disabled**, so shared workspaces are not ready. Hosting remains deferred.

The Supabase MCP server was added and authenticated with OAuth; `codex mcp list` reports enabled/OAuth. Its tools were not exposed to the already-running chat. Refresh the local Codex MCP connection before using its database tools. The privileged project secret and public browser configuration are in an ignored local `.env`, never this repository. `SUPABASE_SECRET_KEY` is server-only and unused by the React bundle; never prefix it with `VITE_`.

## What each service does

- Vercel hosts the existing React/Vite frontend.
- Supabase provides PostgreSQL and provider authentication. Its [Free plan](https://supabase.com/pricing) includes database/authentication; quotas apply and inactive free projects can pause after a week. Check project availability before an assessment/demo. No paid upgrade is needed for this prototype.
- Local and demo work remain separate from shared data. No local contacts/context are uploaded unless a signed-in user explicitly creates a shared copy.

## Configure when ready

1. Use the supplied project `lykdwxvqvrlnlgxpsthg` (or your own Free project). Keep database passwords and secret keys private.
2. Open its SQL editor and run [supabase/schema.sql](supabase/schema.sql). This creates the workspace/access/allowed-email tables, validation, row-level policies and restricted RPC functions. Do not disable RLS to bypass an error.
3. In Authentication, enable the provider(s) you want. Each needs a provider OAuth application whose callback URL comes from Supabase. Provider client secrets belong in the Supabase provider configuration, never in frontend files:
   - [GitHub setup](https://supabase.com/docs/guides/auth/social-login/auth-github): simplest initial developer login. The tracker requests no repository access.
   - [Google setup](https://supabase.com/docs/guides/auth/social-login/auth-google): for Gmail/Google sign-in.
   - [GitLab setup](https://supabase.com/docs/guides/auth/social-login/auth-gitlab): uses the required read_user scope.
4. In Supabase Authentication URL Configuration, allow the exact local app URL you use (`http://127.0.0.1:5173/`, optionally the preview URL at port 4173). Later add the exact production Vercel URL and set it as Site URL. The provider's callback points to Supabase; the allowed app redirect points back to this app. These are different URLs.
5. The ignored local `.env` already holds the supplied Project URL and **public publishable key**. For another installation copy [.env.example](.env.example) to `.env.local` and replace its public placeholders. A legacy anon key is also accepted. Secret/service-role keys are rejected by the browser configuration and must never be added to VITE variables or Git.
6. Set `VITE_AUTH_PROVIDERS=github` after enabling GitHub, or a comma-separated subset of `github,google,gitlab` matching enabled providers. An empty value intentionally shows no sign-in buttons and explains that setup is pending. Restart Vite after changing environment variables. Unconfigured installations show an explanation instead of non-working sign-in buttons.
7. When eventually deploying on Vercel, add those same public environment variables, choose Vite, repository root `./`, build `npm run build`, output `dist`, and deploy. Authentication does not require a Vercel server/database add-on.

## Actual shared workflow

1. Open **Shared access** and sign in. The header shows the account email.
2. Create a new shared workspace or explicitly upload a copy of the local workspace. The original local snapshot is retained.
3. The owner opens **Manage access**, allows a teammate's verified login email, and tells them to open this app. The app does not send invitation emails.
4. That teammate signs in with the matching email and chooses Join. Stored roster metadata alone never grants access.
5. Both can work on the same projects. **Refresh shared data** loads colleagues' changes. Revision-checked saves reject stale writes and retain drafts. This is shared persistence with explicit refresh, not live cursor/push synchronisation.
6. The owner can remove an allowed email or revoke sign-in access. Roster/task ownership and authentication membership are separate concepts. Sign out or **Use local workspace** returns to the independent local tool.

## Verification and limits

- Node tests cover client revision comparisons, conflict/network responses and profile/key handling.
- The SQL schema was applied twice and permission scenarios executed on an isolated PostgreSQL 18 cluster with synthetic auth stand-ins: owner/member CRUD, outsider denial, anonymous denial, verified-email joining, protected ownership, stale writes, invalid state, owner-only grants/revocation. These checks do not exercise a live Supabase auth service.
- Automated accessibility scans include the unconfigured shared-access view. No real account login, provider callback, Vercel deployment or live cloud round trip is claimed before configuration.
- Shared snapshots have a 4 MiB database limit. This is a deliberate prototype limit, not a promised production SLA. Browser backups contain workspace data, not authentication permissions; preferences remain browser-specific.
- The live readiness probe returned Auth settings HTTP 200 with all three social providers disabled, and workspace-table HTTP 404/PGRST205. These are setup checks, not a live shared save test.
- Use only a Project URL/public key in browser configuration; never request provider secrets, database passwords or a service-role key in chat.
