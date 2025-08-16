import Image from "next/image";
import OngoingEvent from "./components/OngoingEvent";
import PastEvents from "./components/PastEvents";
import Header from "./components/Header";
import About from "./components/About";
import Features from "./components/Features";
import UpcomingEventsHome from "./components/UpcomingEventsHome";
import Subscribe from "./components/Subscribe";
import Testimonials from "./components/Testimonials";


export default function Home() {
  return (
    <div>

      <div className="w-full p-3 mx-auto bg-gradient-to-b from-sky-300 to-base-100">
        <Header />
      </div>

      <div className="w-full p-3 md:w-10/12 mx-auto">

        <About></About>

      </div>

      <div className="bg-sky-200 my-30">
        <div className="w-full p-3 md:w-10/12 mx-auto">
              <OngoingEvent></OngoingEvent>
        </div>
      </div>



      <div className="w-full p-3 md:w-10/12 mx-auto">

        <UpcomingEventsHome></UpcomingEventsHome>

        <PastEvents></PastEvents>

        <Features></Features>

        <Testimonials></Testimonials>

        <Subscribe></Subscribe>

      </div>

    </div>
  );
}


{/* <div
  className="w-full relative bg-[radial-gradient(125%_125%_at_50%_90%,_#fff_40%,_#63cbf1_100%)]"
>
  <Header />
</div> */}