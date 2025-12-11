import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Download, TrendingDown, Zap, Leaf, DollarSign } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface BillingProps {
  onBack: () => void;
}

export function Billing({ onBack }: BillingProps) {
  const currentBill = {
    month: 'November 2025',
    totalConsumption: 420,
    solarGeneration: 580,
    gridImport: 95,
    gridExport: 255,
    netConsumption: -160, // negative means net export
    amount: -3520, // credit
    dueDate: 'Dec 10, 2025',
  };

  const billingHistory = [
    { month: 'October 2025', consumption: 400, generation: 550, amount: -3300, status: 'Credited' },
    { month: 'September 2025', consumption: 450, generation: 600, amount: -3630, status: 'Credited' },
    { month: 'August 2025', consumption: 480, generation: 620, amount: -3080, status: 'Credited' },
  ];

  const stats = {
    totalSaved: 48500,
    co2Prevented: 1245,
    treesEquivalent: 52,
    totalGenerated: 3540,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl mb-2">Billing & Usage</h2>
        <p className="text-muted-foreground">
          Monitor your energy consumption and solar generation
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">Rs {stats.totalSaved.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Since installation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              CO₂ Prevented
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.co2Prevented} kg</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.treesEquivalent} trees equivalent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Energy Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalGenerated} kWh</div>
            <p className="text-xs text-muted-foreground mt-1">Total generation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Grid Dependency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">18%</div>
            <p className="text-xs text-muted-foreground mt-1">82% self-sufficient</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Bill */}
      <Card className="mb-8 border-l-4 border-l-green-600">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Current Bill - {currentBill.month}</CardTitle>
              <CardDescription>Net metering calculation</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700">
              Credit Balance
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Solar Generation</p>
              <p className="text-2xl text-green-600">{currentBill.solarGeneration} kWh</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Grid Import</p>
              <p className="text-2xl text-orange-600">{currentBill.gridImport} kWh</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Grid Export</p>
              <p className="text-2xl text-blue-600">{currentBill.gridExport} kWh</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Net Energy Balance</span>
              <span className="text-2xl text-green-600">
                {Math.abs(currentBill.netConsumption)} kWh (Export)
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg">Amount</span>
              <span className="text-3xl text-green-600">
                Rs {Math.abs(currentBill.amount).toLocaleString()} (Credit)
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Due Date: {currentBill.dueDate}
            </p>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Bill
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Billing History</TabsTrigger>
          <TabsTrigger value="usage">Usage Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Previous Bills</CardTitle>
              <CardDescription>Your billing history and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((bill) => (
                  <div key={bill.month} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="mb-1">{bill.month}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Generated: {bill.generation} kWh</span>
                        <span>Consumed: {bill.consumption} kWh</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg text-green-600 mb-1">
                        Rs {Math.abs(bill.amount).toLocaleString()}
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {bill.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Usage Chart</CardTitle>
              <CardDescription>Monthly solar generation vs consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Usage chart visualization would be displayed here</p>
                  <p className="text-sm">(Using Recharts library)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
