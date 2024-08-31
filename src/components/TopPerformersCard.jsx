import React from "react";
import { Card, Typography, List, Avatar } from "antd";
import { Trophy } from "lucide-react";

const { Title } = Typography;

const data = [
  {
    title: "Joe Njiru",
    description: "28 deliveries",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male&key=1",
  },
  {
    title: "Jane Kiiru",
    description: "25 deliveries",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=female&key=2",
  },
  {
    title: "Mike Mulongo",
    description: "22 deliveries",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male&key=3",
  },
];

const TopPerformersCard = () => {
  return (
    <Card className="bg-white rounded-lg">
      <Title level={4} className="text-primary mb-4">
        Top Buyers
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <div className="flex items-center">
                  {index === 0 && (
                    <Trophy className="text-yellow-500 mr-2" size={16} />
                  )}
                  <span className="text-primary">{item.title}</span>
                </div>
              }
              description={
                <span className="text-primary">{item.description}</span>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopPerformersCard;
