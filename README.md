# 🧠 Redux + Server-Side Rendering (SSR) in Next.js (App Router)

This document explains how we set up Redux Toolkit in a Next.js project using the App Router (`app/` directory), with server-side data fetching and hydration.

---

## 🎯 Objective

We want to:
- Fetch initial data on the **server**
- Populate the **Redux store** with it
- Use the data directly in the client components
- Avoid duplicate client-side fetching

---

## 🛠️ Project Structure Overview

