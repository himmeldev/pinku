# Data.ts

The `Data.ts` file just needs the next:

```ts
export const configuration = {
    token: "string"
};
```

If you want to add any property just add it as it was a json file.
Example:

```ts
export const configuration = {
    token: "string",
    key: value // A string, number, whatever you want.
};
```