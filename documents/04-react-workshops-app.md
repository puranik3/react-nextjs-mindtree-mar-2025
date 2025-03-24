# Building the Workshops App using React
- __Documentation__: https://react.dev/
- __Production backend__: https://workshops-server.onrender.com/
- __Development backend__: In `workshops-server` folder. To launch the local development server, execute the following in a new terminal. It launches on http://localhost:8001/workshops
```
cd workshops-server
npm i
npm start
```
- Completed frontend app can be run from the `workshops-app-completed` folder

## Before getting started
- You will need Node `>= 14` in order to run a React application created using [`create-react-app`](https://create-react-app.dev/). Install a compatible version of Node if you don't have one.

```
node --version
node -v
```
- Also, install __React Food Truck__ (by _Burke Holland_) which is a collection of VS Code extensions for React application development.

- __References__:

1. https://nodejs.org/en

## Step 1: Create the React app and run it

- Follow the steps on the [`create-react-app`](https://create-react-app.dev/) site in order to scaffold a React application. Since we would like a template with TypeScript (and TS compilation set up), we use that option. Create the React app from the folder of your choice.

```
npx create-react-app workshops-app --template typescript
```

- The project creation fails as React Testing Library that is installed along, requires React 18 (and not the latest React 19). We shall work with React 18. In order to do this, delete `node_modules`, and `package-lock.json` and makes these changes to `package.json`.

```json
"dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "web-vitals": "^2.1.4"
},
"devDependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^22.13.1",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "cra-template-typescript": "1.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
},
```
- Also create the missing `tsconfig.json` in the project folder
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```
- __Reference__: https://stackoverflow.com/questions/71835697/create-react-app-dependency-version-issues-with-react-18
- Change directory to the created project directory and try installing the dependencies once again. It should succeed.
```
cd workshops-app
npm i
```
- Run the app
```
npm start
```
- It is better to open the app (usually running at `http://localhost:3000/`) in Chrome.
- __Reference__: https://create-react-app.dev/

## Step 2: Understand the project structure and basics of data binding
- Understand the purpose of each and every file in the project (starting from `package.json`), the organization of application code, the build process (that uses Webpack / Vite), and what happens when the React app launches in the browser.
- Make some changes in `src/App.tsx` and observe the changes reflected in the browser (this feature of Webpack is called _hot module replacement_, and it happens without the browser window refresh).
```tsx
import { useState } from "react";

function App() {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");
    };

    return (
        <>
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            {/* Exercise */}
            <span>You have clicked this button <span>{/* show the count of times the button is clicked */}</span> times</span>
        </>
    );
}

export default App;
```
- __EXERCISE__: Introduce a data member to keep track of how many times the button is clicked, and display this in the span above.
- Styles can be defined in `src/App.scss`. But before that you need to install the Sass compiler.
```
npm i -D sass
```
- `App.scss` (rename `App.css` as `App.scss`)
```scss
h1 {
    color: crimson;
}
```
- Include it in `App.tsx`
```tsx
import './App.scss';
```

## Step 3: Install React Bootstrap
- __Reference__: https://react-bootstrap.netlify.app/docs/getting-started/introduction
Install React Bootstrap
```
npm install react-bootstrap bootstrap
```
- Include Bootstrap SCSS in `src/index.tsx`
```tsx
/* Importing Bootstrap SCSS file. */
import "bootstrap/scss/bootstrap.scss";

import "./index.css";
```
- Let's use the `Alert` component from React Bootstrap in order to check if the installations completed without issues. In `src/App.tsx`,
```tsx
import { useState } from "react";
import { Alert } from "react-bootstrap";

import "./App.scss";

function App() {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");

        // The function form of the setState updater is used when the new state is computed using the previous state
        setCount((c) => c + 1);
    };

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        v16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            <span>
                You have clicked this button <span>{count}</span> times
            </span>
        </>
    );
}

export default App;
```

## Step 4: Add a simple navigation menu for the app
- `src/components/common/Menu/Menu.tsx`
- __Tip__: Create the component skeleton by typing __sfc__ (and hitting the __Enter__ key)
```ts
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand href="/">Workshops App</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="#">List of workshops</Nav.Link>
                        <Nav.Link href="#">Add a workshop</Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
```
- Since all our pages are to have the menu on top, the `App` component is a convenient place to include it. This avoids the need to include it in every page component individually.
- `src/App.tsx`
```tsx
import Menu from "./components/common/Menu/Menu";
```
```ts
return (
    <>
        <Menu />
        
        {/* existing UI... */}
    </>
);
```

## Step 5: Add a Home component
- `src/components/Home/Home.tsx`. We move the page's content (everything below the menu) to this component.
```tsx
import { useState } from "react";

const Home = () => {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");
    const [count, setCount] = useState(0);

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");

        // The function form of the setState updater is used when the new state is computed using the previous state
        setCount((c) => c + 1);
    };

    return (
        <>
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            <span>
                You have clicked this button <span>{count}</span> times
            </span>
        </>
    );
};

export default Home;
```
- Include the component in the app. In `src/App.tsx`. Note that we have moved the alert to the very top of the page.
```ts
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";

import Menu from "./components/common/Menu/Menu";
import Home from "./components/Home/Home";

import "./App.scss";

function App() {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        v16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}

            <Menu />

            <Container className="my-5">
                <Home />
            </Container>
        </>
    );
}

export default App;
```
- In `App.scss` we add the following
```scss
/* add this to remove the space below the alert */
.alert {
    margin-bottom: 0;
    text-align: center;
}
```
- Now that we have understood data-binding, event handling basics, and made structural changes to move the home page contents to the home component, let's put in actual content for home in `src/components/Home/Home.tsx` (only the rendered UI is shown below). You can remove the state and event handlers completely.
```html
<h1>Workshops App</h1>

<hr />

<section>
  <p>Welcome to Workshops App</p>
  <p>
    The app serves details of (fictitious) technical workshops happening in
    various cities. Every workshop has a broad topic (eg. JavaScript), and a
    workshop has many sessions (each session covers a sub-topic, eg. Closures in
    JavaScript).
  </p>
  <p>
    You can view a list of workshops, details of every workshop, add a workshop,
    view the list of sessions in a workshop, and also add a new session for a
    workshop.
  </p>
</section>
```
- __Exercise__: Just the way we have created a separate component for `Home`, create one for the alert message and include it in the `App` component.

## Step 6: Set up more pages and routing
- The most popular routing library for React apps is [__React router__](https://reactrouter.com/home). Its latest version if v7 which is compatible with v6. v5 and v6 are significantly different however. Starting v7, React router can be used as a React framework to build react apps, or as a library for routing with an existing React app. We use it as a library here.
- Install React router
```
npm i react-router react-router-dom
```
- Start by wrapping the application UI in a `BrowserRouter` within `src/index.tsx`
```tsx
import { BrowserRouter } from "react-router";
```
```tsx
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```
- It is a common practice to create a folder with page-level components (components that represent pages in the app). The folder structure for this would mirror the routing structure for the app. This is a convention popularized by Next JS (a framework for building apps that use React). The `HomePage` component can extract routing parameters (path parameters, query string parameters) etc. and pass it to the `Home` component if needed.  In `src/pages/home/index.tsx`
```tsx
import Home from "../../components/Home/Home";

const HomePage = () => {
    return <Home />;
};

export default HomePage;
```
- Add a route for the Home page in `src/App.tsx`. Redirection options can be utilized if needed on routes. An example is shown below as an illustration. Both `http://localhost:3000/` and `http://localhost:3000/home` will take the user to the home page (with the canonical path being `http://localhost:3000/`).
```tsx
import { Navigate, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
```
```tsx
<Container className="my-5">
    <Routes>
        <Route path="/home" element={<Navigate to ="/" />} />
        <Route path="/" element={<HomePage />} />
    </Routes>
</Container>
```
- You will now be able to navigate to the home page by clicking on the app name or home link in the menu. Other links will not work at the moment.
- Create the following components. Set each one up to have a very basic UI. Note that the folders within which they have to be created are also mentioned. Create the page-level components for these as per the routes mentioned (verify if the folder structure is correct with the instructor).
```
src/workshops/WorkshopsList/WorkshopsList.tsx - path is `/workshops`
src/workshops/AddWorkshop/AddWorkshop.tsx - path is `/workshops/add`
src/workshops/Favorites/Favorites.tsx - path is `/workshops/favorites`
```
- Set up routes for the new components in `src/App.tsx`.
```tsx
import WorkshopsListPage from "./pages/workshops";
import AddWorkshopPage from "./pages/workshops/add";
import FavoritesPage from "./pages/workshops/favorites";
```
```tsx
<Container className="my-5">
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/workshops" element={<WorkshopsListPage />} />
        <Route
            path="/workshops/add"
            element={<AddWorkshopPage />}
        />
        <Route
            path="/workshops/favorites"
            element={<FavoritesPage />}
        />
    </Routes>
</Container>
```
- Add their links in `src/components/common/Menu/Menu.tsx`
```tsx
<Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
        <Nav.Link href="/home">
            Home
        </Nav.Link>
        <Nav.Link href="/workshops">
            List of workshops
        </Nav.Link>
        <Nav.Link href="/workshops/add">
            Add a workshop
        </Nav.Link>
    </Nav>
    <NavDropdown title="Personalize" id="basic-nav-dropdown">
        <NavDropdown.Item href="/workshops/favorites">
            Favorites
        </NavDropdown.Item>
        <NavDropdown.Item href="#">
            Change Theme
        </NavDropdown.Item>
    </NavDropdown>
</Navbar.Collapse>
```
- You should be able to navigate to all the pages
- Layout routes were introduced in React Router v6. This feature allows us to define a shared layout that wraps multiple child routes, making it easier to structure applications. A layout route is a parent `<Route>` that renders a common layout component (like a navbar, sidebar, or footer) while dynamically switching its child routes inside it using `<Outlet />`. Create a layout route in `src/pages/layout.tsx`
```tsx
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Menu from "../components/common/Menu/Menu";

import "./layout.scss";

const Layout = () => {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}

            <Menu />

            <Container className="my-5">
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
```
- Create `src/pages/layout.scss`. Remove these styles from `App.scss` and add to this new page.
```tsx
/* add this to remove the space below the alert */
.alert {
    margin-bottom: 0;
    text-align: center;
}
```
- Update `src/App.tsx`
```tsx
import { Navigate, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";

import HomePage from "./pages/home";
import WorkshopsListPage from "./pages/workshops";
import AddWorkshopPage from "./pages/workshops/add";
import FavoritesPage from "./pages/workshops/favorites";

import "./App.scss";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/workshops" element={<WorkshopsListPage />} />
                <Route path="/workshops/add" element={<AddWorkshopPage />} />
                <Route
                    path="/workshops/favorites"
                    element={<FavoritesPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
```
- The component will now be selected based on the route (browser location), and rendered within `<Outlet />`. Navigate using the menu and check it still works fine. Change it manually in the address bar, and the page that is loaded should change based on the routes configured. 

## Step 7: Update the menu to route to the pages without page refresh, and highlight the active route
- In `src/components/common/Menu/Menu.tsx` use `Link` instead of the usual anchor tag (`a`). `Link` defines the `to` prop instead of `href`. In order for Bootstrap components to make use of the `Link` component under-the-hood, we need to use the `as` prop defined on these Bootstrap components.
```tsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Workshops App
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/workshops"
                        >
                            List of workshops
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/workshops/add"
                        >
                            Add a workshop
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/workshops/favorites">
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
```
- You should now be able to navigate without page refreshes, using the menu. Also keeo the network tab open to confirm there are no network requests. We now have a true Single Page Application (SPA)!
- It is common practice to highlight the active link (in top-level navigation menus, sidebars menus, breadcrumbs etc.). This is achieved using `NavLink` in place of `Link`. Make the following changes in `app/components/common/Menu/Menu.tsx`
```tsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink } from "react-router-dom";

import "./Menu.scss";

function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Workshops App
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops">
                            List of workshops
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops/add">
                            Add a workshop
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item
                            as={NavLink}
                            to="/workshops/favorites"
                        >
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
```
- Customize the `active` class that is defined in Bootstrap. In `src/components/common/Menu/Menu.scss`,
```scss
// make sure the selector specificity is at least as much as Bootstrap's selector for the element - you can use the SAME selector that Bootstrap uses.
.navbar-nav .nav-link.active,
a.active {
    color: crimson;
}
```
- You can now navigate the pages using the menu, and see the active page link being highlighted. However, the _List of workshops_ link is highlighted when you go to the 'Add workshop' link as `/workshops` is a prefix for `/workshops/add`, and `NavLink` adds active to even links that are a prefix of the current location. To overcome this add the `end` prop to the _List of workshops_ link - this enforces a full path match instead of a prefix match. In `app/components/common/Menu/Menu.tsx`
```tsx
<Nav.Link as={NavLink} to="/workshops" end>
    List of workshops
</Nav.Link>
```
- __Note__: If you want to customize the active class (applying a class with some other name), or apply the class based on more conditions (than just simple matching), you can pass a function to the `className` prop of `NavLink`. However, this does not work with Bootstrap `Nav.Link`. You can create a custom `NavLink` and use it instead. One implementation is given below.
```tsx
import { NavLink, NavLinkProps } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

// Define TypeScript types for props
interface CustomNavLinkProps extends NavLinkProps {
    to: string; // Ensures 'to' prop is always a string
    children: React.ReactNode; // Ensures 'children' is valid JSX
}

// Custom component to handle className correctly
const CustomNavLink = ({ to, children, ...props }: CustomNavLinkProps) => (
    <NavLink
        to={to}
        {...props}
        className={({ isActive }) =>
            isActive ? "nav-link custom-active" : "nav-link"
        }
    >
        {children}
    </NavLink>
);

export default CustomNavLink;
```

## Step 8: Add a "page not found" page
- In `src/pages/not-found.tsx`
```tsx
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>Page Not Found!</h1>
            <p className="display-6">
                The page you are looking for does not exist. You can try going <Link to="/">Home</Link>, or check the <Link to="/workshops">list of workshops</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
```
- Add a catch-all route __as the last route__ in `src/App.tsx`
```tsx
import NotFoundPage from "./pages/not-found";
```
```tsx
<Route element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" />} />
    <Route path="/workshops" element={<WorkshopsListPage />} />
    <Route path="/workshops/add" element={<AddWorkshopPage />} />
    <Route
        path="/workshops/favorites"
        element={<FavoritesPage />}
    />

    {/* Add this route */}
    <Route path="*" element={<NotFoundPage />} />
</Route>
```
- Try navigating to non-existent routes like `xyz` or `workshops/xyz` (by typing the path in the address bar). You should find the not found page appear.

## Step 9: Fetch a list of workshops (hard-coded) using a service and use it to display the list of workshops
- First define the models to represent the data the service shall fetch and give to consumers. Create `src/models/IWorkshop.ts`. While it is not necessary to create ILocation and IModes as separate interfaces, it can help when we want to represent those nested objects. Again the choice between interface and type to define the model is upto you. We use interfaces here.
```ts
interface ILocation {
    address: string;
    city: string;
    state: string;
}

interface IModes {
    inPerson: boolean;
    online: boolean;
}

interface IWorkshop {
    name: string;
    category: string;
    id: number;
    description: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    time: string;
    location: ILocation;
    modes: IModes;
    imageUrl: string;
}

export type {
    ILocation,
    IModes,
    IWorkshop as default
};
```
- Define a service to fetch a list of workshops in 
- We hard-code the list now, but shall later fetch from the backend. In `src/services/workshops.ts`
```ts
import IWorkshop from '../models/IWorkshop';

const getWorkshops = () => {
    return [
      {
        name: 'Angular JS Bootcamp',
        category: 'frontend',
        id: 1,
        description:
          '<p><strong>AngularJS</strong> (also written as <strong>Angular.js</strong>) is a JavaScript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications.</p><p>It aims to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, along with components commonly used in rich Internet applications. (This flexibility has led to the acronym MVW, which stands for "model-view-whatever" and may also encompass model–view–presenter and model–view–adapter.)</p>',
        startDate: '2019-01-01T04:00:00.000Z',
        endDate: '2019-01-03T08:00:00.000Z',
        time: '9:30 am - 1:30 pm',
        location: {
          address: 'Tata Elxsi, Prestige Shantiniketan',
          city: 'Bangalore',
          state: 'Karnataka',
        },
        modes: {
          inPerson: true,
          online: false,
        },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/2000px-AngularJS_logo.svg.png',
      },
      {
        name: 'React JS Masterclass',
        category: 'frontend',
        id: 2,
        description:
          '<p><strong>React</strong> (also known as <strong>React.js</strong> or <strong>ReactJS</strong>) is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.</p><p>React can be used as a base in the development of single-page or mobile applications. Complex React applications usually require the use of additional libraries for state management, routing, and interaction with an API.</p>',
        startDate: '2019-01-14T04:30:00.000Z',
        endDate: '2019-01-16T12:30:00.000Z',
        time: '10:00 am - 6:00 pm',
        location: {
          address: 'Tata Elxsi, IT Park',
          city: 'Trivandrum',
          state: 'Kerala',
        },
        modes: {
          inPerson: true,
          online: true,
        },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
      },
    ] as IWorkshop[];
}

export {
    getWorkshops
};
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```tsx
import { useEffect } from "react";
import { getWorkshops } from "../../../services/workshops";

const WorkshopsList = () => {
    // side-effect -> eg. we want to fetch workshops data from the backend
    useEffect(
        () => {
            const workshops = getWorkshops();
            console.log(workshops);
        },
        // [ ] // empty array -> causes the effect to execute only AFTER first render
        []
    );

    return <div>WorkshopsList works!</div>;
};

export default WorkshopsList;
```
Check the console to verify if the workshops fetched from the service are displayed.
- __Notes__:
1. The workshops will be displayed twice. This is due to the component initializing twice when running in React Strict mode (a feature that React has to run better error checks and report them better in development). You can prevent it if needed by removing the wrapping `<React.StrictMode></React.StrictMode>` in `src/index.tsx`. This is not recommended however (just keep it intact).

## Step 10: Fetch actual workshops from the backend and provide it through a Promise
- You can use the native `fetch` API to get data from the backend. However a third-party library like `axios` provides more features for working with HTTP requests and is easier to work with. Install `axios`.
```
npm i axios
```
- Modify the function in `src/components/WorkshopsList/WorkshopsList.ts` in order to make a request to the backend, and return a Promise for the workshops (or an error). The actual call is made when a consumer (in our case the `WorkshopsList` component) calls this function and waits for the result. You can use the local development backend URL (`http://localhost:8001/workshops`) instead of the production URL if you wish.
```ts
import axios from 'axios';
import IWorkshop from '../models/IWorkshop';

const getWorkshops = async () => {
    // We get a "Promise" object from axios.get()
    // Initially the Promise is in the "pending". Then the Promise is "resolved" / "rejected".
    // NOTE: Explore then(), catch() methods of Promise
    const response = await axios.get<IWorkshop[]>(`https://workshops-server.onrender.com/workshops`);
    return response.data;
};

export {
    getWorkshops
};
```
- Update `src/components/workshops/WorkshopsList/WorkshopsList.tsx` to consume the service
```tsx
import { useEffect, useState } from "react";
import { getWorkshops } from "../../../services/workshops";
import IWorkshop from "../../../models/IWorkshop";

const WorkshopsList = () => {
    const [loading, setLoading] = useState(true);
    const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
    const [error, setError] = useState<Error | null>(null);

    // side-effect -> eg. we want to fetch workshops data from the backend
    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshops = await getWorkshops();
                    // console.log(workshops);
                    setWorkshops(workshops);
                    setLoading(false);
                } catch (error) {
                    // console.log(error);
                    setError(error as Error);
                    setLoading(false);
                }
            };

            helper();
        },
        []
    );
};

export default WorkshopsList;
```
- __Note__: The `helper` function is needed to overcome a technical problem when using `useEffect()`. `useEffect` can return nothing (`undefined`), or a cleanup function only (function type). Since an `async` function always returns a Promise, the effect function cannot be made `async` (in order to `await` on the call to `getWorkshops`). Hence the workaround with the `helper`.

## Step 11: Showing list of workshops and loading, error states
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
import { Alert, Button, Col, Card, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router";
```
```tsx
return (
    <div>
        <h1>List of workshops</h1>
        <hr />
        <div>
            {/* What we generate by calling Array map() */}
            {/*
                {
                    [
                        <div key={workshops[0].id}>{workshops[0].name}</div>,
                        <div key={workshops[1].id}>{workshops[1].name}</div>,
                        <div key={workshops[2].id}>{workshops[2].name}</div>,
                        <div key={workshops[3].id}>{workshops[3].name}</div>,
                        ....
                    ]
                */
            }
            {
                workshops.map((workshop, idx) => (
                    <div key={workshop.id}>{ workshop.name }</div>
                ))
            }
        </div>
    </div>
);
```
- __Notes__:
1. `key` is set to any value that is unique for every workshop, eg. id, name etc. It is needed to boost the performance of list rendering when new elements are added to / removed from the list (best practice). This is crucial for large lists.

- Add loading and error states to enhance user experience. In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
import { Alert, Button, Col, Card, Row, Spinner } from "react-bootstrap";
```
```tsx
return (
    <>
        <h1>List of workshops</h1>
        <hr />
        {
            /* if..else like behavior using ? : */
            loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>Completed loading</div>
            )
        }
        {
            /* if like behavior using && */
            loading === false && error !== null && (
                <Alert variant="danger">{error.message}</Alert>
            )
        }
        {
            loading === false && error === null && (
                workshops.map((workshop, idx) => (
                    <div key={workshop.id}>{ workshop.name }</div>
                ))
            )
        }
    </>
);
```

## Step 12: Create utility components for showing loading and error states in the UI when fetching data from the backend
- Create `src/components/common/LoadingSpinner/LoadingSpinner.tsx`, `src/components/common/ErrorAlert`
- Move the code for the spinner from `src/components/workshops/WorkshopsList/WorkshopsList.tsx` to `src/components/common/LoadingSpinner/LoadingSpinner.tsx`
```tsx
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
    return (
        <div className="text-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, we import `LoadingSpinner`
```tsx
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
```
- Use this in place of the Bootstrap spinner
```tsx
{
    /* if..else like behavior using ? : */
    loading ? <LoadingSpinner /> : <div>Completed loading</div>
}
```
- Move the code for the error alert from `src/common/workshops/WorkshopsList/WorkshopsList.tsx` to `src/common/ErrorAlert/ErrorAlert.tsx`. For now, let's hard-code the error message as `Some error occured`.
```tsx
import { Alert } from "react-bootstrap";

const ErrorAlert = () => {
    return (
        <Alert variant="danger">
            Some error occured
        </Alert>
    );
};

export default ErrorAlert;
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, import the error alert component
```tsx
import ErrorAlert from "../../common/ErrorAlert/ErrorAlert";
```
- Replace with an `ErrorAlert` component instance
```tsx
{
    /* if like behavior using && */
    loading === false && error !== null && (
        <ErrorAlert />
    )
}
```

## Step 13: Passing error object as input to error alert, theme variant as input to the spinner component, and showing it in the UI
- In the `src/components/common/ErrorAlert/ErrorAlert.tsx` add an `error` prop. As a good practice we check for null error object and display only if an error is actually passed.
```tsx
import { Alert } from "react-bootstrap";

interface Props {
    error: Error;
}

const ErrorAlert = ({ error }: Props) => {
    return error !== null ? (
        <Alert variant="danger">
            {error.message}
        </Alert>
    ) : null;
};

export default ErrorAlert;
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx` pass the `error` object to `ErrorAlert`
```tsx
{
    /* if like behavior using && */
    loading === false && error !== null && (
        <ErrorAlert error={error} />
    )
}
```
- Let's theme the spinner. We will add an input parameter `variant` that takes one of the 8 Bootstrap themes as a string input. First define the theme values as a type in `src/models/utils.ts`
```ts
type Theme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning'
  | 'light'
  | 'dark';

export type { Theme };
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, pass in `variant` as an input attribute.
```tsx
{ loading ? <LoadingSpinner variant="success" /> : <div>Completed loading</div> }
```
- Accept it in `src/components/common/LoadingSpinner/LoadingSpinner.tsx` and apply the appropriate Bootstrap spinner class conditionally
```ts
import { Spinner } from "react-bootstrap";
import type { Theme } from '../../../models/utils';

interface Props {
    variant: Theme
}

const LoadingSpinner = ( { variant } : Props ) => {
    return (
        <div className="text-center">
            <Spinner animation="border" role="status" variant={variant}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;
```

## Step 14: Create component for workshops list item
- Create a component to show a workshop item in  `src/components/workshops/WorkshopsList/Item/Item.tsx`
```tsx
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import IWorkshop from "../../../../models/IWorkshop";

import './Item.scss';

const Item = ({ name, id, imageUrl, location }: IWorkshop) => {
    return (
        <Card className="w-100 p-3">
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {location.address}, {location.city}, {location.state}
                </Card.Text>
                <Link to={`/workshops/${id}`}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Item;
```
- Provide required styles in `src/components/workshops/WorkshopsList/Item/Item.scss`
```scss
.card-img-top-wrapper {
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    // nesting selectors in SCSS
    // in css this selector becomes -> .card-img-top-wrapper .card-img-top
    .card-img-top {
        width: 50%;
    }
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 240px;
}
```
- Import item in `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```tsx
import Item from "./Item/Item";
```
- Render the item in the loop, and pass the workshop as an input to it. We also set a responsive layout for list of items using the Boostrap Grid system.
```tsx
{loading === false && error === null && (
    <Row xs={1} md={3} lg={4}>
        {workshops.map((workshop, idx) => (
            <Col className="my-3 d-flex" key={workshop.id}>
                <Item {...workshop} />
            </Col>
        ))}
    </Row>
)}
```

## Step 15: Formatting displayed content
- We can use `date-fns` library to format dates. Other popular alternatives are JavaScript's `Intl.DateTimeFormat` and `moment.js` (deprecated but popular library). You can even use `react-moment` that uses `moment.js` and provides a component to display formatted dates. We use `date-fns`.
```
npm i date-fns
```
- __Reference__: https://date-fns.org/
- Create a utility component to display dates. Add this in `src/components/common/FormattedDate/FormattedDate.tsx`
```tsx
// https://date-fns.org/
import { format } from "date-fns";

interface Props {
    date?: string | number | Date,
    dateFormat?: string
}

// "PPP" is a shorthand for a long, localized date format. It is equivalent to "do MMMM yyyy"
const FormattedDate = ({ date = new Date(), dateFormat = "PPP" } : Props) => {
  try {
    return <span>{format(new Date(date), dateFormat)}</span>;
  } catch (error) {
    return <span>Invalid date</span>;
  }
};

export default FormattedDate;
```
- In `src/components/workshops/WorkshopsList/Item/Item.tsx`
```tsx
import { Card, Button } from "react-bootstrap";

import FormattedDate from "../../../common/FormattedDate/FormattedDate";

import IWorkshop from "../../../../models/IWorkshop";

import './Item.scss';

const Item = ({ name, id, imageUrl, location, startDate, endDate }: IWorkshop) => {
    return (
        <Card className="w-100 p-3">
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text as="div">
                    <div>{location.address}, {location.city}, {location.state}</div>
                    <div>
                        <FormattedDate date={startDate} />
                        <span> - </span>
                        <FormattedDate date={endDate} />
                    </div>
                </Card.Text>
                <Button variant="primary">Know more</Button>
            </Card.Body>
        </Card>
    );
};

export default Item;
```
- __EXERCISE__: Create a custom component for formatting location information. Use it to render the location information.

## Step 16: Add pagination for workshops list page
- Install `axios` for making calls to the backend (you can use the browser native `fetch` API, but `axios` is a very popular alternative due to its simpler syntax and wide variety of options)
```
npm i axios
```
- __Reference__: https://axios-http.com/
- Modify `src/services/workshops.ts` to support pagination (the backend takes an `_page` query string parameter)
```ts
import axios from "axios";
import IWorkshop from "../models/IWorkshop";

const getWorkshops = async (page: number = 1) => {
    // we get a "Promise" object from axios.get()
    // initially "pending" state of Promise
    // then the Promise goes to "resolved" / "rejected"
    // NOTE: Explore then(), catch() methods
    // Example: GET https://workshops-server.onrender.com/workshops?page=2
    const response = await axios.get<IWorkshop[]>(
        `https://workshops-server.onrender.com/workshops`,
        {
            params: {
                _page: page,
            },
        }
    );

    return response.data;
};
```
- Maintain `page` state in `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```tsx
const [loading, setLoading] = useState(true);
const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
const [error, setError] = useState<Error | null>(null);

// Add this...
const [page, setPage] = useState(1);
```
- Also set up the function that change the `page` state
```tsx
const previous = (newPage: number) => {
    if (page <= 1) {
        return;
    }

    // when the new state depends on the current state, we use the function form of the setter
    setPage((p) => p - 1);
};

const next = (newPage: number) => {
    setPage((p) => p + 1);
};
```
- Set up the pagination UI
```tsx
<h1>List of workshops</h1>
<hr />
{/* Add this... */}
<div>
    <Button
        variant="primary"
        size="sm"
        disabled={
            !(loading === false && error === null) || page === 1
        }
        onClick={(event) => previous(page - 1)}
        className="me-2"
    >
        Previous
    </Button>
    <Button
        variant="primary"
        size="sm"
        disabled={!(loading === false && error === null)}
        onClick={() => next(page + 1)}
    >
        Next
    </Button>
    <div>You are viewing page {page}</div>
</div>
```
- Modify the call to `getWorkshops()` to pass the page number to the service's `getWorkshops()`. We use an effect that runs both on initial page load as well as when `page` changes.
```tsx
import { useEffect, useState } from 'react';
```
```tsx
const [page, setPage] = useState(1);

// Add this...
// side-effect -> eg. we want to fetch workshops data from the backend
useEffect(
    () => {
        const helper = async () => {
            setLoading(true);

            try {
                const workshops = await getWorkshops(page);
                // console.log(workshops);
                setWorkshops(workshops);
                setLoading(false);
            } catch (error) {
                // console.log(error);
                setError(error as Error);
                setLoading(false);
            }
        };

        helper();
    },
    // [ ] // empty array -> causes the effect to execute only AFTER first render
    [page] // execute AFTER first render + whenever page change
);
```

## Step 17: Creating and using a pagination component, communication from child to parent using a callback prop (function passed as a prop)
- It makes sense to create a utility component for pagination. That would make it reusable.
- Set up the the `Pagination` component in `src/components/common/Pagination/Pagination.tsx`
```tsx
import { Button } from "react-bootstrap";

interface Props {
    page?: number,
    onPrevious?: (newPage: number) => void,
    onNext?: (newPage: number) => void,
    disablePrevious?: boolean,
    disableNext?: boolean,
}

const Pagination = (
    {
        page = 1,
        onPrevious = () => {},
        onNext = () => {},
        disablePrevious = false,
        disableNext = false
    } : Props
) => {
    return (
        <>
            <Button
                variant="primary"
                size="sm"
                disabled={disablePrevious || page === 1}
                onClick={(event) => onPrevious(page - 1)}
                className="me-2"
            >
                Previous
            </Button>
            <Button
                variant="primary"
                size="sm"
                disabled={disableNext}
                onClick={() => onNext(page + 1)}
            >
                Next
            </Button>
            <div>You are viewing page {page}</div>
        </>
    );
}

export default Pagination;
```
- Update `src/components/workshops/WorkshopsList/WorkshopsList.tsx` to use this component instead
```tsx
import Pagination from "../../common/Pagination/Pagination";```
```
```tsx
<div>
    <Pagination
        page={page}
        onPrevious={previous}
        onNext={next}
        disablePrevious={!(loading === false && error === null)}
        disableNext={!(loading === false && error === null)}
    />
</div>
```
- __EXERCISE__: To improve the user experience of the pagination component, we support a `loading` input attribute that is to be set to `true` when the data is being fetched for a page. The component should display the message __Loading page {page}__ when loading is `true`. Make use of this new prop to show the loading message.

## Step 18: Maintain page number state in query string
- Maintaining the current page number as a query string parameter, serves as current page state information. We can make use of this and enhance user experience further by loading the desired page of workshops on page load (i.e. if you are on `http://localhost:3000/workshops?page=2` and refresh the page, you can still fetch and load the second page of workshops instead of the first).
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, first make the change to set the query string `page` parameter when user tries to navigate to a new page. We use the setter for a query string from the `useSearchParams` hook for this. Since the query string holds the page, we do not need the `page` state maintained by the component. Get the page number from the query params using the same hook - the effect to fetch workshops on page change is unchanged.
```tsx
import { useSearchParams } from "react-router-dom";
```
```tsx
// const [page, setPage] = useState(1);
const [searchParams, setSearchParams] = useSearchParams();
const page = +(searchParams.get("page") || "1"); // Default to page 1
```
```tsx
const previous = (newPage: number) => {
    if (page <= 1) {
        return;
    }

    setSearchParams({ page: '' + newPage });
};

const next = (newPage: number) => {
    setSearchParams({ page: '' + newPage });
};
```
- Navigate to different pages and refresh to note that the right data for the page is fetched.

## Step 19: Controlled components pattern and implementing filtering of workshops list (by name) in the frontend
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`, addd state for implementing filtering
```tsx
const [filterKey, setFilterKey] = useState('React');
const [filteredWorkshops, setFilteredWorkshops] = useState<IWorkshop[]>([]);
```
- Add the side-effect for filtering when `filterKey` or `workshops` states change. Note we have multiple side-effects (multiple calls to `useEffect`) - this is how side-effects are organized (each feature implemented in a separate `useEffect`).
```tsx
// side-effect for filtering when filterKey or workshops states change
useEffect(
    () => {
        setFilteredWorkshops(
            workshops.filter(
                (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
            )
        );
    },
    [workshops, filterKey]
);
```
- Add the UI for filtering. Using `value` long with the `onChange` handler for an input ensures the state holding the user input (`filterKey`), and the native user input state, are in sync. This is what frameworks like Angular, Vue term __2-way data binding__. React calls this pattern as __controlled components__ (the input state is controlled by the React component maintained state, here by `filterKey`).
```tsx
<div>
    <input
        type="search"
        className="form-control"
        placeholder="Type to search by name"
        value={filterKey}
        onChange={(event) => setFilterKey(event.target.value)}
    />
    <div>
        Workshops whose name has
        <span className="text-primary"> {filterKey} </span> are shown.
    </div>
</div>
```
- Update the UI to show only filtered workshops
```tsx
<Row xs={1} md={3} lg={4}>
    {filteredWorkshops.map((workshop, idx) => (
        <Col className="my-3 d-flex" key={workshop.id}>
            <Item {...workshop} />
        </Col>
    ))}
</Row>
```
- Now that we have understood how the controlled components pattern works, we can change the initial state of `filterKey` so that all workshops are shown
```tsx
const [filterKey, setFilterKey] = useState('');
```

## Step 20: Implementing filtering of workshops list (by category) in the backend
- Modify the service method `getWorkshops()` in `src/services/workshops.ts` to support filtering by category
```ts
const getWorkshops = async (page: number = 1, category: string = '') => {
    const params: {
        _page: number;
        category?: string
    } = {
        _page: page,
    };

    if (category !== '') {
        params.category = category;
    }

    const response = await axios.get<IWorkshop[]>(
        `https://workshops-server.onrender.com/workshops`,
        {
            // params: params,
            params,
        }
    );

    return response.data;
}
```
- Enable filtering by category in `src/components/workshops/WorkshopsList/WorkshopsList.tsx`. Just like in pagination, we maintain the filter catgeory in the query string, instead of local component state, so that there is a category-specific rendering of the page.
```tsx
const category = searchParams.get("category") || "";
```
- Update the effect that fetches workshops from the backend to run on `category` changes.
```tsx
useEffect(
    () => {
        const helper = async () => {
            setLoading(true);

            try {
                const workshops = await getWorkshops(page, category);
                
                setWorkshops(workshops);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        helper();
    },
    [page, category]
);
```
- Add the UI for filtering by category
```tsx
<div>
    <div className="btn-group my-3" role="group" aria-label="Filter by category">
        <button type="button" className="btn btn-primary" onClick={() => setSearchParams({ category: '' })}>All</button>
        <button type="button" className="btn btn-danger" onClick={() => setSearchParams({ category: 'frontend' })}>Frontend</button>
        <button type="button" className="btn btn-warning" onClick={() => setSearchParams({ category: 'backend' })}>Backend</button>
        <button type="button" className="btn btn-success" onClick={() => setSearchParams({ category: 'devops' })}>Devops</button>
        <button type="button" className="btn btn-info" onClick={() => setSearchParams({ category: 'language' })}>Language</button>
        <button type="button" className="btn btn-light" onClick={() => setSearchParams({ category: 'mobile' })}>Mobile</button>
        <button type="button" className="btn btn-dark" onClick={() => setSearchParams({ category: 'database' })}>Database</button>
    </div>
</div>
```
- The `category` wuery param remains even when all categories need to be displayed. This can be removed by using better logic to handle query params, and is left as an exercise. As a hint, consider using a function like this.
```tsx
// Function to update multiple query parameters
const updateQueryParams = (newParams) => {
    setSearchParams(
        (prev) => {
            const updatedParams = new URLSearchParams(prev);
            
            Object.keys(newParams).forEach((key) => {
                if (newParams[key] === null) {
                    updatedParams.delete(key); // Remove param if value is null
                } else {
                    updatedParams.set(key, newParams[key]);
                }
            });
            
            return updatedParams;
        }
    );
};
```

## Step 21: Adding a workshop details page
- Create a component to show a workshop's details in  `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
const WorkshopDetails = () => {
    return (
        <div>WorkshopDetails works!</div>
    );
};

export default WorkshopDetails;
```
- Since this is a page component, we follow Next JS routing structure as a convention, and define the page In `src/pages/workshops/[id]/index.tsx`. The `[id]` is used to indicate that the route for this page would be `/workshops/:id` where `:id` is a dynamic path parameter.
```tsx
import WorkshopDetails from "../../../components/workshops/WorkshopDetails/WorkshopDetails";

const WorkshopDetailsPage = () => {
    return <WorkshopDetails />;
};

export default WorkshopDetailsPage;
```
- Set up the route. Observe the use of dynamic path parameters. The name `id` we have given to the second path fragment (first being `workshops`), will be useful later to extract the workshop's id from the browser windows' location. In `src/App.tsx` add the new route. Note that in earlier versions of React router, the order of this route mattered (it should be after the ones for add workshops, and favorites). Starting React router v6, this does not matter (it does routing more intelligently).
```tsx
import WorkshopDetailsPage from './pages/workshops/[id]';
```
```tsx
<Routes>
    <Route path="/home" element={<Navigate to ="/" />} />
    <Route path="/workshops" element={<WorkshopsListPage />} />
    <Route path="/workshops/add" element={<AddWorkshopPage />} />
    <Route path="/workshops/favorites" element={<FavoritesPage />} />
    <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
</Routes>
```
- Set the link in workshops list item to navigate to the workshop details page. In `src/components/workshops/WorkshopsList/Item/Item.tsx`,
```tsx
import { Link } from "react-router-dom";
```
```tsx
<Link to={`/workshops/${id}`}>
    <Button variant="primary">Know more</Button>
</Link>
```
- Click on the workshop __Know more__ button-styled links to navigate to the details page.

## Step 22: Fetching and showing details of the workshop
- Add a method to fetch a workshop's details by its id in `src/services/workshops.ts`. Note that this API endpoint returns a single `IWorkshop` object (__NOT__ an array).
```ts
const getWorkshopById = async (id: number) => {
    const response = await axios.get<IWorkshop>(
        `https://workshops-server.onrender.com/workshops/${id}`
    );

    return response.data;
};
```
- In `src/pages/workshops/[id]/index.tsx` use the `useParams` hook to extract the `id` path parameter, and pass it to the `WorkshopDetails` component (after converting the `id` string to a number). 
```tsx
import WorkshopDetails from "../../../components/workshops/WorkshopDetails/WorkshopDetails";
import { useParams } from 'react-router-dom';

const WorkshopDetailsPage = () => {
    const { id } = useParams();

    return (
        <WorkshopDetails id={+(id as string)}/>
    );
}

export default WorkshopDetailsPage;
```
- Make sure to define the `id` prop in `src/components/workshops/WorkshopDetails`. Also add the state and effect to fetch and show the details of the component with the desired `id`.
```tsx
import { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../../ErrorAlert/ErrorAlert";

import { getWorkshopById } from '../../../services/workshops';
import IWorkshop from '../../../models/IWorkshop';
import FormattedDate from '../../common/FormattedDate/FormattedDate';

interface Props {
    id: number
}

const WorkshopDetails = ({ id } : Props) => {
    const [loading, setLoading] = useState(true);
    const [workshop, setWorkshop] = useState<IWorkshop | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshop = await getWorkshopById(id);

                    setLoading(false);
                    setWorkshop(workshop);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        []
    );

    return (
        <div>
            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && workshop && (
                <>
                    <h1>{workshop.name}</h1>
                    <hr />
                    <Row>
                        <Col xs={12} md={4}>
                            <Image
                                src={workshop.imageUrl}
                                alt={workshop.name}
                                fluid
                            />
                        </Col>
                        <Col xs={12} md={8}>
                            <div className="mb-3">
                                <div>{workshop.time}</div>
                                <div>
                                    <FormattedDate date={workshop.startDate} />
                                    <span> - </span>
                                    <FormattedDate date={workshop.endDate} />
                                </div>
                                <div>
                                    {workshop.location.address},
                                    {workshop.location.city},
                                    {workshop.location.state}
                                </div>
                            </div>
                            <div>{workshop.description}</div>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default WorkshopDetails;
```
- React uses innerText to bind text content of an element. Note the use of `dangerouslySetInnerHTML` prop to set `innerHTML` instead of `innerText` that is used otherwise. When using `innerHTML` for binding user-generated content (like user reviews, blog articles, comments, social media posts etc.) you need to be aware of XSS vulnerability. Make sure such content has been sanitized in the backend.
```tsx
<div dangerouslySetInnerHTML={{
    __html: workshop.description
}}></div>
```
- __EXERCISE__: Check packages `react-query` or `@tanstack/react-query` to tackle duplication of logic to fetch data and maintain loading and error states. This uses the concept of "custom hooks" to share stateful logic between components.
- __EXERCISE__: Update the title of the workshop details page to the name of the actual workshop loaded. Refer https://react.dev/reference/react-dom/components/title, or use a package like `react-helmet`

## Step 23: Install FontAwesome and use its icons
- [FontAwesome](https://fontawesome.com/) provides a large set of icons for free (free for use in commercial projects). Follow the steps at https://docs.fontawesome.com/web/use-with/react to use it in react apps like this one. Make sure to install the Free SVG Icon Package in step 2 (do not install the Pro ones).
- Make available necessary icons like so. Add this in `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
```
- Add it below the location details
```tsx
<div>
    {workshop.location.address},
    {workshop.location.city},
    {workshop.location.state}
</div>

{/* Add this */}
<div>
    <span class="me-4">
        <FontAwesomeIcon icon={workshop.modes.inPerson ? faCheckCircle : faTimesCircle} />
        In person
    </span>
    <span>
        <FontAwesomeIcon icon={workshop.modes.online ? faCheckCircle : faTimesCircle} />
        Online
    </span>
</div>
```

## Step 24: Add child routing to show session list / add session form based on the child route
- Child routes add on the the parent route and are used to show one of a set of children components conditionally in a parent component. We will show sessions list below the workshop details if the URL is `http://localhost:3000/workshops/:id` (adds nothing to the parent route), and the add session form below the workshop details if the URL is `http://localhost:3000/workshops/:id/add-session` (Adds 'add-session' to the parent route).
- Create 2 components to be used as children in workshop details component. These are part of the `WorkshopDetails` component and hence we do not create page components for these. First create `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx`.
```tsx
const SessionsList = () => {
    return (
        <div>SessionsList works!</div>
    );
};

export default SessionsList;
```
- Next create First create `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
const AddSession = () => {
    return (
        <div>AddSession works!</div>
    );
};

export default AddSession;
```
- Add routes for these components (child routing). Note how we need to mention only what needs to be added to the parent route in their paths. In `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
import SessionsList from './SessionsList/SessionsList';
import AddSession from './AddSession/AddSession';
```
- Add the UI after the UI showing details of the workshop
```tsx
<div className="my-4">
    <Routes>
        <Route path="" element={<SessionsList id={id} />} />
        <Route path="/add" element={<AddSession id={id} />} />
    </Routes>
</div>
```
- We also need to enable child routing by changing the route for the details page from `/workshops/:id` to `/workshops/:id/*`.
```tsx
<Route path="/workshops/:id/*" element={<WorkshopDetailsPage />} />
```
- You should now be able to see differen child components when visiting `/workshops/1` and `/workshops/1/add`.
- Add `NavLink` to switch between children. By default, the `active` class is added to the active link. If we want to use a custom class, we can do it using a function value for `className` prop, like so
```tsx
<div class="mt-5">
    <NavLink
        to={"/workshops/" + id}
        exact
        className={
            ({ isActive }) => "btn btn-primary btn-sm btn-child-link" + ( isActive ? "btn-active" : "" )
        }
    >
        Sessions List
    </NavLink>
    <NavLink
        to={"/workshops/" + id + "/add"}
        className={
            ({ isActive }) => "btn btn-primary btn-sm btn-child-link" + ( isActive ? "btn-active" : "" )
        }
    >
        Add a session
    </NavLink>
</div>
```
- In `src/components/workshops/WorkshopDetails/WorkshopDetails.scss`,
```scss
.btn-child-link {
    opacity: 0.5;
}

.btn-active {
    opacity: 1;
}
```
- Add the style import in `src/components/workshops/WorkshopDetails/WorkshopDetails.tsx`
```tsx
import './WorkshopDetails.scss';
```
- You can now switch between the child routes using the links.
- __EXERCISE__: Try to set up the child routing using the `Outlet` component discussed before.

## Step 25: Fetch and show sessions for the workshop
- In `src/models/ISession.ts` define the model to represent a session
```ts
type Level = 'Basic' | 'Intermediate' | 'Advanced';

interface ISession {
    id: number;
    workshopId: number;
    sequenceId: number;
    name: string;
    speaker: string;
    duration: number;
    level: Level;
    abstract: string;
    upvoteCount: number;
}

export type {
    Level,
    ISession as default
};
```
- The general practice is to create a service for every REST resource (roughly an database entity in the backend). Create the service `src/services/sessions.ts` and define the service method to fetch sessions for the workshop with a given id.
```ts
import axios from "axios";
import ISession from "../models/ISession";

const = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `https://workshops-server.onrender.com/workshops/${workshopId}/sessions`
    );

    return response.data;
};

export { getSessionsForWorkshop };
```
- In `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx` fetch the sessions.
```tsx
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../../../ErrorAlert/ErrorAlert";

import { getSessionsForWorkshop } from "../../../../services/sessions";
import ISession from "../../../../models/ISession";

interface Props {
    id: number
}

const SessionsList = ( { id } : Props ) => {
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const sessions = await getSessionsForWorkshop(id);

                    setLoading(false);
                    setSessions(sessions);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        []
    );

    return (
        <div>
            <h2>List of Sessions</h2>

            <hr />

            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && (
                <ListGroup>
                    {sessions.map((s, idx) => (
                        <ListGroup.Item key={s.id}>
                            <Row>
                                <Col
                                    xs={1}
                                    className="d-flex flex-column justify-content-center align-items-center"
                                >
                                    {/* @todo voting widget */}
                                    {s.upvoteCount}
                                </Col>
                                <Col xs={11}>
                                    <h3>{{ s.name }}</h3>
                                    <div>by {{ s.speaker }}</div>
                                    <div>{{ s.level }}</div>
                                    <div>{{ s.duration }}</div>
                                    <div>{{ s.abstract }}</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            )}
        </div>
    );
};

export default SessionsList;
```
- __EXERCISE__: Move the display of sessions list items to a separate component - `src/components/workshops/WorkshopDetails/SessionsList/Item/Item.tsx` (just the way we created workshops list item as a separate component). The following steps assume you complete this exercise.
- __Solution to the exercise__
- In `src/components/workshops/WorkshopDetails/SessionsList/Item/Item.tsx`
```tsx
import ISession from "../../../../../models/ISession";

interface Props {
    session: ISession
}

const Item = ( { session } : Props ) => {
    const { id, name, speaker, level, abstract, upvoteCount } = session;

    return (
        <Row>
            <Col
                xs={1}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                {/* @todo voting widget */}
                {upvoteCount}
            </Col>
            <Col xs={11}>
                <h3>{{ name }}</h3>
                <div>by {{ speaker }}</div>
                <div>{{ level }}</div>
                <div>{{ duration }}</div>
                <div>{{ abstract }}</div>
            </Col>
        </Row>
    );
}

export default Item;
```
- In `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx`
```tsx
{sessions.map((s, idx) => (
    <ListGroup.Item key={s.id}>
        <Item session={s}/>
    </ListGroup.Item>
)}
```

## Step 26: Create a voting widget component and use it for voting on a session
- Create the service method to vote on a session in `src/services/sessions.ts`
```ts
export type VoteType = 'upvote' | 'downvote';
```
```ts
const voteForSession = async (sessionId: number, voteType: VoteType) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.put<ISession>(
        `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

export { getSessionsForWorkshop, voteForSession };
```
- Create the voting widget component that will be useful for showing votes and providing voting buttons where needed. It takes `votes` as a prop, and uses a __callback prop__ (function passed as a prop) events (say `vote`) that is called when the upvote or downvote buttons are clicked. __Callback props are the means for child to parent communication in React__.
- In `src/models/utils.ts`, and and export this
```ts
// Add this...
type VoteType = 'upvote' | 'downvote';

export type { Theme. VoteType };
```
- In `src/components/common/VotingWidget/VotingWidget.tsx`
```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-regular-svg-icons";
import { VoteType } from '../../../models/utils';

import './VotingWidget.scss';

export type VoteFunction = ( voteType: VoteType ) => void;

interface Props {
    votes: number,
    vote: VoteFunction
}

const VotingWidget = ( { votes, vote } : Props ) => {
    return (
        <div className="voting-widget">
            <FontAwesomeIcon
                icon={faCaretUp}
                onClick={() => vote('upvote')}
                className="fa-2x voting-widget-button"
            />
            <span className="voting-widget-votes">{{ votes }}</span>
            <fFontAwesomeIcon
                icon={faCaretDown}
                onClick={() => vote('downvote')}
                className="fa-2x voting-widget-button"
            />
        </div>
    );
}

export default VotingWidget;
```
- In `src/components/common/VotingWidget/VotingWidget.scss`,
```scss
.voting-widget {
    display: flex;
    flex-direction: column;
    align-items: center;

    .voting-widget-button {
        color: green;
        cursor: pointer;
    }

    .voting-widget-votes {
        font-size: 2em;
        margin: 0 1em;
    }
}
```
- Use the voting widget component in `src/components/workshops/WorkshopDetails/SessionsList/Item/Item.tsx`. Add the `vote` prop here as well. Pass down `vote` and `votes` to the voting widget.
```tsx
import ISession from "../../../../../models/ISession";
import VotingWidget, { VoteFunction } from "../../../../common/VotingWidget/VotingWidget";

interface Props {
    session: ISession,
    vote: VoteFunction
}

const Item = ( { session, vote } : Props ) => {
    const { id, name, speaker, level, abstract, upvoteCount } = session;

    return (
        <Row>
            <Col
                xs={1}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <VotingWidget
                    votes={upvoteCount}
                    vote={vote}
                />
            </Col>
            <Col xs={11}>
                <h3>{{ name }}</h3>
                <div>by {{ speaker }}</div>
                <div>{{ level }}</div>
                <div>{{ duration }}</div>
                <div>{{ abstract }}</div>
            </Col>
        </Row>
    );
}

export default Item;
```
- In `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx` define the `vote` callback prop and pass it down to `Item` instances
```tsx
import { VoteType } from "../../../../models/utils";
```
```tsx
const vote = (sessionId: number, voteType: VoteType) => {
    // @todo make a call to the backend to vote
};
```
```tsx
{sessions.map((s, idx) => (
    <ListGroup.Item key={s.id}>
        <Item
            session={s}
            vote={voteType => vote(s.id, voteType)}
        />
    </ListGroup.Item>
)}
```
- Add a service method in `src/services/sessions.ts`
```ts
import { VoteType } from "../models/utils";
```
```ts
const voteForSession = async (sessionId: number, voteType: VoteType) => {
    const response = await axios.put<ISession>(
        `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

export { getSessionsForWorkshop, voteForSession };
```
- Complete the remaining voting logic in `src/components/workshops/WorkshopDetails/SessionsList/SessionsList.tsx`
```tsx
import { voteForSession } from "../../../../services/sessions";
```
```tsx
const vote = async (
    sessionId: number,
    voteType: 'upvote' | 'downvote'
) => {
    alert(sessionId + ' ' + voteType);

    // call the service
    try {
        const updatedSession = await voteForSession(sessionId, voteType);
        setSessions(
            sessions => sessions.map( s => s.id === updatedSession.id ? updatedSession : s )
        );
    } catch(error) {
        alert((error as Error).message);
    }
};
```

## Step 27: Using environment files for enabling environment-based settings
- Environment files help us to use settings for the application based on the environment. We can, for example, have our code work without changes, and comunicate with a local development server in development, and a production server, in a production environment. Create React App (the `react-scripts` package) will take care to use the appropriate settings based on the application build (development/staging/production etc.)
- In `.env`
```
REACT_APP_API_URL=http://localhost:8001
```
- In `.env.production`
```
REACT_APP_API_URL=https://workshops-server.onrender.com
```
- Do necessary changes in `src/services/workshops.ts` 
```ts
const apiUrl = process.env.REACT_APP_API_URL;
```
- In `getWorkshops` use this URL
```ts
`${this.apiUrl}/workshops`
```
- In `getWorkshopById` use this URL
```ts
`${apiUrl}/workshops/${workshopId}`
```
- Do necessary changes in `src/services/sessions.ts`
```ts
const apiUrl = process.env.REACT_APP_API_URL;
```
- In `getSessionsForWorkshop` use this URL
```ts
`${apiUrl}/workshops/${workshopId}/sessions`
```
- In `voteForSession` use this URL
```ts
`${apiUrl}/sessions/${sessionId}/${voteType}`
```
- Create the production build, and serve the app from the build folder. Verify from the network tab that the production backend is the one being used in HTTP requests now.
    - __Note__: More details to be added to this step.

## Step 28: Set up a toast message service and container to display toast messages
- Use built-in React Bootstrap Toast and ToastContainer (difficult to set up but gels with the theme), or a third-party toast component like `react-toastify` (https://www.npmjs.com/package/react-toastify).
- To be done

## Step 30: Deleting a workshop
- Add a service method to delete a workshop with a given id in `src/services/workshops.ts`. Note that we use void to indicate an empty-bodied response.
```ts
deleteWorkshopById(workshopId: number) {
    return http.delete<void>(`${apiUrl}/workshops/${workshopId}`);
}
```
- In `src/components/workshops/WorkshopsList/Item/Item.tsx`,
```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-regular-svg-icons";
```
```tsx
<Button
    variant="danger"
    size="sm"
    title="Delete this workshop"
    onClick={onDelete}
>
    <FontAwesomeIcon
        icon={faTrash}
        className="fa-2x"
    />
</Button>
```
- Set up a callback prop `onDelete` to inform to the parent when user clicks on the delete icon
```tsx
interface Props extends IWorkshop {
    onDelete: () => void
}

const Item = ({ name, id, imageUrl, location, startDate, endDate }: Props) => {
    // existing code...
};
```
- In the parent component `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
<Item
    {...workshop} onDelete={() => deleteWorkshop(workshop)}></Item>
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```ts
const deleteWorkshop = (workshop: IWorkshop) => {
    console.log(workshop);
}
```
- The workshop is now logged in the console when the user tries to delete the workshop
- Use the service method to set up deletion of the workshop.
- TDB
```ts
import { getWorkshops, deleteWorkshopById } from "../../../services/workshops";

// @todo Import the toast service and make use of it
```
```ts
const deleteWorkshop = async (workshop: IWorkshop) => {
    console.log(workshop);

    try {
        await deleteWorkshopById(workshop.id);

        // @todo Display a success toast with message `Deleted workshop with id = ${workshop.id}` for 5000 ms
        
        // update this.workshops
        setWorkshops(
            w => workshops.filter((w) => w.id !== workshop.id)
        );
    } catch( error ) {
        // @todo Display aa error toast with message ``Could not delete workshop with id = ${workshop.id}` for 5000 ms
    }
}
```
- In order to display a confirmation dialog before deletion, we add this in `src/app/workshops/workshops-list/workshops-list.component.ts`. To be done following https://react-bootstrap.netlify.app/docs/components/modal 
```tsx
<div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">
        Please confirm deletion!
    </h4>
    <button
        type="button"
        class="btn-close"
        aria-label="Close"
        onClick={() => {}}
    ></button>
</div>
<div class="modal-body">
    <div class="mb-3">
        You are about to delete a workshop. This action cannot be undone.
        Are you sure want to proceed?
    </div>
    <div>
        <button class="btn btn-light" onClick={() => {}}>
            Cancel
        </button>
        <button class="btn btn-danger" onClick={() => {}}>
            OK
        </button>
    </div>
</div>
```

## Step 31: Create the form to add a session
- In `src/components/workshops/WorkshopDetails/AddSession/AddSession.tsx`
```tsx
<div>
    <h1 className="d-flex justify-content-between align-items-center">
        Add a Session
        <Link to=".." className="btn btn-primary">List of sessions</Link>
    </h1>

    <hr />

    <Form>
        <Form.Group className="mb-4" controlId="sequenceId">
            <Form.Label>Sequence ID</Form.Label>
            <Form.Control
                type="number"
                placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Name of the session, Eg. Introduction to Programming"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="speaker">
            <Form.Label>Speaker</Form.Label>
            <Form.Control
                type="text"
                placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
                type="text"
                placeholder="The duration of the session in hours (eg. 2.5)"
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="level">
            <Form.Label>Level</Form.Label>
            <Form.Select
                aria-label="Level"
            >
                <option disabled>-- Select the level --</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-4" controlId="abstract">
            <Form.Label>Abstract</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
            />
        </Form.Group>

        <Button type="submit">Add a session</Button>
    </Form>
</div>
```
- In `src/App.scss`, add this. We add it to global styles as similar error messages will need to be displayed in other forms in the app.
```scss
.error-message {
    color: crimson;
    font-size: 0.85em;
}
```

## Step 32: Validation using template-driven forms approach
- There are 2 ways of working with forms in Angular
    - Template-driven - for simple forms, simple form handling and simple validations
    - Reactive
- We start with the template-driven approach.
- __Reference__: https://angular.dev/guide/forms/template-driven-forms
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts` add the following. `FormsModule` provides `NgModel` directive and JsonPipe is used for displaying JavaScript objects in the UI (used generally for debugging purposes).
```ts
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
```
```ts
imports: [FormsModule, JsonPipe],
```
- Do the following changes in `src/app/workshops/workshop-details/add-session/add-session.component.html`. Once we add the `ngModel` directive to an input, Angular maintains an `NgModel` object that holds the user input, the validity status (based on attributes like `required`, `pattern`, `min`, `max` etc. that we set on the input), the touched, dirty status etc. `#var` set on a DOM element is called a template reference variable. The template reference variable by default refers to the DOM node. Set it to `ngModel` to get a reference to the `NgModel` object instead.
```html
<input
    type="text"
    class="form-control"
    id="sequenceId"
    name="sequenceId"
    required
    pattern="\d+"
    ngModel
    #sequenceId="ngModel"
    autocomplete="off"
/>
<!-- Note how the JSON pipe is used for inspecting objects and thus useful for debugging! -->
{{ sequenceId.errors | json }}
{{ sequenceId.value }}
<div>{{ "sequenceId.invalid = " + sequenceId.invalid }}</div>
<div>{{ "sequenceId.valid = " + sequenceId.valid }}</div>
<div>{{ "sequenceId.dirty =" + sequenceId.dirty }}</div>
<div>{{ "sequenceId.touched =" + sequenceId.touched }}</div>
@if( sequenceId.invalid && ( sequenceId.touched || sequenceId.dirty ) && sequenceId.errors ) {
    <div class="error-message">
        There is some error
    </div>
}
```
```html
<input type="text" class="form-control" id="name" required />
```
```html
<input type="text" class="form-control" id="speaker" required />
```
```html
<input type="number" class="form-control" id="duration" required />
```
```html
<select class="form-select" id="level" required>...<select>
```
```html
<textarea
    class="form-control"
    id="abstract"
    rows="3"
    required
></textarea>
```
- __EXERCISE__: Set up error handling for rest of the inputs as well.
- We now display error messages based on the type of error that occured.
```html
@if( sequenceId.invalid && ( sequenceId.touched || sequenceId.dirty ) && sequenceId.errors ) {
    <div class="error-message">
        @if(sequenceId.errors['required']) {
            <div>This is required</div>
        } @if(sequenceId.errors['pattern']) {
            <div>Provide a number</div>
        }
    </div>
}
```
```html
<input
    type="text"
    class="form-control"
    id="name"
    name="name"
    required
    pattern="[A-Z][A-Za-z ]+"
    ngModel
    #name="ngModel"
/>
@if( name.invalid && ( name.touched || name.dirty ) && name.errors ) {
    <div class="error-message">
        @if(name.errors['required']) {
            <div>This is required</div>
        } @if(name.errors['pattern']) {
            <div>Provide a valid name (only letters and spaces)</div>
        }
    </div>
}
```
```html
<input
    type="text"
    class="form-control"
    id="speaker"
    name="speaker"
    required
    pattern="[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*"
    ngModel
    #speaker="ngModel"
/>
@if( speaker.invalid && ( speaker.touched || speaker.dirty ) && speaker.errors ) {
    <div class="error-message">
        @if(speaker.errors['required']) {
            <div>This is required</div>
        } @if(speaker.errors['pattern']) {
            <div>
                Provide valid names (only letters and spaces for names, and separate names by commas)
            </div>
        }
    </div>
}
```
```html
<input
    type="number"
    class="form-control"
    id="duration"
    name="duration"
    required
    min="0.5"
    max="10"
    ngModel
    #duration="ngModel"
/>
@if( duration.invalid && ( duration.touched || duration.dirty ) && duration.errors ) {
    <div class="error-message">
        @if(duration.errors['required']) {
            <div>This is required</div>
        } @if(duration.errors['min']) {
            <div>Duration is minimum 0.5</div>
        } @if(duration.errors['max']) {
            <div>Duration is maximum 10</div>
        }
    </div>
}
```
```html
<select
    class="form-select"
    id="level"
    name="level"
    required
    ngModel
    #level="ngModel"
>
    ...
<select>
@if( level.invalid && ( level.touched || level.dirty ) && level.errors ) {
    <div class="error-message">
        @if(level.errors['required']) {
        <div>This is required</div>
        }
    </div>
}
```
```html
<textarea
    class="form-control"
    id="abstract"
    name="abstract"
    rows="3"
    required
    minlength="20"
    ngModel
    #abstract="ngModel"
></textarea>
@if( abstract.invalid && ( abstract.touched || abstract.dirty ) && abstract.errors ) {
    <div class="error-message">
        @if(abstract.errors['required']) {
            <div>This is required</div>
        } @if(abstract.errors['minlength']) {
            <div>Minimum 20 characters needed</div>
        }
    </div>
}
```

## Step 33: Handle form submission and add the session
- In `src/app/workshops/sessions.service.ts`,
```ts
addSession(session: Omit<ISession, 'id'>) {
    return this.http.post<ISession>(`${this.apiUrl}/sessions`, session, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```
- Just like Angular maintains an `NgModel` instance for every input on which the directive is set, it maintains an `NgForm` instance on every form (no need to add any directive to the form though). This has validation and user interaction states for the form (similar to the ones for inputs with `NgModel`). The form is invalid if at least one form input within it, tracked by `NgModel`, is invalid. The form is dirty if at least one input tracked is dirty, etc. We disable form submission if the form is invalid. On submission we call `addSession()` passing it the instance of `NgForm`. In `src/app/workshops/workshop-details/add-session/add-session.component.html`,
```html
<form id="add-session-form" #addSessionForm="ngForm" (ngSubmit)="addSession(addSessionForm)">
    <div>valid = {{ addSessionForm.valid | json }}</div>
    <div>invalid = {{ addSessionForm.invalid | json }}</div>
    <div>value = {{ addSessionForm.value | json }}</div>
    <div>dirty = {{ addSessionForm.dirty | json }}</div>
    ...
    <button class="btn btn-primary" [disabled]="addSessionForm.invalid">
        Add session
    </button>
</form>
```
- Handle the form submission in `src/app/workshops/workshop-details/add-session/add-session.component.ts`. Note how we need to go the `ActivatedRoute::snapshot.parent` to get the `id` value as this child route is not the same as the parent route (it has `/add-session` extra). Note also how the `Router` service is used for programmatic navigaton (client-side redirection).
```ts
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionsService } from '../../sessions.service';
import ISession from '../../models/ISession';
```
```ts
export class AddSessionComponent {
    constructor(
        private activatedRoute: ActivatedRoute,
        private sessionsService: SessionsService,
        private router: Router
    ) {}

    addSession(addSessionForm: NgForm) {
        const id = +(this.activatedRoute.snapshot.parent?.paramMap.get(
            'id'
        ) as string);

        const newSession = {
            ...addSessionForm.value,
            workshopId: id,
            upvoteCount: 0,
            sequenceId: +addSessionForm.value.sequenceId,
            duration: +addSessionForm.value.duration,
        } as Omit<ISession, 'id'>;

        console.log(newSession);
        
        this.sessionsService.addSession(newSession).subscribe({
            next: (addedSession) => {
                alert(`Added session with id = ${addedSession.id}`);
                
                // You can also use navigateByUrl()
                this.router.navigate(['/workshops', id]);
            },
        });
    }
}
```
- Fill the form correctly, submit it, and verify that the session in added in the backend.

## Step 34: Use the toast service to display toast after trying to add a session
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts`
```ts
import { ToastService } from '../../../common/toast/toast.service';
```
```ts
constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private toastService: ToastService
) {}
```
```ts
this.sessionsService.addSession(newSession).subscribe({
    next: (addedSession) => {
        this.toastService.add({
            message: `Added session with id = ${addedSession.id}`,
            className: 'bg-success text-light',
            duration: 5000,
        });

        // You can also use navigateByUrl()
        this.router.navigate(['/workshops', id]);
    },
    error: (error) => {
        this.toastService.add({
            message: `Unable to add the session - ${error.message}`,
            className: 'bg-danger text-light',
            duration: 5000,
        });
    },
});
```

## Step 35: Handle form validation to add the session using the reactive form approach
- __Note__: You can take a backup copy of `src/app/workshops/workshop-details/add-session` as `src/app/workshops/workshop-details/add-session-template-driven` (for example).
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts` create the `FormGroup` with `FormControl`s for each tracked input. Define initial value for the inputs and validations. The ReactiveFormModule provides a completely different set of directives to be used in the HTML template (`formGroup`, `formControl`, `formControlName`, `formArrayName` etc.)
- __Reference__: https://angular.dev/guide/forms/reactive-forms
```ts
import {
    ReactiveFormsModule,
    NgForm,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
```
```ts
imports: [
    /* existing imports */
    ReactiveFormsModule
],
```
```ts
export class AddSessionComponent {
    addSessionForm = new FormGroup({
        sequenceId: new FormControl([
            '', // initial value of the input
            [
                // the list of validators
                Validators.required,
                Validators.pattern('\\d+'),
            ],
        ]),
        name: new FormControl([
            '',
            [Validators.required, Validators.pattern('[A-Z][A-Za-z ]+')],
        ]),
        speaker: new FormControl([
            '',
            [
                Validators.required,
                Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
            ],
        ]),
        duration: new FormControl([
            '',
            [Validators.required, Validators.min(0.5), Validators.max(10)],
        ]),
        level: new FormControl(['', [Validators.required]]),
        abstract: new FormControl([
            '',
            [Validators.required, Validators.minLength(2)],
        ]),
    });
    
    // helper accessor methods
    get sequenceId() {
        return this.addSessionForm.get('sequenceId') as FormControl;
    }
    
    get name() {
        return this.addSessionForm.get('name') as FormControl;
    }
    
    get speaker() {
        return this.addSessionForm.get('speaker') as FormControl;
    }
    
    get duration() {
        return this.addSessionForm.get('duration') as FormControl;
    }
    
    get level() {
        return this.addSessionForm.get('level') as FormControl;
    }
    
    get abstract() {
        return this.addSessionForm.get('abstract') as FormControl;
    }
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private sessionsService: SessionsService,
        private router: Router,
        private toastService: ToastService
    ) {}

    // NOTE: Only the signature of this method changes fron the template-driven code written earlier.
    addSession() {
        // existing code as is...
    }
}
```
- In `src/app/workshops/workshop-details/add-session/add-session.component.html`, make the following changes. In reactive forms approach, we do not use ngModel, and instead use other directives. So we must remove ngModel and the template variable created for every input. Since validations are set up in the model we have set up in the component class, we remove these as well from the inputs.
```html
<form
    id="add-session-form"
    (ngSubmit)="addSession()"
    [formGroup]="addSessionForm"
    novalidate
>
    ...
</form>
```
```html
<input
    type="text"
    class="form-control"
    id="sequenceId"
    name="sequenceId"
    formControlName="sequenceId"
    autocomplete="off"
/>
```
- __EXERCISE__: Do similarly for the rest of the inputs as well.

## Step 36: Using Form Builder
- The Form Builder service provides an alternative to using FormGroup, FormControl classes directly, but with less boilerplate code.
- In ``,
```ts
import { /* existing imports */, FormBuilder } from '@angular/forms';
```
```ts
export class AddSessionComponent {
    addSessionForm!: FormGroup;
}
```
```ts
constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder
) {
    this.addSessionForm = this.fb.group({
        sequenceId: [
            '', // initial value of the input
            [
                // the list of validators
                Validators.required,
                Validators.pattern('\\d+'),
            ],
        ],
        name: [
            '',
            [Validators.required, Validators.pattern('[A-Z][A-Za-z ]+')],
        ],
        speaker: [
            '',
            [
                Validators.required,
                Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
            ],
        ],
        duration: [
            '',
            [Validators.required, Validators.min(0.5), Validators.max(10)],
        ],
        level: ['', [Validators.required]],
        abstract: ['', [Validators.required, Validators.minLength(20)]],
    });
}
```

## Step 37: Setting up custom and cross-field validations
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts`,
```ts
import { /* existing imports */, AbstractControl } from '@angular/forms';
```
- Set `durationAndLevel()` as a standalone function (outside the class)
```ts
function durationAndLevel(form: AbstractControl) {
    const durationStr = (form.get('duration') as AbstractControl).value;
    const duration = +durationStr;
    const level = (form.get('level') as AbstractControl).value;
    
    // if valid -> return null
    // if invalid -> return an object with the details of the error. Further this object should have the property called `durationAndLevel`
    if (durationStr === '' || level === '') {
        return null;
    }
    
    if (level === 'Basic') {
        return null;
    }
    
    if (level === 'Intermediate') {
        if (duration >= 2) {
            return null;
        }
        
        // error
        return {
            durationAndLevel: 'Intermediate level session should be at least 2 hours in duration',
        };
    }

    if (level === 'Advanced') {
        if (duration >= 3) {
            return null;
        }

        // error
        return {
            durationAndLevel: 'Advanced level session should be at least 3 hours in duration',
        };
    }

    return null;
}
```
```ts
this.addSessionForm = this.fb.group(
    { ... }, 
    {
        validators: durationAndLevel,
    }
);
```
- In `src/app/workshops/workshop-details/add-session/add-session.component.html`,
```html
<form ...>
    <div class="mb-3 error-message">
        @if( addSessionForm.errors && addSessionForm.errors['durationAndLevel']
        ) {
            <div>{{ addSessionForm.errors["durationAndLevel"] }}</div>
        }
    </div>
    <!--  rest of form -->
</form>
```

## Step 38: Getting started with a form to add a workshop
- __EXERCISE__: In `src/app/workshops/add-workshop/add-workshop.component.ts` import `FormGroup`. Do necessary set up for a form to add a new workshop. Group address, city, state under a separate FormGroup as "location". Group the 2 checkboxes under "modes". Set up validations using reactive forms approach. Set the ReactiveFormModule directives in the html file at the appropriate places `[formGroup]="..."` for form, `formControlName="..."` for controls, `formGroupName=""` for "address" and "modes". On submit of the form, log the value of the form. 
```ts
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-add-workshop',
    standalone: true,
    imports: [],
    templateUrl: './add-workshop.component.html',
    styleUrl: './add-workshop.component.scss',
})
export class AddWorkshopComponent {
    addWorkshopForm!: FormGroup;

    constructor() {
        // EXERCISE: Create a FormGroup variable for the form. Group address, city, state under a separate FormGroup as "location". Group the 2 checkboxes under "modes". On submit of the form. Log the value of the form.
    }
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.html`,
```html
<div>
    <h1 class="my-3">Add a workshop</h1>
</div>

<hr />

<form id="add-workshop-form" novalidate>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            autocomplete="off"
        />
    </div>
    <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select class="form-select" id="category" name="category">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="language">Language</option>
            <option value="mobile">Mobile</option>
            <option value="devops">Devops</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
            class="form-control"
            id="description"
            rows="3"
            name="description"
        ></textarea>
    </div>
    <div class="mb-3">
        <label for="startDate" class="form-label">Start date</label>
        <input
            type="date"
            class="form-control"
            id="startDate"
            name="startDate"
            autocomplete="off"
        />
    </div>
    <div class="mb-3">
        <label for="endDate" class="form-label">End date</label>
        <input
            type="date"
            class="form-control"
            id="endDate"
            name="endDate"
            autocomplete="off"
        />
    </div>
    <div class="mb-3">
        <label for="time" class="form-label">Time</label>
        <input
            type="text"
            class="form-control"
            id="time"
            name="time"
            autocomplete="off"
        />
    </div>
    <div>
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                autocomplete="off"
            />
        </div>
        <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input
                type="text"
                class="form-control"
                id="city"
                name="city"
                autocomplete="off"
            />
        </div>
        <div class="mb-3">
            <label for="state" class="form-label">State</label>
            <input
                type="text"
                class="form-control"
                id="state"
                name="state"
                autocomplete="off"
            />
        </div>
    </div>
    <div class="mb-3">
        <label class="col-lg-2 col-form-label">Modes</label>
        <div class="col-lg-10">
            <div>
                <input type="checkbox" id="inPerson" />
                <label for="inPerson" class="ms-2">In Person</label>
            </div>
            <div>
                <input type="checkbox" id="online" />
                <label for="online" class="ms-2">Online</label>
            </div>
        </div>
    </div>
    <div class="mb-3">
        <label for="imageUrl" class="form-label">Image URL</label>
        <input
            type="url"
            class="form-control"
            id="imageUrl"
            name="imageUrl"
            autocomplete="off"
        />
    </div>
</form>
```

## Step 39: Solution to the above exercise
- In `src/app/workshops/add-workshop/add-workshop.component.ts`,
```ts
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
```
```ts
imports: [ReactiveFormsModule],
```
```ts
constructor(private fb: FormBuilder) {
    this.addWorkshopForm = this.fb.group({
        name: ['', [Validators.required]],
        category: ['', [Validators.required]],
        description: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        time: ['', [Validators.required]],
        location: this.fb.group({
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
        }),
        modes: this.fb.group({
            inPerson: this.fb.control(false),
            online: this.fb.control(false),
        }),
        imageUrl: ['', [Validators.required]],
    });
}

addWorkshop() {
    console.log(this.addWorkshopForm.value);
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.html` (showing validations error messages is left out of this solution).
```html
<div>
    <h1 class="my-3">Add a workshop</h1>
</div>

<hr />

<form
    id="add-workshop-form"
    [formGroup]="addWorkshopForm"
    (ngSubmit)="addWorkshop()"
    novalidate
>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            autocomplete="off"
            formControlName="name"
        />
    </div>
    <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select
            class="form-select"
            id="category"
            name="category"
            formControlName="category"
        >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="language">Language</option>
            <option value="mobile">Mobile</option>
            <option value="devops">Devops</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
            class="form-control"
            id="description"
            rows="3"
            name="description"
            formControlName="description"
        ></textarea>
    </div>
    <div class="mb-3">
        <label for="startDate" class="form-label">Start date</label>
        <input
            type="date"
            class="form-control"
            id="startDate"
            name="startDate"
            autocomplete="off"
            formControlName="startDate"
        />
    </div>
    <div class="mb-3">
        <label for="endDate" class="form-label">End date</label>
        <input
            type="date"
            class="form-control"
            id="endDate"
            name="endDate"
            autocomplete="off"
            formControlName="endDate"
        />
    </div>
    <div class="mb-3">
        <label for="time" class="form-label">Time</label>
        <input
            type="text"
            class="form-control"
            id="time"
            name="time"
            autocomplete="off"
            formControlName="time"
        />
    </div>
    <div formGroupName="location">
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                autocomplete="off"
                formControlName="address"
            />
        </div>
        <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input
                type="text"
                class="form-control"
                id="city"
                name="city"
                autocomplete="off"
                formControlName="city"
            />
        </div>
        <div class="mb-3">
            <label for="state" class="form-label">State</label>
            <input
                type="text"
                class="form-control"
                id="state"
                name="state"
                autocomplete="off"
                formControlName="state"
            />
        </div>
    </div>
    <div class="mb-3" formGroupName="modes">
        <label class="col-lg-2 col-form-label">Modes</label>
        <div class="col-lg-10">
            <div>
                <input
                    type="checkbox"
                    id="inPerson"
                    formControlName="inPerson"
                />
                <label for="inPerson" class="ms-2">In Person</label>
            </div>
            <div>
                <input type="checkbox" id="online" formControlName="online" />
                <label for="online" class="ms-2">Online</label>
            </div>
        </div>
    </div>
    <div class="mb-3">
        <label for="imageUrl" class="form-label">Image URL</label>
        <input
            type="url"
            class="form-control"
            id="imageUrl"
            name="imageUrl"
            autocomplete="off"
            formControlName="imageUrl"
        />
    </div>

    <button class="btn btn-primary" [disabled]="addWorkshopForm.invalid">
        Add workshop
    </button>
</form>
```

## Step 40: Adding workshop to the backend
- In `src/app/workshops/workshops.service.ts`,
```ts
postWorkshop(workshop: Omit<IWorkshop, 'id'>) {
    return this.http.post<IWorkshop>(`${this.apiUrl}/workshops`, workshop, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.ts`,
```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { WorkshopsService } from '../workshops.service';
import { ToastService } from '../../common/toast/toast.service';

@Component({
    selector: 'app-add-workshop',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './add-workshop.component.html',
    styleUrl: './add-workshop.component.scss',
})
export class AddWorkshopComponent {
    addWorkshopForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private workshopsService: WorkshopsService,
        private toastService: ToastService,
        private router: Router,
    ) {
        this.addWorkshopForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', [Validators.required]],
            description: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            time: ['', [Validators.required]],
            location: this.fb.group({
                address: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
            }),
            modes: this.fb.group({
                inPerson: this.fb.control(false),
                online: this.fb.control(false),
            }),
            imageUrl: ['', [Validators.required]],
        });
    }

    addWorkshop() {
        this.workshopsService
            .postWorkshop(this.addWorkshopForm.value)
            .subscribe({
                next: (workshop) => {
                    this.toastService.add({
                        message: `Successfully added workshop - ${workshop.name}`,
                        className: 'bg-success text-light',
                        duration: 5000,
                    });

                    this.router.navigateByUrl('/workshops');
                },
                error: (error) => {
                    this.toastService.add({
                        message: `Could not add workshop | ${error.message}`,
                        className: 'bg-danger text-light',
                        duration: 5000,
                    });
                },
            });
    }
}
```
- You should now be able to fill the details in the form, and submit it to add a new workshop to the backend.

## Step 41: Updating (Editing) workshop
- We reuse the `AddWorkshopComponent` for editing as well as there is very little difference between the two.
- Set up additional routing to the `AddWorkshopComponent` component for editing a workshop with given id in `src/app/workshops/workshops.routes.ts`
```ts
{
    path: 'workshops/edit/:id',
    component: AddWorkshopComponent,
    title: 'Edit a workshop',
},
```
- Set link to navigate to edit workshop in `src/app/workshops/workshops-list/item/item.component.html`
```html
<button
    class="me-2 btn btn-info btn-sm btn-action-button"
    title="Edit this workshop"
    [routerLink]="['/workshops', 'edit', workshop.id]"
>
    <fa-icon [icon]="icons.faPencil"></fa-icon>
</button>
```
- Add service method to update a workshop with a given id in `src/app/workshops/workshops.service.ts`
```ts
putWorkshop(workshop: Omit<IWorkshop, 'id'>, id: number) {
    return this.http.put<IWorkshop>(
        `${this.apiUrl}/workshops/${id}`,
        workshop,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
```
- In `demos/10-angular/workshops-app/src/app/workshops/add-workshop/add-workshop.component.ts`,
```ts
import { ActivatedRoute, Router } from '@angular/router';
```
```ts
id!: number;
isEditing = false;
```
```ts
constructor(
    private fb: FormBuilder,
    private workshopsService: WorkshopsService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
) {
    const idStr = this.activatedRoute.snapshot.paramMap.get('id');

    if (idStr === null) {
        this.isEditing = false;
    } else {
        this.isEditing = true;
        this.id = +idStr;

        // @todo Fetch the details of the workshop being edited, and populate the form controls
        // Step 1: get the details of workshop with given id
        // Step 2: (inside next) once we get the details, we can use this.addWorkshopForm.patchValue()
        this.workshopsService.getWorkshopById(this.id).subscribe({
            next: (workshop) => {
                // if you use setValue, the value you pass (in this case `workshop`), should not have any extra / missing fields
                // to take care of difference in format of dates in the backend, and the date format of datepicker
                workshop.startDate = workshop.startDate.substring(0, 10);
                workshop.endDate = workshop.endDate.substring(0, 10);

                this.addWorkshopForm.patchValue(workshop);
            },
            error: () => {
                alert(
                    `Something went wrong fetching workshop details. Please reload the page.`
                );
            },
        });
    }

    // rest of existing code...
}
```
```ts
addWorkshop() {
    if (this.isEditing) {
        this.workshopsService
            .putWorkshop(this.addWorkshopForm.value, this.id)
            .subscribe({
                next: (workshop) => {
                    this.toastService.add({
                        message: `Successfully updated workshop with id ${workshop.id}`,
                        className: 'bg-success text-light',
                        duration: 5000,
                    });

                    this.router.navigateByUrl('/workshops');
                },
                error: (error) => {
                    this.toastService.add({
                        message: `Could not edit workshop | ${error.message}`,
                        className: 'bg-danger text-light',
                        duration: 5000,
                    });
                },
            });
    } else {
        this.workshopsService
            .postWorkshop(this.addWorkshopForm.value)
            .subscribe({
                next: (workshop) => {
                    this.toastService.add({
                        message: `Successfully added workshop - ${workshop.name}`,
                        className: 'bg-success text-light',
                        duration: 5000,
                    });

                    this.router.navigateByUrl('/workshops');
                },
                error: (error) => {
                    this.toastService.add({
                        message: `Could not add workshop | ${error.message}`,
                        className: 'bg-danger text-light',
                        duration: 5000,
                    });
                },
            });
    }
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.html`,
```html
<div>
    <h1 class="my-3">{{ isEditing ? "Edit workshop" : "Add a workshop" }}</h1>
</div>
```
```html
<button class="btn btn-primary" [disabled]="addWorkshopForm.invalid">
    {{ isEditing ? "Update workshop" : "Add workshop" }}
</button>
```
- You should now be able to modify the details in the form, and submit it to update a workshop's details in the backend.