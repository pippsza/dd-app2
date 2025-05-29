import React, { useContext, useMemo } from "react";
import {
  Image,
  ImageBackgroundComponent,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Tee from "./tee";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./themeSwitcher";
import { FadeIn, SlideLeftToRight, SlideRightToLeft } from "./animations";
import CachedMapImage from "./cachedMapImage";

interface PlayerProfile {
  name: string;
  clan?: string;
  points: number;
  skin_name: string;
}

interface PlayerMap {
  map_name: string;
  seconds_played: number;
}

interface PlayerLocation {
  key: string;
  seconds_played: number;
}

interface PlayerTeammate {
  name: string;
  seconds_played: number;
}

interface PlayerData {
  profile: PlayerProfile;
  most_played_maps: PlayerMap[];
  most_played_locations: PlayerLocation[];
  favourite_teammates: PlayerTeammate[];
}

interface OnlineData {
  status: "Offline" | "Online" | "AFK" | "Designer" | "Developer";
  game?: string | null;
  server?: string | null;
  mapName?: string | null;
}

interface TeeContainerProps {
  data: PlayerData | null;
  online: OnlineData;
}

type StatusType = "Offline" | "Online" | "AFK" | "Designer" | "Developer";

type TeeContainerStyles = {
  mainContainer: ViewStyle;
  rowContainer: ViewStyle;
  statusBlock: ViewStyle;
  bg: ViewStyle;
  wrapper: ViewStyle;
  rightContainer: ViewStyle;
  teeBlock: ViewStyle;
  profileBlock: ViewStyle;
  name: ViewStyle;
  pts: ViewStyle;
  longText: TextStyle;
  longTextLove: TextStyle;
  regText: TextStyle;
  bigText: TextStyle;
  smallText: TextStyle;
  clanText: TextStyle;
  bgOnline: ViewStyle;
  wrapperOnline: ViewStyle;
  wrapperOnlineBack: ViewStyle;
} & {
  [K in StatusType]: TextStyle;
};

const STATUS_COLORS = {
  Online: "green",
  Offline: "red",
  AFK: "blue",
  Designer: "orange",
  Developer: "#c9007c",
} as const;

const DDNET_RANKS_URL = "https://ddnet.org/ranks/maps/";

const TeeContainer = React.memo(({ data, online }: TeeContainerProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  if (!data) {
    return null;
  }

  const theme = useMemo(
    () => ({
      background: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(39,39,39,0.8)",
      border: isDarkMode ? "black" : "white",
      text: isDarkMode ? "black" : "white",
    }),
    [isDarkMode]
  );

  const mapName = useMemo(() => {
    return data.most_played_maps[0]?.map_name || null;
  }, [data.most_played_maps]);

  const onlineMapName = useMemo(() => {
    return online?.mapName || null;
  }, [online.mapName]);

  const bgUrl = useMemo(() => {
    if (!mapName) return null;
    return `${DDNET_RANKS_URL}${mapName.replace(/ /g, "_")}.png`;
  }, [mapName]);
  const bgUrlOnline = useMemo(() => {
    if (!onlineMapName) return null;
    return `${DDNET_RANKS_URL}${onlineMapName.replace(/ /g, "_")}.png`;
  }, [onlineMapName]);

  const styles = useMemo(() => {
    const statusStyles = Object.entries(STATUS_COLORS).reduce(
      (acc, [status, color]) => ({
        ...acc,
        [status]: {
          color,
          fontSize: status === "Offline" ? rf(6) : rf(4),
        },
      }),
      {} as Record<StatusType, TextStyle>
    );

    return StyleSheet.create<TeeContainerStyles>({
      mainContainer: {
        flexDirection: "column",
        width: rw(100),
        paddingVertical: rh(2),
      },
      rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: rw(90),
        paddingVertical: rh(1),
      },
      statusBlock: {
        flex: 1,
        alignItems: "flex-start",
        opacity: 1,
        zIndex: 5,
        borderColor: theme.border,
        borderWidth: rw(0.4),
        borderLeftWidth: 0,
        borderRadius: rw(6),
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        overflow: "hidden",
      },
      bg: {
        borderTopLeftRadius: rw(4),
        borderBottomLeftRadius: rw(4),
        borderRadius: 100,
      },
      wrapper: {
        borderTopLeftRadius: rw(4),
        borderBottomLeftRadius: rw(4),
        overflow: "hidden",
      },
      wrapperOnline: {
        width: "100%",
        position: "relative",
      },
      wrapperOnlineBack: {
        padding: rw(2),
      },
      bgOnline: {
        backgroundColor: isDarkMode ? "rgba(255,255,255,1" : "rgba(39,39,39,1)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      },
      rightContainer: {
        backgroundColor: isDarkMode
          ? "rgba(255,255,255,0.5)"
          : "rgba(39,39,39,0.5)",
        opacity: 1,
        borderColor: theme.border,
        paddingVertical: rh(1),
        paddingLeft: rw(6),
        paddingRight: rw(4),
        borderWidth: rw(0.4),
        borderRightWidth: 0,
        borderTopLeftRadius: rw(4),
        borderBottomLeftRadius: rw(4),
      },
      teeBlock: {
        flexDirection: "row",
        alignItems: "center",
        width: rw(100),
        gap: rw(5),
        justifyContent: "space-between",
      },
      profileBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: rw(100),
        opacity: 1,
      },
      name: {
        opacity: 1,
        borderColor: theme.border,
        borderBottomWidth: rw(0.6),
        borderLeftWidth: 0,
        borderRadius: rw(3),
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingVertical: rh(0.4),
        paddingHorizontal: rw(4),
      },
      pts: {
        backgroundColor: theme.background,
        opacity: 1,
        borderColor: theme.border,
        borderWidth: rw(0.4),
        borderRightWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: rw(3),
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingHorizontal: rw(4),
      },
      longText: {
        fontSize: rf(Math.max(3 - (online.server?.length ?? 0) * 0.03, 1.5)),
        color: theme.text,
        paddingLeft: rw(2.6),
      },
      longTextLove: {
        fontSize: rf(
          Math.max(
            3 - (data?.most_played_maps[0]?.map_name.length ?? 0) * 0.07,
            1
          )
        ),
        color: theme.text,
        paddingLeft: rw(2.6),
      },
      regText: {
        fontSize: rf(2),
        color: theme.text,
      },
      bigText: {
        fontSize: rf(3.7),
        color: theme.text,
      },
      smallText: {
        fontSize: rf(2),
        color: theme.text,
      },
      clanText: {
        fontSize: rf(2.3),
        paddingLeft: rw(4),
        color: theme.text,
      },
      ...statusStyles,
    });
  }, [theme, online.server, data.most_played_maps]);

  const renderStatus = () => {
    if (online.status === "Designer" || online.status === "Developer") {
      return (
        <Text style={[styles.regText, styles[online.status]]}>
          {online.status}
        </Text>
      );
    }

    const statusText = {
      Offline: t("teeContainer.offline"),
      Online: t("teeContainer.online"),
      AFK: t("teeContainer.AFK"),
    }[online.status];

    return (
      <View style={styles.wrapperOnlineBack}>
        <Text style={[styles.regText, styles[online.status]]}>
          {statusText}
        </Text>
        {onlineMapName && (
          <>
            <Text style={styles.longText}>
              {t("teeContainer.playingOn")}: {onlineMapName}
            </Text>
            {online.server && (
              <Text style={styles.longText}>{online.server}</Text>
            )}
          </>
        )}
      </View>
    );
  };

  const renderFavorites = () => (
    <View style={styles.rightContainer}>
      <Text style={styles.regText}>
        {t("teeContainer.bestFriend")}:{" "}
        <Text style={styles.smallText}>
          {data.favourite_teammates[0]?.name ?? t("teeContainer.none")}
        </Text>
      </Text>

      <Text style={styles.regText}>
        {t("teeContainer.favMap")}:{" "}
        <Text style={styles.longTextLove}>
          {data.most_played_maps[0]?.map_name ?? t("teeContainer.none")}
        </Text>
      </Text>

      <Text style={styles.regText}>
        {t("teeContainer.favRegion")}:{" "}
        <Text style={styles.smallText}>
          {data.most_played_locations[0]?.key.toUpperCase() ??
            t("teeContainer.none")}
        </Text>
      </Text>
    </View>
  );

  const renderProfile = () => (
    <View style={styles.profileBlock}>
      <SlideLeftToRight>
        <Link asChild href={`https://ddstats.tw/player/${data.profile.name}`}>
          <TouchableOpacity>
            <View style={styles.name}>
              <Text style={styles.bigText}>{data.profile.name}</Text>
              {data.profile.clan && (
                <Text style={styles.clanText}>{data.profile.clan}</Text>
              )}
            </View>
          </TouchableOpacity>
        </Link>
      </SlideLeftToRight>

      <SlideRightToLeft>
        <View style={styles.pts}>
          <Text style={styles.bigText}>
            {data.profile.points} {t("teeContainer.PTS")}
          </Text>
        </View>
      </SlideRightToLeft>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <SlideLeftToRight>
        <View style={styles.rowContainer}>
          <View style={styles.statusBlock}>
            <View style={styles.wrapperOnline}>
              <ImageBackground
                source={bgUrlOnline ? { uri: bgUrlOnline } : undefined}
                resizeMode="cover"
                style={styles.bgOnline}
                imageStyle={{ opacity: 0.4 }}
              />
              <View style={styles.wrapperOnlineBack}>{renderStatus()}</View>
            </View>
          </View>
        </View>
      </SlideLeftToRight>

      <View style={styles.rowContainer}>
        <View style={styles.teeBlock}>
          <FadeIn>
            <Tee
              width={rh(4)}
              source={
                data.profile.skin_name &&
                data.profile.skin_name !== "null" &&
                data.profile.skin_name !== "undefined"
                  ? data.profile.skin_name
                  : "default"
              }
            />
          </FadeIn>

          <SlideRightToLeft>
            <View style={styles.wrapper}>
              <CachedMapImage mapName={mapName} style={styles.bg}>
                {renderFavorites()}
              </CachedMapImage>
            </View>
          </SlideRightToLeft>
        </View>
      </View>

      {renderProfile()}
    </View>
  );
});

export default TeeContainer;
