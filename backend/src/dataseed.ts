import mongoose from "mongoose";
import dotenv from "dotenv";
import problemModel from "./models/problem.js";

dotenv.config();

const problems = [
  {
    title: "Parking Lot",
    description:
      "Design a parking lot system that can manage different types of vehicles, parking spots, and parking tickets.",
    difficulty: "Medium",
    requirements: [
      "Support different vehicle types",
      "Support different parking spot types",
      "Assign an available parking spot",
      "Generate a parking ticket",
      "Release the parking spot when a vehicle exits",
    ],
  },

  {
    title: "Elevator System",
    description:
      "Design an elevator system that manages multiple elevators and handles requests from different floors.",
    difficulty: "Medium",
    requirements: [
      "Support multiple elevators",
      "Handle requests from different floors",
      "Move elevators between floors",
      "Track elevator state",
      "Handle multiple requests",
    ],
  },

  {
    title: "Vending Machine",
    description:
      "Design a vending machine that allows users to select products, insert money, and receive products and change.",
    difficulty: "Easy",
    requirements: [
      "Display available products",
      "Select a product",
      "Accept money",
      "Validate payment",
      "Return change",
      "Handle out-of-stock products",
    ],
  },
];

const seedProblems = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    console.log("MongoDB connected");

    await problemModel.deleteMany();

    await problemModel.insertMany(problems);

    console.log("Problems seeded successfully");

    process.exit(0);
  } catch (error: any) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProblems();