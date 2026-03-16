import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NotificationBellProps {
  count?: number;
  onPress?: () => void;
  color?: string;
  style?: any;
}

export default function NotificationBell({ 
  count = 0, 
  onPress, 
  color = "#333", 
  style 
}: NotificationBellProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <Ionicons name="notifications-outline" size={24} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? "9+" : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E91E63",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
});
