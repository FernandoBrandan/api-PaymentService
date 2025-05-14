import express, { Request, Response } from 'express'
import { createPayment } from './mercadopago'

const app = express()
app.use(express.json())
app.post('/payment', async (req: Request, res: Response) => {
  try {
    const paid = await createPayment(req.body)
    res.status(200).json(paid)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al procesar el pago' })
  }
})

const PORT = process.env.PORT || 13001
app.listen(PORT, () => {
  console.log(`Server listening to http://localhost:${PORT}`)
})
