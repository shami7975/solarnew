import { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { FileText, Wallet, ArrowLeft } from "lucide-react";

interface Payment {
  id: number;
  user_id: number;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Invoice {
  id: number;
  payment_id: number;
  amount: number;
  pdf_url: string;
}

export function Payments({ onBack }: { onBack: () => void }) {
  const userId = localStorage.getItem("user_id");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoiceModal, setInvoiceModal] = useState(false);

  useEffect(() => {
    api
      .get(`/payments/user/${userId}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Load payments error:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  const openPaymentDetails = async (payment: Payment) => {
    setSelectedPayment(payment);

    const res = await api.get(`/payments/invoices/${payment.id}`);
    setInvoices(res.data);

    setInvoiceModal(true);
  };

  const handlePay = async (paymentId) => {
  const res = await api.post(`/payments/start/${paymentId}`);
  const { url, payload } = res.data;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

  const filteredPayments =
    filter === "all"
      ? payments
      : payments.filter((p) => p.status === filter);

  const statusColor = {
    pending: "bg-yellow-500",
    paid: "bg-green-600",
    failed: "bg-red-600",
  };

  if (loading) return <p className="text-center mt-10">Loading payments...</p>;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-blue-600" /> Payments & Billing
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        {["all", "pending", "paid", "failed"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </Button>
        ))}
      </div>

    
      {/* Payment Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Your Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount (Rs)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium capitalize">
                    {payment.type.replace("_", " ")}
                  </TableCell>

                  <TableCell>{payment.amount.toLocaleString()}</TableCell>

                  <TableCell>
                    <Badge
                      className={`${statusColor[payment.status]} text-white`}
                    >
                      {payment.status.toUpperCase()}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(payment.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openPaymentDetails(payment)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No payments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice Modal */}
      <Dialog open={invoiceModal} onOpenChange={setInvoiceModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-3">
              <p>
                <strong>Type: </strong>
                {selectedPayment.type.replace("_", " ")}
              </p>
              <p>
                <strong>Amount: </strong>Rs{" "}
                {selectedPayment.amount.toLocaleString()}
              </p>
              <p>
                <strong>Status: </strong>
                <Badge
                  className={`${statusColor[selectedPayment.status]} text-white`}
                >
                  {selectedPayment.status}
                </Badge>
              </p>

              <h3 className="text-lg font-semibold mt-4">Invoices</h3>

              {invoices.length === 0 && (
                <p className="text-gray-500 text-sm">No invoices available.</p>
              )}

              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-3 border rounded-md flex justify-between items-center"
                >
                  <span>Invoice #{inv.id}</span>

                  <Button
                    size="sm"
                    onClick={() => window.open(inv.pdf_url, "_blank")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Open PDF
                  </Button>
                </div>
              ))}

              {selectedPayment.status === "pending" && (
                <Button className="w-full mt-4">Pay Now</Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
  <Button onClick={() => handlePay(payment.id)}>
  Pay Now
</Button>

}
