import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <AppActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {!getListingsApi.loading && getListingsApi.error && (
          <View style={styles.errorScreen}>
            <AppText style={styles.text}>
              Sorry, Could not retrieve the listings.
            </AppText>
            <View style={styles.AppButton}>
              <AppButton title="Retry" onPress={getListingsApi.request} />
            </View>
          </View>
        )}

        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              subTitle={"$" + item.price}
              title={item.title}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  AppButton: {
    marginTop: 20,
    width: "100%",
  },
  errorScreen: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  screen: {
    backgroundColor: colors.light,
    padding: 20,
  },
  text: {
    fontWeight: "bold",
  },
});

export default ListingsScreen;
