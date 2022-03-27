import nc from 'next-connect'
import Product from '../../../models/Product'
import db from '../../../utils/db'

const handler = nc()

handler.get(async(req, res) => {
    await db.connect() // Generate mongoose instance. 
    const product = await Product.findById(req.query.id) // rely on the instance.
    await db.disconnect()
    res.send(product)
})

export default handler;