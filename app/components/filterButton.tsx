import { useContext, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  names: Player[];
  setNames: (names: Player[]) => void;
}

const STORAGE_KEY = "allFriends";

export default function FilterButton({ names, setNames }: FilterButtonProps) {
  const filters = ["Online", "Offline", "AFK", "ALL"];
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  // Загружаем все имена из хранилища при монтировании компонента
  useEffect(() => {
    const loadAllNames = async () => {
      try {
        const storedNames = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedNames) {
          const allNames: Player[] = JSON.parse(storedNames);
          // Обновляем статусы из текущего списка
          const updatedNames = allNames.map((storedPlayer) => {
            const currentPlayer = names.find(
              (n) => n.name === storedPlayer.name
            );
            return currentPlayer || storedPlayer;
          });
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNames));
        } else {
          // Если хранилище пустое, сохраняем текущий список
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(names));
        }
      } catch (error) {
        console.error("Error loading names from storage:", error);
      }
    };

    loadAllNames();
  }, []); // Пустой массив зависимостей, так как это только инициализация

  // Сохраняем новые имена в хранилище при их изменении
  useEffect(() => {
    const saveNames = async () => {
      try {
        const storedNames = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedNames) {
          const allNames: Player[] = JSON.parse(storedNames);
          // Объединяем существующие имена с новыми, обновляя статусы
          const updatedNames = allNames.map((storedPlayer) => {
            const currentPlayer = names.find(
              (n) => n.name === storedPlayer.name
            );
            return currentPlayer || storedPlayer;
          });
          // Добавляем новые имена, которых нет в хранилище
          names.forEach((newPlayer) => {
            if (!updatedNames.some((p) => p.name === newPlayer.name)) {
              updatedNames.push(newPlayer);
            }
          });
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNames));
        } else {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(names));
        }
      } catch (error) {
        console.error("Error saving names to storage:", error);
      }
    };

    saveNames();
  }, [names]); // Зависимость только от names

  const handleFilter = async (filter: string) => {
    setCurrentFilter(filter);
    setShowFilterMenu(false);

    try {
      const storedNames = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedNames) {
        const allNames: Player[] = JSON.parse(storedNames);
        const filteredNames =
          filter === "ALL"
            ? allNames
            : allNames.filter((player) => player.data.status === filter);
        setNames(filteredNames);
      }
    } catch (error) {
      console.error("Error applying filter:", error);
    }
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
      right: rw(-0.8),
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
    <View style={style.container}>
      <TouchableOpacity onPress={() => setShowFilterMenu(!showFilterMenu)}>
        <Text style={style.text}>
          {t("filtered")}: {currentFilter}
        </Text>
      </TouchableOpacity>

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
    </View>
  );
}
