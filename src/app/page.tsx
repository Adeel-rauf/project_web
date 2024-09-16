import AboutComponent from "./components/aboutComponent";
import Expertise from "./components/expertise";
import Hero from "./components/hero";
import Publications from "./components/publication";
import Team from "./components/team";

export default function mainPage() {
  return (
    <>
    <Hero/>
    <AboutComponent/>
    <Team/>
    <Expertise/>
      <Publications/>
    </>
  );
}
