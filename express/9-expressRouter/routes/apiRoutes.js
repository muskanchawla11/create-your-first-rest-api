import express from 'express'
import { productsController } from '../controllers/productsController.js'
import { servicesController } from '../controllers/servicesController.js'

export const apiRouter=express.Router();

apiRouter.get('/product',productsController)
apiRouter.get('/service',servicesController)