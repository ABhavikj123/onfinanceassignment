import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BidBookItem {
  bidder: string
  amount: number
  price: number
  timestamp: string
}

interface ReviewTimelinesKnownBlockersProps {
  effectiveDates: {
    immediate: string
    "3_months": string[]
    "6_months": string[]
  }
  bidBook: BidBookItem[]
}

export default function ReviewTimelinesKnownBlockers({ effectiveDates, bidBook }: ReviewTimelinesKnownBlockersProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">Effective Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Immediate</h3>
            <p className="mt-1 text-gray-900">{effectiveDates.immediate}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700">3 Months</h3>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-900">
              {effectiveDates["3_months"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700">6 Months</h3>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-900">
              {effectiveDates["6_months"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">Bid Book</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">Bidder</TableHead>
                  <TableHead className="text-right text-gray-700">Amount</TableHead>
                  <TableHead className="text-right text-gray-700">Price</TableHead>
                  <TableHead className="text-gray-700">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bidBook.map((bid, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900">{bid.bidder}</TableCell>
                    <TableCell className="text-right text-gray-900">{bid.amount}</TableCell>
                    <TableCell className="text-right text-gray-900">{bid.price}</TableCell>
                    <TableCell className="text-gray-900">{bid.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
