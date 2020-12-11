import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { gql, useQuery } from "@apollo/client";

import styles from "./styles";
import Loading from "../Loading";

const SECTIONS_QUERY = gql`
  query {
    character(id: 3) {
      id
      name
      species
      gender
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const SectionItem = ({ section }) => (
  <View style={styles.item}>
    <Text style={styles.header}>{section.name}</Text>
    <Text style={styles.header}>{section.air_date}</Text>
  </View>
);

export default ({ route }) => {
  console.log(route.params.character.id);
  const { data, loading } = useQuery(SECTIONS_QUERY, {
    variables: { id: route.params.character.id },
  });

  if (loading) {
    return <Loading />;
  } else {
    // console.log(data);
    // console.log("=======");
  }

  return (
    <View style={styles.centered}>
      <Image source={{ uri: data.character.image }} style={styles.img} />
      <View style={styles.titleCont}>
        <Text style={styles.subTitle}>species</Text>
        <Text style={styles.subTitleDesc}>{data.character.species}</Text>
      </View>
      <View style={styles.titleCont}>
        <Text style={styles.subTitle}>gender</Text>
        <Text style={styles.subTitleDesc}>{data.character.gender}</Text>
      </View>
      <Text style={styles.sectionTitle}>Episodes</Text>

      <FlatList
        data={data.character.episode}
        renderItem={({ item }) => <SectionItem section={item} />}
        keyExtractor={(section) => section.id.toString()}
      />
    </View>
  );
};
