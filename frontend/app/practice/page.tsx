import { Suspense } from "react";
import PracticeContent from "./PracticeContent";

export default function PracticePage() {
  return (
    <Suspense fallback={<div>Loading practice...</div>}>
      <PracticeContent />
    </Suspense>
  );
}