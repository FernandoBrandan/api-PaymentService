# Proyecto: Payment Service con RabbitMQ

El servicio Payment es un microservicio que gestiona pagos en una arquitectura basada en eventos utilizando RabbitMQ como sistema de mensajería y MercadoPago como pasarela de pago. 
Este microservicio escucha mensajes en una cola de pagos (PAYMENT), procesa las órdenes y genera una preferencia de pago en MercadoPago.

## Tecnologías Utilizadas
- Node.js con TypeScript
- RabbitMQ para la gestión de eventos y comunicación entre microservicios.
- MercadoPago SDK para la integración de pagos.
- Docker. 

# Arquitectura del Sistema
El flujo del microservicio Payment sigue la siguiente secuencia:

- Publicación de eventos: El microservicio Orderservice envía un mensaje a la cola PAYMENT en RabbitMQ con los detalles de la orden.
- Consumo del mensaje: 
  El microservicio Payment escucha la cola y procesa los mensajes entrantes.
- Validación y creación del pago: Se genera una preferencia de pago en MercadoPago utilizando la información recibida.
- Respuesta: Se devuelve un enlace (init_point) donde el usuario puede completar el pago.

______________________________________________________
______________________________________________________
______________________________________________________
- Crear un pago (POST → /pagos/crear) - return init_point
- Webhoo
- Consultar un pago (GET → /pagos/{id}
- Listar todos los pagos (GET → /pagos)