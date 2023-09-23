import React from "react";
import "./App.css";
import LoggedIn from "./Components/Pages/Login/LoggedIn";
import LoggedOut from "./Components/Pages/Login/LoggedOut";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <LoggedIn />
      <LoggedOut />
    </Provider>
  );
}

export default App;
