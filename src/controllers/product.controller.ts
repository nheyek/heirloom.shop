import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productService.findAllProducts();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await productService.findProductById(Number(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};