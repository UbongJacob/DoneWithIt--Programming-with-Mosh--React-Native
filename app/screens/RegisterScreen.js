import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { useHeaderHeight } from "@react-navigation/elements";

import AppText from "../components/AppText";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import AppButton from "../components/AppButton";
import AppGradient from "../components/AppGradient";
import authApi from "../api/auth";
import colors from "../config/colors";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import AppActivityIndicator from "../components/AppActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).max(255).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
  const headerHeight = useHeaderHeight();
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };
  return (
    <AppGradient>
      <AppActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <View style={{ marginTop: headerHeight }}>
        <ScrollView>
          <Screen>
            <View style={styles.brandContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              />
              <AppText style={styles.brandText}> Done With It. </AppText>
            </View>
            <View style={styles.backgroundContainer}>
              <View style={styles.textContainer}>
                <AppText style={styles.text}>Sell What You Don't Need</AppText>
              </View>
              <AppForm
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessage error={error} visible={error} />
                <AppFormField
                  autoCapitalize="words"
                  autoCorrect
                  icon="account"
                  name="name"
                  placeholder="Enter Your Name"
                  textContentType="name"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  name="password"
                  placeholder="Password ********"
                  secureTextEntry
                  textContentType="password"
                />
                <SubmitButton title="Register" />
              </AppForm>
              <View style={styles.loginContainer}>
                <AppText style={styles.loginText}>
                  Already Have An Account?{" "}
                </AppText>
                <View style={styles.loginButton}>
                  <AppButton
                    color="secondary"
                    title="Login"
                    onPress={() => navigation.goBack()}
                  />
                </View>
              </View>
            </View>
          </Screen>
        </ScrollView>
      </View>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: colors.white,
    margin: 20,
    borderRadius: 20,
    borderColor: "#feb47b",
    borderWidth: 5,
    padding: 20,
  },
  brandContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -25,
    marginBottom: -15,
  },
  brandText: {
    color: colors.light,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 30,
  },
  loginButton: {
    height: "5%",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  loginContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  loginText: {
    color: colors.dark,
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
  },
  text: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    paddingBottom: 30,
  },
});

export default RegisterScreen;
