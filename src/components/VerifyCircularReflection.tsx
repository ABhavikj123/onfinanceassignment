import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VerifyCircularReflectionProps {
  data: {
    circular_number: string
    date: string
    subject: string
  }
}

export default function VerifyCircularReflection({ data }: VerifyCircularReflectionProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">Circular Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Circular Number</h3>
            <p className="text-base mt-1 text-gray-900">{data.circular_number}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Date</h3>
            <p className="text-base mt-1 text-gray-900">{data.date}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Subject</h3>
            <p className="text-base mt-1 text-gray-900">{data.subject}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
