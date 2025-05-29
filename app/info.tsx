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
} from "./components/animations";
import { FadeWrapper } from "./animations";

interface RouteParams {
  item: string;
  onlineData: {
    status: 'Offline' | 'Online' | 'AFK' | 'Designer' | 'Developer';
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
    start_of_playtime: string;
  };
}

interface FadeWrapperRef {
  fadeOut: () => void;
  fadeIn: () => void;
}

const API_URL = 'http://ddstats.tw/player/json';
const LOADING_TEXT = 'Loading...';

export default function Info() {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();
  const route = useRoute();
  const fadeRef = useRef<FadeWrapperRef>(null);

  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const routeParams = route.params as RouteParams;
  const { item: playerName, onlineData: online } = routeParams;

  useEffect(() => {
    const fetchPlayerData = async (playername: string) => {
      try {
        const response = await axios.get<PlayerData>(
          `${API_URL}?player=${playername}`
        );
        setPlayer(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching player data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch player data'));
        router.replace('/');
      }
    };

    fetchPlayerData(playerName);
  }, [playerName, router]);

  const handleClosePress = () => {
    if (fadeRef.current) {
      fadeRef.current.fadeOut();
    }
  };

  const handleClose = () => {
    router.replace('/');
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
    <FadeWrapper 
      ref={fadeRef} 
      onFadeOutComplete={handleClose}
      duration={200}
    >
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
    </FadeWrapper>
  );

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
