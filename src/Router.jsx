import { useEffect, useState, Children } from 'react'
import { EVENTS } from './consts'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    // Esto funciona para cuando usamos el boton de ir hacia atras
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // Añadir las rutas que viene del children <Route/> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    // Si es una ruta me devulves las props y si no es una ruta me devuelves null
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // Esto nos devuelve una funcion de la decodificacion de la url (caracterez especiales que no son queryparams), hemos usado path-to-regexp para poder detectar rutas dinamicas como por ejemplo /search/:query <- :query es una ruta dinamica
    const matcherURL = match(path, { decode: decodeURIComponent })
    const matched = matcherURL(currentPath)
    // Comprueba que si no ha encontrado parametros, y retorna false
    if (!matched) return false

    // guardar los parametros de la url que eran dinamicos, y que hemos extraido con path-to-regexp, por ejemplo si la ruta es /search/:query y la url es /search/javascript -> matched.params.query === 'javascript'
    routeParams = matched.params
    return true
  })?.Component

  return (
    Page
      ? <Page routeParams={routeParams} />
      : <DefaultComponent routeParams={routeParams} />
  )
}
