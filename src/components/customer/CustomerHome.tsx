import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Search, CreditCard, FileCheck, Receipt, Leaf, ArrowRight } from 'lucide-react';
import CustomerView  from '../CustomerDashboard';
import { Progress } from '../ui/progress';

interface CustomerHomeProps {
  onNavigate: (view: any) => void;
}

export function CustomerHome({ onNavigate }: CustomerHomeProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white mb-8">
        <h2 className="text-3xl mb-2">Welcome to Solar Installation System</h2>
        <p className="text-lg opacity-90">
          Start your journey to clean, renewable energy
        </p>
      </div>

      {/* Current Application Status */}
      <Card className="mb-8 border-l-4 border-l-blue-600">
        <CardHeader>
          <CardTitle>Current Application Status</CardTitle>
          <CardDescription>Track your solar installation progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Application Submitted</span>
              <span className="text-green-600">Completed</span>
            </div>
            <Progress value={60} />
            <p className="text-sm text-muted-foreground">
              Your application is under review. A site visit has been scheduled for Dec 15, 2025.
            </p>
            <Button onClick={() => onNavigate('status')} variant="outline">
              View Full Status <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">CO₂ Prevented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl">1,245</span>
              <span className="text-muted-foreground mb-1">kg</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
              <Leaf className="w-4 h-4" />
              <span>Equivalent to 52 trees planted</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Energy Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl">3,540</span>
              <span className="text-muted-foreground mb-1">kWh</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">This month: 420 kWh</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Cost Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl">Rs 48,500</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Since installation</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <h3 className="text-xl mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('apply')}>
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>New Application</CardTitle>
            <CardDescription>Apply for solar panel installation</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full">
              Start Application <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('status')}>
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Track your application progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full">
              View Status <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('find-installer')}>
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Find Installer</CardTitle>
            <CardDescription>Browse packages or open a bid</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full">
              Find Installer <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('payments')}>
          <CardHeader>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
            <CardTitle>Payments</CardTitle>
            <CardDescription>Manage payments and invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full">
              View Payments <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('agreements')}>
          <CardHeader>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6 text-teal-600" />
            </div>
            <CardTitle>Agreements</CardTitle>
            <CardDescription>View and sign agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full">
              View Agreements <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('billing')}>
          <CardHeader>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Receipt className="w-6 h-6 text-pink-600" />
            </div>
            <CardTitle>Billing</CardTitle>
            <CardDescription>View monthly bills and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full">
              View Bills <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
