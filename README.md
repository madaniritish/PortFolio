# Personal Portfolio

A responsive personal portfolio built with React and Vite. It includes dark/light theme support, project pages, a contact form with validation, and client-side routing with React Router.

# Setup

(Terminal)
npm install
npm run dev


The app runs at `http://localhost:5173`.

To create a production build:

npm run build
npm run preview


# Component Structure

The app uses a simple page/component structure with `App` handling the main theme state:

```text
App
├── Layout
│   ├── Navbar
│   ├── Page Content
│   └── Footer
├── Home
├── About
│   └── Skills
├── Projects
│   └── ProjectList
│       └── ProjectCard
│           └── TechStack
├── ProjectDetails
├── Contact
└── NotFound
```

The theme state is kept in `App` because both the layout and navbar need access to it. It is passed down through props rather than using a global state library.

Project data is passed from `Projects` → `ProjectList` → `ProjectCard` → `TechStack`, which also demonstrates prop drilling across multiple component levels.

The contact form keeps its own state since it is only used inside the `Contact` page. Similarly, each project card manages its own `showDetails` state.

#useEffect Hooks

There are two `useEffect` hooks in the project:

* **Home page:** Runs when the page loads to simulate a short loading screen. The timeout is cleared when the component unmounts.
* **Theme:** Runs whenever the theme changes to save the selected theme in `localStorage` and update the `data-theme` attribute on the document.

## Other Features

* React Router for page navigation and dynamic project routes
* Controlled contact form with validation
* Light/dark theme persistence
* Responsive design for desktop and mobile
* Semantic HTML and basic accessibility support
