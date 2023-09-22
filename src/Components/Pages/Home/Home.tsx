import { Box, Button, Flex, Group } from "@mantine/core";
import { IconChefHat } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FE_PAGE_PATHS } from "../../Shared/const";
import { getAllMenus } from "./ApiHelper";
import MenuCard from "./MenuCard";

interface MenuType {
  title: string;
  order_deadline: string;
  delivery_estimate: string;
  menu_id: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuType[]>([]);

  useEffect(() => {
    const getMenusOnLoad = async () => {
      const menuData = await getAllMenus();
      setMenus(menuData);
    };
    getMenusOnLoad();
  }, []);

  const onClickCreateMenu = () => {
    navigate(FE_PAGE_PATHS.NEW_MENU);
  };

  return (
    <Group w="100%">
      <Flex direction="column" w="100%">
        <div>
          <Button
            leftIcon={<IconChefHat />}
            onClick={onClickCreateMenu}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Create Menu
          </Button>
        </div>
        <Box mt={16}>
          {menus.map((menu) => (
            <>
              <MenuCard {...menu} />
            </>
          ))}
        </Box>
      </Flex>
    </Group>
  );
};

export default Home;
