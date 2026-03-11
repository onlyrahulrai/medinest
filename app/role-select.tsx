import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function RoleSelectScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSelect = (role: "patient" | "caregiver") => {
    if (role === "patient") {
      router.replace("/home");
    } else {
      router.replace("/caregiver");
    }
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#1a8e2d", "#146922", "#0d4f18"]}
        style={styles.topGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <Animated.View
        style={[styles.header, { opacity: fadeAnim }]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="medical" size={32} color="#1a8e2d" />
          </View>
        </View>
        <Text style={styles.appName}>MediNest</Text>
        <Text style={styles.tagline}>Your Health, Our Priority</Text>
      </Animated.View>

      {/* Role Cards */}
      <Animated.View
        style={[
          styles.cardsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.selectTitle}>Continue as</Text>

        {/* Patient Card */}
        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.85}
          onPress={() => handleSelect("patient")}
        >
          <LinearGradient
            colors={["#4CAF50", "#2E7D32"]}
            style={styles.roleGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.roleIconContainer}>
              <Ionicons name="person" size={32} color="white" />
            </View>
            <View style={styles.roleTextContainer}>
              <Text style={styles.roleTitle}>Patient</Text>
              <Text style={styles.roleDescription}>
                Track your medications, set reminders, and manage your health
              </Text>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward" size={22} color="rgba(255,255,255,0.8)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Caregiver Card */}
        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.85}
          onPress={() => handleSelect("caregiver")}
        >
          <LinearGradient
            colors={["#1a8e2d", "#146922"]}
            style={styles.roleGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.roleIconContainer}>
              <Ionicons name="people" size={32} color="white" />
            </View>
            <View style={styles.roleTextContainer}>
              <Text style={styles.roleTitle}>Caregiver</Text>
              <Text style={styles.roleDescription}>
                Monitor family members' medication adherence and get alerts
              </Text>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward" size={22} color="rgba(255,255,255,0.8)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>
          Demo Mode — No login required
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 300 : 260,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  header: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  appName: {
    fontSize: 30,
    fontWeight: "800",
    color: "white",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
    fontWeight: "500",
  },
  cardsContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  selectTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 20,
    textAlign: "center",
  },
  roleCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  roleGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    minHeight: 110,
  },
  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 50 : 30,
    paddingTop: 16,
  },
  footerText: {
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
});
