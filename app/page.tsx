"use client";

import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditorComp = dynamic(() => import("./EditorComponent"), { ssr: false });

interface MetricResult {
  metricName: string;
  result: {
    score: number;
    reason: string;
    tips: string[];
  };
}

interface CategoryResult {
  category: string;
  metrics: MetricResult[];
}

interface Analyses {
  categories: CategoryResult[];
}

export default function Home() {
  const [analyzing, setAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useLocalStorage(
    "jobDescription",
    ""
  );
  const [resume, setResume] = useLocalStorage("resume", "");
  const [analyses, setAnalyses] = useLocalStorage<Analyses | null>(
    "analyses",
    null
  );

  React.useEffect(() => {
    console.log(analyses);
  }, []);

  const runAnalysis = async () => {
    if (!jobDescription || !resume) {
      alert("Please enter job description and resume");
      return;
    }

    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          resume,
        }),
      });
      const data = await res.json();
      setAnalyses(data);
      setAnalyzing(false);
    } catch (e) {
      alert("An error occurred. Please check the console for more details.");
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      {analyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg">Analyzing...</p>
          </div>
        </div>
      )}
      <Suspense fallback={null}>
        <div className="grid grid-cols-3 h-screen">
          <div className="col-span-2 border-2 overflow-auto">
            <EditorComp markdown={resume} setMarkdown={setResume} />
          </div>
          <div className="col-span-1 border-2 border-solid overflow-auto">
            <h1>
              <b>Job Description</b>
            </h1>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-96 border-2 border-solid"
            />
            <button
              onClick={runAnalysis}
              className="bg-white w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Analyze
            </button>
          </div>
        </div>
      </Suspense>
    </>
  );
}
