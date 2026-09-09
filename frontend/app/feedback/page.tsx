
import { Suspense } from "react";
import FeedbackContent from "./feedbackcontent";

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div>Loading feedback...</div>}>
      <FeedbackContent />
    </Suspense>
  );
}