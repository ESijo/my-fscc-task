import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <Stack screenOptions={{ headerShown: false }} />
  </QueryClientProvider>
);

export default RootLayout;
