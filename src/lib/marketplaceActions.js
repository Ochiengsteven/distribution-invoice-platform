"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function createListing(data) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const newListing = await prisma.p2PMarketplaceListing.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
    return { success: true, listing: newListing };
  } catch (error) {
    console.error("Error creating listing:", error);
    return { success: false, error: "Failed to create listing" };
  }
}

export async function updateListing(id, data) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const listing = await prisma.p2PMarketplaceListing.findUnique({
      where: { id },
    });

    if (listing.userId !== user.id) {
      return { success: false, error: "You can only update your own listings" };
    }

    const updatedListing = await prisma.p2PMarketplaceListing.update({
      where: { id },
      data,
    });
    return { success: true, listing: updatedListing };
  } catch (error) {
    console.error("Error updating listing:", error);
    return { success: false, error: "Failed to update listing" };
  }
}

export async function deleteListing(id) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const listing = await prisma.p2PMarketplaceListing.findUnique({
      where: { id },
    });

    if (listing.userId !== user.id) {
      return { success: false, error: "You can only delete your own listings" };
    }

    await prisma.p2PMarketplaceListing.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting listing:", error);
    return { success: false, error: "Failed to delete listing" };
  }
}

export async function fetchListings() {
  try {
    const listings = await prisma.p2PMarketplaceListing.findMany({
      orderBy: { listedAt: "desc" },
    });
    return { success: true, listings };
  } catch (error) {
    console.error("Error fetching listings:", error);
    return { success: false, error: "Failed to fetch listings" };
  }
}

export async function purchaseListing(id) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const listing = await prisma.p2PMarketplaceListing.findUnique({
      where: { id },
    });

    if (listing.status !== "ACTIVE") {
      return {
        success: false,
        error: "This listing is not available for purchase",
      };
    }

    // Here you would typically implement the actual purchase logic,
    // such as creating an order, processing payment, etc.

    const updatedListing = await prisma.p2PMarketplaceListing.update({
      where: { id },
      data: { status: "SOLD" },
    });

    return { success: true, listing: updatedListing };
  } catch (error) {
    console.error("Error purchasing listing:", error);
    return { success: false, error: "Failed to purchase listing" };
  }
}
