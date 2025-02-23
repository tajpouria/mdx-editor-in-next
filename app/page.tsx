// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ScoreSummaryCard, Gauge } from "@/components/custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  BarChart,
  FileText,
  Briefcase,
  Loader2,
} from "lucide-react";

const EditorComp = dynamic(() => import("./EditorComponent"), { ssr: false });

// Types
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

// Main Component
export default function Home() {
  const [analyzing, setAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [analyses, setAnalyses] = useState<CategoryResult[] | null>([]);
  const [mounted, setMounted] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState("50%");
  const [isResizing, setIsResizing] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const dividerRef = useRef<HTMLDivElement>(null);

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

  const runAnalysis = async () => {
    if (!jobDescription || !resume) {
      alert("Please enter both job description and resume");
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
      setActiveTab("analysis");
    } catch (e) {
      alert("An error occurred. Please try again.");
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return "bg-green-100 text-green-800";
    if (score >= 7) return "bg-blue-100 text-blue-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-800";
    if (score >= 3) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isResizing) return;
    const percentage = (e.clientX / window.innerWidth) * 100;
    if (percentage > 30 && percentage < 70) {
      setLeftPanelWidth(`${percentage}%`);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove as any);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="h-screen bg-gray-50">
      {analyzing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-64">
            <CardContent className="py-6">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-lg font-medium">Analyzing Resume...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex h-full">
        <div
          className="w-full h-full bg-white shadow-lg overflow-auto"
          style={{ width: leftPanelWidth }}
        >
          <Card className="h-full border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              {mounted && (
                <EditorComp markdown={resume} setMarkdown={setResume} />
              )}
            </CardContent>
          </Card>
        </div>

        <div
          ref={dividerRef}
          className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize flex items-center justify-center"
          onMouseDown={handleMouseDown}
        >
          <div className="w-4 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex-1 h-full overflow-hidden">
          <Card className="h-full border-0">
            <CardHeader className="pb-4">
              <CardTitle>Job Analysis Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full"
              >
                <TabsList className="mb-4">
                  <TabsTrigger
                    value="description"
                    className="flex items-center gap-2"
                  >
                    <Briefcase className="h-4 w-4" />
                    Job Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="flex items-center gap-2"
                  >
                    <BarChart className="h-4 w-4" />
                    Analysis Results
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="description"
                  className="h-[calc(100%-3rem)]"
                >
                  <div className="flex flex-col h-full gap-4">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste job description here..."
                      className="flex-1 p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                    />
                    <Button onClick={runAnalysis} className="w-full" size="lg">
                      {analyzing ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <BarChart className="h-4 w-4 mr-2" />
                      )}
                      Analyze Resume
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="h-[calc(100%-3rem)]">
                  <ScrollArea className="h-full pr-4">
                    {Array.isArray(analyses) && analyses.length > 0 ? (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Overall Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col items-center mb-6">
                              <Gauge
                                value={calculateOverallAverage(analyses)}
                                size={160}
                                strokeWidth={15}
                              />
                              <h3 className="text-xl font-medium mt-4">
                                Match Score
                              </h3>
                            </div>

                            <Separator className="my-6" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {analyses.map((category) => (
                                <ScoreSummaryCard
                                  key={category.category}
                                  title={category.category}
                                  score={calculateAverageScore(
                                    category.metrics
                                  )}
                                  metrics={category.metrics.map((m) => ({
                                    name: m.metricName,
                                    score: m.result.score,
                                  }))}
                                />
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {analyses.map((categoryResult, categoryIndex) => (
                          <Card key={categoryIndex}>
                            <CardHeader className="flex flex-row items-center justify-between">
                              <CardTitle>{categoryResult.category}</CardTitle>
                              <Gauge
                                value={calculateAverageScore(
                                  categoryResult.metrics
                                )}
                                size={80}
                                strokeWidth={8}
                              />
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {categoryResult.metrics.map(
                                  (metricResult, metricIndex) => (
                                    <Card key={metricIndex}>
                                      <CardContent className="pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                          <div className="flex items-center gap-4">
                                            <Gauge
                                              value={metricResult.result.score}
                                              size={60}
                                              strokeWidth={6}
                                            />
                                            <h4 className="font-medium">
                                              {metricResult.metricName}
                                            </h4>
                                          </div>
                                          <Badge
                                            variant="secondary"
                                            className={getScoreColor(
                                              metricResult.result.score
                                            )}
                                          >
                                            {metricResult.result.score >= 7
                                              ? "Strong Match"
                                              : metricResult.result.score >= 5
                                              ? "Moderate Match"
                                              : "Needs Improvement"}
                                          </Badge>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                          {metricResult.result.reason}
                                        </p>
                                        {metricResult.result.tips.length >
                                          0 && (
                                          <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="font-medium mb-2">
                                              Improvement Tips:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                              {metricResult.result.tips.map(
                                                (tip, tipIndex) => (
                                                  <li
                                                    key={tipIndex}
                                                    className="text-gray-600"
                                                  >
                                                    {tip}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  )
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <BarChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg font-medium text-gray-600">
                            No analysis results yet
                          </p>
                          <p className="text-gray-500">
                            Submit your resume and job description to get
                            started
                          </p>
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
