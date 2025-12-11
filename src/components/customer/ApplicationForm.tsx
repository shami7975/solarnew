import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import api from "../../utils/api";

interface ApplicationFormProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export default function ApplicationForm({ onBack, onNavigate }: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const totalSteps = 4;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // FORM DATA STATES
  const [form, setForm] = useState({
    full_name: "",
    nic: "",
    phone: "",
    email: "",
    address: "",
    property_type: "",
    roof_type: "",
    roof_area: "",
    roof_orientation: "",
    shading: "",
    ownership: "",
    ceb_account: "",
    monthly_consumption: "",
    monthly_bill: "",
    system_capacity: "",
    connection_type: "",
    existing_solar: "",
  });

  // FILE STATES
  const [nicFile, setNicFile] = useState<File | null>(null);
  const [bankDoc, setBankDoc] = useState<File | null>(null);
  const [billFile, setBillFile] = useState<File | null>(null);
  const [propertyDoc, setPropertyDoc] = useState<File | null>(null);

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    // FINAL SUBMISSION
    setSubmitting(true);

    const formData = new FormData();

    // Add user_id
    formData.append("user_id", user.id);

    // Append all text fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append files
    if (nicFile) formData.append("nic_file", nicFile);
    if (bankDoc) formData.append("bank_doc", bankDoc);
    if (billFile) formData.append("bill_file", billFile);
    if (propertyDoc) formData.append("property_doc", propertyDoc);

    try {
      await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✔ Application submitted successfully!");
      onNavigate("dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "❌ Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Solar Installation Application</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps} — Please complete the form
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && <PersonalInformation form={form} updateField={updateField} />}
            {step === 2 && <PropertyInformation form={form} updateField={updateField} />}
            {step === 3 && <TechnicalInformation form={form} updateField={updateField} />}
            {step === 4 && (
              <DocumentUpload
                nicFile={nicFile}
                bankDoc={bankDoc}
                billFile={billFile}
                propertyDoc={propertyDoc}
                setNicFile={setNicFile}
                setBankDoc={setBankDoc}
                setBillFile={setBillFile}
                setPropertyDoc={setPropertyDoc}
              />
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}

              <Button type="submit" className="ml-auto" disabled={submitting}>
                {submitting ? "Submitting..." : step === totalSteps ? "Submit Application" : "Next"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ------------------------------------------------------
// STEP COMPONENTS
// ------------------------------------------------------

function PersonalInformation({ form, updateField }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>

      <InputField label="Full Name" value={form.full_name} onChange={(e: any) => updateField("full_name", e.target.value)} />
      <InputField label="NIC Number" value={form.nic} onChange={(e: any) => updateField("nic", e.target.value)} />
      <InputField label="Phone Number" value={form.phone} onChange={(e: any) => updateField("phone", e.target.value)} />
      <InputField label="Email Address" value={form.email} onChange={(e: any) => updateField("email", e.target.value)} />

      <div className="space-y-2">
        <Label>Address</Label>
        <Textarea value={form.address} onChange={(e) => updateField("address", e.target.value)} required />
      </div>
    </div>
  );
}

function PropertyInformation({ form, updateField }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Property Information</h3>

      <SelectField label="Property Type" value={form.property_type} onChange={(v: any) => updateField("property_type", v)}
        options={["Residential", "Apartment", "Commercial", "Industrial"]}
      />

      <SelectField label="Roof Type" value={form.roof_type} onChange={(v: any) => updateField("roof_type", v)}
        options={["Tile", "Metal", "Concrete", "Asbestos"]}
      />

      <InputField label="Roof Area (sq ft)" type="number" value={form.roof_area} onChange={(e: any) => updateField("roof_area", e.target.value)} />

      <SelectField label="Roof Orientation" value={form.roof_orientation} onChange={(v: any) => updateField("roof_orientation", v)}
        options={["North", "South", "East", "West", "Mixed"]}
      />

      <SelectField label="Shading" value={form.shading} onChange={(v: any) => updateField("shading", v)}
        options={["None", "Partial", "Heavy"]}
      />

      <SelectField label="Ownership" value={form.ownership} onChange={(v: any) => updateField("ownership", v)}
        options={["Owned", "Rented"]}
      />
    </div>
  );
}

function TechnicalInformation({ form, updateField }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Technical Information</h3>

      <InputField label="CEB Account Number" value={form.ceb_account} onChange={(e: any) => updateField("ceb_account", e.target.value)} />

      <InputField label="Monthly Consumption (kWh)" type="number" value={form.monthly_consumption}
        onChange={(e: any) => updateField("monthly_consumption", e.target.value)}
      />

      <InputField label="Monthly Bill (Rs)" type="number" value={form.monthly_bill}
        onChange={(e: any) => updateField("monthly_bill", e.target.value)}
      />

      <SelectField label="Desired System Capacity" value={form.system_capacity}
        onChange={(v: any) => updateField("system_capacity", v)}
        options={["Not Sure", "3", "5", "10", "15", "20+"]}
      />

      <SelectField label="Connection Type" value={form.connection_type}
        onChange={(v: any) => updateField("connection_type", v)}
        options={["Single Phase", "Three Phase"]}
      />

      <SelectField label="Existing Solar?" value={form.existing_solar}
        onChange={(v: any) => updateField("existing_solar", v)}
        options={["No", "Yes"]}
      />
    </div>
  );
}

// ------------------------------------------------------
// FILE UPLOAD COMPONENT
// ------------------------------------------------------

function DocumentUpload({
  nicFile,
  bankDoc,
  billFile,
  propertyDoc,
  setNicFile,
  setBankDoc,
  setBillFile,
  setPropertyDoc,
}: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Upload Required Documents</h3>

      <UploadField label="NIC Copy" onSelect={setNicFile} />
      <UploadField label="Bank Statement" onSelect={setBankDoc} />
      <UploadField label="Recent Electricity Bill" onSelect={setBillFile} />
      <UploadField label="Property Ownership Document" onSelect={setPropertyDoc} />

      <Alert>
        <CheckCircle2 className="w-4 h-4 text-green-600" />
        <AlertDescription>A CEB officer will review your documents.</AlertDescription>
      </Alert>
    </div>
  );
}

// ------------------------------------------------------
// REUSABLE INPUT COMPONENTS
// ------------------------------------------------------

function InputField({ label, value, onChange, ...props }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} required {...props} />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange} required>
        <SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
        <SelectContent>
          {options.map((opt: string) => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function UploadField({ label, onSelect }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer">
        <Upload className="w-8 h-8 mx-auto mb-2" />
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          id={label}
          onChange={(e) => onSelect(e.target.files?.[0] || null)}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById(label)?.click()}>
          Choose File
        </Button>
      </div>
    </div>
  );
}
