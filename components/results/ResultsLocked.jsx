import React from 'react';
import { Button } from "@/components/ui/button";

export default function ResultsLocked({ readinessScore, onUpgrade }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          Your Score: {readinessScore}/100
        </h1>

        <p className="text-slate-600 mb-6">
          Unlock your full survival timeline, expense breakdown, and move-out plan.
        </p>

        <ul className="text-left text-sm text-slate-700 mb-6 space-y-2">
          <li>✔ Survival timeline</li>
          <li>✔ Full expense breakdown</li>
          <li>✔ Move-out action plan</li>
          <li>✔ Scenario testing</li>
        </ul>

        <Button
          onClick={onUpgrade}
          className="w-full h-12 bg-coral-500 hover:bg-coral-600 text-white"
        >
          Unlock Full Report
        </Button>
      </div>
    </div>
  );
}
