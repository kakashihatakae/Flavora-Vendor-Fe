import {
  Group,
  NumberInput,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import React from "react";
import { UxString } from "../../Shared/Strings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  setDeliveryEstimate,
  setOrderDeadline,
  setTitle,
} from "./NewMenuSlice";
import { IconCalendarTime } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  topLeftSection: {
    marginBottom: theme.spacing.md,
  },
}));

interface DateTimeLabelProps {
  label: string;
}
const DateTimeLabel = ({ label }: DateTimeLabelProps) => {
  return (
    <Text size="md" mb={5} weight={500}>
      {label}
    </Text>
  );
};

const OrderDeliveryDateTime = () => {
  const dispatch = useDispatch();
  const todaysDate = new Date();

  const onChangeOrderDeadline = (date: Date) => {
    dispatch(setOrderDeadline(date));
  };

  const onChangeDeliveryEstimate = (date: Date) => {
    dispatch(setDeliveryEstimate(date));
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const { classes } = useStyles();
  return (
    <Group className={classes.topLeftSection}>
      <TextInput
        label={<DateTimeLabel label={UxString.NewMenu.MenuTitle} />}
        onChange={onChangeTitle}
        width={100}
      />
      <Group>
        <DateTimePicker
          icon={<IconCalendarTime size="1.2rem" />}
          onChange={onChangeOrderDeadline}
          minDate={todaysDate}
          label={<DateTimeLabel label={UxString.NewMenu.OrderDeadline} />}
          valueFormat="MMM, DD YYYY hh:mm A"
          maw={400}
          mx="auto"
        />
        <DateTimePicker
          icon={<IconCalendarTime size="1.2rem" />}
          onChange={onChangeDeliveryEstimate}
          minDate={todaysDate}
          label={<DateTimeLabel label={UxString.NewMenu.DeliveryEstimate} />}
          valueFormat="DD MMM YYYY hh:mm A"
          maw={400}
          mx="auto"
        />
      </Group>
    </Group>
  );
};

export default OrderDeliveryDateTime;
