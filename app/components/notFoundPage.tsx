import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { responsiveFontSize as rf, responsiveWidth as rw } from "react-native-responsive-dimensions";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import Tee from "./tee";
import { SlideUp, SlideLeftToRight, SlideRightToLeft, FadeIn } from "./animations";

const { width } = Dimensions.get("window");

export default function NotFoundPage() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Колобки для анимаций (можно добавить свои PNG в assets/images и расширить массив)
  const teeNames = ["default", "monik", "pippsza"];
  const teeWidth = rw(18);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>  
      <FadeIn duration={1200}>
        <Text style={[styles.big, { color: theme.primary }]}>404</Text>
      </FadeIn>
      <FadeIn duration={1800}>
        <Text style={[styles.small, { color: theme.text.primary }]}>{t("notFound.title")}</Text>
        <Text style={[styles.desc, { color: theme.text.secondary }]}>{t("notFound.desc")}</Text>
      </FadeIn>
      <View style={styles.teesRow}>
        <SlideLeftToRight duration={1200}>
          <Tee source={teeNames[0]} width={teeWidth} />
        </SlideLeftToRight>
        <SlideUp duration={1400}>
          <Tee source={teeNames[1]} width={teeWidth} />
        </SlideUp>
        <SlideRightToLeft duration={1200}>
          <Tee source={teeNames[2]} width={teeWidth} />
        </SlideRightToLeft>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  big: { fontSize: rf(20), fontWeight: "bold", marginBottom: 10 },
  small: { fontSize: rf(4.5), fontWeight: "600", marginBottom: 6 },
  desc: { fontSize: rf(2.5), textAlign: "center", maxWidth: width * 0.8, marginBottom: 20 },
  teesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: rw(2),
    marginTop: 10,
  },
});
