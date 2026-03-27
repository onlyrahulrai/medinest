import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Network from "expo-network";
import { setNetworkInfo } from "@/reducers/authSlice";

const AuthSync = () => {
  const dispatch = useDispatch();

  const networkState = Network.useNetworkState();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Get network info using the imperative API
        const info = await Network.getNetworkStateAsync();

        dispatch(setNetworkInfo(info));
      } catch (error) {
        console.error('Error getting network state:', error);
        // Fallback: assume not connected if we can't get the network state
        dispatch(setNetworkInfo({ isConnected: false, type: "unknown" }));
      }
    };

    // Small delay to ensure proper initialization
    const timer = setTimeout(initializeApp, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Log when network state changes
  useEffect(() => {
    if (networkState && networkState.type) {
      console.log('Network state changed:', networkState);
    }
  }, [networkState]);

  return null;
};

export default AuthSync;
