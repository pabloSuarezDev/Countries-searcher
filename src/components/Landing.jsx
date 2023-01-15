import "../assets/css-scss/Lading.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Nav from "./Nav";

const Landing = () => {

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("Filter by Region");
  const navigate = useNavigate();

  const getCountries = async() => {
    const request = await fetch("https://restcountries.com/v2/all");
    const data = await request.json();

    localStorage.setItem("allRegions", JSON.stringify(data));
    setRegions(data);
  };
  
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <main>
      <Nav
        setRegions={setRegions}
        region={region}
        setRegion={setRegion}
      />
      <section className="regions">
        {
          regions.length >= 1 ? (
            regions.map((region, index) => {
              return (
                <Card className="card" key={index} onClick={(() => navigate(`/detail/${region.name}`))}>
                  <Card.Img className="card__img" src={region.flags.png} alt={`${region.name} flag`} variant="top" />
                  <Card.Body>
                    <Card.Title>
                      <strong>{region.name}</strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>Population:</strong> {region.population.toLocaleString()}
                      <br />
                      <strong>Region:</strong> {region.region}
                      <br />
                      <strong>Capital:</strong> {region.capital}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div className="loading">
              <h1>Loading content, please wait</h1>
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          )
        }
      </section>
    </main>
  );
};

export default Landing;