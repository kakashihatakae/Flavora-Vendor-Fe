import { BASE_URL } from "../../Shared/const";

export const getAllMenus = async () => {
  let menus = [];
  try {
    const data = await fetch(`${BASE_URL}/menu/menu`);
    menus = await data.json();
  } catch (error) {
    // TODO:
    console.log(error);
  }
  return menus;
};
