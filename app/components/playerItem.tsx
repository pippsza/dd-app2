import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import TrashDark from "../../assets/svg/trash-dark.svg";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Tee from "./tee";
import axios from "axios";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const ITEM_HEIGHT = rh(11.83);

type Props = {
  player: any;
  setNames: any;
  playerOnline: any;
};
const PlayerItem = React.memo(({ player, setNames, playerOnline }: Props) => {
  const [playerData, setPlayerData]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [playersObj, setPlayersObj]: any = useState({});

  const navigation = useNavigation();
  const navigateHandle = () => {
    navigation.navigate("info", {
      item: player,
      onlineData: playerOnline,
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetch = async (playername: string) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://ddstats.tw/profile/json?player=${playername}`
        );

        if (isMounted) {
          setPlayerData(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) setLoading(false);
      }
    };

    fetch(player);

    return () => {
      isMounted = false;
    };
  }, [player]);

  useEffect(() => {
    setPlayersObj(playerOnline);
  }, [playerOnline]);
  const deletePlayer = async () => {
    try {
      const stored = await AsyncStorage.getItem("friendsNames");
      if (!stored) return;

      const names: any = JSON.parse(stored);

      const filtered = names.filter((name: any) => name.name !== player);

      await AsyncStorage.setItem("friendsNames", JSON.stringify(filtered));
      setNames(filtered);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  return (
    <View style={styles.cardBox}>
      <TouchableOpacity onPress={navigateHandle}>
        <View style={styles.cardInside}>
          {playerData ? (
            <Tee source={playerData.skin_name} width={rw(4)} />
          ) : (
            <ActivityIndicator size="small" />
          )}
          <View style={styles.textContainer}>
            <Text style={styles[playersObj.status]}>
              {playersObj?.status || "Offline..."}
            </Text>

            <Text style={styles.cardText}>{player}</Text>
          </View>
          <TouchableOpacity onPress={deletePlayer}>
            <TrashDark style={styles.svg}></TrashDark>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
});

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

    flexDirection: "row",
    padding: rw(8),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderRadius: rw(4),
    backgroundColor: "white",
    height: "100%",
    width: rw(89),
    justifyContent: "space-between",
  },
  svg: {
    width: 30,
    height: 30,
  },
  textContainer: {
    flex: 1,
    gap: rh(1),
    textAlign: "center",
  },
  Offline: { fontSize: rf(2), color: "red" },
  Online: { fontSize: rf(2), color: "green" },
  AFK: { fontSize: rf(2), color: "blue" },
});

export default PlayerItem;
