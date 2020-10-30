// load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.MY_PORT) || 3000

// create an instance
const app = express()

// configure handlebars
app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

// app routes

app.get('/', (req, resp) => {
    const cart = []
    resp.status(200)
    resp.type('text/html')
    resp.render('addlist', {cartState: JSON.stringify(cart)})
})


app.post('/',
    express.urlencoded({extended: true}),  // parse form data as urlencoded
    // express.json(), // add if needed
    
    // add authentication check if needed
    
    (req, resp) => {
        console.info('body: ', req.body)
        const cart = JSON.parse(req.body.cartState)
        console.info('cart: ', cart)
        cart.push({
            item: req.body.item,
            quantity: req.body.quantity,
            unitprice: req.body.unitprice
        })
        console.info('cart after push: ', cart)
        resp.status(200)
        resp.type('text/html')
        resp.render('addlist', { 
            cart: cart,
            cartState: JSON.stringify(cart)
            //entries: cart,
            //item: req.body.item,
            //qty: req.body.quantity,
            //price: req.body.unitprice
        }) 
    }
)
//


// configure the application
app.use(express.static(__dirname + '/static'))

// start the server
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})