import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import NotificationBell from "../../components/caregiver/NotificationBell";
import AlertCard from "../../components/caregiver/AlertCard";
import FamilyAvatarList, {
  FamilyMember,
} from "../../components/caregiver/FamilyAvatar";
import ScheduleTimeline, {
  ScheduleMedication,
} from "../../components/caregiver/ScheduleTimeline";
import FloatingAddButton from "../../components/caregiver/FloatingAddButton";

// ─── mock data ────────────────────────────────────────────────
const FAMILY_MEMBERS: FamilyMember[] = [
  { id: "1", name: "David", isOnline: true },
  { id: "2", name: "Mary", image: "https://xsgames.co/randomusers/avatar.php?g=female&r=1" },
  { id: "3", name: "James", image: "https://xsgames.co/randomusers/avatar.php?g=male&r=2" },
  { id: "4", name: "Sarah", image: "https://xsgames.co/randomusers/avatar.php?g=female&r=3" },
];

const SCHEDULES: Record<
  string,
  {
    morning: ScheduleMedication[];
    afternoon: ScheduleMedication[];
    evening: ScheduleMedication[];
  }
> = {
  "1": {
    morning: [
      {
        id: "m1",
        name: "Lisinopril",
        dosage: "10mg",
        patientName: "David",
        category: "Heart Health",
        status: "taken",
      },
      {
        id: "m2",
        name: "Metformin",
        dosage: "500mg",
        patientName: "David",
        category: "Diabetes",
        status: "taken",
      },
    ],
    afternoon: [
      {
        id: "m3",
        name: "Atorvastatin",
        dosage: "20mg",
        patientName: "David",
        category: "Cholesterol",
        status: "pending",
      },
    ],
    evening: [
      {
        id: "m4",
        name: "Amlodipine",
        dosage: "5mg",
        patientName: "David",
        category: "Blood Pressure",
        status: "pending",
      },
    ],
  },
  "2": {
    morning: [
      {
        id: "m5",
        name: "Blood Pressure Meds",
        dosage: "50mg",
        patientName: "Mary",
        category: "Hypertension",
        status: "missed",
      },
    ],
    afternoon: [],
    evening: [
      {
        id: "m6",
        name: "Aspirin",
        dosage: "75mg",
        patientName: "Mary",
        category: "Heart Health",
        status: "pending",
      },
    ],
  },
  "3": {
    morning: [
      {
        id: "m7",
        name: "Insulin",
        dosage: "10 units",
        patientName: "James",
        category: "Diabetes",
        status: "taken",
      },
    ],
    afternoon: [
      {
        id: "m8",
        name: "Insulin",
        dosage: "10 units",
        patientName: "James",
        category: "Diabetes",
        status: "pending",
      },
    ],
    evening: [],
  },
  "4": {
    morning: [
      {
        id: "m9",
        name: "Vitamin D",
        dosage: "1000 IU",
        patientName: "Sarah",
        category: "Supplements",
        status: "taken",
      },
    ],
    afternoon: [],
    evening: [],
  },
};

// ─── component ────────────────────────────────────────────────
export default function CaregiverDashboard() {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState("1");
  const [activeTab, setActiveTab] = useState("Family");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const schedule = SCHEDULES[selectedMember] || {
    morning: [],
    afternoon: [],
    evening: [],
  };

  const timeSlots = [
    {
      label: "Morning",
      time: "8:00 AM",
      icon: "sunny-outline" as const,
      medications: schedule.morning,
    },
    {
      label: "Afternoon",
      time: "1:00 PM",
      icon: "partly-sunny-outline" as const,
      medications: schedule.afternoon,
    },
    {
      label: "Evening",
      time: "8:00 PM",
      icon: "moon-outline" as const,
      medications: schedule.evening,
    },
  ];

  const handleConfirm = (medId: string) => {
    Alert.alert("Confirmed", "Medication marked as taken.");
  };

  const handleEdit = (medId: string) => {
    router.push(`/medications/edit?id=${medId}`);
  };

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <LinearGradient
        colors={["#1a8e2d", "#146922"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appName}>MediNest Family</Text>
          <Text style={styles.subtitle}>Caregiver Dashboard</Text>
        </View>
        <NotificationBell
          count={2}
          onPress={() => Alert.alert("Notifications", "You have 2 new alerts")}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Critical Alerts ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Critical Alerts</Text>
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentText}>2 URGENT</Text>
            </View>
          </View>

          <AlertCard
            type="missed"
            patientName="Mary (Mom)"
            patientImage="https://xsgames.co/randomusers/avatar.php?g=female&r=1"
            alertText="Missed: Blood Pressure Meds"
            timeAgo="24m ago"
            actions={[
              {
                label: "Call Mary",
                primary: true,
                onPress: () => Alert.alert("Calling", "Calling Mary..."),
              },
              { label: "Logged" },
            ]}
          />
          <AlertCard
            type="refill"
            patientName="James (Son)"
            patientImage="https://xsgames.co/randomusers/avatar.php?g=male&r=2"
            alertText="Inventory Low: Insulin (2 doses left)"
            timeAgo="1h ago"
            actions={[
              {
                label: "Order Refill Now",
                primary: true,
                onPress: () => Alert.alert("Refill", "Ordering refill..."),
              },
            ]}
          />
        </View>

        {/* ── Family Members ── */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 20 }]}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            <TouchableOpacity
              onPress={() => Alert.alert("Add Member", "Add a new family member")}
            >
              <Text style={styles.addMemberLink}>+ Add Member</Text>
            </TouchableOpacity>
          </View>
          <FamilyAvatarList
            members={FAMILY_MEMBERS}
            selectedId={selectedMember}
            onSelect={setSelectedMember}
            onAddMember={() =>
              Alert.alert("Add Member", "Add a new family member")
            }
          />
        </View>

        {/* ── Today's Schedule ── */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 20 }]}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <ScheduleTimeline
            timeSlots={timeSlots}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ── FAB ── */}
      <FloatingAddButton onPress={() => router.push("/medications/add")} />

      {/* ── Bottom Navigation ── */}
      <View style={styles.bottomNav}>
        {([
          { key: "Home", icon: "home-outline", iconActive: "home" },
          { key: "Family", icon: "people-outline", iconActive: "people" },
          { key: "Events", icon: "calendar-outline", iconActive: "calendar" },
          { key: "Settings", icon: "settings-outline", iconActive: "settings" },
        ] as const).map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.navItem}
              onPress={() => {
                setActiveTab(tab.key);
                if (tab.key === "Home") router.push("/home");
                if (tab.key === "Settings") router.push("/settings");
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={24}
                color={isActive ? "#1a8e2d" : "#999"}
              />
              <Text
                style={[styles.navText, isActive && styles.navTextActive]}
              >
                {tab.key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  /* Header */
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 140 : 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 56 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  headerLeft: {},
  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  /* Scroll */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  /* Sections */
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  urgentBadge: {
    backgroundColor: "#FFF0F4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  urgentText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#E91E63",
    letterSpacing: 0.5,
  },
  addMemberLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a8e2d",
  },
  dateText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#999",
  },
  /* Bottom Nav */
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 30 : 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  navText: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontWeight: "500",
  },
  navTextActive: {
    color: "#1a8e2d",
    fontWeight: "700",
  },
});
