import axios from 'axios'
import { useRouter } from 'next/router'

export const getServerSideProps = async() => {
    let data = await fetch('http://localhost:5000/cart')
    data = await data.json()
    return {
        props:{
            items:data.cart
        }
    }
}

const Cart = ({items}) => {
    const router = useRouter()
    const quantityUp = id => {
        axios.put('http://localhost:5000/quantityUp', {id})
            .then(r => {
                router.replace(router.asPath)
            })
    }
    const quantityDown = id => {
        axios.put('http://localhost:5000/quantityDown', {id})
            .then(r => {
                router.replace(router.asPath)
            })
    }

    return <div>
        <h1>Cart</h1>
        <div className='cart'>
            {
            items.map(elm => {
                return <div key={elm.id}>
                    <img src={'http://localhost:5000/'+elm.photo}/>
                    <h3>{elm.name}</h3>
                    <p><small>Subtotal: </small>{elm.price * elm.quantity}AMD</p>
                    <p><small>Quantity: </small>{elm.quantity}</p>
                    <button onClick={() => quantityUp(elm.id)}>up</button>
                    <button onClick={() => quantityDown(elm.id)}>down</button>
                </div>
            })
            }
        </div>
    </div>
}
export default Cart