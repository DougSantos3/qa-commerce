const sqlite3 = require('sqlite3').verbose()
const path = require('node:path')
const bcrypt = require('bcrypt')

const dbPath = path.join(__dirname, '../../src/qa_commerce.db')

const seedAdmin = async () => {
  const db = new sqlite3.Database(dbPath)
  const hash = await bcrypt.hash('admin', 10)

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Users WHERE email = ?', ['admin@admin.com'], (err) => {
      if (err) return reject(err)
      db.run(
        'INSERT INTO Users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)',
        ['Admin', 'admin@admin.com', hash, 1],
        (err) => {
          db.close()
          if (err) reject(err)
          else resolve(true)
        }
      )
    })
  })
}

const getUsers = () => {
  const db = new sqlite3.Database(dbPath)
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, email, isAdmin FROM Users', [], (err, rows) => {
      db.close()
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

module.exports = {
  seedAdmin,
  getUsers
}
