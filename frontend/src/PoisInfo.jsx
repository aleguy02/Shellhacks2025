import {
  AdvancedMarker,
  useMap,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useCallback, useState, useEffect, useRef } from "react";
import { fromAddress } from "react-geocode";

// poi is each resource in resources object
// lo is the coordinates passed into map in Search.jsx
export default function PoisInfo({ poi, lo }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const coords = useRef();
  const pam = useMap();
  const handleClick = useCallback((ev) => {
    setInfowindowOpen(true);
    if (!pam) return;
    if (!ev.latLng) return;
    pam.panTo(ev.latLng);
  }, []);

  useEffect(() => {
    if (lo != "") {
      pam.panTo({ lat: lo.lat, lng: lo.lng });
      pam.setZoom(8);
    }
  }, []);

  useEffect(() => {
    fromAddress(poi.contact.address)
      .then(({ results }) => {
        coords.current = results[0].geometry.location;
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <AdvancedMarker
        clickable={true}
        onClick={handleClick}
        key={poi.name}
        position={coords.current}
        title={"Hi :)"}
        ref={markerRef}
      >
        <img src="/poi.png" alt="POILogo" width={40} height={40} />
      </AdvancedMarker>
      <div>
        {infowindowOpen && (
          <InfoWindow
            anchor={marker}
            maxWidth={300}
            onCloseClick={() => setInfowindowOpen(false)}
          >
            <div className="font-bold text-black text-xl mb">Name</div>
            <div className="font-medium text-black text-lg mb-2">
              {poi.name}
            </div>
            <div className="font-bold text-black text-xl mb">Description</div>
            <div className="font-medium text-black text-lg mb-2">
              {poi.description}
            </div>
            <div className="font-bold text-black text-xl">Services</div>
            <ul className="mb-2 list-disc">
              {poi.services.map((e) => {
                return (
                  <li key={e} className="font-medium text-black text-lg">
                    -{e}
                  </li>
                );
              })}
            </ul>
            <div className="font-bold text-black text-xl">Contact</div>
            <ul>
              <div className="font-medium text-black text-lg">
                {poi.contact.phone}
              </div>
              <div className="font-medium text-sky-400 text-lg cursor-pointer">
                <a target="_blank" href={poi.contact.website}>
                  {poi.contact.website}
                </a>
              </div>
              <div className="font-medium text-black text-lg">
                {poi.contact.address}
              </div>
            </ul>
          </InfoWindow>
        )}
      </div>
    </>
  );
}
