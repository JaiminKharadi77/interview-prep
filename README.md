# Redux + Server-Side Rendering (SSR) in Next.js App Router

This guide explains how Redux Toolkit is used in a Next.js project that uses the App Router. It shows how to fetch data on the server, pass it to Redux, and use it in client components.

---

## Folder Structure

- `/app/page.js` – main server component with SSR
- `/app/Temp/ComponentList.js` – client component that reads from Redux
- `/app/Temp/ItemComponent.js` – client component that dispatches actions
- `/store/store.js` – creates the Redux store
- `/store/ReduxProvider.js` – custom Redux Provider using `preloadedState`
- `/store/testSlice.js` – slice with logic for items and toggling values

---

## Step 1: Redux Store Setup (`store/store.js`)

```js
import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      test: testReducer,
    },
    preloadedState,
  });
}
```

## Step 2: Create a custom Redux provider for SSR

```js
// store/ReduxProvider.js
"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";

export default function ReduxProvider({ children, preloadedState }) {
  const store = makeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
```

## Step 3: Fetch data in a Server Component

```js
// app/page.js (or app/page.tsx)
import ComponentList from "./Temp/ComponentList";
import ReduxProvider from "./store/ReduxProvider";
import axios from "axios";

export default async function Home() {
  const res = await axios.get("http://localhost:5000/");
  const data = res.data;

  return (
    <ReduxProvider preloadedState={{ test: data }}>
      <ComponentList />
    </ReduxProvider>
  );
}
```

## Step 4: Component That Uses Redux (app/Temp/ComponentList.js)

```js
"use client";

import { useSelector } from "react-redux";
import ItemComponent from "./ItemComponent";

function ComponentList() {
  const items = useSelector((state) => state.test);

  return (
    <div>
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ComponentList;

```



## How to Run

1. Ensure that the local server is running at `http://localhost:5000/`.
2. Start the React application using your preferred method (e.g., `npm start` or `yarn start`).
3. The application will fetch data from the server and display it using the `ComponentList` component.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Redux Logic Explanation

#### store.js

This file is responsible for setting up the Redux store using `@reduxjs/toolkit`.

- It defines a `makeStore` function that creates and returns a new Redux store.
- The store uses `testReducer` as its only reducer, which handles the state for a list of items.
- `preloadedState` is passed as an argument so server-side fetched data can be used as the initial Redux state.

**Why it's needed:**
Next.js with the App Router doesn't allow traditional `getServerSideProps`, so we fetch data in the server component (`page.js`) and pass it to Redux via `preloadedState`.

#### ReduxProvider.js

This is a client component that wraps the application with the Redux `<Provider>`.

- It accepts `children` and `preloadedState` as props.
- It calls `makeStore(preloadedState)` to create a new Redux store with the given data.
- It then provides that store to the rest of the React tree.

**Why it's needed:**
React Redux's `<Provider>` must run on the client, but we still want to inject server-fetched data. This custom provider makes that possible in the App Router.

#### page.js

This is the main server component in the `app/` directory.

- It uses `axios` to fetch data from the backend API: `http://localhost:5000/`.
- The fetched data is passed into `ReduxProvider` as `preloadedState`.
- Inside the provider, `ComponentList` renders and reads that data from Redux.

**Why it's needed:**
This is the modern replacement for `getServerSideProps`. Since we can't use it in App Router, we fetch data directly in the server component and use a custom provider to bridge the server-client state.

## Conclusion

This project serves as a basic example of integrating Redux for state management in a React application, along with using Axios for data fetching. It provides a foundation for building more complex applications with a structured state management approach.
