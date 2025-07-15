# 🎨 Venezia

An order management interface built with React + Vite.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NataliiaDanchenko/ERP-module.git
cd venezia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
```

The optimized build will be saved to the `dist` folder.

### 5. Preview the production build

```bash
npm run preview
```

---

## 🔧 Available Scripts

| Script            | Description                          |
|-------------------|------------------------------------|
| `npm run dev`     | Start the Vite dev server           |
| `npm run build`   | Compile TypeScript + production build |
| `npm run lint`    | Lint code with ESLint               |
| `npm run preview` | Preview the production build        |

---

## 🧰 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Redux Toolkit**
- **React Table (@tanstack/react-table)**
- **Formik + Yup** – for form validation
- **Sass** – styling
- **pdfmake** – generate PDFs
- **ESLint** – code linting

---

## 📁 Project Structure (example)

```
src/
├── app/
├── pages/
├── features/
│   └── orders/
│       ├── data/
│       ├── components/
│       ├── constants/
│       ├── redux/
│       └── types/
├── components/
├── styles/
└── utils/
```

---

## 🧪 Linting

Run ESLint to check your code:

```bash
npm run lint
```

---

## 📄 License

MIT — free to use, modify, and distribute.
