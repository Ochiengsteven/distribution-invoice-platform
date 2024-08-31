import React from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Truck, Package, Clock, Users } from "lucide-react";
import DeliveryStatusCard from "./DeliveryStatusCard";
import TopPerformersCard from "./TopPerformersCard";

const { Title } = Typography;

const deliveryData = [
  { hour: "6AM", deliveries: 5 },
  { hour: "9AM", deliveries: 12 },
  { hour: "12PM", deliveries: 18 },
  { hour: "3PM", deliveries: 15 },
  { hour: "6PM", deliveries: 8 },
];

const packageTypeData = [
  { name: "Standard", value: 60 },
  { name: "Express", value: 30 },
  { name: "Overnight", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const DailyActivityDashboard = () => {
  return (
    <div className="p-6">
      <Title level={2} className="text-primary mb-6">
        Daily Activity Dashboard
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-white rounded-lg">
            <div className="flex items-center">
              <Truck className="text-primary mr-4" size={32} />
              <div>
                <p className="text-lg font-semibold text-primary">58</p>
                <p className="text-sm text-primary">Total Deliveries</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-white rounded-lg">
            <div className="flex items-center">
              <Package className="text-primary mr-4" size={32} />
              <div>
                <p className="text-lg font-semibold text-primary">237</p>
                <p className="text-sm text-primary">Packages Delivered</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-white rounded-lg">
            <div className="flex items-center">
              <Clock className="text-primary mr-4" size={32} />
              <div>
                <p className="text-lg font-semibold text-primary">98%</p>
                <p className="text-sm text-primary">On-Time Delivery</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-white rounded-lg">
            <div className="flex items-center">
              <Users className="text-primary mr-4" size={32} />
              <div>
                <p className="text-lg font-semibold text-primary">142</p>
                <p className="text-sm text-primary">Active Customers</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="bg-white rounded-lg">
            <Title level={4} className="text-primary mb-4">
              Hourly Delivery Performance
            </Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deliveries" fill="#0D191D" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="bg-white rounded-lg">
            <Title level={4} className="text-primary mb-4">
              Package Type Distribution
            </Title>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={packageTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {packageTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <DeliveryStatusCard />
        </Col>
        <Col xs={24} lg={12}>
          <TopPerformersCard />
        </Col>
      </Row>
    </div>
  );
};

export default DailyActivityDashboard;
