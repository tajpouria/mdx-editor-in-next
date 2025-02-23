"use client";

import React, { useState, useEffect } from "react";
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

export default function Home() {
  const [analyzing, setAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [analyses, setAnalyses] = useState<CategoryResult[] | null>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const storedJobDescription = localStorage.getItem("jobDescription");
      const storedResume = localStorage.getItem("resume");
      const storedAnalyses = localStorage.getItem("analyses");

      if (storedJobDescription) setJobDescription(storedJobDescription);
      if (storedResume) setResume(storedResume);
      if (storedAnalyses) setAnalyses(JSON.parse(storedAnalyses));
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("jobDescription", jobDescription);
      localStorage.setItem("resume", resume);
      localStorage.setItem("analyses", JSON.stringify(analyses));
    }
  }, [jobDescription, resume, analyses, mounted]);

  useEffect(() => {
    console.log(analyses);
  }, [analyses]);

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

  const getScoreColor = (score: number) => {
    if (score >= 9) return "bg-green-300";
    if (score >= 7) return "bg-green-100";
    if (score >= 5) return "bg-yellow-100";
    if (score >= 3) return "bg-orange-100";
    return "bg-red-200";
  };

  const calculateAverageScore = (metrics: MetricResult[]) => {
    if (!metrics || metrics.length === 0) return 0;
    const totalScore = metrics.reduce(
      (sum, metric) => sum + metric.result.score,
      0
    );
    return totalScore / metrics.length;
  };

  const calculateOverallAverage = (analyses: CategoryResult[] | null) => {
    if (!analyses || analyses.length === 0) return 0;
    const allMetrics = analyses.flatMap((category) => category.metrics);
    return calculateAverageScore(allMetrics);
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
            {mounted && (
              <EditorComp markdown={resume} setMarkdown={setResume} />
            )}
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

            {Array.isArray(analyses) && (
              <div className="mt-4 p-4">
                <h2 className="text-xl font-semibold mb-2">Analyses</h2>

                {/* Summary of Scores */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-1">Summary</h3>
                  <p>
                    Overall Average Score:{" "}
                    {calculateOverallAverage(analyses).toFixed(2)}/10
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-semibold">Category</div>
                    <div className="font-semibold">Average Score</div>
                    {analyses.map((category) => (
                      <React.Fragment key={category.category}>
                        <div>{category.category}</div>
                        <div>
                          {calculateAverageScore(category.metrics).toFixed(2)}
                          /10
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Individual Category Analyses */}
                {analyses.map((categoryResult, categoryIndex) => (
                  <div key={categoryIndex} className="mb-4">
                    <h3 className="text-lg font-medium mb-1">
                      {categoryResult.category} (Avg:{" "}
                      {calculateAverageScore(categoryResult.metrics).toFixed(2)}
                      /10)
                    </h3>
                    {categoryResult.metrics.map((metricResult, metricIndex) => (
                      <div
                        key={metricIndex}
                        className={`border p-2 rounded mb-2 ${getScoreColor(
                          metricResult.result.score
                        )}`}
                      >
                        <h4 className="font-semibold">
                          {metricResult.metricName}
                        </h4>
                        <p><b>Score:</b> {metricResult.result.score}/10</p>
                        <p><b>Reason:</b> {metricResult.result.reason}</p>
                        {metricResult.result.tips.length > 0 && (
                          <div>
                            <p className="font-medium">Tips:</p>
                            <ul className="list-disc list-inside">
                              {metricResult.result.tips.map((tip, tipIndex) => (
                                <li key={tipIndex}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
}
