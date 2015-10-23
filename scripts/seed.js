/* eslint-env node */
/* eslint-disable no-console */

import Thing from '../storage/models/Thing'
import User from '../storage/models/User'
import db from '../storage/db'


async function seed() {
  try {
    await db.sync()
    await Thing.bulkCreate([
      { name: 'Thing 1' },
      { name: 'Thing 2' },
    ])

    let user = await User.create({
      username: 'rattray.alex@gmail.com',
      password: 'password',
    })

    console.log({ user })
    let Things = await Thing.findAll()
    console.log({ Things })
    db.close()
  } catch (e) {
    console.error(e)
  }
}

if (require.main === module) {
  seed()
}
