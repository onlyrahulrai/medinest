import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface FamilyMember {
  id: string;
  name: string;
  image?: string;
  isOnline?: boolean;
}

interface FamilyAvatarListProps {
  members: FamilyMember[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddMember?: () => void;
}

export default function FamilyAvatarList({
  members,
  selectedId,
  onSelect,
  onAddMember,
}: FamilyAvatarListProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {members.map((member) => {
        const isSelected = member.id === selectedId;
        return (
          <TouchableOpacity
            key={member.id}
            style={styles.item}
            onPress={() => onSelect(member.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.avatarContainer,
                isSelected && styles.avatarContainerSelected,
              ]}
            >
              {member.image ? (
                <Image source={{ uri: member.image }} style={styles.avatar} />
              ) : (
                <View
                  style={[
                    styles.avatarFallback,
                    isSelected && styles.avatarFallbackSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.initials,
                      isSelected && styles.initialsSelected,
                    ]}
                  >
                    {getInitials(member.name)}
                  </Text>
                </View>
              )}
              {member.isOnline && <View style={styles.onlineDot} />}
            </View>
            <Text
              style={[styles.name, isSelected && styles.nameSelected]}
              numberOfLines={1}
            >
              {member.name}
            </Text>
          </TouchableOpacity>
        );
      })}
      {onAddMember && (
        <TouchableOpacity
          style={styles.item}
          onPress={onAddMember}
          activeOpacity={0.7}
        >
          <View style={styles.addContainer}>
            <Ionicons name="add" size={24} color="#1a8e2d" />
          </View>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 16,
  },
  item: {
    alignItems: "center",
    width: 68,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    position: "relative",
  },
  avatarContainerSelected: {
    borderColor: "#1a8e2d",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarFallbackSelected: {
    backgroundColor: "#E8F5E9",
  },
  initials: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666",
  },
  initialsSelected: {
    color: "#1a8e2d",
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2.5,
    borderColor: "white",
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  nameSelected: {
    color: "#1a8e2d",
    fontWeight: "700",
  },
  addContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  addText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1a8e2d",
  },
});
