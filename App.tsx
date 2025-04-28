import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import PexelsVideos from "./src/screens/PexelsVideos/PexelsVideos";

const queryClient = new QueryClient();

export type RootStackParamList = {
  Home: undefined;
  PexelsVideos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PexelsVideos" component={PexelsVideos} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
