import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HotelsPage from "./pages/hotels";
import MainPage from "./pages/main";
import { Header } from "./components/header";
import { Section } from "./components/section";

export const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/hotels/:hotelId", "/hotels/"]}>
          <Section>
            <HotelsPage />
          </Section>
        </Route>
        <Route path={"/"}>
          <Section>
            <MainPage />
          </Section>
        </Route>
      </Switch>
    </Router>
  );
};
