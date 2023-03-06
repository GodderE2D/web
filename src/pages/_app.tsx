import { ThemeProvider } from "@emotion/react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { createTheme } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "inherit",
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const layoutWrapper = (Comp: JSX.Element) => {
    return (
      <>
        <NavBar />
        <main className="flex min-h-screen flex-1 flex-col">{Comp}</main>
        <Footer />
      </>
    );
  };

  const router = useRouter();
  const { pathname } = router;

  const wrapApp = !pathname.includes("/docs");

  return (
    <SessionProvider session={session}>
      <Analytics />
      <MantineProvider
        theme={{
          colorScheme: "dark",
        }}
      >
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            {wrapApp ? (
              layoutWrapper(<Component {...pageProps} />)
            ) : (
              <Component {...pageProps} />
            )}
          </NotificationsProvider>
        </ThemeProvider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
