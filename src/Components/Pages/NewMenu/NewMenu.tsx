import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Tabs,
  createStyles,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { UxString } from "../../Shared/Strings";
import {
  IconArchive,
  IconBolt,
  IconPlus,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import ItemsGrid from "./ItemsGrid";
import OrderDeliveryDateTime from "./OrderDeliveryDateTime";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import NewItemModal from "./NewItemModal";
import { getAllItems } from "./NewMenuSlice";
import { startNewMenu } from "./ApiHelper";
import { useNavigate } from "react-router";
import { FE_PAGE_PATHS } from "../../Shared/const";

const useStyles = createStyles((theme) => ({
  startButton: {
    position: "sticky",
    right: "10%",
    bottom: "5%",
    // backgroundColor: "red",
    // left:
    // padding: 25,
    // backdropFilter: blur("10px"),
    paddingTop: 25,
    paddingBottom: 25,
    // width: "100%",
    display: "flex",
    justifyContent: "end",
    borderRadius: theme.spacing.md,
    backgroundColor: "transparent",
  },
  icon: {
    color: theme.colors.blue[6],
  },
}));

export enum TabValues {
  SELECTED_ITEMS = "Selected Items",
  ARCHIVED_ITEMS = "Archived Items",
}

const NewMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>(
    TabValues.ARCHIVED_ITEMS
  );
  const [newItemModal, setNewItemModal] = useState(false);
  const newMenuState = useSelector((state: RootState) => state.newMenu);
  const enableStartButton =
    !!newMenuState.archivedItems.some((item) => item.isSelected) &&
    newMenuState.deliveryEstimate &&
    newMenuState.orderDeadline &&
    newMenuState.title;

  const onNewItemModalClose = () => {
    setNewItemModal(!newItemModal);
  };

  const onStartNewMenuClick = async () => {
    if (!newMenuState.deliveryEstimate || !newMenuState.orderDeadline) {
      // TODO: add a toast ?. Submit button is going to be disabled .
      return;
    }

    const item_ids = newMenuState.archivedItems
      .filter((item) => item.isSelected)
      .map((item) => item.item_id);
    await startNewMenu({
      order_deadline: newMenuState.orderDeadline,
      delivery_estimate: newMenuState.deliveryEstimate,
      item_ids,
      title: newMenuState.title || "",
    });
    navigate(FE_PAGE_PATHS.HOME);
  };

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  return (
    <>
      <LoadingOverlay visible={!!newMenuState.isLoading} />
      <NewItemModal
        modalOpen={newItemModal}
        onCloseModal={onNewItemModalClose}
      />
      <Group w="100%" position="right">
        <Flex direction="column" w="100%">
          <Group position="apart" align="center" mb={24}>
            <OrderDeliveryDateTime />
            <div>
              <Button
                leftIcon={<IconPlus size="1.2rem" />}
                onClick={() => setNewItemModal(true)}
              >
                {UxString.NewMenu.NewItem}
              </Button>
            </div>
          </Group>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab
                value={TabValues.ARCHIVED_ITEMS}
                icon={<IconArchive size="1.2rem" className={classes.icon} />}
              >
                Archived Items
              </Tabs.Tab>
              <Tabs.Tab
                value={TabValues.SELECTED_ITEMS}
                icon={
                  <IconToolsKitchen2 size="1.2rem" className={classes.icon} />
                }
              >
                Selected Items
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={activeTab || TabValues.ARCHIVED_ITEMS}>
              <ItemsGrid tab={activeTab || TabValues.ARCHIVED_ITEMS} />
            </Tabs.Panel>
          </Tabs>
        </Flex>
        <div className={classes.startButton}>
          <Button
            p={10}
            leftIcon={<IconBolt size="1.2rem" />}
            disabled={!enableStartButton}
            onClick={onStartNewMenuClick}
          >
            {UxString.NewMenu.StartOrders}
          </Button>
        </div>
      </Group>
    </>
  );
};

export default NewMenu;
