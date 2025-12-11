import { useState } from 'react';
import { User } from '../App';
import { Header } from './Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Package, Gavel, CheckCircle2, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

interface InstallerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function InstallerDashboard({ user, onLogout }: InstallerDashboardProps) {
  const [view, setView] = useState<'home' | 'packages' | 'bids'>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      {view === 'home' && <InstallerHome onNavigate={setView} />}
      {view === 'packages' && <ManagePackages onBack={() => setView('home')} />}
      {view === 'bids' && <ActiveBids onBack={() => setView('home')} />}
    </div>
  );
}

function InstallerHome({ onNavigate }: { onNavigate: (view: string) => void }) {
  const stats = {
    activeProjects: 5,
    completedProjects: 42,
    activeBids: 3,
    revenue: 12500000,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl mb-2">Installer Dashboard</h2>
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-900">
            <strong>Organization Status:</strong> Verified by CEB ✓
          </AlertDescription>
        </Alert>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{stats.activeProjects}</div>
            <p className="text-sm text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">{stats.completedProjects}</div>
            <p className="text-sm text-muted-foreground mt-1">Total installations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-blue-600">{stats.activeBids}</div>
            <p className="text-sm text-muted-foreground mt-1">Pending response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">Rs {(stats.revenue / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('packages')}>
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Manage Packages</CardTitle>
            <CardDescription>Create and edit your solar packages</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('bids')}>
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Gavel className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Active Bids</CardTitle>
            <CardDescription>View and respond to customer bids</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View performance metrics</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'ORD-001', customer: 'John Perera', package: '5kW Premium', status: 'installation', amount: 720000 },
              { id: 'ORD-002', customer: 'Sarah Silva', package: '3kW Standard', status: 'payment', amount: 450000 },
              { id: 'ORD-003', customer: 'Kumar Fernando', package: '10kW Commercial', status: 'planning', amount: 1350000 },
            ].map((order) => (
              <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="mb-1">{order.customer}</h4>
                  <p className="text-sm text-muted-foreground">{order.id} • {order.package}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg">Rs {order.amount.toLocaleString()}</div>
                    <Badge variant="outline">
                      {order.status === 'installation' && <><Clock className="w-3 h-3 mr-1" /> Installing</>}
                      {order.status === 'payment' && <>Awaiting Payment</>}
                      {order.status === 'planning' && <>Planning</>}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ManagePackages({ onBack }: { onBack: () => void }) {
  const packages = [
    { id: '1', name: '3kW Residential', capacity: '3kW', price: 450000, panels: 8, warranty: '25 years', active: true },
    { id: '2', name: '5kW Premium', capacity: '5kW', price: 720000, panels: 13, warranty: '25 years', active: true },
    { id: '3', name: '10kW Commercial', capacity: '10kW', price: 1350000, panels: 26, warranty: '25 years', active: false },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        Back to Dashboard
      </Button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl mb-2">Manage Packages</h2>
          <p className="text-muted-foreground">Create and manage your solar installation packages</p>
        </div>
        <Button>Add New Package</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{pkg.name}</CardTitle>
                <Badge variant={pkg.active ? 'default' : 'outline'}>
                  {pkg.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl text-primary">Rs {pkg.price.toLocaleString()}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span>{pkg.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Panels:</span>
                  <span>{pkg.panels}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warranty:</span>
                  <span>{pkg.warranty}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">Edit</Button>
                <Button variant="outline" className="flex-1" size="sm">
                  {pkg.active ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ActiveBids({ onBack }: { onBack: () => void }) {
  const bids = [
    {
      id: '1',
      customer: 'Kamal Jayasinghe',
      location: 'Colombo 05',
      capacity: '5kW',
      budget: '600,000 - 750,000',
      deadline: '18 hours',
      requirements: 'Need installation within 1 month, prefer premium panels',
    },
    {
      id: '2',
      customer: 'Nimal Perera',
      location: 'Kandy',
      capacity: '3kW',
      budget: '400,000 - 500,000',
      deadline: '32 hours',
      requirements: 'Budget-friendly option, standard warranty acceptable',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl mb-2">Active Bids</h2>
        <p className="text-muted-foreground">Respond to customer bid requests</p>
      </div>

      <div className="space-y-6">
        {bids.map((bid) => (
          <Card key={bid.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{bid.customer}</CardTitle>
                  <CardDescription>{bid.location}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  <Clock className="w-3 h-3 mr-1" />
                  {bid.deadline} left
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="ml-2">{bid.capacity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="ml-2">Rs {bid.budget}</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Requirements:</span>
                <p className="text-sm mt-1">{bid.requirements}</p>
              </div>

              <div className="border-t pt-4">
                <Label className="mb-2 block">Submit Your Bid</Label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input placeholder="Your offer (Rs)" />
                  <Input placeholder="Timeline (e.g., 2 weeks)" />
                </div>
                <Input placeholder="Message to customer" className="mb-4" />
                <Button className="w-full">Submit Bid</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}