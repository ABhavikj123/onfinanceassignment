import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyzeReferencesProps {
  data: string[]
}

export default function AnalyzeReferences({ data }: AnalyzeReferencesProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">Applicable To</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="list-disc pl-5 space-y-2 text-gray-900">
            {data.map((item, index) => (
              <li key={index} className="text-base">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
