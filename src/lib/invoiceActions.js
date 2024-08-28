"use server";

import prisma from "@/lib/prisma";

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
