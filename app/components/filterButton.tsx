import { useContext, useState, Fragment } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { ThemeContext } from "./themeSwitcher";
import { useTranslation } from "react-i18next";

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
}

export default function FilterButton({
  allNames,
  filteredNames,
  setFilteredNames,
}: FilterButtonProps) {
  const filters = ["Online", "Offline", "AFK", "ALL"];
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  const handleFilter = (filter: string) => {
    setCurrentFilter(filter);
    setShowFilterMenu(false);

    // Всегда фильтруем из полного списка allNames
    const filtered =
      filter === "ALL"
        ? allNames
        : allNames.filter((player) => player.data.status === filter);

    setFilteredNames(filtered);
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
      position: "absolute",
      backgroundColor: isDarkMode ? "white" : "#272727",
      justifyContent: "center",
      alignItems: "center",
      width: rw(25),
      height: rh(5),
      bottom: 0,
      borderColor: isDarkMode ? "black" : "white",
      right: rw(9),
      borderRadius: 14,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderWidth: 4,
      borderBottomWidth: 0,
    },
    text: {
      fontSize: rf(1.1),
      color: isDarkMode ? "black" : "white",
      textAlign: "center",
    },
    filterContainer: {
      position: "absolute",
      bottom: rh(5),

      backgroundColor: isDarkMode ? "white" : "#272727",
      borderWidth: 4,
      borderColor: isDarkMode ? "black" : "white",
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
      color: isDarkMode ? "black" : "white",
    },
    activeFilter: {
      backgroundColor: isDarkMode ? "#e0e0e0" : "#404040",
      borderRadius: 8,
    },
  });

  return (
    <Fragment>
      <TouchableOpacity
        style={style.container}
        onPress={() => setShowFilterMenu(!showFilterMenu)}
      >
        <View>
          <TouchableOpacity>
            <Text style={style.text}>
              {t("filtered")}: {currentFilter}
            </Text>
          </TouchableOpacity>
        </View>

        {showFilterMenu && (
          <View style={style.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  style.filterButton,
                  currentFilter === filter && style.activeFilter,
                ]}
                onPress={() => handleFilter(filter)}
              >
                <Text style={style.filterButtonText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    </Fragment>
  );
}
