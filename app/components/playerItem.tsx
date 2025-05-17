import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Tee from "./tee";
import { useEffect, useState } from "react";
import axios from "axios";
const ITEM_HEIGHT = rh(11.83);
export default function PlayerItem({ player }: any) {
  const [playerData, setPlayerData]: any = useState(null);

  let data;
  useEffect(() => {
    const fetch = async (playername: String) => {
      try {
        const response = await axios.get(
          `http://ddstats.tw/profile/json?player=${playername}`
        );
        setPlayerData(response.data);
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    };
    fetch(player);
  }, []);
  return (
    <View style={styles.cardBox}>
      <TouchableOpacity
        onPress={() => {
          console.log("pressed:", player);
        }}
      >
        <View style={styles.cardInside}>
          {playerData ? (
            <Tee source={playerData.skin_name} width={rw(4)}></Tee>
          ) : (
            <Text>Is Loading</Text>
          )}
          <Text style={styles.cardText}>{player}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
  cardBox: {
    height: ITEM_HEIGHT,
    width: rw(90),

    paddingVertical: 4,
    marginBottom: 0,
  },
  cardText: {
    fontSize: rf(2),
    color: "black",
    fontWeight: "600",
  },
  cardInside: {
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: rw(8),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: "white",
    height: "100%",
    width: rw(89),
  },
});
