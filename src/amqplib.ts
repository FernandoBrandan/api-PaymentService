// https://blogs.mulesoft.com/dev-guides/api-design/event-payment-apis/
import amqp from 'amqplib'
import { createPayment } from './mercadopago'
// const RABBITMQ_URL = process.env.RABBITMQ_URL as string || 'amqp://admin:admin@rabbitmq:5672'
// const RABBITMQ_URL = 'amqp://admin:admin@172.20.0.1:5672'
const QUEUE = 'PAYMENT'

const check = async () => {
  try {
    return await amqp.connect('amqp://172.20.0.1:5672')
  } catch (error) { console.error('Error de conexión a RabbitMQ:', error) }
}

const consume = async (con: any) => {
  const channel = await con.createChannel()
  await channel.assertQueue(QUEUE, { durable: true })
  console.log(`Connected to RabbitMQ! Waiting for messages in ${QUEUE}.`)
  channel.consume(QUEUE, async (msg: any) => {
    if (msg) {
      const message = JSON.parse(msg.content.toString())
      await process(message)
      channel.ack(msg)
    }
  }, { noAck: false })

  fail(channel)
}

const process = async (message: any) => {
  try {
    const paid = await createPayment(message.order)
    console.log('Procesado correctamente, SIN errores: ', paid)
    // return paid?.init_point
  } catch (error) {
    console.log(`Procesado correctamente, CON errores: ${error}`)
  }
}

const fail = async (channel: any) => {
  channel.on('error', (err: any) => {
    console.error('Error en el canal:', err)
  })

  channel.on('close', () => {
    console.log('Canal cerrado, intentando reconectar...')
    setTimeout(async () => {
      const newConnection = await check()
      await consume(newConnection)
    }, 5000)
  })
}

(async () => {
  const connection = await check()
  await consume(connection)
})()

// Event-Driven: Un servicio de pagos emite un evento "Pago realizado"
// y múltiples servicios reaccionan (facturación, envío de email, actualización de stock).

/**
 * Routes
 *
 * router.post('/create', createPayment)
 * router.post('/webhook', webhook)
 *
 * router.get('/success', success)
 * router.get('/failure', failure)
 * router.get('/pending', pending)
 * router.get('/', listarPagos)
 * router.get('/:id', obtenerPago)
 *
 */
