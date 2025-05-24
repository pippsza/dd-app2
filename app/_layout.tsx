// app/_layout.tsx

import App from "./_app";
import { ThemeProvider } from "./components/themeSwitcher";

export default function Layout() {
  return (
    <ThemeProvider>
      <App></App>
    </ThemeProvider>
  );
}
