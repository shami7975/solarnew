import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowRight,
  FileText,
  Building2,
  Bell,
  CreditCard,
  Leaf,
  Zap,
  DollarSign,
  FileCheck,
  Search,
  Receipt,
} from "lucide-react";
import { Progress } from "./ui/progress";
import api from "../utils/api";
import ApplicationForm from "./customer/ApplicationForm";
import { FindInstaller } from "./customer/FindInstaller";
import { Payments } from "./customer/Payments";
import CustomerApplicationStatus from "./customer/CustomerApplicationStatus";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

interface DashboardData {
  totalKwh: number;
  totalCO2: number;
  totalSavings: number;
  status?: string;
}

type CustomerView =
  | "dashboard"
  | "apply"
  | "findInstaller"
  | "payments"
  | "status";   



export default function CustomerDashboard({ user, onLogout }: DashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<CustomerView>("dashboard");

  useEffect(() => {
    if (!user?.id) return;
    api
      .get(`/dashboard/${user.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Dashboard load failed:", err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  // Subpages
  if (view === "apply")
    return (
      <ApplicationForm
        onBack={() => setView("dashboard")}
        onNavigate={() => setView("dashboard")}
      />
    );

  if (view === "findInstaller")
    return (
      <FindInstaller
        onBack={() => setView("dashboard")}
        onNavigate={() => setView("dashboard")}
      />
    );
    if (view === "status")
  return <CustomerApplicationStatus onBack={() => setView("dashboard")} />;

  if (view === "payments")
    return <Payments onBack={() => setView("dashboard")
    } />;

  // Main Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold mb-2">
            Welcome to Solar Installation System
          </h2>
          <p className="text-lg opacity-90">
            Start your journey to clean, renewable energy
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={onLogout}
          className="bg-white/20 hover:bg-white/30 text-white"
        >
          Logout
        </Button>
      </div>

      {/* APPLICATION STATUS */}
      <Card className="mb-8 border-l-4 border-l-blue-600 shadow-sm">
        <CardHeader>
          <CardTitle>Current Application Status</CardTitle>
          <CardDescription>Track your solar installation progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {data?.status === "approved"
                  ? "Application Approved"
                  : data?.status === "installed"
                  ? "Installation Completed"
                  : "Application Submitted"}
              </span>
              <span
                className={`${
                  data?.status === "approved"
                    ? "text-blue-600"
                    : data?.status === "installed"
                    ? "text-green-600"
                    : "text-yellow-600"
                } font-semibold`}
              >
                {data?.status === "approved"
                  ? "Approved"
                  : data?.status === "installed"
                  ? "Completed"
                  : "In Review"}
              </span>
            </div>

            <Progress
              value={
                data?.status === "installed"
                  ? 100
                  : data?.status === "approved"
                  ? 80
                  : 50
              }
            />
            <p className="text-sm text-muted-foreground">
              {data?.status === "approved"
                ? "Your application has been approved. Installation will begin soon."
                : data?.status === "installed"
                ? "Your system is fully installed and operational!"
                : "Your application is under review. A site visit has been scheduled soon."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              CO₂ Prevented
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-semibold">
                {data?.totalCO2?.toLocaleString() ?? 0}
              </span>
              <span className="text-muted-foreground mb-1">kg</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
              <Leaf className="w-4 h-4" />
              <span>
                Equivalent to {Math.round((data?.totalCO2 ?? 0) / 24)} trees
                planted
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Energy Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-semibold">
                {data?.totalKwh?.toLocaleString() ?? 0}
              </span>
              <span className="text-muted-foreground mb-1">kWh</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This month: 420 kWh
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Cost Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-semibold">
                Rs {data?.totalSavings?.toLocaleString() ?? 0}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Since installation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <h3 className="text-xl mb-4 font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActionCard
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          title="New Application"
          description="Apply for solar panel installation"
          buttonText="Start Application"
          onClick={() => setView("apply")}
        />
          <ActionCard
          icon={<FileCheck className="w-6 h-6 text-green-600" />}
          title="Application Status"
          description="Track your application progress"
          onClick={() => setView("status")}   // ✅ added
        />

        <ActionCard
          icon={<Search className="w-6 h-6 text-purple-600" />}
          title="Find Installer"
          description="Browse packages or open a bid"
          buttonText="Find Installer"
          onClick={() => setView("findInstaller")}
        />
        <ActionCard
          icon={<CreditCard className="w-6 h-6 text-orange-600" />}
          title="Payments"
          description="Manage payments and invoices"
          buttonText="View Payments"
          onClick={() => setView("payments")}
        />
        <ActionCard
          icon={<Receipt className="w-6 h-6 text-pink-600" />}
          title="Billing"
          description="View monthly bills and usage"
        />
        <ActionCard
          icon={<Bell className="w-6 h-6 text-teal-600" />}
          title="Notifications"
          description="View updates from installers and CEB officers"
        />
      </div>
    </div>
  );
  <ActionCard
  icon={<FileText className="w-6 h-6 text-green-600" />}
  title="Application Status"
  description="Track your application progress"
  onClick={() => setView("status")}
/>

}

function ActionCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" className="w-full flex justify-between items-center">
          {buttonText ?? "Open"}
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
        </Button>
      </CardContent>
    </Card>
  );
}
