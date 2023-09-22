import { Dispatch } from "redux";
import { BASE_URL } from "../../Shared/const";
import { addItem } from "./NewMenuSlice";

interface addNewItemProps {
  price: number;
  name: string;
  dispatch: Dispatch;
  image?: string;
}

export const addNewItem = async ({
  price,
  name,
  dispatch,
  image,
}: addNewItemProps) => {
  try {
    // TODO: write api helper
    const data = await fetch(`${BASE_URL}/menu/newitem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        name,
        image: "",
      }),
    });
    const new_item = await data.json();
    console.log({ new_item });
    dispatch(addItem(new_item));
  } catch (e) {
    // TODO
    console.log(e);
  }
};

interface StartNewMenuProps {
  order_deadline: Date;
  delivery_estimate: Date;
  item_ids: string[];
  title: string;
}

export const startNewMenu = async ({
  order_deadline,
  delivery_estimate,
  item_ids,
  title,
}: StartNewMenuProps) => {
  try {
    await fetch(`${BASE_URL}/menu/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_deadline,
        delivery_estimate,
        item_ids,
        title,
      }),
    });
  } catch (e) {
    // TODO
    console.log(e);
  }
};
