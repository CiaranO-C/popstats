import { Outlet } from "react-router";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  MantineColorsTuple,
  createTheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "react-query";

const popRed: MantineColorsTuple = [
  "#ffe8eb",
  "#ffcfd4",
  "#ff9ca6",
  "#fe6575",
  "#fd394c",
  "#fd1e32",
  "#fe0f24",
  "#e30018",
  "#cb0014",
  "#b1000e",
];

const grey: MantineColorsTuple = [
  "#f5f5f5",
  "#e7e7e7",
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#717171",
  "#656565",
  "#575757",
];

const theme = createTheme({
  colors: {
    popRed,
    grey,
  },
  primaryColor: "popRed",
  defaultRadius: "xl",
  cursorType: "pointer",
  headings: {
    fontFamily: "Trap",
    fontWeight: "800",
  },
  components: {
    Button: {},
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <ModalsProvider>
            <Outlet />
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
