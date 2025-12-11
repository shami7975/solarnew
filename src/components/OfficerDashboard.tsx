import { useState } from "react";
import { User } from "../App";
import { Header } from "./Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import api from "../utils/api";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import {
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Building,
} from "lucide-react";

interface OfficerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function OfficerDashboard({ user, onLogout }: OfficerDashboardProps) {
  const [view, setView] = useState<"home" | "applications" | "inspections" | "installers">("home");


  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      {view === 'home' && <OfficerHome onNavigate={setView} />}
      {view === 'applications' && <ReviewApplications onBack={() => setView('home')} />}
      {view === 'inspections' && <ScheduleInspections onBack={() => setView('home')} />}
      {view === 'installers' && <VerifyInstallers onBack={() => setView('home')} />}
    </div>
  );
}

function OfficerHome({ onNavigate }: { onNavigate: (view: "home" | "applications" | "inspections" | "installers") => void }) {
  const stats = {
    pendingApplications: 12,
    scheduledInspections: 8,
    approvedThisMonth: 24,
    pendingVerifications: 3,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl mb-2">CEB Officer Dashboard</h2>
        <p className="text-muted-foreground">Manage solar installation applications and inspections</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-orange-600">{stats.pendingApplications}</div>
            <p className="text-sm text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Scheduled Inspections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-blue-600">{stats.scheduledInspections}</div>
            <p className="text-sm text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">{stats.approvedThisMonth}</div>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Installer Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{stats.pendingVerifications}</div>
            <p className="text-sm text-muted-foreground mt-1">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('applications')}>
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Review Applications</CardTitle>
            <CardDescription>Process customer applications</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('inspections')}>
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Schedule Inspections</CardTitle>
            <CardDescription>Manage site visits</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('installers')}>
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Verify Installers</CardTitle>
            <CardDescription>Approve installer organizations</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate system reports</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Site inspections scheduled for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '10:00 AM', customer: 'John Perera', location: 'Colombo 05', type: 'Initial Inspection' },
              { time: '02:00 PM', customer: 'Sarah Silva', location: 'Kandy', type: 'Final Inspection' },
              { time: '04:30 PM', customer: 'Kumar Fernando', location: 'Galle', type: 'Initial Inspection' },
            ].map((appointment, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div>{appointment.time}</div>
                  </div>
                  <div className="border-l pl-4">
                    <h4 className="mb-1">{appointment.customer}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.location} • {appointment.type}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReviewApplications({ onBack }: { onBack: () => void }) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const applications = [
    {
      id: 'APP-001',
      customer: 'John Perera',
      submittedDate: 'Nov 28, 2025',
      capacity: '5kW',
      status: 'pending',
      location: 'Colombo 05',
    },
    {
      id: 'APP-002',
      customer: 'Sarah Silva',
      submittedDate: 'Nov 27, 2025',
      capacity: '3kW',
      status: 'pending',
      location: 'Kandy',
    },
  ];

  if (selectedApp) {
    return <ApplicationReview appId={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl mb-2">Review Applications</h2>
        <p className="text-muted-foreground">Review and process customer applications</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending Review ({applications.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="mb-1">{app.customer}</h4>
                    <p className="text-sm text-muted-foreground">
                      {app.id} • {app.location} • {app.capacity} • Submitted: {app.submittedDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                    <Button onClick={() => setSelectedApp(app.id)}>Review</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No approved applications to show
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No rejected applications to show
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ApplicationReview({ appId, onBack }: { appId: string; onBack: () => void }) {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

  const handleDecision = (type: 'approve' | 'reject') => {
    setDecision(type);
  };

  if (decision) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <div className={`w-16 h-16 ${decision === 'approve' ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {decision === 'approve' ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h3 className="text-2xl mb-2">
              Application {decision === 'approve' ? 'Approved' : 'Rejected'}
            </h3>
            <p className="text-muted-foreground mb-6">
              The customer has been notified via SMS and email.
            </p>
            <Button onClick={onBack}>Back to Applications</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        Back to Applications
      </Button>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Details - {appId}</CardTitle>
            <CardDescription>John Perera • Colombo 05</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>NIC Number</Label>
                <p>199012345678</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p>+94 71 234 5678</p>
              </div>
              <div>
                <Label>Desired Capacity</Label>
                <p>5 kW</p>
              </div>
              <div>
                <Label>Property Type</Label>
                <p>Residential House</p>
              </div>
              <div>
                <Label>Roof Type</Label>
                <p>Tile Roof</p>
              </div>
              <div>
                <Label>Monthly Consumption</Label>
                <p>450 kWh</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              NIC_Front_Back.pdf
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Bank_Details.pdf
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Electricity_Bill.pdf
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Decision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Officer Notes</Label>
              <Textarea placeholder="Add any notes about this application..." rows={4} />
            </div>

            <Alert>
              <AlertDescription>
                After approval, you'll need to schedule a site visit. The customer will be notified immediately.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button onClick={() => handleDecision('approve')} className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve & Schedule Visit
              </Button>
              <Button onClick={() => handleDecision('reject')} variant="destructive" className="flex-1">
                <XCircle className="w-4 h-4 mr-2" />
                Reject Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ScheduleInspections({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl mb-2">Schedule Inspections</h2>
        <p className="text-muted-foreground">Manage site visit schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Scheduling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 'APP-001', customer: 'John Perera', location: 'Colombo 05' },
              { id: 'APP-003', customer: 'Kumar Silva', location: 'Kandy' },
            ].map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <h4 className="mb-1">{item.customer}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.id} • {item.location}</p>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input type="date" />
                  <Input type="time" />
                </div>
                <Button size="sm" className="w-full">Schedule Visit</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Inspections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { date: 'Dec 15, 2025', time: '10:00 AM', customer: 'Sarah Fernando', location: 'Galle' },
              { date: 'Dec 16, 2025', time: '02:00 PM', customer: 'Nimal Perera', location: 'Colombo' },
            ].map((inspection, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="mb-1">{inspection.customer}</h4>
                    <p className="text-sm text-muted-foreground">{inspection.location}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">Scheduled</Badge>
                </div>
                <p className="text-sm mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {inspection.date} at {inspection.time}
                </p>
                <Button variant="outline" size="sm" className="w-full">Reschedule</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VerifyInstallers({ onBack }: { onBack: () => void }) {
  const [verified, setVerified] = useState<string | null>(null);

  const installers = [
    { id: '1', name: 'EcoSolar Systems', owner: 'Ravi Kumar', license: 'SOL-2024-123', status: 'pending' },
    { id: '2', name: 'Bright Energy Lanka', owner: 'Sunil Perera', license: 'SOL-2024-124', status: 'pending' },
  ];

  if (verified) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl mb-2">Installer Verified</h3>
            <p className="text-muted-foreground mb-6">
              The organization has been verified and can now display packages to customers.
            </p>
            <Button onClick={() => setVerified(null)}>Back to Verifications</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl mb-2">Verify Installer Organizations</h2>
        <p className="text-muted-foreground">Review and approve solar installer registrations</p>
      </div>

      <div className="space-y-4">
        {installers.map((installer) => (
          <Card key={installer.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{installer.name}</CardTitle>
                  <CardDescription>Owner: {installer.owner}</CardDescription>
                </div>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending Verification
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>License Number</Label>
                  <p>{installer.license}</p>
                </div>
                <div>
                  <Label>Registration Date</Label>
                  <p>Nov 25, 2025</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Documents</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Business Registration
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Technical License
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={() => setVerified(installer.id)} className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Verify Organization
                </Button>
                <Button variant="destructive" className="flex-1">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
