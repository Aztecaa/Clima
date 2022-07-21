import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(0);
  const [isC, setIsC] = useState(true);
  
  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d78f3cecb1f449e4957dc32105667aee&units=metric`
        )
        .then((res) => {
          setData(res.data);
          setTemp(res.data?.main.temp);
        });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(temp);

  const changeTemp = () => {
    if (isC) {
      setTemp((temp * 9) / 5) + 32;
      setIsC(false);
    } else {
      setTemp((temp - 32) * 5/9);
      setIsC(true)
    }
  };
  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>Wheater App</h1>
          <h2>
            {data.name}, {data.sys?.country}
          </h2>
        </div>
        <div className="inf">
          <div className="weather">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}.png`}
            />
            <h3>"{data.weather?.[0].main}"</h3>
            <h3>
              {temp} {isC ? "°C" : "°F"}
            </h3>
          </div>
          <div className="moreInf">
            <h3>"{data.weather?.[0].description}"</h3>
            <h3>Wind speed: {data.wind?.speed} m/s</h3>
            <h3>Humidity: {data.main?.humidity}%</h3>
            <h3>Pressure: {data.main?.pressure} mb</h3>
          </div>
        </div>
        <button onClick={changeTemp}>°C/°F</button>
      </div>
    </div>
  );
}
export default App;
