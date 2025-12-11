import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, FileText, CheckCircle2, Download } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';

interface AgreementsProps {
  onBack: () => void;
}

export function Agreements({ onBack }: AgreementsProps) {
  const [agreed, setAgreed] = useState(false);
  const [signed, setSigned] = useState(false);

  const agreementDetails = {
    systemCapacity: '5 kW',
    feedInTariff: 'Rs 22.00 per kWh',
    contractPeriod: '20 years',
    startDate: 'Jan 1, 2026',
    endDate: 'Dec 31, 2045',
    maxExport: '4 kW',
    conditions: [
      'System must be maintained in good working condition',
      'Regular inspections by CEB are required',
      'Net metering will be applied on monthly basis',
      'Customer is responsible for system insurance',
      'Any system modifications require prior CEB approval',
    ],
  };

  const handleSign = () => {
    setSigned(true);
  };

  if (signed) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>

        <Card>
          <CardContent className="pt-6 text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl mb-2">Agreement Signed Successfully!</h3>
            <p className="text-muted-foreground mb-6">
              Your solar installation agreement has been submitted to CEB for final processing.
            </p>
            <Alert className="mb-6">
              <AlertDescription>
                You will receive a confirmation email with the signed agreement. The installation process is now complete!
              </AlertDescription>
            </Alert>
            <div className="flex gap-4 justify-center">
              <Button onClick={onBack}>Back to Dashboard</Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Agreement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl mb-2">Solar Installation Agreement</h2>
        <p className="text-muted-foreground">
          Review and sign your agreement with CEB
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Net Metering Agreement</CardTitle>
              <CardDescription>Ceylon Electricity Board (CEB)</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Pending Signature
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              Please review all terms carefully before signing. Once signed, this agreement will be valid for the entire contract period.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">System Capacity</p>
              <p className="text-lg">{agreementDetails.systemCapacity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Feed-in Tariff</p>
              <p className="text-lg">{agreementDetails.feedInTariff}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contract Period</p>
              <p className="text-lg">{agreementDetails.contractPeriod}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maximum Export</p>
              <p className="text-lg">{agreementDetails.maxExport}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="text-lg">{agreementDetails.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="text-lg">{agreementDetails.endDate}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-3">Terms and Conditions</h4>
            <div className="space-y-2 pl-4">
              {agreementDetails.conditions.map((condition, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-muted-foreground">{index + 1}.</span>
                  <span className="text-sm">{condition}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="mb-3">Payment Terms</h4>
            <div className="space-y-2 text-sm">
              <p>
                • Monthly billing will be calculated based on net energy consumption (imported - exported)
              </p>
              <p>
                • Excess generation will be credited at the feed-in tariff rate
              </p>
              <p>
                • Bills will be generated on the same date as your regular electricity bill
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="mb-3">Inspection Schedule</h4>
            <div className="space-y-2 text-sm">
              <p>
                • Initial inspection: Completed ✓
              </p>
              <p>
                • Annual inspections: Required to maintain agreement validity
              </p>
              <p>
                • Random inspections: May be conducted by CEB with 48 hours notice
              </p>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms" 
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to all the terms and conditions mentioned above. I understand that this is a legally binding agreement between myself and the Ceylon Electricity Board for a period of {agreementDetails.contractPeriod}.
              </label>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleSign}
                disabled={!agreed}
                className="flex-1"
                size="lg"
              >
                Sign Agreement
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
