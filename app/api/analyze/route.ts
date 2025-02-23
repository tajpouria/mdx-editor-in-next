// app/api/submit/route.ts

import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import ejs from "ejs"; // Import EJS

interface Data {
  jobDescription: string;
  resume: string;
}

interface Metric {
  name: string;
  content: string;
}

interface Category {
  category: string;
  metrics: Metric[];
}

export async function POST(request: NextRequest) {
  try {
    const data: Data = await request.json();
    if (!data.jobDescription || !data.resume) {
      return NextResponse.json(
        { error: "Please enter job description and resume" },
        { status: 400 }
      );
    }

    const criteriaPath = path.join(process.cwd(), "app", "criterias");
    const categories = await fs.readdir(criteriaPath);

    const criteriaData: Category[] = [];

    for (const categoryDir of categories) {
      const categoryPath = path.join(criteriaPath, categoryDir);
      const categoryStat = await fs.stat(categoryPath);

      if (categoryStat.isDirectory()) {
        const files = await fs.readdir(categoryPath);
        const metrics: Metric[] = [];

        for (const file of files) {
          if (file.endsWith(".md")) {
            const filePath = path.join(categoryPath, file);
            const fileContent = await fs.readFile(filePath, "utf-8");
            const fileName = file.replace(".md", "").replace(/-/g, " ");

            metrics.push({
              name: fileName
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              content: fileContent,
            });
          }
        }
        criteriaData.push({
          category: categoryDir
            .replace(/-/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          metrics: metrics.sort((a, b) => a.name.localeCompare(b.name)),
        });
      }
    }

    criteriaData.sort((a, b) => a.category.localeCompare(b.category));

    const categoryResults = await Promise.all(
      criteriaData.map(async (category) => {
        const metricResults = await Promise.all(
          category.metrics.map(async (metric) => {
            const prompt = ejs.render(metric.content, {
              job_description_text: data.jobDescription,
              resume_text: data.resume,
            });

            const result = await generateObject({
              model: google("gemini-2.0-flash"),
              temperature: 0,
              schema: z.object({
                score: z.number(),
                reason: z.string(),
                tips: z.array(z.string()),
              }),
              prompt,
            });

            return {
              metricName: metric.name,
              result: result.object,
            };
          })
        );

        return {
          category: category.category,
          metrics: metricResults,
        };
      })
    );

    return NextResponse.json(categoryResults, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
