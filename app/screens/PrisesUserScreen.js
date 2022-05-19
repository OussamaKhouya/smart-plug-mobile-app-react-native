import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import fonts from "../config/fonts";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import AppOnOff from "../components/AppOnOff";
import AppStatistics from "../components/AppStatistics";
import colors from "../config/colors";
import AppCompte from "../components/AppCompte";
import AppRoutine from "../components/AppRoutine";

import { images } from "../config/images";

import firebase from "firebase";

class PrisesUserScreen extends React.Component {
  state = {
    title: "Accueil",
    SelectedSection: [true, false, false, false],
    prises: [],
    user: {},
    userName:"",
    NbOfPlugs:0,
  };
  select = (index, title) => {
    let tab = this.state.SelectedSection;
    tab = [false, false, false, false];
    tab[index] = true;
    this.setState({ SelectedSection: tab, title: title });
    if (title === "Accueil") this.getAllplugs();
  };

  componentDidMount() {
    this.getUser();
    
    //this.getUser2();
  }

  getUser =  () => {
     firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user: user });
        console.log(user.email)
        this.getAllplugs(user.email);
      }
    });
  };
  getUser2 = () => {
    firebase
      .database()
      .ref(`users`)
      .on("value", (snapshat) => {
        const duplist = snapshat.val();
        let temp = [];
        for (var id in duplist) {
          temp.push({ id, ...duplist[id] });
        }
        let user = temp.filter((user) => user.email === this.state.user.email)
        this.setState({ userName: user.identifiant});
      });
  };
  signOut = () => {
    firebase.auth().signOut();
  }

  getAllplugs = (email) => {
     firebase
      .database()
      .ref()
      .child(`prises`)
      .orderByChild('email')
      .equalTo(typeof email === 'undefined' ? this.state.user.email : email ) // email becomes undefined if you return to Accueil next time
      .on("value", (snapshat) => {
        const duplist = snapshat.val();
        let temp = [];
        for (var id in duplist) {
          temp.push({ id, ...duplist[id] });
        }
        this.setState({NbOfPlugs: temp.length})
        this.setState({ prises: temp });
      });
  };

  render() {
    const sections = this.state.SelectedSection;
    const title = this.state.title;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.wrapper}>
              <View style={styles.titreContainer}>
                <Text style={styles.titre}>{title}</Text>
              </View>
              <TouchableOpacity
                style={styles.plusContainer}
                onPress={() => this.props.navigation.navigate("PlugingScreen")}
              >
                {/* Add + for only Accueil and Routine Sections */}
                {title === "Accueil" ? (
                  <Ionicons name="add" size={30} color="black" />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>
            {/* Accueil */}
            {sections[0] ? (
              <>
                {/* is there plugs associated to the user */}
                {(this.state.prises.length != 0) ? (
                  <>
                    {this.state.prises.map((prise, index) => (
                      <AppOnOff
                        key={index}
                        icon={images[prise.icon - 1]}
                        name={prise.nomMachine}
                      />
                    ))}
                  </>
                ) : (
                  <Text style={styles.noPrises}>
                    Vous n'avez pas encore de prises. Cliquez sur le bouton "+"
                    pour ajouter une nouvelle prise.
                  </Text>
                )}
              </>
            ) : (
              <></>
            )}
            {/* Statistique */}
            {sections[1] ? (
              <>
                {/* <View style={{flex:1, alignItems:'center',backgroundColor:'tomato'}}>
                  <Text style={{fontFamily:fonts.RalewayR, fontSize:30, color:'black',}}>{title}</Text>
                </View>
                <View style={{flex:9, alignItems:'center',backgroundColor:'red'}}>

                  <StatScreen
                    navigation={this.props.navigation}
                    title="Puissance"
                    DataNow="600Watt"
                  />
                </View> */}
                <AppStatistics />
              </>
            ) : (
              <></>
            )}
            {/* Routine */}
            {sections[2] ? (
              <>
                

                 {/* is there plugs associated to the user */}
                 {(this.state.prises.length != 0) ? (
                  <>
                    {this.state.prises.map((prise, index) => (
                      <AppRoutine
                        key={index}
                        icon={images[prise.icon - 1]}
                        name={prise.nomMachine}
                      />
                    ))}
                  </>
                ) : (
                  <Text style={styles.noPrises}>
                    Vous n'avez pas encore de prises. Cliquez sur le bouton "+"
                    pour ajouter une nouvelle prise.
                  </Text>
                )}
              </>
            ) : (
              <></>
            )}
            {/* Compte */}
            {sections[3] ? (
              <>
                <AppCompte user={this.state.user} signOut={this.signOut} NbOfPlugs={this.state.NbOfPlugs} />
              </>
            ) : (
              <></>
            )}
          </View>

          <View style={styles.footer}>
            <TouchableHighlight
              style={[
                styles.icon1,
                { backgroundColor: sections[0] ? colors.bgColor : "#fff0" },
              ]}
              underlayColor={colors.bgColor}
              onPress={this.select.bind(this, 0, "Accueil")}
            >
              <View style={styles.icon1}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={sections[0] ? "black" : colors.bgColor11}
                />
                <Text
                  style={[
                    styles.headText,
                    { color: sections[0] ? "black" : colors.bgColor11 },
                  ]}
                >
                  {" "}
                  Accueil
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={[
                styles.icon1,
                { backgroundColor: sections[1] ? colors.bgColor : "#fff0" },
              ]}
              underlayColor={colors.bgColor}
              onPress={this.select.bind(this, 1, "Statistique")}
            >
              <View style={styles.icon1}>
                <Fontisto
                  name="line-chart"
                  size={20}
                  color={sections[1] ? "black" : colors.bgColor11}
                />
                <Text
                  style={[
                    styles.headText,
                    { color: sections[1] ? "black" : colors.bgColor11 },
                  ]}
                >
                  Statistique
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.icon1,
                { backgroundColor: sections[2] ? colors.bgColor : "#fff0" },
              ]}
              underlayColor={colors.bgColor}
              onPress={this.select.bind(this, 2, "Routine")}
            >
              <View style={styles.icon1}>
                <AntDesign
                  name="clockcircle"
                  size={20}
                  color={sections[2] ? "black" : colors.bgColor11}
                />
                <Text
                  style={[
                    styles.headText,
                    { color: sections[2] ? "black" : colors.bgColor11 },
                  ]}
                >
                  Routine
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.icon1,
                { backgroundColor: sections[3] ? colors.bgColor : "#fff0" },
              ]}
              underlayColor={colors.bgColor}
              onPress={this.select.bind(this, 3, "Compte")}
            >
              <View style={styles.icon1}>
                <Entypo
                  name="user"
                  size={20}
                  color={sections[3] ? "black" : colors.bgColor11}
                />
                <Text
                  style={[
                    styles.headText,
                    { color: sections[3] ? "black" : colors.bgColor11 },
                  ]}
                >
                  Compte
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.4,
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: "10%",
    backgroundColor: colors.bgColor,
  },
  wrapper: {
    width: "58%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titreContainer: {},
  titre: {
    fontFamily: fonts.RalewayL,
    fontSize: 20,
  },
  plusContainer: {
    marginRight: "8%",
  },
  body: {
    flex: 9,
    backgroundColor: colors.bgColor,
    alignItems: "center",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#4090A1",
  },
  headText: {
    fontFamily: fonts.RalewayL,
    fontSize: 12,
    color: colors.bgColor11,
  },
  icon1: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "3%",
  },
  noPrises: {
    fontFamily: fonts.RalewayL,
    fontSize: 18,
    textAlign: "center",
    width: "80%",
    color: "#aaad",
  },
});
export default PrisesUserScreen;
