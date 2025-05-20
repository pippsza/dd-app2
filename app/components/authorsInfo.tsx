import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
export default function AuthorsInfo() {
  const navigation = useNavigation();
  const authorsInfo = (player: any, role: any) => {
    let online = { status: null };
    online.status = role;

    navigation.navigate("info", { item: player, onlineData: online });
  };
  return (
    <>
      <View style={style.box}>
        <Text style={style.head}>Authors</Text>
        <View style={style.bigContainer}>
          <View style={style.container}>
            <View>
              <Text style={style.name}>Developer</Text>
              <TouchableOpacity
                onPress={() => {
                  authorsInfo("pippsza", "Developer");
                }}
              >
                <Image
                  style={style.img}
                  source={require("../../assets/images/pippsza.png")}
                ></Image>
              </TouchableOpacity>
              <Text style={style.name}>pippsza</Text>
              <Link
                href="https://github.com/pippsza/"
                style={style.text}
                asChild
              >
                <TouchableOpacity>
                  <Text style={style.text}>GitHub</Text>
                </TouchableOpacity>
              </Link>
              <Link
                href="https://t.me/ddnet_russ_ukr"
                style={style.text}
                asChild
              >
                <TouchableOpacity>
                  <Text style={style.text}>Telegram</Text>
                </TouchableOpacity>
              </Link>
            </View>
            <View>
              <Text style={style.name}>Designer</Text>
              <TouchableOpacity
                onPress={() => {
                  authorsInfo("MonikFox", "Designer");
                }}
              >
                <Image
                  style={style.img}
                  source={require("../../assets/images/monik.png")}
                ></Image>
              </TouchableOpacity>
              <Text style={style.name}>MonikFox</Text>
              <Link
                href="https://youtube.com/@monikddnet?si=rKhHM9AF8fJ1dfdS"
                style={style.text}
                asChild
              >
                <TouchableOpacity>
                  <Text style={style.text}>YouTube</Text>
                </TouchableOpacity>
              </Link>
              <Link href="https://t.me/SilverPaww" style={style.text} asChild>
                <TouchableOpacity>
                  <Text style={style.text}>Telegram</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  name: { textAlign: "center", fontSize: rf(3) },
  text: {
    textAlign: "center",
    fontSize: rf(2),
    textDecorationLine: "underline",
  },
  container: { flexDirection: "row", gap: rw(5) },
  img: {
    width: rw(34),
    height: rw(34),
  },
  bigContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flex: 1,

    width: rw(100),
  },
  head: { fontSize: rf(4), textAlign: "center" },
});
