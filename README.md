# BlueVault — Spending Dashboard

A personal finance spending dashboard built with React and TypeScript. Visualizes spending data across categories using interactive charts and a detailed breakdown table.

## Tech Stack

- **React** 19 — UI framework
- **TypeScript** 6 — Type-safe JavaScript
- **Vite** 5 — Build tool and dev server
- **Chart.js** 4 + **react-chartjs-2** — Interactive pie and bar charts
- **Sass** (SCSS) — Styling with variables, nesting, and responsive mixins
- **ESLint** 9 — Linting with React Hooks and React Refresh plugins

## Features

- **Summary Metrics** — Total spending, category count, and average spend per category
- **Pie Chart** — Spending distribution by category with percentage tooltips
- **Bar Chart** — Monthly spending trend over six months
- **Category Breakdown Table** — Per-category amounts, percentages, and visual progress bars
- **Responsive Design** — Adapts layout for tablet and mobile viewports

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)

### Setup

```bash
git clone https://github.com/joannejunghyun/devin.git
cd devin
npm install
```

## Usage

### Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The output is written to the `dist/` directory.

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── tsconfig.json                # TypeScript project references
├── tsconfig.app.json            # TypeScript config for app source
├── tsconfig.node.json           # TypeScript config for Node tooling
├── public/
│   ├── favicon.svg              # App favicon
│   └── icons.svg                # SVG icon sprite (social icons)
└── src/
    ├── main.tsx                 # React entry point
    ├── App.tsx                  # Root component
    ├── index.css                # Global styles and font import
    ├── components/
    │   ├── SpendingDashboard.tsx # Main dashboard component
    │   └── SpendingDashboard.scss # Dashboard styles (SCSS)
    └── assets/
        └── hero.png             # Hero image asset
```

## Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the Vite development server with HMR |
| `npm run build`   | Type-check with `tsc` and build with Vite  |
| `npm run lint`    | Run ESLint across the project              |
| `npm run preview` | Serve the production build locally         |

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please ensure your code passes linting (`npm run lint`) before submitting.

## License

This project is private and not currently published under an open-source license.
