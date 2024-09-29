import { useMap, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useCallback, useState, useEffect } from "react";

export default function PoisNoInfo({ lo }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
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
      pam.setZoom(10);
    }
  }, [lo]);

  return <></>;
}
