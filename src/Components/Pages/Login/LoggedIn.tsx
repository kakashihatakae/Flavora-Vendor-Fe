import { AppShell, Center, Flex } from "@mantine/core";
import { MantineProvider } from "@mantine/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import { NavbarMinimal } from "../Navbar/Navbar";
import { FE_PAGE_PATHS } from "../../Shared/const";
import Home from "../Home/Home";
import NewMenu from "../NewMenu/NewMenu";
import { Provider } from "react-redux";
import { store } from "../../../store";

const LoggedIn = () => {
  return (
    <Router>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "light" }}
        >
          <AppShell navbar={<NavbarMinimal />}>
            <Center>
              <Flex sx={{ display: "flex", width: "80%" }}>
                <Routes>
                  <Route path={FE_PAGE_PATHS.HOME} Component={Home} />
                  <Route path={FE_PAGE_PATHS.NEW_MENU} Component={NewMenu} />
                </Routes>
              </Flex>
            </Center>
          </AppShell>
        </MantineProvider>
      </Provider>
    </Router>
  );
};

export default LoggedIn;
