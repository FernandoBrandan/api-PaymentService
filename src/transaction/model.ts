/**

VER!!!
https://www.youtube.com/watch?v=jsJztlsDgWg


 * import sequelize from '../config/database'
import { DataTypes } from 'sequelize'

const Pago = sequelize.define('Pago', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente' // 'pendiente', 'aprobado', 'rechazado'
  },
  id_transaccion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
})

module.exports = Pago
*/
