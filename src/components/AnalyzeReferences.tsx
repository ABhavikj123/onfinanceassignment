'use client'
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Edit2 } from "lucide-react";

export interface ClauseItem {
  clause_no: string;
  referred_circular: string;
  referred_circular_clause_no: string;
  reference_context: string;
}

interface AnalyzeReferencesProps {
  data: ClauseItem[];
}

const AnalyzeReferences: React.FC<AnalyzeReferencesProps> = ({ data: initialData }) => {
  const [data, setData] = useState<ClauseItem[]>(initialData);
  const [editing, setEditing] = useState<{ row: number; col: keyof ClauseItem } | null>(null);

  const startEdit = (rowIndex: number, colKey: keyof ClauseItem) => setEditing({ row: rowIndex, col: colKey });

  const saveEdit = (rowIndex: number, colKey: keyof ClauseItem, value: string) => {
    const updated = [...data];
    updated[rowIndex][colKey] = value;
    setData(updated);
    setEditing(null);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <FileText className="w-5 h-5 text-blue-500" />
          Reference Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700 flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Double-click any cell to edit its content
          </p>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Clause No.</TableHead>
                <TableHead className="font-semibold text-gray-700">Referred Circular</TableHead>
                <TableHead className="font-semibold text-gray-700">Referred Circular Clause No.</TableHead>
                <TableHead className="font-semibold text-gray-700">Reference Context</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-gray-50 transition-colors">
                  {(Object.keys(row) as (keyof ClauseItem)[]).map((col) => (
                    <TableCell 
                      key={col} 
                      className="cursor-pointer relative group"
                      onDoubleClick={() => startEdit(idx, col)}
                    >
                      {editing?.row === idx && editing.col === col ? (
                        <Input
                          className="w-full focus:ring-2 focus:ring-blue-500"
                          defaultValue={row[col]}
                          onBlur={(e) => saveEdit(idx, col, e.target.value)}
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
};

export default AnalyzeReferences;