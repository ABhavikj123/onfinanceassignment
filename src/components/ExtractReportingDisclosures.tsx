import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExtractReportingDisclosuresProps {
  data: {
    fields_to_disclose: string[]
  }
}

export default function ExtractReportingDisclosures({ data }: ExtractReportingDisclosuresProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">EBP Reporting Fields to Disclose</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {data.fields_to_disclose.map((field, index) => (
              <Badge key={index} variant="outline" className="justify-start py-2 px-3 text-gray-900 bg-gray-100">
                {field}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
