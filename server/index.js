/*eslint-env node */
import app from './app'
import db from '../storage/db'

async function serve() {
  await db.sync()
  app.listen(3000)
}

serve()
