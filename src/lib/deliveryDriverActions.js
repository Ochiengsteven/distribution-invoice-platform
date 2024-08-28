"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function createDriver(data) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const newDriver = await prisma.deliveryDriver.create({
      data: {
        name: data.name,
        userId: user.id,
      },
    });
    return { success: true, driver: newDriver };
  } catch (error) {
    console.error("Error creating driver:", error);
    return { success: false, error: "Failed to create driver" };
  }
}

export async function updateDriver(id, data) {
  try {
    const updatedDriver = await prisma.deliveryDriver.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
    return { success: true, driver: updatedDriver };
  } catch (error) {
    console.error("Error updating driver:", error);
    return { success: false, error: "Failed to update driver" };
  }
}

export async function deleteDriver(id) {
  try {
    await prisma.deliveryDriver.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting driver:", error);
    return { success: false, error: "Failed to delete driver" };
  }
}

export async function fetchDrivers() {
  try {
    const drivers = await prisma.deliveryDriver.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return { success: true, drivers };
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return { success: false, error: "Failed to fetch drivers" };
  }
}
