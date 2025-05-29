import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Link, useNavigation, useRouter } from "expo-router";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import CrossDark from "../assets/svg/cross-dark.svg";
import CrossLight from "../assets/svg/cross-light.svg";
import MoreDark from "../assets/svg/more-dark.svg";
import MoreLight from "../assets/svg/more-light.svg";
import GameCategoryPie from "./components/gameCategoriesPie";
import GameModePie from "./components/gamemodesPie";
import TotalPlayed from "./components/totalPlayed";
import TeeContainer from "./components/teeContainer";
import { ThemeContext } from "./components/themeSwitcher";
import {
  FadeIn,
  SlideLeftToRight,
  SlideRightToLeft,
  SlideOutUp,
} from "./animations";

interface RouteParams {
  item: string;
  onlineData: {
    status: "Offline" | "Online" | "AFK" | "Designer" | "Developer";
    game?: string | null;
    server?: string | null;
    mapName?: string | null;
  };
}

interface PlayerData {
  profile: {
    name: string;
    clan?: string;
    points: number;
    skin_name: string;
  };
  most_played_maps: Array<{
    map_name: string;
    seconds_played: number;
  }>;
  most_played_gametypes: Array<{
    key: string;
    seconds_played: number;
  }>;
  most_played_categories: Array<{
    key: string;
    seconds_played: number;
  }>;
  most_played_locations: Array<{
    key: string;
    seconds_played: number;
  }>;
  favourite_teammates: Array<{
    name: string;
    seconds_played: number;
  }>;
  general_activity?: {
    total_seconds_played: number;
    start_of_playtime?: string;
  };
}

interface DDNetActivity {
  hours_played: number;
}

interface DDNetResponse {
  activity: DDNetActivity[];
}

interface SlideOutRef {
  slideOut: () => void;
  slideIn: () => void;
}
const HOURS_URL = "https://ddnet.org/players/?json2=";
const API_URL = "http://ddstats.tw/player/json";
const LOADING_TEXT = "Loading...";

export default function Info() {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();
  const route = useRoute();
  const slideRef = useRef<SlideOutRef>(null);
  const { t } = useTranslation();

  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const routeParams = route.params as RouteParams;
  const { item: playerName, onlineData: online } = routeParams;

  useEffect(() => {
    const fetchPlayerData = async (playername: string) => {
      setIsLoading(true);
      try {
        const [ddstatsResponse, ddnetResponse] = await Promise.all([
          axios.get<PlayerData>(`${API_URL}?player=${playername}`),
          axios.get<DDNetResponse>(`${HOURS_URL}${playername}`).catch((err) => {
            console.warn("Failed to fetch DDNet data:", err);
            return { data: { activity: [] } };
          }),
        ]);

        const ddstatsData = ddstatsResponse.data;

        const ddnetHours = ddnetResponse.data.activity.reduce(
          (total, activity) => total + activity.hours_played,
          0
        );
        const ddnetSeconds = ddnetHours * 3600;

        const ddstatsSeconds =
          ddstatsData.general_activity?.total_seconds_played || 0;

        const finalSeconds = Math.max(ddnetSeconds, ddstatsSeconds);

        const updatedGeneralActivity = ddstatsData.general_activity
          ? {
              ...ddstatsData.general_activity,
              total_seconds_played: finalSeconds,
            }
          : {
              total_seconds_played: finalSeconds,
            };

        setPlayer({
          ...ddstatsData,
          general_activity: updatedGeneralActivity,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching player data:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch player data")
        );
        Toast.show({
          type: "error",
          text1: t("toasts.unexpectedError"),
        });
        router.replace("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData(playerName);
  }, [playerName, router, t]);

  const handleClosePress = () => {
    if (slideRef.current) {
      slideRef.current.slideOut();
    }
  };

  const handleClose = () => {
    router.replace("/");
  };

  const renderLoadingState = () => (
    <View style={styles.mainContainer}>
      <Spinner
        visible={true}
        textContent={LOADING_TEXT}
        textStyle={styles.loadingText}
      />
    </View>
  );

  const renderContent = () => (
    <SlideOutUp ref={slideRef} onSlideOutComplete={handleClose} duration={300}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
          {isDarkMode ? (
            <CrossDark style={styles.svg} />
          ) : (
            <CrossLight style={styles.svg} />
          )}
        </TouchableOpacity>

        {player && (
          <>
            <TeeContainer online={online} data={player} />

            <FadeIn>
              <TotalPlayed data={player} />
            </FadeIn>

            <SlideLeftToRight>
              <GameModePie data={player} />
            </SlideLeftToRight>

            <SlideRightToLeft>
              <GameCategoryPie data={player} />
            </SlideRightToLeft>
          </>
        )}
      </View>
    </SlideOutUp>
  );

  if (isLoading) {
    return renderLoadingState();
  }

  if (error) {
    return renderLoadingState();
  }

  return renderContent();
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: rh(1),
    position: "relative",
  },
  svg: {
    width: rw(14),
    height: rw(14),
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  loadingText: {
    color: "#FFF",
  },
});
