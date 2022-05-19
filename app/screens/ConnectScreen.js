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
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import colors from "../config/colors";
import fonts from "../config/fonts";

class ConnectScreen extends React.Component {
  state = { email: "", password: "", errorMessage: "", loading: false };
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
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

  async signInWithGoogle() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "1028653680729-urkp0lenmdkfc8e7c1vs4amh6ajpv68a.apps.googleusercontent.com",
        behavior: "web",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        this.onLoginSuccess.bind(this);
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  }
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
              Plateforme internationale de recherche et de formation en énergies solaires
            </Text>
          </View>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                autoCapitalize="none"
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
                  SE CONNECTER
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "200",
                  fontSize: 17,
                  textAlign: "center",
                  marginTop: 20,
                  fontFamily: fonts.RalewayEL,
                  color:'#fff8',
                  textDecorationLine: 'underline',
                  
                }}
                onPress={() => {
                  this.props.navigation.navigate("InscriptionScreen");
                }}
              >
                Vous n'avez pas encore de compte ?
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
    paddingTop:'20%',
  },
  logoDescription: {
    color: '#9ACD32',
    textAlign: "center",
    fontFamily: "RalewayEL",
    paddingTop: 10,
    fontSize: 15,
    width: 250,
  },
  form: {
    width: "86%",
    marginTop: 100,
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
    backgroundColor: '#9ACD32',
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070",
  },
});
export default ConnectScreen;
