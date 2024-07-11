import request from 'supertest'
import server, { conectDB } from '../server'
import db from '../config/db'

jest.mock('../config/db.ts')

describe('conectDB' , () => {
     it('should handle database connection error', async () => {
          jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('error a la coneccion'))
          const consoleSpy = jest.spyOn(console, 'log')

          await conectDB()

          expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('error a la coneccion'))
     })
})