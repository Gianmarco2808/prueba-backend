import { Request, Response } from "express"
import Product from "../models/Product"

export const getProducts = async (req: Request, res: Response) => {
     try {
          const products = await Product.findAll({
               order: [
                    ['id', 'DESC']
               ]
               // attributes: {exclude: ['createdAt', 'updatedAt', 'availability']}
          })
          res.json({data: products})
     } catch (error) {
          console.log(error)  
     }
}

export const getProductById = async (req: Request, res: Response) => {
     try {
          const { id } = req.params
          const product = await Product.findByPk(id)
          if (!product) {
               return res.status(404).json({
                    error: 'Producto no encontrado'
               })
          }
          res.json({data: product})
     } catch (error) {
          console.log(error)
     }
}

export const createProduct = async (req: Request, res: Response) => {
     try {
          const product = await Product.create(req.body)
          res.status(201).json({data: product})
     } catch (error) {
          console.log(error);          
     }
}

export const updatedProduct = async (req: Request, res: Response) => {
     try {
          const { id } = req.params
          const product = await Product.findByPk(id)
          if (!product) {
               return res.status(404).json({
                    error: 'Producto no encontrado'
               })
          }
          await product.update(req.body)
          await product.save()

     } catch (error) {
          console.log(error)
     }
}

export const updatedAvailability = async (req: Request, res: Response) => {
     try {
          const { id } = req.params
          const product = await Product.findByPk(id)
          if (!product) {
               return res.status(404).json({
                    error: 'Producto no encontrado'
               })
          }
          product.availability = !product.dataValues.availability
          await product.save()
          res.json({data: product})
          
     } catch (error) {
          console.log(error)
     }
}

export const deleteProduct = async (req: Request, res: Response) => {
     try {
          const { id } = req.params
          const product = await Product.findByPk(id)
          if (!product) {
               return res.status(404).json({
                    error: 'Producto no encontrado'
               })
          }
          await product.destroy()
          res.json({data: 'producto eliminado'})
          
     } catch (error) {
          console.log(error)
     }
}