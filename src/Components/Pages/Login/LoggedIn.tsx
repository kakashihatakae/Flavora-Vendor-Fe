import { AppShell, Center, Flex } from "@mantine/core";
import { MantineProvider } from "@mantine/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import { NavbarMinimal } from "../Navbar/Navbar";
import { FE_PAGE_PATHS } from "../../Shared/const";
import Home from "../Home/Home";
import NewMenu from "../NewMenu/NewMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const LoggedIn = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  if (!loggedIn) {
    return null;
  }

  return (
    <Router>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <AppShell navbar={<NavbarMinimal />}>
          <Center>
            <Flex style={{ display: "flex", width: "80%" }}>
              <Routes>
                <Route path={FE_PAGE_PATHS.HOME} Component={Home} />
                <Route path={FE_PAGE_PATHS.NEW_MENU} Component={NewMenu} />
              </Routes>
            </Flex>
          </Center>
        </AppShell>
      </MantineProvider>
    </Router>
  );
};

export default LoggedIn;
