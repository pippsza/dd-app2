import { Text, TouchableOpacity, View } from "react-native";
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
import { Link } from "expo-router";

export default function TeeContainer({ data, online }: any) {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const bg = isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(39,39,39,0.8)";
  const border = isDarkMode ? "black" : "white";
  const text = isDarkMode ? "black" : "white";

  const style = StyleSheet.create({
    mainContainer: {
      flexDirection: "column",
      // alignItems: "center",
      width: rw(100),
      paddingVertical: rh(2),
      // paddingHorizontal: rw(2),
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: rw(90),
      paddingVertical: rh(1),
      // backgroundColor: "green",
    },
    statusBlock: {
      flex: 1,
      alignItems: "flex-start",
      paddingLeft: rw(3),
      paddingVertical: rh(1),

      backgroundColor: bg,
      opacity: 1,
      zIndex: -1,
      borderColor: border,
      borderWidth: rw(0.4),
      borderLeftWidth: 0,
      borderRadius: rw(6),
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    rightContainer: {
      backgroundColor: bg,
      opacity: 1,
      borderColor: border,
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
      // backgroundColor: "purple",
    },
    favoritesBlock: {
      flex: 1,
      alignItems: "flex-end",
    },
    profileBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: rw(100),
      //
      // backgroundColor: bg,
      opacity: 1,
    },
    name: {
      // backgroundColor: bg,
      opacity: 1,
      borderColor: border,
      // borderWidth: rw(0.4),
      borderBottomWidth: rw(0.6),
      // borderTopWidth: rw(0.6),
      borderLeftWidth: 0,
      borderRadius: rw(3),
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingVertical: rh(0.4),
      paddingHorizontal: rw(4),
    },
    pts: {
      backgroundColor: bg,
      opacity: 1,
      borderColor: border,
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
      fontSize: rf(Math.max(3 - online.server?.length * 0.03, 1.5)),
      color: isDarkMode ? "black" : "white",
      paddingLeft: rw(2.6),
    },
    longTextLove: {
      fontSize: rf(
        Math.max(3 - data?.most_played_maps[0]?.map_name.length * 0.07, 1)
      ),
      color: isDarkMode ? "black" : "white",
      paddingLeft: rw(2.6),
    },
    regText: {
      fontSize: rf(2),
      color: isDarkMode ? "black" : "white",
    },
    bigText: {
      fontSize: rf(3.7),
      // textAlign: "center",
      color: isDarkMode ? "black" : "white",
    },
    smallText: {
      fontSize: rf(2),
      color: isDarkMode ? "black" : "white",
    },
    clanText: {
      fontSize: rf(2.3),
      paddingLeft: rw(4),
      color: isDarkMode ? "black" : "white",
    },
    Online: { color: "green", fontSize: rf(4) },
    Offline: { color: "red", fontSize: rf(6) },
    AFK: { color: "blue" },
    Designer: { color: "orange" },
    Developer: { color: "#c9007c" },
    teeSize: {
      width: rh(10),
      height: rh(10),
    },
  });

  return (
    <View style={style.mainContainer}>
      {/* Первый ряд - Статус */}
      <View style={style.rowContainer}>
        <View style={style.statusBlock}>
          {online.status === "Designer" || online.status === "Developer" ? (
            <Text style={[style.regText, style[online.status]]}>
              {online.status}
            </Text>
          ) : (
            <>
              <Text style={[style.regText, style[online.status]]}>
                {online.status === "Offline"
                  ? t("teeContainer.offline")
                  : online.status === "Online"
                  ? t("teeContainer.online")
                  : t("teeContainer.AFK")}
              </Text>
              {online.mapName && (
                <>
                  <Text style={style.longText}>
                    {t("teeContainer.playingOn")}: {online.mapName}
                  </Text>
                  <Text style={style.longText}>{online.server}</Text>
                </>
              )}
            </>
          )}
        </View>
      </View>

      {/* Второй ряд - Тишка и любимые */}
      <View style={style.rowContainer}>
        <View style={style.teeBlock}>
          <Tee width={rh(4)} source={data.profile.skin_name} />
          <View style={style.rightContainer}>
            <Text style={style.regText}>
              {t("teeContainer.bestFriend")}:{" "}
              <Text style={style.smallText}>
                {data.favourite_teammates.length > 0
                  ? data.favourite_teammates[0].name
                  : t("teeContainer.none")}
              </Text>
            </Text>
            <Text style={style.regText}>
              {t("teeContainer.favMap")}:{" "}
              <Text style={style.longTextLove}>
                {data.most_played_maps.length > 0
                  ? data.most_played_maps[0].map_name
                  : t("teeContainer.none")}
              </Text>
            </Text>
            <Text style={style.regText}>
              {t("teeContainer.favRegion")}:{" "}
              <Text style={style.smallText}>
                {data.most_played_locations.length > 0
                  ? data.most_played_locations[0].key.toUpperCase()
                  : t("teeContainer.none")}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Третий ряд - Профиль */}
      <View style={style.profileBlock}>
        <Link asChild href={`https://ddstats.tw/player/${data}`}>
          <TouchableOpacity>
            <View style={style.name}>
              <Text style={style.bigText}>{data.profile.name}</Text>
              {data.profile.clan ? (
                <Text style={style.clanText}>{data.profile.clan}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={style.pts}>
          <Text style={style.bigText}>
            {data.profile.points} {t("teeContainer.PTS")}
          </Text>
        </View>
      </View>
    </View>
  );
}
