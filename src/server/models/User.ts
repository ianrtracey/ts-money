import { Sequelize, Model, DataTypes } from 'sequelize'
import sequelize from '../Db'

export class User extends Model {}

User.init({
  userid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  email: { 
    allowNull: false,
    type: DataTypes.STRING,
  },
  plaidAccessToken: {
    type: DataTypes.STRING
  },
  income: {
    type: DataTypes.INTEGER,
  },
  expenses: {
    type: DataTypes.INTEGER,
  },
  savingsRate: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  timestamps: true,
  modelName: 'User'
})