'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Shield, Edit2 } from "lucide-react";

export interface ComplianceReqItem {
  summary: string;
  organization_impact: string;
  it_changes_needed: string;
  operational_changes_needed: string;
  ai_instruction: string;
}

interface DoubleCheckComplianceReqsProps {
  data: ComplianceReqItem[];
}

export default function DoubleCheckComplianceReqs({ data: initialData }: DoubleCheckComplianceReqsProps) {
  const [data, setData] = useState<ComplianceReqItem[]>(initialData);
  const [editing, setEditing] = useState<{ row: number; col: keyof ComplianceReqItem } | null>(null);

  const startEdit = (rowIndex: number, colKey: keyof ComplianceReqItem) => setEditing({ row: rowIndex, col: colKey });
  const saveEdit = (rowIndex: number, colKey: keyof ComplianceReqItem, value: string) => {
    const updated = [...data];
    updated[rowIndex][colKey] = value;
    setData(updated);
    setEditing(null);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Shield className="w-5 h-5 text-blue-500" />
          Compliance Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700 flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Double-click any cell to edit compliance details
          </p>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Summary</TableHead>
                <TableHead className="font-semibold text-gray-700">Organization Impact</TableHead>
                <TableHead className="font-semibold text-gray-700">IT Changes Needed</TableHead>
                <TableHead className="font-semibold text-gray-700">Operational Changes</TableHead>
                <TableHead className="font-semibold text-gray-700">AI Instruction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                  {(Object.keys(row) as (keyof ComplianceReqItem)[]).map(col => (
                    <TableCell 
                      key={col} 
                      className="cursor-pointer relative group"
                      onDoubleClick={() => startEdit(i, col)}
                    >
                      {editing?.row === i && editing.col === col ? (
                        <Input
                          className="w-full focus:ring-2 focus:ring-blue-500"
                          defaultValue={row[col]}
                          onBlur={e => saveEdit(i, col, e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <div className="group-hover:bg-blue-50 p-2 rounded transition-colors">
                          {row[col]}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}