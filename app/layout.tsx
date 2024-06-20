import "./globals.css";
import type { Metadata } from "next";

import { EndpointsContext } from "./agent";
import { ReactNode } from "react";
import { AI } from "@/utils/createai";

export const metadata: Metadata = {
  title: "LangChain.js Gen UI",
  description: "Generative UI application with LangChain.js",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col p-4 md:p-12 h-[100vh]">
          <AI>{props.children}</AI>
        </div>
      </body>
    </html>
  );
}
