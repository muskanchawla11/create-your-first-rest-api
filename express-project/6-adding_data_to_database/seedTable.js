import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { abductionsData } from './abductionsData.js'

async function seedTable() {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {
//we dont want to insert one by one we want to add all object together so used exec
    await db.exec('BEGIN TRANSACTION')

    for (const {location, details} of abductionsData) {
      await db.run(
        `INSERT INTO abductions (location, details)
        VALUES (?, ?)`,
        [location, details]
      )
    }
    
    await db.exec('COMMIT')
    //means transactions closed
    console.log('All records inserted')

  } catch (err) {

    await db.exec('ROLLBACK')
    //means dont add anything to the table
    console.log('Error inserting data', err.message)

  } finally {

    await db.close()
    console.log('connection closed')

  }

}

seedTable()