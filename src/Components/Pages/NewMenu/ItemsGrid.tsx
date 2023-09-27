import { Grid } from "@mantine/core";
import React from "react";
import { ItemCard } from "./ItemCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { TabValues } from "./NewMenu";

interface ItemsGridProps {
  tab: string;
}

const ItemsGrid = ({ tab }: ItemsGridProps) => {
  const archivedItems = useSelector(
    (state: RootState) => state.newMenu.archivedItems
  );
  const selectedItems = archivedItems.filter((item) => item.isSelected);
  const items =
    tab === TabValues.ARCHIVED_ITEMS ? archivedItems : selectedItems;

  return (
    <>
      <Grid columns={24} gutter={15}>
        {items.map((item) => (
          <ItemCard
            image={item.image}
            price={item.price}
            title={item.name}
            tab={tab}
            id={item.item_id}
            isSelected={!!item?.isSelected}
          />
        ))}
      </Grid>
    </>
  );
};

export default ItemsGrid;
