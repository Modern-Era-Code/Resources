Level up your codebase with these **7 practical patterns** + bonus tips. No fluff, just production-ready refactors you can copy-paste today.

---

## 1. Discriminated Union Props

**Problem:** Boolean flags + optional props = messy, error-prone.  
**Solution:** Let the compiler enforce valid prop combinations.

```tsx
type AlertProps =
  | { type: 'info'; color: 'blue' }
  | { type: 'error'; color: 'red'; retry: () => void };
```

✅ Compiler guarantees: no retry on info, retry required on error.

---

## 2. Generic Fetch Hook

**Problem:** `useState<any>` ruins type safety.  
**Solution:** Add generics to your data-fetching hook.

```tsx
function useFetch<T>(url: string): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => { fetch(url).then(r => r.json()).then(setData); }, [url]);
  return { data, loading: data === null };
}
```

✅ Call as `useFetch<User[]>('/api/users')` → auto-complete + safety.

---

## 3. Strict Children Maps

**Problem:** `React.Children.map` = `any` children chaos.  
**Solution:** Lock children to specific component types.

```tsx
interface ButtonRowProps {
  children: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
}
```

✅ Only `Button` children allowed. Compiler rejects `<div>` sneaks.

---

## 4. ComponentProps Without Rewriting

**Problem:** Wrapping 3rd-party components → copy-paste prop hell.  
**Solution:** Steal prop types directly.

```tsx
type ButtonProps = ComponentProps<typeof MuiButton>;
export const LoudButton = (p: ButtonProps) => (
  <MuiButton {...p} sx={{ textTransform: 'uppercase' }} />
);
```

✅ Automatically synced with upstream prop changes.

---

## 5. Const Assertions for Icons

**Problem:** Manual string unions for icons are brittle.  
**Solution:** Infer literal types from an icon map.

```tsx
const ICONS = { home: HomeIcon, settings: SettingsIcon, user: UserIcon } as const;
type IconName = keyof typeof ICONS;
```

✅ Add new icons in **one place** → type updates everywhere.

---

## 6. Exhaustive Reducer with `never` Trick

**Problem:** Forgetting reducer cases = silent runtime bugs.  
**Solution:** Force TypeScript to scream when you miss one.

```tsx
function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'increment': return { count: s.count + 1 };
    case 'reset': return { count: 0 };
    default: const _exhaust: never = a; throw new Error('Unhandled action');
  }
}
```

✅ Compiler ensures **every action** is handled.

---

## 7. Typed Event Helpers

**Problem:** Repeatedly typing `React.ChangeEvent<HTMLInputElement>`.  
**Solution:** Short aliases + tiny helpers.

```tsx
type InputChange = React.ChangeEvent<HTMLInputElement>;
const handle = (e: InputChange, fn: (v: string) => void) => fn(e.target.value);
```

✅ Cleaner handlers: `handle(e, setEmail)`.

---

# 🎁 Bonus Tips

### 🔹 Use `Omit` + `Pick`

Perfect for tailoring prop subsets.

```tsx
type NoChildren<T> = Omit<T, 'children'>;
```

### 🔹 Enforce Readonly with `Readonly<T>`

Freeze data structures at the type level.

```tsx
const settings: Readonly<{ theme: string }> = { theme: 'dark' };
```

### 🔹 Narrow Types with Type Predicates

Strongly type filtered arrays.

```tsx
function isUser(u: Person): u is User { return 'email' in u; }
const users = people.filter(isUser); // Typed as User[]
```

### 🔹 Use `satisfies` for Safer Object Literals

Get strict checking without losing inference.

```tsx
const config = {
  api: '/endpoint',
  retries: 3,
} satisfies Record<string, string | number>;
```

---

# ✅ Quick Recap

- 🔸 **Props** → Discriminated unions, `ComponentProps`
- 🔸 **Data** → Generic fetch, const assertions
- 🔸 **Children** → Strict typing with `ReactElement`
- 🔸 **State** → Exhaustive reducers with `never`
- 🔸 **Events** → Shortcuts + helpers
- 🔸 **Extras** → `Omit`, `Pick`, `Readonly`, type predicates, `satisfies`