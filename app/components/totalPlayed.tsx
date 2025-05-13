import { Text } from "react-native";
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";

export default function TotalPlayed({ data }: any) {
  return (
    <>
      <Text style={style.text}>
        Total played{" "}
        {Math.round(data.general_activity.total_seconds_played / 60)} hours
        since {data.general_activity.start_of_playtime}
      </Text>
    </>
  );
}
import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  text: { fontSize: rf(2), textAlign: "center" },
});
