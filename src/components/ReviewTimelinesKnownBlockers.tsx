"use client";
import React from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface ReviewTimeline {
    category: string;
    timeline: string;
    activity: string;
}

interface KnownBlocker {
    blocker: string;
    description: string;
}

interface Props {
    review: ReviewTimeline[];
    knownblocker: KnownBlocker[];
}

const ReviewTimelinesKnownBlockers: React.FC<Props> = ({ review, knownblocker }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-10">
            {/* Timelines Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="border-b bg-gradient-to-r from-blue-50 to-white p-4 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Key Review Timelines</h2>
                </div>
                <div className="p-6">
                    <table className="w-full border rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-50">
                                <th className="p-3 text-left font-semibold text-gray-700">Category</th>
                                <th className="p-3 text-left font-semibold text-gray-700">Timeline</th>
                                <th className="p-3 text-left font-semibold text-gray-700">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {review.map((item, idx) => (
                                <tr key={idx} className="border-b last:border-b-0 hover:bg-blue-50 transition">
                                    <td className="p-3">{item.category}</td>
                                    <td className="p-3 font-mono text-blue-700">{item.timeline}</td>
                                    <td className="p-3">{item.activity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Known Blockers Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="border-b bg-gradient-to-r from-red-50 to-white p-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Known Blockers</h2>
                </div>
                <div className="p-6 space-y-4">
                    {knownblocker.map((blocker, idx) => (
                        <div key={idx} className="border-l-4 border-red-400 bg-red-50 p-4 rounded-lg shadow-sm">
                            <div className="font-semibold text-red-700 mb-1">{blocker.blocker}</div>
                            <div className="text-gray-700">{blocker.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewTimelinesKnownBlockers;