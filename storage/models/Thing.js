import Sequelize from 'sequelize'
import db from '../db'


export default db.define('Thing', {
  name: { type: Sequelize.STRING },
})
