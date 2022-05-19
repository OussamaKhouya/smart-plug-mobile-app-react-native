import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
// import * as Facebook from 'expo-facebook'
import * as Google from "expo-google-app-auth";
import { AddUser } from "../DB/users/AddUser";
import colors from "../config/colors";
import fonts from "../config/fonts";

export const isAndroid = () => Platform.OS === "android";

class InscriptionScreen extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
  };
  onLoginSuccess() {
    this.props.navigation.navigate("WelcomeScreen");
  }

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }
  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }

  async signInWithEmail() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        let uid = firebase.auth().currentUser.uid;
        AddUser(uid, this.state.displayName, this.state.email);
        this.onLoginSuccess.bind(this);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          this.onLoginFailure.bind(this)("Weak Password!");
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user sign in");
              firebase
                .database()
                .ref("/users" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture:
                    result.additionalUserInfo.profile.profile_picture,
                  locale: result.additionalUserInfo.profile_picture.locale,
                  first_name: result.additionalUserInfo.given_name,
                  last_name: result.additionalUserInfo.first_name,
                })
                .then(function (snapshot) {});
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "1028653680729-urkp0lenmdkfc8e7c1vs4amh6ajpv68a.apps.googleusercontent.com",
        behavior: "web",
        iosClientId: "", //enter ios client id
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.logoContainer}>
              <Image source={require("../assets/icons/logo.png")} />
              <Text style={styles.logoDescription}>
                Plateforme internationale de recherche et de formation en
                énergies solaires
              </Text>
            </View>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Identifiant"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                autoCapitalize="none"
                textContentType="name"
                value={this.state.displayName}
                onChangeText={(displayName) => this.setState({ displayName })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "red",
                width: "80%",
              }}
            >
              <Text style={{fontFamily:fonts.RalewayL}}>{this.state.error}</Text>
            </Text>
            <TouchableOpacity
              style={{ width: "86%", marginTop: 10 }}
             onPress={() => this.signInWithEmail()}
            >
              <View style={styles.googleButton}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "white",
                    fontFamily: fonts.RalewayL,
                  }}
                >
                  S'INSCRIRE
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ flex:1,flexDirection:'row' ,marginTop: 10, }}>
              <Text
                style={{
                  fontWeight: "200",
                  fontSize: 17,
                  textAlign: "center",
                  marginTop: 20,
                  fontFamily: fonts.RalewayEL,
                  color:'white',
                }}
              >
                
                Vous avez déjà un compte ? 
              </Text>

              <Text
                style={{
                  fontWeight: "200",
                  fontSize: 17,
                  paddingLeft:10,
                  textAlign: "center",
                  fontFamily: fonts.RalewayEL,
                  marginTop: 20,
                  color:'#fff8',
                  textDecorationLine: 'underline',
                }}
                onPress={() => this.props.navigation.navigate("ConnectScreen")}
              >
                
                 Connectez-vous
              </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bgColor,
  },
  logoContainer: {
    alignItems: "center",
    backgroundColor: colors.bgColor,
    paddingTop: "20%",
  },
  logoDescription: {
    color: "#9ACD32",
    textAlign: "center",
    fontFamily: "RalewayEL",
    paddingTop: 10,
    fontSize: 15,
    width: 250,
  },
  form: {
    width: "86%",
    paddingTop: "12%",
  },
  logo: {
    marginTop: 20,
  },
  input: {
    fontSize: 20,
    borderColor: "#9ACD32",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
    fontFamily: fonts.RalewayL,
  },
  button: {
    backgroundColor: "#3A559F",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  googleButton: {
    backgroundColor: "#9ACD32",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070",
  },
});
export default InscriptionScreen;
