"use client"

import { useState } from "react"
import { MenuIcon, XIcon } from "lucide-react"
import VerifyCircularReflection from "@/components/VerifyCircularReflection"
import AnalyzeReferences from "@/components/AnalyzeReferences"
import ReviewKeyNotesDates from "@/components/ReviewKeyNotesDates"
import DoubleCheckComplianceReqs from "@/components/DoubleCheckComplianceReqs"
import ExtractReportingDisclosures from "@/components/ExtractReportingDisclosures"
import ReviewTimelinesKnownBlockers from "@/components/ReviewTimelinesKnownBlockers"
import circularData from "@/data/circularData.json"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("verify")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sections = [
    {
      id: "verify",
      name: "Step 1: Verify Circular Extraction",
      component: <VerifyCircularReflection data={circularData.circular} />,
    },
    {
      id: "analyze",
      name: "Step 2: Analyze References",
      component: <AnalyzeReferences data={circularData.circular.applicable_to} />,
    },
    {
      id: "review",
      name: "Step 3: Review Key Notes & Dates",
      component: <ReviewKeyNotesDates data={circularData.circular.modifications.chapter_VI} />,
    },
    {
      id: "compliance",
      name: "Step 4: Double-Check Compliance Reqs",
      component: <DoubleCheckComplianceReqs data={circularData.circular.modifications.chapter_VI} />,
    },
    {
      id: "reporting",
      name: "Step 5: Extract Reporting & Disclosures",
      component: <ExtractReportingDisclosures data={circularData.circular.modifications.chapter_VI.EBP_reporting} />,
    },
    {
      id: "timelines",
      name: "Step 6: Review Timelines & Known Blockers",
      component: (
        <ReviewTimelinesKnownBlockers
          effectiveDates={circularData.circular.effective_dates}
          bidBook={circularData.circular.annexure.bid_book}
        />
      ),
    },
  ]

  const activeComponent = sections.find((section) => section.id === activeSection)?.component

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-20 p-4 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 bg-gray-800 text-white">
        <div className="h-16 flex items-center px-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Circular Analysis</h2>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`${
                activeSection === section.id
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile sidebar */}
      <div className={`${isMobileMenuOpen ? "fixed inset-0 z-10 flex" : "hidden"} md:hidden`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-64 bg-gray-800 text-white">
          <div className="h-16 flex items-center px-4 border-b border-gray-700">
            <h2 className="text-lg font-medium">Circular Analysis</h2>
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`${
                  activeSection === section.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-white">
        <main className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            {sections.find((section) => section.id === activeSection)?.name}
          </h1>
          {activeComponent}
        </main>
      </div>
    </div>
  )
}
