import { Text } from "react-native";
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";

export default function TotalPlayed({ data }: any) {
  const activity = data?.general_activity;

  return (
    <Text style={activity ? style.text : style.fakeText}>
      {activity
        ? `Total played ${Math.round(
            activity.total_seconds_played / 3600
          )} hours since ${activity.start_of_playtime}`
        : "Total played: none"}
    </Text>
  );
}

import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  text: { fontSize: rf(2), textAlign: "center" },
  fakeText: { color: "red", textAlign: "center", fontSize: rf(3) },
});
