import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic Router
app.get("/", async (req: Request, res: Response) => {
  const category = await prisma.category.create({
    data: {
      name: "Test Category",
      slug: "test-category",
      description: "This is a test category",
    },
  });
  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

export default app;
