import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Pressable,
  Image,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { AppLoading } from "expo";

import styles from "./styles";
import { theme } from "../constants/main";
import { Ionicons } from "@expo/vector-icons";
const DATA_QUERY = gql`
  query GetCharacters($page: Int!, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`;
const CharacterItem = ({ character, onPress }) => {
  const { name, image } = character;
  // console.log(name);
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.header}>{name}</Text>
    </Pressable>
  );
};

export default ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  //Fetch first 20 item
  const { data, loading, variables, fetchMore, updateQuery } = useQuery(
    DATA_QUERY,
    {
      variables: {
        page: 1,
        name: "",
      },
    }
  );
  const doSearch = (text) => {
    setSearchQuery(text);
  };

  if (loading) {
    //Hold app navigation untill loading date finish
    return <AppLoading />;
  }
  return (
    <View style={styles.homeCont}>
      <View style={styles.textInptCont}>
        <TextInput
          placeholder="Type..."
          value={searchQuery}
          onChangeText={doSearch}
          style={styles.searchInpt}
        />
        <Ionicons
          name="ios-search"
          size={24}
          color="black"
          onPress={() => {
            // Search By Name
            fetchMore({
              variables: {
                name: searchQuery,
              },
            }).then((fetchMoreResult: { data: any }) => {
              updateQuery((prev) => {
                if (!fetchMoreResult) return prev;
                if (data.characters?.info.next <= data.characters?.info.pages) {
                  return Object.assign({}, prev, {
                    characters: {
                      info: fetchMoreResult.data.info,
                      results: [
                        ...prev.characters.results,
                        ...fetchMoreResult.data.characters.results,
                      ],
                    },
                  });
                }
              });
            });
          }}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data.characters?.results}
        renderItem={({ item }) => (
          <CharacterItem
            character={item}
            onPress={() => navigation.navigate("Details", { character: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          // Handle Pagination
          fetchMore({
            variables: {
              page: data.characters?.info.next,
              name: variables.name,
            },
          }).then((fetchMoreResult: { data: any }) => {
            updateQuery((prev) => {
              if (!fetchMoreResult) return prev;
              if (data.characters?.info.next <= data.characters?.info.pages) {
                return Object.assign({}, prev, {
                  characters: {
                    info: fetchMoreResult.data.info,
                    results: [
                      ...prev.characters.results,
                      ...fetchMoreResult.data.characters?.results,
                    ],
                  },
                });
              }
            });
          });
        }}
        ListFooterComponent={
          <ActivityIndicator size="small" color={theme.colors.primary} />
        }
      />
    </View>
  );
};
