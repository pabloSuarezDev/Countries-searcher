import "../assets/css-scss/Nav/Nav.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

const Nav = ({ setRegions, region, setRegion }) => {

  const search = e => {
    e.preventDefault();
    const regions = JSON.parse(localStorage.getItem("allRegions"));
    let inputValue = e.target.search.value.toLowerCase();

    let countryFiltered = regions.filter(region => region.name.toLowerCase().includes(inputValue));

    if(countryFiltered.length <= 0) {
      setRegions(regions);
      return false;
    }

    setRegions(countryFiltered);
  };

  const filter = (continent) => {
    if (continent === "Filter by Region") {
      setRegions(JSON.parse(localStorage.getItem("allRegions")));
      setRegion(continent);
    } else {
      const regions = JSON.parse(localStorage.getItem("allRegions"));

      let regionFiltered = regions.filter(region => region.region === continent);

      setRegions(regionFiltered);
      setRegion(continent);
    }
  };

  return (
    <nav>
      <form className="search" onSubmit={search}>
        <input className="search" type="text" name="search" placeholder="Search for a country..." autoComplete="off" />
        <button className="search" type="submit">
          <AiOutlineSearch />
        </button>
      </form>
      <div className="filter" onClick={() => document.getElementById("filter").classList.toggle("d-none")}>
        <span>
          {region} <FiChevronDown />
        </span>
        <ul className="d-none filter" id="filter">
          {region !== "Filter by Region" ? <li onClick={() => filter("Filter by Region")}>Filter by Region</li> : ""}
          <li onClick={() => filter("Africa")}>
            Africa
          </li>
          <li onClick={() => filter("Americas")}>
            America
          </li>
          <li onClick={() => filter("Asia")}>
            Asia
          </li>
          <li onClick={() => filter("Europe")}>
            Europe
          </li>
          <li onClick={() => filter("Oceania")}>
            Oceania
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;