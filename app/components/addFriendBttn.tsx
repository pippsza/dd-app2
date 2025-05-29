import { useContext } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { ThemeContext } from "./themeSwitcher";
import { SlideUp } from "./animations";
import PlusDark from "../../assets/svg/plus-dark.svg";
import PlusLight from "../../assets/svg/plus-light.svg";

interface AddFriendButtonProps {
  openModal: () => void;
}

export default function AddFriendButton({ openModal }: AddFriendButtonProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const theme = {
    background: isDarkMode ? "white" : "#272727",
    border: isDarkMode ? "black" : "white",
  };

  const styles = StyleSheet.create({
    box: {
      backgroundColor: theme.background,
      justifyContent: "center",
      alignItems: "center",
      width: rw(22),
      height: rw(18),
      borderColor: theme.border,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderWidth: 4,
      borderBottomWidth: 0,
    },
    fakeBox: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      bottom: 0,
      width: rw(22),
      height: rw(18),
    },
    plus: {
      width: rw(13),
      height: rw(13),
    },
  });

  const renderPlusIcon = () => (
    <TouchableOpacity>
      {isDarkMode ? (
        <PlusDark style={styles.plus} />
      ) : (
        <PlusLight style={styles.plus} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.fakeBox}>
      <SlideUp>
        <View style={styles.box} onTouchStart={openModal}>
          {renderPlusIcon()}
        </View>
      </SlideUp>
    </View>
  );
}
