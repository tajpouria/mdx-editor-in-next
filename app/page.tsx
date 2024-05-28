import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import fs from "fs";

const EditorComp = dynamic(() => import("./EditorComponent"), { ssr: false });

export default function Home() {
  const demoMarkdown = fs.readFileSync("./live-demo-contents.md", "utf-8");
  return (
    <>
      <Suspense fallback={null}>
        <EditorComp markdown={demoMarkdown} />
      </Suspense>
    </>
  );
}
