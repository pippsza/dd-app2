import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Tee from "./tee";
export default function TeeContainer({ data }: any) {
  return (
    <>
      <View style={style.teeContainer}>
        <View>
          <Text style={style.regText}>Best friend:</Text>
          <Text style={style.smallText}>
            {data.favourite_teammates[0].name}
          </Text>
        </View>
        <View style={style.container}>
          <View>
            {/* <Text style={style.bigText}>♥{data.status} </Text>
            <Text style={style.regText}>Playing on: {data.playing_map}</Text>
            <Text style={style.regText}>{data.playing_server}</Text> */}
          </View>
          <Tee width={rh(4)} source={data.profile.skin_name}></Tee>
          <View>
            <Text style={style.bigText}>{data.profile.name}</Text>
            <Text style={style.smallText}>{data.profile.clan}</Text>
            <Text style={style.regText}> {data.profile.points} PTS</Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={style.rightText}>Fav map:</Text>
            <Text style={style.rightSmallText}>
              {data.most_played_maps[0].map_name}
            </Text>
          </View>
          <View>
            <Text style={style.rightText}>Fav region:</Text>
            <Text style={style.rightSmallText}>
              {data.most_played_locations[0].key.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  container: { alignItems: "center", gap: rh(2) },
  regText: { textAlign: "center", fontSize: rf(2) },
  bigText: { textAlign: "center", fontSize: rf(3) },
  smallText: { textAlign: "center", fontSize: rf(1.8) },
  teeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: rw(100),
  },
  img: {
    width: rw(20),
    height: rw(20),
  },
  rightText: { fontSize: rf(2), textAlign: "center" },
  rightSmallText: { fontSize: rf(1.8), textAlign: "center" },
});
