"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, List, message, Modal } from "antd";
import { PlusOutlined, MessageOutlined } from "@ant-design/icons";
import ListingModal from "@/components/ListingModal";
import { useSession } from "@/app/(main)/SessionProvider";
import {
  createListing,
  updateListing,
  deleteListing,
  fetchListings,
  purchaseListing,
} from "@/lib/marketplaceActions";
import Link from "next/link";

const MarketPlace = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const { user } = useSession();

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const result = await fetchListings();
    if (result.success) {
      setListings(result.listings);
    } else {
      message.error(result.error);
    }
  };

  const handleCreateListing = async (values) => {
    const result = await createListing({ ...values, userId: user.id });
    if (result.success) {
      message.success("Listing created successfully");
      setIsModalVisible(false);
      loadListings();
    } else {
      message.error(result.error);
    }
  };

  const handleUpdateListing = async (values) => {
    const result = await updateListing(editingListing.id, values);
    if (result.success) {
      message.success("Listing updated successfully");
      setIsModalVisible(false);
      setEditingListing(null);
      loadListings();
    } else {
      message.error(result.error);
    }
  };

  const handleDeleteListing = async (id) => {
    const result = await deleteListing(id);
    if (result.success) {
      message.success("Listing deleted successfully");
      loadListings();
    } else {
      message.error(result.error);
    }
  };

  const handlePurchase = async (id) => {
    const result = await purchaseListing(id);
    if (result.success) {
      message.success("Item purchased successfully");
      loadListings();
    } else {
      message.error(result.error);
    }
  };

  const formatTimeDifference = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="custom-button !rounded-3xl"
        >
          Create Listing
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={listings}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              extra={formatTimeDifference(item.listedAt)}
              actions={[
                <Button key="buy" onClick={() => handlePurchase(item.id)}>
                  Purchase
                </Button>,
                <Link href={`/dashboard/chat?userId=${item.userId}`} key="chat">
                  <Button icon={<MessageOutlined />}>Chat</Button>
                </Link>,
                item.userId === user.id && (
                  <Button
                    key="edit"
                    onClick={() => {
                      setEditingListing(item);
                      setIsModalVisible(true);
                    }}
                  >
                    Edit
                  </Button>
                ),
                item.userId === user.id && (
                  <Button
                    key="delete"
                    danger
                    onClick={() => handleDeleteListing(item.id)}
                  >
                    Delete
                  </Button>
                ),
              ]}
            >
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Location: {item.location}</p>
              <p>Status: {item.status}</p>
            </Card>
          </List.Item>
        )}
      />
      <ListingModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingListing(null);
        }}
        onSubmit={editingListing ? handleUpdateListing : handleCreateListing}
        initialValues={editingListing}
      />
    </div>
  );
};

export default MarketPlace;
