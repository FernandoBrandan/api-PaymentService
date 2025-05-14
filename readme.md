# Proyecto: API Payment

El servicio **Payment** es un microservicio encargado de gestionar los pagos de comercio electrónico mediante la API de MercadoPago como pasarela de pago. Este componente recibe las órdenes de compra, procesa la información correspondiente y genera la preferencia de pago en MercadoPago, devolviendo al cliente los datos necesarios para completar la transacción.


> [Código fuente](https://github.com/)

## Tecnologías

- Node.js - TypeScript
- MercadoPago SDK para la integración de pagos.
- Docker.

## Endpoints

- Crear un pago (POST → /pagos/crear) - return init_point
- Webhook
- Consultar un pago (GET → /pagos/{id}
- Listar todos los pagos (GET → /pagos)