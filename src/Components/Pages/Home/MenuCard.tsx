import { Card, Group, Text } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";

interface MenuCardProps {
  title: string;
  order_deadline: string;
  delivery_estimate: string;
}

const MenuCard = ({
  title,
  order_deadline,
  delivery_estimate,
}: MenuCardProps) => {
  const orderDeadline = dayjs(order_deadline).format("MMM, DD YYYY");
  const deliveryEstimate = dayjs(delivery_estimate).format("MMM, DD YYYY");
  return (
    <Card withBorder>
      <Text>{title}</Text>
      <Group>
        <Text>{orderDeadline}</Text>
        <Text>{deliveryEstimate}</Text>
      </Group>
    </Card>
  );
};

export default MenuCard;
