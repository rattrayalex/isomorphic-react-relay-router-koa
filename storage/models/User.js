import Sequelize from 'sequelize'
import db from '../db'


// TODO: come back and deal with this mess later...

export default db.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
    unique: true,

  },

  // todo: non-plaintext passwords.
  password: {
    type: Sequelize.STRING,
  },

})
