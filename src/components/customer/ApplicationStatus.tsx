import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, Calendar, CreditCard } from 'lucide-react';
import { CustomerView } from '../CustomerDashboard';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ApplicationStatusProps {
  onBack: () => void;
  onNavigate: (view: CustomerView) => void;
}

export function ApplicationStatus({ onBack, onNavigate }: ApplicationStatusProps) {
  // Mock application status
  const applicationStatus = {
    id: 'APP-2025-001234',
    submittedDate: 'Nov 28, 2025',
    currentStage: 'site-visit-scheduled',
    siteVisitDate: 'Dec 15, 2025',
    siteVisitTime: '10:00 AM',
    officer: {
      name: 'Mr. Perera',
      phone: '+94 71 234 5678',
    },
  };

  const stages = [
    { id: 'submitted', label: 'Application Submitted', status: 'completed', date: 'Nov 28, 2025' },
    { id: 'review', label: 'Document Review', status: 'completed', date: 'Nov 30, 2025' },
    { id: 'site-visit-scheduled', label: 'Site Visit Scheduled', status: 'current', date: 'Dec 15, 2025' },
    { id: 'approval', label: 'CEB Approval', status: 'pending', date: null },
    { id: 'payment', label: 'Authority Fee Payment', status: 'pending', date: null },
    { id: 'installer', label: 'Select Installer', status: 'pending', date: null },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Button>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Application ID: {applicationStatus.id}</CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">In Progress</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Site Visit Alert */}
        <Alert className="border-blue-200 bg-blue-50">
          <Calendar className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-900">Site Visit Scheduled</AlertTitle>
          <AlertDescription className="text-blue-800">
            Your site visit is scheduled for <strong>{applicationStatus.siteVisitDate}</strong> at <strong>{applicationStatus.siteVisitTime}</strong>.
            <br />
            Officer: {applicationStatus.officer.name} ({applicationStatus.officer.phone})
          </AlertDescription>
        </Alert>

        {/* Progress Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Application Progress</CardTitle>
            <CardDescription>Track your application through each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        stage.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : stage.status === 'current'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {stage.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : stage.status === 'current' ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                    </div>
                    {index < stages.length - 1 && (
                      <div
                        className={`w-0.5 h-16 ${
                          stage.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className={stage.status === 'current' ? 'text-blue-600' : ''}>{stage.label}</h4>
                    {stage.date && (
                      <p className="text-sm text-muted-foreground">{stage.date}</p>
                    )}
                    {stage.status === 'current' && (
                      <p className="text-sm text-blue-600 mt-1">Currently in progress</p>
                    )}
                    {stage.status === 'completed' && (
                      <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please ensure someone is available at the property on {applicationStatus.siteVisitDate} at {applicationStatus.siteVisitTime} for the site inspection.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => onNavigate('notifications')}>
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mock Approval Section (for demo) */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-600">Application Approved! (Demo)</CardTitle>
            <CardDescription>Your application has been approved by CEB</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Congratulations! Your site visit was successful and your application has been approved.
                Please proceed with the authority fee payment to continue.
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="mb-2">Authority Fee Payment</h4>
              <div className="flex justify-between items-center mb-4">
                <span>CEB Authority Fee</span>
                <span className="text-lg">Rs 25,000</span>
              </div>
              <Button onClick={() => onNavigate('payments')} className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Payment
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                After payment, you can select an installer through packages or bidding system.
              </p>
              <Button variant="outline" onClick={() => onNavigate('find-installer')} className="w-full">
                Browse Solar Installers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
