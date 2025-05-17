import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewKeyNotesDatesProps {
  data: {
    mandatory_EBP_use: {
      threshold: string
      conditions: string[]
    }
    optional_use_EBP: string[]
    issuer_disclosures: {
      placement_memorandum: {
        timing: {
          existing_issuer: string
          first_time_issuer: string
        }
        contents: string[]
      }
    }
  }
}

export default function ReviewKeyNotesDates({ data }: ReviewKeyNotesDatesProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-900">Key Notes & Dates</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-gray-900 font-medium">Mandatory EBP Use</AccordionTrigger>
              <AccordionContent className="text-gray-900">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Threshold</h3>
                    <p className="mt-1">{data.mandatory_EBP_use.threshold}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Conditions</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {data.mandatory_EBP_use.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-gray-900 font-medium">Optional EBP Use</AccordionTrigger>
              <AccordionContent className="text-gray-900">
                <ul className="list-disc pl-5 space-y-1">
                  {data.optional_use_EBP.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-gray-900 font-medium">Issuer Disclosures</AccordionTrigger>
              <AccordionContent className="text-gray-900">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Placement Memorandum Timing</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Existing Issuer: {data.issuer_disclosures.placement_memorandum.timing.existing_issuer}</li>
                      <li>
                        First Time Issuer: {data.issuer_disclosures.placement_memorandum.timing.first_time_issuer}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Contents</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {data.issuer_disclosures.placement_memorandum.contents.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
