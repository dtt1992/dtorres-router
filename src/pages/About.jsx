import { Link } from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la home',
    description: '¡Hola! Mi nombre es Dani Torres y estoy copiando a Midu haciendo un clon de React Router'
  },
  en: {
    title: 'About us',
    button: 'Go to home',
    description: 'Hello! My name is Dani Torres and I am copying Midu making a clone of React Router'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src='https://pbs.twimg.com/profile_images/1256354271571959814/GMiJ0Rg-_400x400.jpg' alt='Foto de IronTor' />
        <p>{i18n.description}</p>
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
