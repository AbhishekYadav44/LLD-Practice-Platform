import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    status: {
      type: String,
      enum: ["Started", "Submitted", "Evaluating", "Completed", "Failed"],
      default: "Started",
    },
  },
  {
    timestamps: true,
  }
);

const attemptModel =  mongoose.model("Attempt", attemptSchema);
export default attemptModel