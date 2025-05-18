'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, MenuIcon, XIcon } from "lucide-react";
import VerifyCircularReflection from "@/components/VerifyCircularReflection";
import AnalyzeReferences from "@/components/AnalyzeReferences";
import ReviewKeyNotesDates from "@/components/ReviewKeyNotesDates";
import DoubleCheckComplianceReqs from "@/components/DoubleCheckComplianceReqs";
import ExtractReportingDisclosures from "@/components/ExtractReportingDisclosures";
import ReviewTimelinesKnownBlockers from "@/components/ReviewTimelinesKnownBlockers";
import circularData from "@/data/circularData.json";

export default function Dashboard() {
  const [active, setActive] = useState<string>("verify");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const sections = [
    { id: "verify", name: "Step 1: Verify", comp: <VerifyCircularReflection /> },
    { id: "analyze", name: "Step 2: Analyze", comp: <AnalyzeReferences data={circularData.circular.Analyze} /> },
    { id: "review", name: "Step 3: Review Dates", comp: <ReviewKeyNotesDates data={circularData.circular.Clause} /> },
    { id: "compliance", name: "Step 4: Compliance", comp: <DoubleCheckComplianceReqs data={circularData.circular.ComplianceReq} /> },
    { id: "reporting", name: "Step 5: Reporting", comp: <ExtractReportingDisclosures reportdata={circularData.circular.reporting} disclosuredata={circularData.circular.disclosure} /> },
    { id: "timelines", name: "Step 6: Timelines", comp: <ReviewTimelinesKnownBlockers review={circularData.circular.reviewTimelines}
    knownblocker={circularData.circular.knownBlockers} /> },
  ];

  const idx = sections.findIndex(s => s.id === active);
  const ActiveComp = sections[idx]?.comp;

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} transition-all duration-200 flex flex-col border-r border-gray-700`}>  
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <span className={`font-bold text-white ${collapsed ? "hidden" : "block"}`}>Circular</span>
          <Button className="bg-gray-900 hover:bg-gray-700" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuIcon className="h-5 w-5" /> : <XIcon className="h-5 w-5 text-white" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-md transition-colors hover:bg-gray-700 ${active === s.id ? "bg-gray-700 text-white" : "text-gray-400"}`}
              >
                <FileText className="w-5 h-5 mr-3" />
                {!collapsed && <span>{s.name}</span>}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white border-l border-gray-200 m-2 rounded-2xl">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 ">
          <div className="flex items-center">
            <Button variant="ghost" disabled={idx <= 0} onClick={() => setActive(sections[idx - 1].id)}>
              Previous
            </Button>
          </div>
          <h1 className="text-lg font-medium text-white">{sections[idx].name}</h1>
          <Button variant="ghost" disabled={idx >= sections.length - 1} onClick={() => setActive(sections[idx + 1].id)}>
            Next
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-8"> 
            {ActiveComp} 
          </div>
        </main>
      </div>
    </div>
  );
}