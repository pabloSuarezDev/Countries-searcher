import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Card } from "react-bootstrap";
import "../assets/css-scss/Detail.css";

const Detail = () => {

  const { name } = useParams("name");
  const [country, setCountry] = useState({});

  const getCountry = async (countryName) => {
    const request = await fetch(`https://restcountries.com/v2/name/${countryName}`);
    const data = await request.json();

    setCountry(data);
  };

  useEffect(() => {
    getCountry(name);
  }, [name]);

  return (
    <main className="detail">
      <Link to="/" className="go__back">
        <BsArrowLeft /> &nbsp; Back
      </Link>
      <section className="country">
        {
          country.length >= 1 ? (
            country.map((country, index) => {
              return (
                <Card className="detail__card" key={index}>
                  <Card.Img className="card__img" src={country.flags.png} alt={`${country.name} flag`} variant="top" />
                  <Card.Body>
                    <Card.Title className="mt-2 mb-3">
                      <strong>{country.name}</strong>
                    </Card.Title>
                    <div className="card-text">
                      <p><strong>Native Name:</strong> {country.languages[0].nativeName}</p>
                      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                      <p><strong>Region:</strong> {country.region}</p>
                      <p><strong>Sub Region:</strong> {country.subregion}</p>
                      <p><strong>Capital</strong>: {country.capital}</p>
                      <br />
                      <p><strong>Top Level Domain:</strong> {country.topLevelDomain}</p>
                      <p><strong>Currencies:</strong> {country.currencies[0].name}</p>
                      <p>
                        <strong>Languages: </strong>|
                        {
                          country.languages.map((language, index) => {
                            return (
                              <span key={index}>
                                &nbsp;{language.name} |
                              </span>
                            );
                          })
                        }
                      </p>
                    </div>
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

export default Detail;