import './App.css'
import { Suspense, lazy } from 'react'
import { Router } from './Router'
import { Route } from './Route'

// Hacemos un import dinamico, este import nos devuelve una promesa, solo carga aquel js que se necesita por cada pagina, no carga todos los componentes
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyHomePage = lazy(() => import('./pages/Home'))
const Lazy404Page = lazy(() => import('./pages/404'))
const LazySearchPage = lazy(() => import('./pages/Search'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: LazySearchPage
  }
]

function App () {
  return (
    <main>
      {/* Se añade suspense porque hay parte del renderizado que estan en un estado suspendido  */}
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Lazy404Page}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />

        </Router>
      </Suspense>
    </main>
  )
}

export default App
