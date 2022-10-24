import { useParams } from "react-router";
import { useEffect, useState } from "react";

function AdvancedInfoAboutCurrency() {
  const [InfoAboutCurrency, setInfoAboutCurrency] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => setInfoAboutCurrency(data));
  }, []);
  return (
    <div>
      AdvancedInfoAboutCurrency{id}
      <button onClick={() => console.log(InfoAboutCurrency)}>siema</button>
    </div>
  );
}

export default AdvancedInfoAboutCurrency;
