"use client";
import { useState, useEffect } from "react";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  fetchInvoices,
} from "@/lib/invoiceActions";
import InvoiceModal from "@/components/InvoiceModal";
import { message } from "antd";
import { useSession } from "../(main)/SessionProvider";
import {
  Radar,
  Package,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import MonthlySalesBarGraph from "@/components/graphs/MonthlySales";
import RevenueGraph from "@/components/graphs/RevenueGraph";
import ActiveOrders from "@/components/ActiveOrders";
import NearbyClients from "@/components/NearbyClients";
import CustomDatePicker from "@/components/CustomDatePicker";
import { useTimeGreeting } from "@/utils/useTimeGreeting";
import InvoiceTable from "@/components/InvoiceTable";

const Dashboard = () => {
  const { user } = useSession();
  const greeting = useTimeGreeting();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInvoices = async () => {
    setLoading(true);
    const result = await fetchInvoices(user.id);
    if (result.success) {
      setInvoices(result.invoices);
    } else {
      message.error(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInvoices();
  }, [user.id]);

  const handleCreateInvoice = async (values) => {
    const result = await createInvoice({ ...values, userId: user.id });
    if (result.success) {
      message.success("Invoice created successfully");
      setIsModalVisible(false);
      loadInvoices(); // Refresh the invoice list
    } else {
      message.error(result.error);
    }
  };

  const handleEditInvoice = async (values) => {
    const result = await updateInvoice(editingInvoice.id, values);
    if (result.success) {
      message.success("Invoice updated successfully");
      setIsModalVisible(false);
      setEditingInvoice(null);
      loadInvoices(); // Refresh the invoice list
    } else {
      message.error(result.error);
    }
  };

  const handleDeleteInvoice = async (id) => {
    const result = await deleteInvoice(id);
    if (result.success) {
      message.success("Invoice deleted successfully");
      loadInvoices(); // Refresh the invoice list
    } else {
      message.error(result.error);
    }
  };

  const dashboardItems = [
    {
      icon: Package,
      value: 100,
      percentage: "+1,89%",
      percentageColor: "text-green-500",
      ArrowIcon: ArrowUpRight,
      label: "Total Orders",
    },
    {
      icon: Truck,
      value: 20,
      percentage: "-0,03%",
      percentageColor: "text-red-500",
      ArrowIcon: ArrowDownRight,
      label: "Active Drivers",
    },
    {
      icon: Radar,
      value: 23,
      percentage: "-0,03%",
      percentageColor: "text-red-500",
      ArrowIcon: ArrowDownRight,
      label: "Low Stock items",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="">Hello {user.name},</p>
          <h2 className="font-medium text-5xl">{greeting}</h2>
        </div>
        <div className="bg-white rounded-3xl p-[7px] flex gap-2">
          <CustomDatePicker />
          <div className="rounded-3xl border-secondary p-2 flex items-center border-[2px] cursor-pointer">
            <p className="font-semibold text-xs">Export CSV</p>
          </div>
          <div
            className="rounded-3xl bg-primary p-2 flex items-center cursor-pointer"
            onClick={() => setIsModalVisible(true)}
          >
            <p className="font-semibold text-xs text-secondary">
              Add new invoice
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="mt-10 max-w-[600px]">
          <div className="flex items-center gap-8">
            {dashboardItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="p-4 rounded-full bg-white">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl flex items-end">
                    {item.value}{" "}
                    <span
                      className={`flex ml-2 text-xs pb-1 ${item.percentageColor}`}
                    >
                      {item.percentage} <item.ArrowIcon size={14} />
                    </span>
                  </p>
                  <h3 className="">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <MonthlySalesBarGraph />
          </div>
        </div>
        <div className="w-[400px] mt-1">
          <div className="h-[300px]">
            <RevenueGraph />
          </div>
          <div className="mt-1">
            <ActiveOrders />
          </div>
        </div>
        <div className="flex-1 mt-1">
          <NearbyClients />
        </div>
      </div>
      <div className="mt-8">
        <InvoiceTable
          invoices={invoices}
          loading={loading}
          onEdit={(invoice) => {
            setEditingInvoice(invoice);
            setIsModalVisible(true);
          }}
          onDelete={handleDeleteInvoice}
        />
      </div>
      <InvoiceModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingInvoice(null);
        }}
        onSubmit={editingInvoice ? handleEditInvoice : handleCreateInvoice}
        initialValues={editingInvoice}
      />
    </div>
  );
};

export default Dashboard;
