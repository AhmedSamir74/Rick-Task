import React, { useState, useEffect } from "react";
import "core-js/features/promise";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCache } from "apollo3-cache-persist";
import { AppLoading } from "expo";

import AppNavigation from "./src/navigations/MainNavigation";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          merge(existing, incoming: any) {
            return { ...existing, ...incoming };
            // this part of code is depends what you actually need to do, in my
            // case i had to save my incoming data as single object in cache
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  );
}
