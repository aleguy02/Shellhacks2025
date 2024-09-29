import PoisInfo from "./PoisInfo.jsx";
import PoisNoInfo from "./PoisNoInfo.jsx";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export default function MapComponent({ loc, marks }) {
  useEffect(() => {}, [marks]);
  return (
    <div className="w-[90%] h-[23rem] md:w-[90%] lg:w-[50%] sm:h-[30rem] mx-auto relative">
      <div className="w-[103%] h-[103%] p-8 bg-Magenta-Pink absolute -z-50 rounded-xl"></div>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY}>
        <Map
          defaultZoom={4}
          defaultCenter={{ lat: 39.0119, lng: -98.0 }}
          mapId={import.meta.env.VITE_MAP_ID}
        >
          {marks && <PoiMarkers pois={marks} loc={loc} />}
          {marks == "" ? <PoisNoInfo lo={loc} /> : <></>}
        </Map>
      </APIProvider>
    </div>
  );
}

const PoiMarkers = ({ pois, loc }) => {
  return (
    <>
      {pois.resources.map((poi) => (
        <PoisInfo key={poi.name} poi={poi} lo={loc} />
      ))}
    </>
  );
};
