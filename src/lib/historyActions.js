// Dummy data for demonstration
const dummyOrders = [
  {
    id: "1",
    customerName: "John Doe",
    date: "2023-05-01",
    status: "DELIVERED",
    totalAmount: 150.0,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    date: "2023-05-02",
    status: "PROCESSING",
    totalAmount: 200.0,
  },
  {
    id: "3",
    customerName: "Bob Johnson",
    date: "2023-05-03",
    status: "PENDING",
    totalAmount: 100.0,
  },
];

const dummyDeliveries = [
  {
    id: "1",
    orderId: "1",
    driverName: "Mike Ross",
    date: "2023-05-01",
    status: "DELIVERED",
  },
  {
    id: "2",
    orderId: "2",
    driverName: "Harvey Specter",
    date: "2023-05-02",
    status: "IN_TRANSIT",
  },
  {
    id: "3",
    orderId: "3",
    driverName: "Donna Paulsen",
    date: "2023-05-03",
    status: "PENDING",
  },
];

const dummyInvoices = [
  {
    id: "1",
    customerName: "John Doe",
    date: "2023-05-01",
    status: "PAID",
    totalAmount: 150.0,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    date: "2023-05-02",
    status: "UNPAID",
    totalAmount: 200.0,
  },
  {
    id: "3",
    customerName: "Bob Johnson",
    date: "2023-05-03",
    status: "PENDING",
    totalAmount: 100.0,
  },
];

const dummyProductMovements = [
  {
    id: "1",
    productName: "Product A",
    date: "2023-05-01",
    status: "IN_STOCK",
    quantity: 100,
  },
  {
    id: "2",
    productName: "Product B",
    date: "2023-05-02",
    status: "OUT_OF_STOCK",
    quantity: 50,
  },
  {
    id: "3",
    productName: "Product C",
    date: "2023-05-03",
    status: "IN_STOCK",
    quantity: 200,
  },
];

const dummyUserActivity = [
  { id: "1", userId: "1", activity: "LOGIN", date: "2023-05-01" },
  { id: "2", userId: "2", activity: "LOGOUT", date: "2023-05-02" },
  { id: "3", userId: "3", activity: "LOGIN", date: "2023-05-03" },
];

const dummyP2PTransactions = [
  {
    id: "1",
    sender: "John Doe",
    receiver: "Jane Smith",
    amount: 100.0,
    date: "2023-05-01",
  },
  {
    id: "2",
    sender: "Jane Smith",
    receiver: "Bob Johnson",
    amount: 150.0,
    date: "2023-05-02",
  },
  {
    id: "3",
    sender: "Bob Johnson",
    receiver: "John Doe",
    amount: 200.0,
    date: "2023-05-03",
  },
];

export async function fetchOrderHistory(dateRange, status) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return dummyOrders;
}

export async function fetchDeliveryHistory(dateRange, status) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return dummyDeliveries;
}

export async function fetchInvoiceHistory(dateRange, status) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyInvoices;
}

export async function fetchProductMovementHistory(dateRange, productId) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyProductMovements;
}

export async function fetchUserActivityLog(dateRange, userId) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyUserActivity;
}

export async function fetchP2PTransactionHistory(dateRange, userId) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyP2PTransactions;
}
