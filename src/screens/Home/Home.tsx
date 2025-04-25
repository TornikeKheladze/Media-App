import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
    // getPopularVideos()
    //   .then((res) => console.log(res))
    //   .finally(() => setLoading(false));
  }, []);
  console.log(loading);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
