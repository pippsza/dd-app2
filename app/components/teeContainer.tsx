import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Tee from "./tee";
import { useContext } from "react";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";

export default function TeeContainer({ data, online }: any) {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const style = StyleSheet.create({
    container: {
      alignItems: "center",
      gap: rh(2),
      // position: "absolute",
      // left: 100,
    },
    longText: {
      textAlign: "center",
      fontSize: rf(Math.max(3 - online.server?.length * 0.05, 1.5)),
      color: isDarkMode ? "black" : "white",
    },
    regText: {
      textAlign: "center",
      fontSize: rf(2),
      color: isDarkMode ? "black" : "white",
    },
    bigText: {
      textAlign: "center",
      fontSize: rf(3),
      color: isDarkMode ? "black" : "white",
    },
    smallText: {
      textAlign: "center",
      fontSize: rf(1.8),
      color: isDarkMode ? "black" : "white",
    },
    teeContainer: {
      flexDirection: "row",
      alignItems: "center",

      justifyContent: "space-between",
      paddingHorizontal: rw(5),
      width: rw(100),
      // height: rh(32),
    },
    img: {
      width: rw(20),
      height: rw(20),
    },
    rightText: {
      fontSize: rf(2),
      textAlign: "center",
      color: isDarkMode ? "black" : "white",
    },
    rightSmallText: {
      fontSize: rf(1.8),
      textAlign: "center",
      color: isDarkMode ? "black" : "white",
    },
    Online: { textAlign: "center", fontSize: rf(3), color: "green" },
    Offline: { textAlign: "center", fontSize: rf(5), color: "red" },
    AFK: { textAlign: "center", fontSize: rf(3), color: "blue" },
    Designer: { textAlign: "center", fontSize: rf(5), color: "orange" },
    Developer: { textAlign: "center", fontSize: rf(5), color: "#c9007c" },
    teeWrapper: {
      position: "absolute",
      right: rw(-19),
    },
    bigTeeWrapper: {
      height: rh(17),
    },
  });

  return (
    <>
      <View style={style.teeContainer}>
        <View>
          <Text style={style.regText}>{t("teeContainer.bestFriend")}:</Text>
          <Text style={style.smallText}>
            {data.favourite_teammates.length > 0
              ? data.favourite_teammates[0].name
              : t("teeContainer.none")}
          </Text>
        </View>
        <View style={style.container}>
          {online.status === "Designer" && "Developer" ? (
            <Text style={style[online.status]}>{online.status}</Text>
          ) : (
            <View>
              <Text style={style[online.status]}>
                {online.status === "Offline"
                  ? t("teeContainer.offline")
                  : online.status === "Online"
                  ? t("teeContainer.online")
                  : t("teeContainer.AFK")}
              </Text>

              {online.mapName ? (
                <>
                  <Text style={style.longText}>
                    {t("teeContainer.playingOn")}: {online.mapName}
                  </Text>
                  <Text style={style.longText}>{online.server}</Text>
                </>
              ) : null}
            </View>
          )}
          <View style={style.bigTeeWrapper}>
            <View style={style.teeWrapper}>
              <Tee width={rh(4)} source={data.profile.skin_name}></Tee>
            </View>
          </View>
          <View>
            <Text style={style.bigText}>{data.profile.name}</Text>
            <Text style={style.smallText}>{data.profile.clan}</Text>
            <Text style={style.regText}>
              {data.profile.points} {t("teeContainer.PTS")}
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={style.rightText}>{t("teeContainer.favMap")}:</Text>
            <Text style={style.rightSmallText}>
              {data.most_played_maps.lenght > 0
                ? data.most_played_maps[0].map_name
                : t("teeContainer.none")}
            </Text>
          </View>
          <View>
            <Text style={style.rightText}>{t("teeContainer.favRegion")}:</Text>
            <Text style={style.rightSmallText}>
              {data.most_played_locations.lenght > 0
                ? data.most_played_locations[0].key.toUpperCase()
                : t("teeContainer.none")}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
