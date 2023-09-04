import { EVENTS } from './consts'

export function navigate (href) {
  window.history.pushState({}, '', href)
  // Crear n evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0 // primary key
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey // si usas las teclas especiales para abrir enlaces
    const isManageableEvent = target === undefined || target === '_self'

    // Comprobamos si es el click por defecto, y si no esta utilizando las teclas especiales para los enlaces
    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  // Le añadimos {...props}, para que ponga todaas las props que tiene por defecto, por ejemplo la prop children
  return <a onClick={handleClick} href={to} target={target} {...props} />
}
