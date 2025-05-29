import React, { useContext, useEffect, useState } from "react";
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
import TrashLight from "../../assets/svg/trash-light.svg";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";
import { RandomSlide } from "./animations";

interface PlayerData {
  skin_name: string;
  // Add other fields as needed
}

interface PlayerOnlineData {
  status: 'Offline' | 'Online' | 'AFK';
  game: string | null;
  server: string | null;
  mapName: string | null;
}

interface Player {
  name: string;
  data: PlayerOnlineData;
}

interface PlayerItemProps {
  player: string;
  setNames: (names: Player[]) => void;
  playerOnline: PlayerOnlineData | null;
}

const ITEM_HEIGHT = rh(11.83);
const API_URL = 'http://ddstats.tw/profile/json';
const ANIMATION_DURATION = 500;
const STORAGE_KEY = 'friendsNames';

const PlayerItem = React.memo(({ player, setNames, playerOnline }: PlayerItemProps) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playersObj, setPlayersObj] = useState<PlayerOnlineData | null>(null);

  const navigation = useNavigation();
  const { t } = useTranslation();
  const theme = {
    background: isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(39,39,39,0.4)",
    text: isDarkMode ? "black" : "white",
    border: isDarkMode ? "black" : "white",
  };
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
      color: theme.text,
      fontWeight: "600",
    },
    cardInside: {
      borderColor: theme.border,
      borderWidth: 2,
      flexDirection: "row",
      padding: rw(8),
      alignItems: "center",
      borderRadius: rw(4),
      backgroundColor: theme.background,
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
  useEffect(() => {
    let isMounted = true;

    const fetchPlayerData = async (playername: string) => {
      try {
        setLoading(true);
        const response = await axios.get<PlayerData>(
          `${API_URL}?player=${playername}`
        );

        if (isMounted) {
          setPlayerData(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching player data:', err);
        if (isMounted) setLoading(false);
      }
    };

    fetchPlayerData(player);

    return () => {
      isMounted = false;
    };
  }, [player]);

  useEffect(() => {
    setPlayersObj(playerOnline);
  }, [playerOnline]);
  const handleDelete = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const names: Player[] = JSON.parse(stored);
      const filtered = names.filter(name => name.name !== player);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      setNames(filtered);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleNavigation = () => {
    // @ts-ignore - expo-router types are not properly set up
    navigation.navigate("info", {
      item: player,
      onlineData: playerOnline,
    });
  };

  const renderStatus = () => {
    if (!playersObj?.status) return null;

    const statusText = {
      Offline: t("playerItem.offline"),
      Online: t("playerItem.online"),
      AFK: t("playerItem.AFK"),
    }[playersObj.status];

    return (
      <Text style={styles[playersObj.status]}>
        {statusText}
      </Text>
    );
  };

  const renderTee = () => (
    playerData ? (
      <Tee source={playerData.skin_name} width={rw(4)} />
    ) : (
      <ActivityIndicator size="small" />
    )
  );

  const renderDeleteButton = () => (
    <TouchableOpacity onPress={handleDelete}>
      {isDarkMode ? (
        <TrashDark style={styles.svg} />
      ) : (
        <TrashLight style={styles.svg} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.cardBox}>
      <RandomSlide duration={ANIMATION_DURATION}>
        <TouchableOpacity onPress={handleNavigation}>
          <View style={styles.cardInside}>
            {renderTee()}
            <View style={styles.textContainer}>
              {renderStatus()}
              <Text style={styles.cardText}>{player}</Text>
            </View>
            {renderDeleteButton()}
          </View>
        </TouchableOpacity>
      </RandomSlide>
    </View>
  );
});

export default PlayerItem;
