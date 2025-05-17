// import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PayerRequest } from 'mercadopago/dist/clients/payment/create/types'

const client = new MercadoPagoConfig({
  accessToken: ' ',
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
})

export const createPayment = async (args: any) => {
  console.log(' Creando pago...')
  const { userID, orderID, amount, description, cart, config_transaction } = args
  try {
    const itemsToSale = cart.map((detail: { codigo: any; name: any; price: string; quantity: any }) => ({
      id: detail.codigo,
      title: detail.name || 'Sin descripción',
      unit_price: parseFloat(detail.price),
      quantity: detail.quantity,
      currency_id: 'ARS',
    }))
    // Buscar usuario
    const payer: PayerRequest = {
      first_name: "user.name",
      last_name: "user.surname",
      email: "user.email",
      identification: {
        type: 'DNI',
        number: "user.identification",
      },
      phone: {
        area_code: '1',
        number: '1234567'
      },
      address: { street_name: ' ', street_number: ' ', zip_code: ' ', city: ' ' },
    }
    const preference = new Preference(client)    // const payment = new Payment(client)
    const result = await preference.create({
      body: {
        items: itemsToSale,
        payer,
        back_urls: {
          success: config_transaction.back_urls.success,
          failure: config_transaction.back_urls.failure,
          pending: config_transaction.back_urls.pending,
        },
        notification_url: config_transaction.notification_url,
        auto_return: '',
        external_reference: orderID.toString(),
        statement_descriptor: 'TuEmpresa',
      },
      requestOptions: {
        timeout: 5000
      }
    })
 
  console.log("result.init_point",result.init_point)
    const paymentUrl = result.sandbox_init_point || result.init_point

    return paymentUrl
  } catch (error) {
    console.log("Error createPayment: ", error)
  }
}
export const webhook = async (req: any, res: any) => {
  // MercadoPago - preference.create - body: { notification_url: "" }

  // Pasos
  // Actualizar el estado del pedido en db cuando se aprueba el pago.
  // Enviar un correo de confirmación al usuario al recibir la notificación de pago exitoso.
  // - Habilitar una descarga o acceso premium en cuanto el pago se apruebe.
  // - Manejar pagos rechazados (enviar notificación, reintentar el pago, etc.).
  // - Registrar reembolsos o cancelaciones automáticamente.

  try {
    const { id, type } = req.query
    if (type === 'payment') {
      // const payment = await mercadopago.payment.findById(id)
      // if (!payment) return res.status(404).json({ error: 'Pago no encontrado' })
      // // Actualizar el estado del pago en la base de datos
      // await Pago.update({ estado: payment.body.status }, { where: { id_transaccion: id } })
      res.status(200).json({ message: `Estado de pago actualizado ${id}` })
    }

    console.log('📩 Webhook recibido:', req.body)
    // const paymentId = req.body.data?.id
    const topic = req.body.type

    if (topic === 'payment') {
      //   const payment = await mercadopago.payment.findById(paymentId)
      //   console.log('  Estado del pago:', payment.body.status)
      //
      //   // Guardar pago en MongoDB
      //   await Payment.create({
      //     paymentId,
      //     status: payment.body.status,
      //     email: payment.body.payer.email,
      //     amount: payment.body.transaction_amount
      //   })
    }
    res.sendStatus(200)
  } catch (error) {
    return error
  }
}

export const success = async () => { }
export const failure = async () => { }
export const listarPagos = async () => { }
export const obtenerPago = async () => { }
