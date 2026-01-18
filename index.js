import express from "express";
import productsRoutes from "./routes/products.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/analytics", analyticsRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
