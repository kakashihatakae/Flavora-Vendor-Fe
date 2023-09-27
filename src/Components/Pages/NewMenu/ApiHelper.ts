import { Dispatch } from "redux";
import { BASE_URL } from "../../Shared/const";
import { addItem } from "./NewMenuSlice";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
        image,
      }),
    });
    const new_item = await data.json();
    dispatch(addItem(new_item));
  } catch (e) {
    console.log(e);
    throw new Error(`failed to add new item. Error: ${e}`);
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
    console.log(e);
    throw new Error(`failed to start new menu. Error: ${e}`);
  }
};

export const handleUpload = async (file: File, newFileName: string) => {
  // TODO : remove s3 credentials
  let client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: "AKIAW5YDK2VR2D6Y6BVB",
      secretAccessKey: "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",
    },
  });

  const command = new PutObjectCommand({
    Bucket: "food-items",
    Key: "menu-items-pics/" + String(newFileName),
    Body: file,
  });

  // how to cache ?
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    throw new Error(`Failed to send items to s3. Error: ${err}`);
  }
};
