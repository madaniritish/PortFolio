# React Personal Portfolio - Phase 2

A modern, responsive personal portfolio web application built with **React** and **Vite**. This project showcases interactive React features including state management, lifecycle effects with `useEffect`, local theme persistence, controlled form validation, dynamic routing with React Router, and clean component hierarchies using multi-level prop drilling.

---

## Setup and Run

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
Clone the repository and install the project dependencies:
```bash
npm install
```

### Development Server
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
Create an optimized production bundle:
```bash
npm run build
```

### Preview Production Build
Preview the generated production build locally:
```bash
npm run preview
```

---

## Component Tree

The portfolio is structured cleanly into pages, shared layout components, and reusable UI elements:

```text
App
├── BrowserRouter
│   └── Routes
│       └── Route (path="/" -> Layout)
│           ├── Layout [props: theme, toggleTheme]
│           │   ├── Navbar [props: theme, toggleTheme]
│           │   ├── <Outlet /> (Dynamic Page Content)
│           │   └── Footer
│           │
│           ├── Route (path="Home" -> Home)
│           │   └── Home [Local State: loading]
│           │
│           ├── Route (path="about" -> About)
│           │   └── About
│           │       └── Skills
│           │
│           ├── Route (path="projects" -> Projects)
│           │   └── Projects
│           │       └── ProjectList [props: projects]
│           │           └── ProjectCard [props: project, Local State: showDetails]
│           │               └── TechStack [props: techStack]
│           │
│           ├── Route (path="projects/:projectId" -> ProjectDetails)
│           │   └── ProjectDetails [Hook: useParams]
│           │       └── TechStack [props: techStack]
│           │
│           ├── Route (path="contact" -> Contact)
│           │   └── Contact [Local State: formData, errors, isSubmitted]
│           │
│           └── Route (path="*" -> NotFound)
│               └── NotFound
```

---

## State Management

The application strictly leverages functional React components and React Hooks (`useState`) without external state libraries (no Redux, Zustand, or Context API):

1. **Theme State (Lifted to `App.jsx`)**:
   - `theme` (`'light'` | `'dark'`) is lifted to the root `App` component.
   - Initialized from `localStorage.getItem('theme')` (defaults to `'light'`).
   - The theme state and `toggleTheme` function are passed down as props through `Layout` to `Navbar`.
   - Modifies `data-theme` attribute on the `document.documentElement` to trigger CSS styling.

2. **Contact Form State (`Contact.jsx`)**:
   - `formData`: Controlled state object holding `{ name: '', email: '', message: '' }`.
   - Every input and textarea is fully controlled via `value` and `onChange`.
   - `isSubmitted`: Boolean state displaying confirmation message upon successful submission.

3. **Contact Form Validation Errors (`Contact.jsx`)**:
   - `errors`: Local state object holding field-specific validation messages (`name`, `email`, `message`).
   - Real-time validation checks for non-empty fields and standard email format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
   - The submit button is conditionally disabled until all required fields pass validation.

4. **ProjectCard "View Details" State (`ProjectCard.jsx`)**:
   - `showDetails`: Independent boolean state managed inside each `ProjectCard` instance.
   - Toggling the "View Details" button on one project card expands only its own additional highlights/details without affecting any sibling cards.

---

## `useEffect` Hooks

The application implements two distinct `useEffect` hooks for side effects:

### 1. Home Page Loading Effect (`Home.jsx`)
- **Purpose**: Simulates a smooth loading state when the Home page initially mounts.
- **Implementation**:
  ```jsx
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  ```
- **Lifecycle & Cleanup**: Runs once on mount due to the empty dependency array `[]`. A cleanup function `clearTimeout(timer)` is returned to cancel any pending timer if the user navigates away before completion.

### 2. Theme Persistence Effect (`App.jsx`)
- **Purpose**: Persists the user's theme selection across page refreshes and updates the DOM data-theme attribute.
- **Implementation**:
  ```jsx
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  ```
- **Lifecycle**: Runs whenever the `theme` state updates (`[theme]` dependency array), ensuring `localStorage` and the CSS theme attributes stay synchronized.

---

## Prop Drilling Demonstration

The project provides a clear, 2+ level prop drilling hierarchy for the Projects feature:

```text
Projects (Page Component)
  │
  └── Passes `projects` array via props
        │
        ▼
  ProjectList (Child Component)
        │
        └── Iterates over `projects` and passes each `project` object via props
              │
              ▼
        ProjectCard (Grandchild Component)
              │
              └── Passes `project.techStack` array via props
                    │
                    ▼
              TechStack (Leaf Component)
                    │
                    └── Renders individual tech badge <span> elements
```

- **Page Component**: `src/pages/Projects.jsx`
- **Child Component**: `src/components/ProjectList.jsx`
- **Grandchild Component**: `src/components/ProjectCard.jsx`
- **Leaf Component**: `src/components/TechStack.jsx`

---

## Routing & Navigation

Routing is powered by **React Router v7** using `BrowserRouter`, `Routes`, `Route`, `Link`, and `NavLink`:

| Route | Component | Description |
|---|---|---|
| `/` | `Layout` | Redirects (`Navigate`) to `/Home` by default |
| `/Home` | `Home` | Landing page featuring 1-second simulated loading state and introduction |
| `/about` | `About` | About section showcasing background and tech skills |
| `/projects` | `Projects` | Projects showcase rendered via 2-level prop drilling |
| `/projects/:projectId` | `ProjectDetails` | Dynamic project detail view utilizing `useParams()` |
| `/contact` | `Contact` | Controlled contact form with real-time validation |
| `*` | `NotFound` | Catch-all 404 page for nonexistent routes |

Internal navigation uses `NavLink` with active link indicators in the header and `Link` for cross-page navigation.

---

## Accessibility & Responsive Design

- **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Form Accessibility**: All inputs are paired with `<label htmlFor="...">`, `aria-describedby` for validation errors, and `aria-invalid` attributes.
- **Theme Accessibility**: The theme toggle button includes descriptive `aria-label` and `title` attributes.
- **Responsive Layout**: Full support for desktop, tablet ($\le 768\text{px}$), and mobile ($\le 480\text{px}$) viewports.
