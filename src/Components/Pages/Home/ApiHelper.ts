import { getToken } from "../../Shared/AuthUtils";
import { BASE_URL } from "../../Shared/const";

export const getAllMenus = async () => {
  let menus = [];
  const token = getToken();
  try {
    const data = await fetch(`${BASE_URL}/menu/menu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    menus = await data.json();
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get all menus. Error: ${error}`);
  }
  return menus;
};
