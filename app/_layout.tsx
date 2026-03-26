import React from "react";
import { StatusBar } from "expo-status-bar";
import CaregiverInvitationModal from "../components/CaregiverInvitationModal";
import { Provider } from "react-redux";
import { store } from "../store";
import RootNavigator from "./RootNavigator";

export default function Layout() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <CaregiverInvitationModal />
      <RootNavigator />
    </Provider>
  );
}
