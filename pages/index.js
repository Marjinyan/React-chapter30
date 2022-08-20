import axios from 'axios'
import { useRouter } from 'next/router'

export const getServerSideProps = async () => {
  let data = await fetch('http://localhost:5000/products')
  data = await data.json()
  return {
    props:{
      products:data.products
    }
  }
}


const Home = ({products}) => {
  const router = useRouter()

  const move = id => {
    axios.post('http://localhost:5000/moveToCart', {id})
    .then(r => {
      router.push('/cart')
    })
  }

  return <div>
    <h1>Pizza Shop</h1>
    <div className='grid'>
      {
        products.map(elm => {
          return <div key={elm.id}>
            <img src={'http://localhost:5000/'+elm.photo}/>
            <h4>{elm.name}</h4>
            <p>{elm.price}</p>
            <button onClick={() => move(elm.id)}>move to cart</button>
          </div>
        })
      }
    </div>
    </div>
}

export default Home