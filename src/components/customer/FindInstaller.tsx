import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Package, Gavel, Star, MapPin, CheckCircle2, Timer, TrendingUp } from 'lucide-react';
import CustomerDashboard from "../CustomerDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';

interface FindInstallerProps {
  onBack: () => void;
  onNavigate: (view: string) => void; // use string instead of CustomerView
}

export function FindInstaller({ onBack, onNavigate }: FindInstallerProps) {
  const [selectedTab, setSelectedTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [bidSubmitted, setBidSubmitted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl mb-2">Find Solar Installer</h2>
        <p className="text-muted-foreground">
          Choose between browsing available packages or op ening a bid for installers
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="packages" className="gap-2">
            <Package className="w-4 h-4" />
            Browse Packages
          </TabsTrigger>
          <TabsTrigger value="bidding" className="gap-2">
            <Gavel className="w-4 h-4" />
            Open Bidding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages">
          <PackagesBrowser onSelectPackage={setSelectedPackage} onNavigate={onNavigate} />
        </TabsContent>

        <TabsContent value="bidding">
          <BiddingSystem bidSubmitted={bidSubmitted} onSubmitBid={() => setBidSubmitted(true)} onNavigate={onNavigate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PackagesBrowserProps {
  onSelectPackage: (id: string) => void;
  onNavigate: (view: string) => void;
}

function PackagesBrowser({ onSelectPackage, onNavigate }: PackagesBrowserProps) {
  const installers = [
    {
      id: '1',
      name: 'SunPower Solutions',
      rating: 4.8,
      reviews: 127,
      location: 'Colombo',
      verified: true,
      packages: [
        { id: 'p1', name: '3kW Residential', price: 450000, capacity: '3kW', panels: 8, warranty: '25 years' },
        { id: 'p2', name: '5kW Premium', price: 720000, capacity: '5kW', panels: 13, warranty: '25 years' },
      ],
    },
    {
      id: '2',
      name: 'Green Energy Lanka',
      rating: 4.9,
      reviews: 203,
      location: 'Kandy',
      verified: true,
      packages: [
        { id: 'p3', name: '3kW Standard', price: 425000, capacity: '3kW', panels: 8, warranty: '20 years' },
        { id: 'p4', name: '5kW Deluxe', price: 695000, capacity: '5kW', panels: 13, warranty: '25 years' },
        { id: 'p5', name: '10kW Commercial', price: 1350000, capacity: '10kW', panels: 26, warranty: '25 years' },
      ],
    },
    {
      id: '3',
      name: 'EcoSolar Systems',
      rating: 4.7,
      reviews: 89,
      location: 'Galle',
      verified: true,
      packages: [
        { id: 'p6', name: '3kW Budget', price: 395000, capacity: '3kW', panels: 8, warranty: '15 years' },
        { id: 'p7', name: '5kW Standard', price: 680000, capacity: '5kW', panels: 13, warranty: '20 years' },
      ],
    },
  ];

  const [selectedInstaller, setSelectedInstaller] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Alert>
        <Package className="h-4 w-4" />
        <AlertDescription>
          Browse packages from verified solar installers. Compare prices, ratings, and features to find the best option for you.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-6">
        {installers.map((installer) => (
          <Card key={installer.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle>{installer.name}</CardTitle>
                    {installer.verified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{installer.rating}</span>
                      <span>({installer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{installer.location}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInstaller(selectedInstaller === installer.id ? null : installer.id)}
                >
                  {selectedInstaller === installer.id ? 'Hide' : 'View'} Packages
                </Button>
              </div>
            </CardHeader>

            {selectedInstaller === installer.id && (
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {installer.packages.map((pkg) => (
                    <Card key={pkg.id} className="border-2 hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <div className="text-2xl text-primary">
                          Rs {pkg.price.toLocaleString()}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Capacity:</span>
                            <span>{pkg.capacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Solar Panels:</span>
                            <span>{pkg.panels} panels</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Warranty:</span>
                            <span>{pkg.warranty}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4"
                          onClick={() => {
                            onSelectPackage(pkg.id);
                            onNavigate('payments');
                          }}
                        >
                          Select Package
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

interface BiddingSystemProps {
  bidSubmitted: boolean;
  onSubmitBid: () => void;
  onNavigate: (view: string) => void;
}

function BiddingSystem({ bidSubmitted, onSubmitBid, onNavigate }: BiddingSystemProps) {
  const [timeRemaining] = useState(42); // hours

  const mockBids = [
    { id: '1', installer: 'SunPower Solutions', amount: 680000, rating: 4.8, timeline: '2 weeks', message: 'Premium quality panels with extended warranty' },
    { id: '2', installer: 'Green Energy Lanka', amount: 655000, rating: 4.9, timeline: '3 weeks', message: 'Best value with excellent service' },
    { id: '3', installer: 'EcoSolar Systems', amount: 695000, rating: 4.7, timeline: '10 days', message: 'Fastest installation available' },
  ];

  if (!bidSubmitted) {
    return (
      <div className="space-y-6">
        <Alert>
          <Gavel className="h-4 w-4" />
          <AlertDescription>
            Open a bid for your solar installation project. Installers will have 48 hours to submit their proposals. 
            You can review and approve the best offer, or browse packages if no suitable bid is received.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Create Bid Request</CardTitle>
            <CardDescription>Provide details about your solar installation requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Desired System Capacity</Label>
                <Input defaultValue="5 kW" />
              </div>
              <div className="space-y-2">
                <Label>Preferred Installation Timeline</Label>
                <Input placeholder="e.g., Within 1 month" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Budget Range (Optional)</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Min (Rs)" />
                <Input placeholder="Max (Rs)" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Requirements</Label>
              <Textarea 
                placeholder="Describe any specific requirements, preferred brands, battery backup needs, etc."
                rows={4}
              />
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Timer className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                Once submitted, your bid will be open for <strong>48 hours</strong>. You'll receive notifications as installers submit their proposals.
              </AlertDescription>
            </Alert>

            <Button onClick={onSubmitBid} className="w-full" size="lg">
              Open Bid for Installers
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <Timer className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900">
          Your bid is active. Time remaining: <strong>{timeRemaining} hours</strong>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Received Bids ({mockBids.length})</CardTitle>
          <CardDescription>Review proposals from installers and select the best option</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(48 - timeRemaining) / 48 * 100} className="mb-6" />
          
          <div className="space-y-4">
            {mockBids.map((bid) => (
              <Card key={bid.id} className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg mb-1">{bid.installer}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{bid.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-primary">Rs {bid.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{bid.timeline}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4 text-muted-foreground">{bid.message}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => onNavigate('payments')}
                      className="flex-1"
                    >
                      Accept Bid
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-6">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              If you don't approve any bid within 48 hours, the bidding will automatically close and you can browse available packages instead.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
