import { Link } from '../Link'
import perroQuemandose from '../assets/this-is-fine.gif'

export default function Page404 () {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img src={perroQuemandose} alt='Gif del perro de this is fine quemandose vivo' />
      </div>
      <Link to='/'>Volver a la Home</Link>
    </>
  )
}
