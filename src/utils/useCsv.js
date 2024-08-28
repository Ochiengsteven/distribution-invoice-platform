import { useState } from "react";
import { fetchInvoices } from "@/lib/invoiceActions";

export const useCsv = (userId) => {
  const [loading, setLoading] = useState(false);

  const generateCsv = async (startDate, endDate) => {
    setLoading(true);
    try {
      const result = await fetchInvoices(userId);
      if (result.success) {
        const filteredInvoices = result.invoices.filter((invoice) => {
          const invoiceDate = new Date(invoice.createdAt);
          return invoiceDate >= startDate && invoiceDate <= endDate;
        });

        const csvContent = [
          [
            "Invoice ID",
            "Customer Name",
            "Email",
            "Amount",
            "Status",
            "Created At",
          ],
          ...filteredInvoices.map((invoice) => [
            invoice.id,
            invoice.customerName,
            invoice.email,
            invoice.amount,
            invoice.status,
            new Date(invoice.createdAt).toLocaleDateString(),
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute(
            "download",
            `invoices_${startDate.toISOString().split("T")[0]}_${
              endDate.toISOString().split("T")[0]
            }.csv`
          );
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error generating CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  return { generateCsv, loading };
};
