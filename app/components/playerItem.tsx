import React, { useContext, useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Tee from "./tee";
import axios from "axios";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";
import { RandomSlide, ExplosionAnimation } from "./animations";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import LoadSvg from "./loadSvg";
import { useTheme } from "../hooks/useTheme";

interface PlayerData {
  skin_name: string;
  // Add other fields as needed
}

interface PlayerOnlineData {
  status: "Offline" | "Online" | "AFK";
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
  updateFilteredNames: (names: Player[]) => void;
  playerOnline: PlayerOnlineData | null;
  index: number;
  shouldAnimate?: boolean;
}

const ITEM_HEIGHT = rh(11.83);
const API_URL = "http://ddstats.tw/profile/json";
const ANIMATION_DURATION = 500;
const STORAGE_KEY = "friendsNames";

const PlayerItem = React.memo(
  ({
    player,
    setNames,
    updateFilteredNames,
    playerOnline,
    index,
    shouldAnimate = false,
  }: PlayerItemProps) => {
    const { theme } = useTheme();
    const [playerData, setPlayerData] = useState<PlayerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [playersObj, setPlayersObj] = useState<PlayerOnlineData | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showExplosion, setShowExplosion] = useState(false);
    const [explosionPosition, setExplosionPosition] = useState({ x: 0, y: 0 });
    const teeRef = useRef<View>(null);
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [key] = useState(() => `${player}_${Date.now()}`);
    const { playButtonSound, playDeleteSound } = useSoundWithSettings();

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
        color: theme.text.primary,
        fontWeight: "600",
      },
      cardInside: {
        borderColor: theme.card.border,
        borderWidth: 2,
        flexDirection: "row",
        padding: rw(8),
        alignItems: "center",
        borderRadius: rw(4),
        backgroundColor: theme.card.background,
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
      Offline: { fontSize: rf(2), color: theme.status.offline },
      Online: { fontSize: rf(2), color: theme.status.online },
      AFK: { fontSize: rf(2), color: theme.status.afk },
      teeContainer: {
        width: rw(15),
        height: rw(15),
        justifyContent: "center",
        alignItems: "center",
        marginRight: rw(2),
      },
      disabledButton: {
        opacity: 0.5,
      },
      explosionContainer: {
        position: "absolute",
        left: explosionPosition.x,
        top: explosionPosition.y,
        zIndex: 1000,
      },
      deleting: {
        opacity: 0.5,
      },
      slideContainer: {
        width: "100%",
        height: "100%",
      },
      touchable: {
        width: "100%",
        height: "100%",
      },
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
        } catch {
          // Error fetching player data
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
      if (isDeleting) return;
      
      playDeleteSound();
      setIsDeleting(true);
      if (teeRef.current) {
        teeRef.current.measure((x, y, width, height, pageX, pageY) => {
          setExplosionPosition({ x: pageX, y: pageY });
          setShowExplosion(true);
        });
      }
    };

    const handleExplosionComplete = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!stored) return;

        const names: Player[] = JSON.parse(stored);
        const filtered = names.filter((name) => name.name !== player);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        setNames(filtered);
        updateFilteredNames(filtered);
      } catch (error) {
        console.error("Error deleting player:", error);
      } finally {
        setIsDeleting(false);
        setShowExplosion(false);
      }
    };

    const handleNavigation = () => {
      playButtonSound();
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

      return <Text style={styles[playersObj.status]}>{statusText}</Text>;
    };

    const renderTee = () => (
      <View style={styles.teeContainer} ref={teeRef}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.text.primary} />
        ) : (
          <Tee
            width={rw(4.8)}
            source={
              playerData?.skin_name &&
              playerData.skin_name !== "null" &&
              playerData.skin_name !== "undefined"
                ? playerData.skin_name
                : player && player !== "null" && player !== "undefined"
                ? player
                : "default"
            }
            key={key}
          />
        )}
      </View>
    );

    const renderDeleteButton = () => (
      <TouchableOpacity onPress={handleDelete} disabled={isDeleting}>
        <LoadSvg 
          name="trash" 
          style={[styles.svg, isDeleting && styles.disabledButton]} 
        />
      </TouchableOpacity>
    );

    return (
      <View style={styles.cardBox}>
        <RandomSlide
          duration={ANIMATION_DURATION}
          style={styles.slideContainer}
        >
          <TouchableOpacity
            onPress={handleNavigation}
            disabled={isDeleting}
            style={styles.touchable}
          >
            <View style={[styles.cardInside, isDeleting && styles.deleting]}>
              {renderTee()}
              <View style={styles.textContainer}>
                {renderStatus()}
                <Text style={styles.cardText}>{player}</Text>
              </View>
              {renderDeleteButton()}
            </View>
          </TouchableOpacity>
        </RandomSlide>
        {showExplosion && (
          <View style={styles.explosionContainer}>
            <ExplosionAnimation
              onComplete={handleExplosionComplete}
              color={theme.primary}
              size={rw(10)}
            />
          </View>
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.player === nextProps.player &&
      prevProps.index === nextProps.index &&
      prevProps.playerOnline?.status === nextProps.playerOnline?.status &&
      prevProps.playerOnline?.server === nextProps.playerOnline?.server &&
      prevProps.playerOnline?.mapName === nextProps.playerOnline?.mapName
    );
  }
);

export default PlayerItem;
