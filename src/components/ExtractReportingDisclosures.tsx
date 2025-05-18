import React, { useState, useRef, useEffect } from "react";
import { FileText, Edit2, Check, X, UserPlus, Calendar, Activity, Trash2 } from "lucide-react";

export interface ReportingItem {
  clause_no: string;
  report_item: string;
  description: string;
  actionable_title: string;
  assigned_to: string;
  due_date: string;
  compliance_status: string;
}

export interface DisclosureItem {
  clause_no: string;
  disclosure_item: string;
  context: string;
  actionable_title: string;
  assigned_to: string;
  due_date: string;
  compliance_status: string;
}

interface ExtractReportingDisclosuresProps {
  reportdata: ReportingItem[];
  disclosuredata: DisclosureItem[];
}

export default function ExtractReportingDisclosures({
  reportdata: initialReports,
  disclosuredata: initialDisclosures,
}: ExtractReportingDisclosuresProps) {
  const [reports, setReports] = useState<ReportingItem[]>(initialReports);
  const [disclosures, setDisclosures] = useState<DisclosureItem[]>(initialDisclosures);
  const [editing, setEditing] = useState<{ table: 'report' | 'disclosure'; row: number; col: string } | null>(null);
  const [hoveredAction, setHoveredAction] = useState<{ row: number; label: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const startEdit = (table: 'report' | 'disclosure', rowIndex: number, colKey: string) => {
    setEditing({ table, row: rowIndex, col: colKey });
  };

  const saveEdit = (table: 'report' | 'disclosure', rowIndex: number, colKey: string, value: string) => {
    if (table === 'report') {
      const updated = [...reports];
      (updated[rowIndex] as any)[colKey] = value;
      setReports(updated);
    } else {
      const updated = [...disclosures];
      (updated[rowIndex] as any)[colKey] = value;
      setDisclosures(updated);
    }
    setEditing(null);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    table: 'report' | 'disclosure',
    rowIndex: number,
    colKey: string,
    value: string
  ) => {
    if (e.key === "Enter") {
      saveEdit(table, rowIndex, colKey, value);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  const ActionButton = ({
    icon: Icon,
    label,
    color,
    onClick,
    rowIndex,
  }: {
    icon: any;
    label: string;
    color: string;
    onClick: () => void;
    rowIndex: number;
  }) => (
    <button
      className={`p-2 rounded-lg transition-all duration-200 relative group ${color}`}
      onClick={onClick}
      onMouseEnter={() => setHoveredAction({ row: rowIndex, label })}
      onMouseLeave={() => setHoveredAction(null)}
      type="button"
    >
      <Icon className="w-4 h-4" />
      {hoveredAction && hoveredAction.row === rowIndex && hoveredAction.label === label && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10">
          {label}
        </div>
      )}
    </button>
  );

  const renderTable = <T extends Record<string, any>>(
    data: T[],
    columns: string[],
    tableKey: 'report' | 'disclosure'
  ) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map(col => (
              <th key={col} className="text-left p-4 font-semibold text-gray-700">
                {col.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </th>
            ))}
            <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col} className="p-2 relative">
                  {editing?.table === tableKey && editing.row === i && editing.col === col ? (
                    <div className="flex items-center">
                      <input
                        ref={inputRef}
                        className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={String(row[col] ?? '')}
                        onKeyDown={(e) => handleKeyDown(e, tableKey, i, col, e.currentTarget.value)}
                        onBlur={(e) => saveEdit(tableKey, i, col, e.target.value)}
                      />
                      <div className="absolute right-2 flex space-x-1">
                        <button
                          onClick={() => saveEdit(tableKey, i, col, inputRef.current?.value || '')}
                          className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                          type="button"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => startEdit(tableKey, i, col)}
                      className="cursor-pointer p-3 rounded hover:bg-blue-50 transition-all duration-200 group relative"
                    >
                      {col === 'compliance_status' ? (
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(String(row[col]))}`}>
                          {String(row[col] ?? '')}
                        </span>
                      ) : (
                        <span>{String(row[col] ?? '')}</span>
                      )}
                      <Edit2 className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 transition-opacity" />
                    </div>
                  )}
                </td>
              ))}
              <td className="p-2">
                <div className="flex space-x-2">
                  <ActionButton
                    icon={UserPlus}
                    label="Reassign"
                    color="text-blue-600 hover:bg-blue-50"
                    onClick={() => alert(`Reassign row ${i + 1}`)}
                    rowIndex={i}
                  />
                  <ActionButton
                    icon={Calendar}
                    label="Update Due Date"
                    color="text-indigo-600 hover:bg-indigo-50"
                    onClick={() => alert(`Update Due Date for row ${i + 1}`)}
                    rowIndex={i}
                  />
                  <ActionButton
                    icon={Activity}
                    label="Update Status"
                    color="text-green-600 hover:bg-green-50"
                    onClick={() => alert(`Update Status for row ${i + 1}`)}
                    rowIndex={i}
                  />
                  <ActionButton
                    icon={Trash2}
                    label="Delete"
                    color="text-red-600 hover:bg-red-50"
                    onClick={() => alert(`Delete row ${i + 1}`)}
                    rowIndex={i}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b bg-gradient-to-r from-blue-50 to-white p-4 flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Reporting Requirements</h2>
        </div>
        <div className="p-6">
          {renderTable(reports, ['clause_no', 'report_item', 'description', 'actionable_title', 'assigned_to', 'due_date', 'compliance_status'], 'report')}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b bg-gradient-to-r from-indigo-50 to-white p-4 flex items-center gap-3">
          <FileText className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">Disclosure Requirements</h2>
        </div>
        <div className="p-6">
          {renderTable(disclosures, ['clause_no', 'disclosure_item', 'context', 'actionable_title', 'assigned_to', 'due_date', 'compliance_status'], 'disclosure')}
        </div>
      </div>
    </div>
  );
}