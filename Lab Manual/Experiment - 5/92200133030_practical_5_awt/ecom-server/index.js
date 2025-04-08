const express = require('express')
const cors = require('cors')
const errors = require('./src/middleware/error')
const category = require('./src/category/category.routes')
const product = require('./src/product/product.routes')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(errors.errorHandler);

app.use('/category', category);
app.use('/product', product);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))