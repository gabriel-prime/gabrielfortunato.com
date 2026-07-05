import { Route, Router } from '@solidjs/router'
import { lazy, type JSX } from 'solid-js'
import HubLayout from './layouts/HubLayout'
import PremiumLayout from './layouts/PremiumLayout'
import { ThemeProvider } from './lib/theme'

const HomePage = lazy(() => import('./pages/HomePage'))
const FrontendPage = lazy(() => import('./pages/FrontendPage'))
const BackendPage = lazy(() => import('./pages/BackendPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const PostPage = lazy(() => import('./pages/PostPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

/** App-wide providers + the accessible skip link, wrapping every route. */
function AppShell(props: { children?: JSX.Element }) {
  return (
    <ThemeProvider>
      <a class="skip-link" href="#content">
        Pular para o conteúdo
      </a>
      {props.children}
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <Router root={AppShell}>
      {/* Neumorphic hub */}
      <Route component={HubLayout}>
        <Route path="/" component={HomePage} />
      </Route>

      {/* Deep-dark premium variant pages */}
      <Route component={PremiumLayout}>
        <Route path="/frontend" component={FrontendPage} />
        <Route path="/backend" component={BackendPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/projetos" component={ProjectsPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={PostPage} />
        <Route path="/contato" component={ContactPage} />
        <Route path="*404" component={NotFoundPage} />
      </Route>
    </Router>
  )
}
