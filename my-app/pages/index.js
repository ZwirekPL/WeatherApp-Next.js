import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather.jsx";
import bgImg from "../pages/img/weather.jpg";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [click, setClick] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const urlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&lang=pl&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&lang=pl&units=metric`;

  const getInfo = (path) => {
    axios.get(path).then(
      (res) => {
        setWeather(res.data);
        console.log(res.data);
      },
      (err) => {
        console.log(err.data);
      }
    );
    setCity("");
  };

  const getLoc = () => {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(getCoordinates)
      : alert("Geolocation is not supported by this browser.");
    setClick(!click);
  };

  const getCoordinates = (coordinates) => {
    setLat(`${coordinates.coords.latitude.toFixed(4)}`);
    setLon(`${coordinates.coords.longitude.toFixed(4)}`);
    getInfo(urlLoc);
  };
  const handleChange = (e) => {
    setCity(e.target.value);
    // console.log(e.target.value);
  };
  const fetchWeather = (e) => {
    e.preventDefault();
    getInfo(url);
  };

  return (
    <>
      <Head>
        <title>Weather Next App</title>
        <meta name="description" content="Weather App Made by Next.Js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
      <Image src={bgImg} fill className="object-cover" alt="/" />
      {/* PORTRAIT */}
      <div className="relative flex flex-col justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10 landscape:hidden">
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pb-4 text-white z-10 landscape:hidden ">
          {click && (
            <div className="bg-black/60 border border-slate-700 rounded-md p-1 m-auto">
              <p className="text-xs">Kliknij ponownie aby wyświetlić pogodę</p>
            </div>
          )}
          <button
            className="relative flex justify-center items-center max-w-[200px] w-full m-auto text-white z-10 bg-transparent border border-gray-300 rounded-md hover:bg-green-700/80 "
            onClick={getLoc}
          >
            <p className="pr-4">Zlokalizuj mnie</p>
            <BsSearch size={20} />
          </button>
        </div>
        <form
          onSubmit={fetchWeather}
          className="flex justify-between items-center w-full m-auto p-2 bg-transparent border border-gray-300 text-white rounded-md"
        >
          <div className="flex flex-row justify-between w-full">
            <input
              placeholder="Wyszukaj miasto"
              type="text"
              className="bg-transparent border-none text-white w-full text-transform: capitalize placeholder:text-white focus:outline-none text-2xl"
              onChange={handleChange}
            />
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </div>
        </form>
        {weather.main && <Weather data={weather} />}
      </div>
      {/* LANDSCAPE */}
      <div className="relative flex flex-col justify-between items-center max-h-screen max-w-[650px] w-full m-auto pt-2 px-2 text-white z-10 portrait:hidden">
        <div className="relative flex justify-between items-center max-w-[650px] w-full m-auto pb-4 text-white z-10 portrait:hidden ">
          {click && (
            <div className="bg-black/60 border border-slate-700 rounded-md p-1 m-auto">
              <p className="text-xs">Kliknij ponownie aby wyświetlić pogodę</p>
            </div>
          )}
          <button
            className="relative flex justify-center items-center max-w-[250px] w-full m-auto text-white z-10 bg-transparent border border-gray-300 rounded-md hover:bg-green-700/80 "
            onClick={getLoc}
          >
            <p className="pr-4">Zlokalizuj mnie</p>
            <BsSearch size={20} />
          </button>
        </div>
        <form
          onSubmit={fetchWeather}
          className="flex justify-between items-center max-h-min w-full m-auto p-2 bg-transparent border border-gray-300 text-white rounded-md"
        >
          <div className="flex flex-row justify-between w-full">
            <input
              placeholder="Wyszukaj miasto"
              type="text"
              className="bg-transparent border-none text-white w-full text-transform: capitalize placeholder:text-white focus:outline-none text-1xl "
              onChange={handleChange}
            />
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </div>
        </form>
        {weather.main && <Weather data={weather} />}
      </div>
    </>
  );
}
