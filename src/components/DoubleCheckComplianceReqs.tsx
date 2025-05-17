import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DoubleCheckComplianceReqsProps {
  data: {
    allotment_basis: {
      cutoff_allotment: string
    }
    anchor_investors: {
      thresholds: Record<string, string>
      disclosures_required: string[]
    }
  }
}

export default function DoubleCheckComplianceReqs({ data }: DoubleCheckComplianceReqsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">Allotment Basis</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Cutoff Allotment:</span>
            <span className="text-gray-900">{data.allotment_basis.cutoff_allotment}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">Anchor Investors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(data.anchor_investors.thresholds).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 border rounded-md">
                  <span className="text-gray-900">{key}</span>
                  <Badge variant="outline" className="text-gray-900 bg-gray-100">
                    {value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Disclosures Required</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-900">
              {data.anchor_investors.disclosures_required.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
