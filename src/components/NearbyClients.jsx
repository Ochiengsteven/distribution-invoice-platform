import React from "react";
import { Typography, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const items = [
  { key: "1", label: "Manufacturers" },
  { key: "2", label: "Distributors" },
  { key: "3", label: "Clients" },
];

const NearbyClients = () => {
  return (
    <aside className="w-full h-full bg-white rounded-lg p-6 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Nearby Clients
          </Title>
          <Paragraph type="secondary">Locate Nearby clients</Paragraph>
        </div>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button
            shape="circle"
            icon={<MoreOutlined />}
            style={{ background: "#F1F5F8", border: "none" }}
          />
        </Dropdown>
      </div>
      <div className="flex-grow w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7035.9419762648195!2d36.76333004646321!3d-1.38236925895825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f059ba53cc253%3A0x84f65413371bebb!2sMultimedia%20University%20of%20Kenya!5e0!3m2!1sen!2ske!4v1724776313449!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nearby Clients Map"
        />
      </div>
    </aside>
  );
};

export default NearbyClients;
