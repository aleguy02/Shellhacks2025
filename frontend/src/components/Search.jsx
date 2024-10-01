import { useState } from "react";
import axios from "axios";
import Map from "../Map";
import { setKey, setLanguage, fromLatLng } from "react-geocode";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [location, setLocation] = useState("");
  const [fail, setFail] = useState(false);
  const [zip, setZip] = useState("");
  const [success, setSuccess] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const [bad, setBad] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setParagraph("");
    setFail(false);
    setSuccess(false);
    setResponse(null);

    try {
      const result = await axios.post("http://localhost:5000/", {
        query: inputValue,
        zipcode: zip,
      });
      if (result == "Question invalid. Are you asking for assistance with financial resources?") {
        setFail(true);
        setBad(result);
        throw new Error("failed.");
      }
      const test = result.data.resources.replace(
        /(?<!\[\()\s(?![\w\s$&"=.!_*()/,[]*[\])])/g,
        " "
      );
      const resources = result.data.resources
      console.log(resources)                  // this is where I left off last time I coded
      JSON.stringify(test);
      setResponse(JSON.parse(test));
      const lol = result.data.response.replace(
        /(?<!\[\()\s(?![\w\s$&"=.!_*()/,[]*[\])])/g,
        " "
      );
      setParagraph(lol);
      setSuccess(true);
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        setParagraph(error.response.data);
      } else {
        setParagraph("Unknown error occured. Please try again.")
      }
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFind = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(pos);
        setKey(import.meta.env.VITE_GOOGLE_KEY);
        setLanguage("en");
        fromLatLng(pos.lat, pos.lng) // Example coordinates (New York City)
          .then((response) => {
            const { address_components } = response.results[0];
            setZip(address_components[6].long_name);
          })
          .catch((error) => console.error(error));
      });
    }
  };

  return (
    <section className="relative h-full max-w-screen">
      <img
        src="./shellhacksbg.png"
        alt="gradient shellhacks background image"
        className="absolute -z-50 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full"></div>
      <div className="relative z-10 gap-5 items-center lg:flex min-h-screen p-8 mx-auto">
        <div className="relative self-center flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left px-12 lg:px-20 md:h-[34rem]">
          <div className="bg-Magenta-Pink h-20 text-popmed font-bold pt-2 pl-2 text-white flex rounded-t-[2rem]">
            <div className="w-24 h-24">
              <img src="./poi.png" alt="poilogo" className="object-cover" />
            </div>
            <p className="text-xs sm:text-sm xl:text-lg pr-5">
              Please share gaps in your knowledge regarding local economic
              institutions or financial assistance programs
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-b-[2rem]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-popmed font-bold rounded-b-[20rem] text-xs sm:text-lg px-4 py-3 pb-10 text-gray-700 bg-white border-none rounded-b-[20rem] focus:outline-none"
              placeholder="Type something and press Enter..."
              aria-label="Enter your data"
              disabled={isLoading}
            />
          </form>
          <a
            onClick={() => handleFind()}
            className="cursor-pointer mt-5 px-4 py-2 text-Magenta-Pink font-medium bg-white rounded-full inline-flex items-center"
          >
            Find me!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-1 duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          {isLoading && (
            <div className="mt-4 p-4 bg-gray-100 rounded-[20rem]">
              <p className="text-center text-Magenta-Pink text-popmed font-bold">
                Submitting...
              </p>
            </div>
          )}
          {success && (
            <div
              onClick={() => setSuccess(false)}
              className="cursor-pointer mt-4 p-4 bg-gray-100 rounded-[20rem]"
            >
              <p className="text-center text-green-400 text-popmed font-bold">
                Success! Click here to refresh
              </p>
            </div>
          )}
          {fail && (
            <div
              onClick={() => setFail(false)}
              className="cursor-pointer mt-4 p-4 bg-gray-100 rounded-[20rem]"
            >
              <p className="text-center text-rose-400 text-popmed font-bold">
                {bad}
              </p>
            </div>
          )}
          {paragraph && (
            <div
              onClick={() => setParagraph("")}
              className="cursor-pointer mt-4 p-4 bg-gray-100 sm:max-h-[20rem] overflow-y-auto rounded-xl"
            >
              <p className="text-center text-rose-400 text-popmed font-bold">
                {paragraph}
              </p>
            </div>
          )}
        </div>
        <Map marks={response} loc={location} />
      </div>
    </section>
  );
}
