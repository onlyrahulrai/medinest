import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AlertAction {
  label: string;
  primary?: boolean;
  onPress?: () => void;
}

interface AlertCardProps {
  type: "missed" | "refill";
  patientName: string;
  patientImage?: string;
  alertText: string;
  timeAgo: string;
  actions: AlertAction[];
}

export default function AlertCard({
  type,
  patientName,
  patientImage,
  alertText,
  timeAgo,
  actions,
}: AlertCardProps) {
  const isMissed = type === "missed";
  const borderColor = isMissed ? "#EF4444" : "#F59E0B";
  const iconBg = isMissed ? "#FEF2F2" : "#FFFBEB";
  const iconColor = isMissed ? "#EF4444" : "#F59E0B";

  return (
    <View style={[styles.card, { borderLeftColor: borderColor }]}>
      <View style={styles.topRow}>
        <View style={styles.patientInfo}>
          {patientImage ? (
            <Image source={{ uri: patientImage }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: iconBg }]}>
              <Ionicons name="person" size={18} color={iconColor} />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.patientName}>{patientName}</Text>
            <Text style={[styles.alertText, { color: iconColor }]}>{alertText}</Text>
          </View>
        </View>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
      <View style={styles.actionsRow}>
        {actions.map((action, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.actionBtn,
              action.primary
                ? { backgroundColor: borderColor }
                : { backgroundColor: "#F1F5F9" },
            ]}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.actionText,
                action.primary ? { color: "white" } : { color: "#475569" },
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 3,
  },
  alertText: {
    fontSize: 13,
    fontWeight: "600",
  },
  timeAgo: {
    fontSize: 12,
    color: "#94A3B8",
    marginLeft: 8,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
