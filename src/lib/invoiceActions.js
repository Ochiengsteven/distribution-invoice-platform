"use server";

import prisma from "@/lib/prisma";
import axios from "axios";

export async function createInvoice(data) {
  try {
    const newInvoice = await prisma.invoice.create({
      data: {
        ...data,
        amount: data.amount != null ? Number(data.amount) : null,
        userId: data.userId, // Add this line to include the userId
      },
    });
    return { success: true, invoice: newInvoice };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { success: false, error: "Failed to create invoice" };
  }
}

export async function updateInvoice(id, data) {
  try {
    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: {
        ...data,
        amount: data.amount != null ? Number(data.amount) : null,
      },
    });
    return { success: true, invoice: updatedInvoice };
  } catch (error) {
    console.error("Error updating invoice:", error);
    return { success: false, error: "Failed to update invoice" };
  }
}

export async function deleteInvoice(id) {
  try {
    await prisma.invoice.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return { success: false, error: "Failed to delete invoice" };
  }
}

export async function fetchInvoices(userId) {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, invoices };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { success: false, error: "Failed to fetch invoices" };
  }
}

export async function fetchInvoiceRevenue(timeFrame) {
  try {
    const now = new Date();
    let startDate;

    switch (timeFrame) {
      case "week":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        break;
      case "month":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        break;
      default:
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const totalRevenue = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0
    );

    // Calculate percentage change
    const previousPeriodStart = new Date(
      startDate.getTime() - (now.getTime() - startDate.getTime())
    );
    const previousInvoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: previousPeriodStart,
          lt: startDate,
        },
      },
      select: {
        amount: true,
      },
    });

    const previousTotalRevenue = previousInvoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0
    );
    const percentageChange =
      previousTotalRevenue !== 0
        ? ((totalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100
        : 100;

    return { success: true, totalRevenue, percentageChange };
  } catch (error) {
    console.error("Error fetching invoice revenue:", error);
    return { success: false, error: "Failed to fetch invoice revenue" };
  }
}

export const requestPayment = async (invoice) => {
  console.log("requestPayment function called with invoice:", invoice);
  try {
    if (!invoice.phoneNumber) {
      console.log("Phone number is missing");
      return { success: false, error: "Phone number is required for payment" };
    }

    let formattedPhoneNumber = invoice.phoneNumber.replace(/\D/g, "");
    if (!formattedPhoneNumber.startsWith("254")) {
      formattedPhoneNumber = "254" + formattedPhoneNumber.slice(-9);
    }
    formattedPhoneNumber = "+" + formattedPhoneNumber;

    const formattedAmount = parseFloat(invoice.amount).toFixed(2);

    console.log("Sending payment request with:", {
      phoneNumber: formattedPhoneNumber,
      amount: formattedAmount,
      invoiceId: invoice.id,
    });

    const response = await axios.post(
      "https://api.mypayd.app/api/v2/payments",
      {
        username: "ochiengotieno",
        network_code: "63902",
        amount: formattedAmount,
        phone_number: formattedPhoneNumber,
        narration: `Payment for invoice #${invoice.id}`,
        currency: "KES",
        callback_url:
          process.env.PAYD_CALLBACK_URL || "https://example.com/callback",
      },
      {
        auth: {
          username: "kbR5pSTsKLGzT1yrMuHU",
          password: "ZE2E7pSfJl5DtbqsDx9zK23QYQlJTRYWgsQekINv",
        },
      }
    );

    console.log("API Response:", response.data);

    if (response.data.status === "success") {
      await updateInvoice(invoice.id, { status: "processing" });
      return { success: true, message: "Payment request sent successfully" };
    } else {
      return {
        success: false,
        error: "Failed to send payment request",
        details: response.data,
      };
    }
  } catch (error) {
    console.error(
      "Error requesting payment:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: "An error occurred while requesting payment",
      details: error.response ? error.response.data : error.message,
    };
  }
};

export const checkPaymentStatus = async (invoiceId) => {
  try {
    // Here you would typically make an API call to check the payment status
    // For this example, we'll simulate a successful payment
    const paymentSuccessful = Math.random() > 0.5;

    if (paymentSuccessful) {
      await updateInvoice(invoiceId, { status: "paid" });
      return { success: true, status: "paid" };
    } else {
      return { success: true, status: "pending" };
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    return {
      success: false,
      error: "An error occurred while checking payment status",
    };
  }
};
