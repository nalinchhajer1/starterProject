# Feature Development (Scaffold)

## What you create
- packages/features/feature-<name>/
  - state/ (reducers, actions, optional persist + migrations)
  - register.ts (export function register(inject): void)
  - screens/ (React components only)

## Steps
1) Implement your slice(s). If persisted, provide a per-slice persist config and migrations.
2) Augment RootState via:
   declare module 'state-core/types' { interface FeatureSlices { <key>: <StateType>; } }
3) Export a `register(inject)` that calls:
   inject('<key>', <reducer>, { persist: <persistConfig?> })
4) Expose your screen components.
5) Wire in `features-registry`:
   - call your `register(inject)`
   - add your screen(s) to exported `screens` for navigation to render
6) Use navigation via the DI-provided NavOps (no raw string route names).
7) Run: lint / typecheck / tests.
