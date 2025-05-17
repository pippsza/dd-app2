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
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEM_HEIGHT = rh(11.83);

const PlayerItem = React.memo(({ player, setNames }: any) => {
  const [playerData, setPlayerData]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const navigateHandle = () => {
    navigation.navigate("info", { item: JSON.stringify(player) });
  };
  useEffect(() => {
    let isMounted = true; // флаг для предотвращения обновления после размонтирования

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
  const deletePlayer = async () => {
    try {
      const stored = await AsyncStorage.getItem("friendsNames");
      if (!stored) return;

      const names: string[] = JSON.parse(stored);

      const filtered = names.filter((name) => name !== player);

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
          {/* Показываем Tee только когда данные загрузились */}
          {playerData ? (
            <Tee source={playerData.skin_name} width={rw(4)} />
          ) : (
            <ActivityIndicator size="small" />
          )}

          <Text style={styles.cardText}>{player}</Text>
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
  svg: {
    width: 30,
    height: 30,
  },
});

export default PlayerItem;
