import React, { useRef, useEffect } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

const FadeInView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Стартова прозорість = 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Плавне з'явлення (opacity = 1)
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ ...styles.fadingContainer, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

const Test = () => {
  return (
    <View style={styles.container}>
      <FadeInView>
        <Text style={styles.fadingText}>Привіт, React Native!</Text>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue",
    borderRadius: 10,
  },
  fadingText: {
    fontSize: 20,
    color: "#333",
  },
});

export default Test;
