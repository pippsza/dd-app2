import React, { useState, Fragment } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useTranslation } from "react-i18next";
import { SlideUp, AnimatedButton } from "./animations";
import { useSoundWithSettings } from "../hooks/useSoundWithSettings";
import { useTheme } from "../hooks/useTheme";

interface Player {
  name: string;
  data: {
    status: "Offline" | "Online" | "AFK";
    game: string | null;
    server: string | null;
    mapName: string | null;
  };
}

interface FilterButtonProps {
  allNames: Player[];
  filteredNames: Player[];
  setFilteredNames: (names: Player[]) => void;
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
}

export default function FilterButton({
  allNames,
  filteredNames,
  setFilteredNames,
  currentFilter,
  setCurrentFilter,
}: FilterButtonProps) {
  const filters = ["online", "offline", "afk", "all"];
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { playButtonSound } = useSoundWithSettings();

  const handleFilter = (filter: string) => {
    playButtonSound();
    setCurrentFilter(filter);
    setShowFilterMenu(false);

    // Всегда фильтруем из полного списка allNames
    const filtered =
      filter === "all"
        ? allNames
        : allNames.filter(
            (player) => player.data.status.toLowerCase() === filter
          );

    setFilteredNames(filtered);
  };

  const handleMenuToggle = () => {
    playButtonSound();
    setShowFilterMenu(!showFilterMenu);
  };

  const getDisplayFilter = (filter: string) => {
    return filter.charAt(0).toUpperCase() + filter.slice(1);
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
      width: rw(25),
      height: "100%",
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.border.primary,
      borderRadius: 14,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderWidth: 4,
      borderBottomWidth: 0,
    },
    invContainer: {
      position: "absolute",
      width: rw(25),
      height: rh(5),
      bottom: 0,
      right: rw(9),
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: rf(1.1),
      color: theme.text.primary,
      textAlign: "center",
    },
    filterContainer: {
      position: "absolute",
      bottom: rh(5),
      right: rw(-12.5),
      backgroundColor: theme.primary,
      borderWidth: 4,
      borderColor: theme.border.primary,
      borderRadius: 14,
      padding: rw(2),
      width: rw(25),
      display: showFilterMenu ? "flex" : "none",
    },
    filterButton: {
      paddingVertical: rh(1),
      alignItems: "center",
    },
    filterButtonText: {
      fontSize: rf(1.1),
      color: theme.text.primary,
    },
    activeFilter: {
      backgroundColor: theme.surface,
      borderRadius: 8,
    },
  });

  return (
    <Fragment>
      <View style={style.invContainer}>
        <SlideUp duration={1200}>
          <AnimatedButton
            animationType="pulse"
            onPress={handleMenuToggle}
            style={style.container}
          >
            <View>
              <Text style={style.text}>
                {t("filtered")}: {getDisplayFilter(currentFilter)}
              </Text>
            </View>
            {showFilterMenu && (
              <SlideUp duration={260}>
                <View style={style.filterContainer}>
                  {filters.map((filter) => (
                    <AnimatedButton
                      key={filter}
                      animationType="scale"
                      onPress={() => handleFilter(filter)}
                      style={[
                        style.filterButton,
                        currentFilter === filter && style.activeFilter,
                      ]}
                    >
                      <Text style={style.filterButtonText}>
                        {getDisplayFilter(filter)}
                      </Text>
                    </AnimatedButton>
                  ))}
                </View>
              </SlideUp>
            )}
          </AnimatedButton>
        </SlideUp>
      </View>
    </Fragment>
  );
}
