// import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PayerRequest } from 'mercadopago/dist/clients/payment/create/types'

const client = new MercadoPagoConfig({
  accessToken: 'TEST-932074593473716-103114-a21810c7fdc6f4a0b243b42e0054ef35-173869747',
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
})

export const createPayment = async (args: any) => {
  console.log('💰 Creando pago...', args)
  const { userid, email, phoneNumber, amount } = args
  // Validar datos de entrada de usuario
  try {
    const payer: PayerRequest = {
      email,
      first_name: 'Fer',
      last_name: 'Fer',
      phone: {
        area_code: '1',
        number: '1234567'
      },
      address: { street_name: ' ', street_number: ' ', zip_code: ' ', city: ' ' },
      identification: {
        type: 'DNI',
        number: '12345678'
      }
    }
    const itemsToSale = [
      {
        id: '001',
        title: 'Producto #1',
        description: 'Descripción del producto #1 a pagar',
        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
        category_id: '1',
        quantity: 1,
        unit_price: amount // 2.29 USD
      }
    ]

    // const payment = new Payment(client)
    const preference = new Preference(client)

    console.log(preference)

    // https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/checkout-customization/preferences

    const result = await preference.create({
      body: {
        items: itemsToSale,
        payer,
        //        redirect_urls: {
        //          success: '',
        //          failure: '',
        //          pending: ''
        //        },
        //        back_urls: {
        //          success: '',
        //          failure: '',
        //          pending: ''
        //        },
        notification_url: '',
        auto_return: ''// 'approved'
      },
      requestOptions: {
        timeout: 5000
      }
    })

    return result
  } catch (error) {
    console.log(error)
  }
}

export const webhook = async (req: any, res: any) => {
  // Webhook para recibir notificaciones de MercadoPago
  // Este endpoint procesa los cambios de estado de los pagos.

  // Ejemplos de cómo te beneficia un webhook:
  // ✅ Actualizar automáticamente el estado del pedido en tu base de datos cuando se aprueba el pago.
  // ✅ Enviar un correo de confirmación al usuario al recibir la notificación de pago exitoso.
  // ✅ Habilitar una descarga o acceso premium en cuanto el pago se apruebe.
  // ✅ Manejar pagos rechazados (enviar notificación, reintentar el pago, etc.).
  // ✅ Registrar reembolsos o cancelaciones automáticamente.

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
      //   console.log('💰 Estado del pago:', payment.body.status)
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
