import express, { Application, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

app.set("port", 8080);

app.use("/users", userRoutes);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Swagger YAML Setup
const swaggerPath = path.join(__dirname, "./swagger/swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.listen(app.get("port"), () => {
  console.log(`🚀 Server running on port ${app.get("port")}`);
});
