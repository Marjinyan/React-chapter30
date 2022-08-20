const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(express.static(__dirname + '/photos'))

const products = [
    {id:1001, name:'Pizza 1', price:2800, photo:'1.jpeg'},
    {id:1002, name:'Pizza 2', price:3200, photo:'2.jpeg'},
    {id:1003, name:'Pizza 3', price:1400, photo:'3.jpeg'},
    {id:1004, name:'Pizza 4', price:2000, photo:'4.jpeg'},
    {id:1005, name:'Pizza 5', price:3800, photo:'5.jpeg'},
    {id:1006, name:'Pizza 6', price:3000, photo:'6.jpeg'},
    {id:1007, name:'Pizza 7', price:2300, photo:'7.jpeg'},
]

const cart = []

app.get('/products', (req, res) => {
    res.send({products})
})

app.get('/cart', (req, res) => {
    res.send({cart})
})

app.post('/moveToCart', (req, res) => {
    let {id} = req.body
    let inCart = cart.find(elm => elm.id == id)
    if (inCart) {
        inCart.quantity++
    } else {
        let product = products.find(elm => elm.id == id)
        product.quantity = 1
        cart.push(product)
    }
    res.send({cart})
})

app.put('/quantityUp', (req,res) => {
    let {id} = req.body
    let inCart = cart.find(elm => elm.id == id)
    if (inCart) {
        inCart.quantity++
    }
    res.send({cart})
})

app.put('/quantityDown', (req,res) => {
    let {id} = req.body
    let index = cart.findIndex(elm => elm.id == id)
    if (index!= -1) {
        if(cart[index].quantity > 1){
            cart[index].quantity--
        } else {
            cart.splice(index,1)
        }
    }
    res.send({cart})
})

app.listen(5000, () => {
    console.log('server started on the port 127.0.0.1:5000')
})