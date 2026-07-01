import { Route, Router } from '@solidjs/router'
import { lazy } from 'solid-js'
import Layout from './components/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const PostPage = lazy(() => import('./pages/PostPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={HomePage} />
      <Route path="/projetos" component={ProjectsPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={PostPage} />
      <Route path="/contato" component={ContactPage} />
      <Route path="*404" component={NotFoundPage} />
    </Router>
  )
}
