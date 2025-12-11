import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ArrowLeft, FileText, CheckCircle2, Clock, CalendarDays, Loader2 } from "lucide-react";
import api from "../../utils/api";

interface StatusProps {
  onBack: () => void;
}

interface Application {
  id: number;
  status: StatusType;
  site_visit_date?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;

  full_name: string;
  nic: string;
  phone: string;
  email: string;
  address: string;

  property_type: string;
  roof_type: string;
  roof_area: number;
  roof_orientation: string;
  shading: string;
  ownership: string;

  ceb_account: string;
  monthly_consumption: number;
  monthly_bill: number;
  system_capacity: string;
  connection_type: string;
  existing_solar: string;

  nic_file?: string;
  bank_doc?: string;
  bill_file?: string;
  property_doc?: string;
}
type StatusType =
  | "submitted"
  | "under_review"
  | "site_visit"
  | "approved"
  | "installed"
  | "rejected";

export default function CustomerApplicationStatus({ onBack }: StatusProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user?.id) return;

    api
      .get(`/applications/user/${user.id}`)
      .then((res) => setApplication(res.data[0] || null))
      .catch((err) => console.error("Failed to load status:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  if (!application)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">No application found.</p>
        <Button onClick={onBack} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );

  // ----- Status Mapping -----
  const statusLabels: Record<StatusType, string> = {
  submitted: "Application Submitted",
  under_review: "Under Review",
  site_visit: "Site Visit Scheduled",
  approved: "Approved",
  installed: "Installation Completed",
  rejected: "Application Rejected",
};

const statusColors: Record<StatusType, string> = {
  submitted: "text-yellow-600",
  under_review: "text-blue-600",
  site_visit: "text-purple-600",
  approved: "text-green-600",
  installed: "text-green-700",
  rejected: "text-red-600",
};

const statusProgress: Record<StatusType, number> = {
  submitted: 20,
  under_review: 40,
  site_visit: 60,
  approved: 80,
  installed: 100,
  rejected: 100,
};

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* BACK BUTTON */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Button>

      {/* STATUS CARD */}
      <Card className="border-l-4 border-l-blue-600 shadow-sm mb-6">
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
          <CardDescription>Track your solar installation progress</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between items-center">
            <p className="font-semibold">{statusLabels[application.status]}</p>
            <span className={`font-semibold ${statusColors[application.status]}`}>
              {application.status.replace("_", " ").toUpperCase()}
            </span>
          </div>

          <Progress value={statusProgress[application.status]} className="mt-4" />

          {application.site_visit_date && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
              <CalendarDays className="w-4 h-4" />
              Site visit scheduled for: <strong>{application.site_visit_date}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      {/* DETAILS SECTION */}
      <Card className="shadow-sm mb-6">
        <CardHeader>
          <CardTitle>Applicant Details</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailsGrid
            data={{
              "Full Name": application.full_name,
              NIC: application.nic,
              Phone: application.phone,
              Email: application.email,
              Address: application.address,
            }}
          />
        </CardContent>
      </Card>

      {/* PROPERTY DETAILS */}
      <Card className="shadow-sm mb-6">
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailsGrid
            data={{
              "Property Type": application.property_type,
              "Roof Type": application.roof_type,
              "Roof Area (sq ft)": application.roof_area,
              Orientation: application.roof_orientation,
              Shading: application.shading,
              Ownership: application.ownership,
            }}
          />
        </CardContent>
      </Card>

      {/* ENERGY DETAILS */}
      <Card className="shadow-sm mb-6">
        <CardHeader>
          <CardTitle>Energy Information</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailsGrid
            data={{
              "CEB Account": application.ceb_account,
              "Monthly Consumption (kWh)": application.monthly_consumption,
              "Monthly Bill (Rs)": application.monthly_bill,
              "System Capacity (kW)": application.system_capacity,
              "Connection Type": application.connection_type,
              "Existing Solar": application.existing_solar,
            }}
          />
        </CardContent>
      </Card>

      {/* DOCUMENTS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Submitted Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {renderFile("NIC Copy", application.nic_file)}
          {renderFile("Bank Document", application.bank_doc)}
          {renderFile("Electricity Bill", application.bill_file)}
          {renderFile("Property Document", application.property_doc)}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function DetailsGrid({ data }: { data: Record<string, any> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(data).map(([label, value]) => (
        <div key={label}>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="font-medium">{value ?? "—"}</p>
        </div>
      ))}
    </div>
  );
}

function renderFile(label: string, filename?: string) {
  if (!filename)
    return (
      <div className="text-red-500 text-sm">
        <FileText className="w-4 h-4 inline mr-2" />
        {label}: Not uploaded
      </div>
    );

  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-600" />
        <span className="font-medium">{label}</span>
      </div>
      <a
        href={`http://localhost:5000/uploads/${filename}`}
        target="_blank"
        className="text-blue-600 underline text-sm"
      >
        Download
      </a>
    </div>
  );
}
