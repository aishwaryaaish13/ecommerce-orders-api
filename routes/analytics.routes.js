import express from "express";
import { readDB } from "../utils/fileHandler.js";

const router = express.Router();


router.get("/allorders", (req, res) => {
  const db = readDB();
  const orders = db.orders.map(o => o);
  res.json({ count: orders.length, orders });
});


router.get("/cancelled-orders", (req, res) => {
  const db = readDB();
  const cancelled = db.orders.filter(o => o.status === "cancelled");
  res.json({ count: cancelled.length, orders: cancelled });
});


router.get("/shipped", (req, res) => {
  const db = readDB();
  const shipped = db.orders.filter(o => o.status === "shipped");
  res.json({ count: shipped.length, orders: shipped });
});


router.get("/total-revenue/:productId", (req, res) => {
  const db = readDB();
  const productId = Number(req.params.productId);

  const product = db.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const totalRevenue = db.orders
    .filter(o => o.productId === productId && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.json({ productId, totalRevenue });
});


router.get("/alltotalrevenue", (req, res) => {
  const db = readDB();

  const totalRevenue = db.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = db.products.find(p => p.id === o.productId);
      return sum + o.quantity * product.price;
    }, 0);

  res.json({ totalRevenue });
});

export default router;
