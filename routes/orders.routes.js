import express from "express";
import { readDB, writeDB } from "../utils/fileHandler.js";

const router = express.Router();


router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  const db = readDB();

  const product = db.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.stock === 0 || quantity > product.stock) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const totalAmount = product.price * quantity;

  const newOrder = {
    id: db.orders.length + 1,
    productId,
    quantity,
    totalAmount,
    status: "placed",
    createdAt: new Date().toISOString().split("T")[0]
  };

  product.stock -= quantity;
  db.orders.push(newOrder);
  writeDB(db);

  res.status(201).json({ message: "Order placed", order: newOrder });
});

router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.orders);
});


router.delete("/:orderId", (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === Number(req.params.orderId));

  if (!order) return res.status(404).json({ message: "Order not found" });
  if (order.status === "cancelled")
    return res.status(400).json({ message: "Order already cancelled" });

  const today = new Date().toISOString().split("T")[0];
  if (order.createdAt !== today)
    return res.status(400).json({ message: "Cancellation window expired" });

  order.status = "cancelled";

  const product = db.products.find(p => p.id === order.productId);
  product.stock += order.quantity;

  writeDB(db);
  res.json({ message: "Order cancelled", order });
});


router.patch("/change-status/:orderId", (req, res) => {
  const { status } = req.body;
  const db = readDB();
  const order = db.orders.find(o => o.id === Number(req.params.orderId));

  if (!order) return res.status(404).json({ message: "Order not found" });
  if (["cancelled", "delivered"].includes(order.status))
    return res.status(400).json({ message: "Status change not allowed" });

  const validFlow = {
    placed: "shipped",
    shipped: "delivered"
  };

  if (validFlow[order.status] !== status) {
    return res.status(400).json({ message: "Invalid status transition" });
  }

  order.status = status;
  writeDB(db);
  res.json({ message: "Status updated", order });
});

export default router;
