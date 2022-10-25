import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Chart from "../../components/Chart/Chart";

function AdvancedInfoAboutCurrency() {
  const [infoAboutCurrency, setInfoAboutCurrency] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => setInfoAboutCurrency(data));
  }, [id]);
  return (
    <>
      {infoAboutCurrency.length !== 0 ? (
        <div className="flex-fill m-lg-5 p-xl-5">
          <div className="d-flex align-items-center gap-3 my-2">
            <img src={`${infoAboutCurrency.image.small}`} />
            <h1 style={{ fontSize: "50px" }} className="m-0 fw-bold">
              {infoAboutCurrency.name}
            </h1>
            <h4 className="text-uppercase fw-normal text-muted align-self-lg-end">
              ({infoAboutCurrency.symbol})
            </h4>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h3 className="m-0 fw-semibold text-muted">Price</h3>
            <h1 className="m-0" style={{ fontSize: "40px" }}>
              ${infoAboutCurrency.market_data.current_price.usd}
            </h1>
            {infoAboutCurrency.market_data.price_change_percentage_24h > 0 ? (
              <h4 style={{ color: "hsla(158, 100%, 44%, 1)" }} className="m-0">
                +
                {infoAboutCurrency.market_data.price_change_percentage_24h.toFixed(
                  2
                )}
                % <span className="text-black-50 fs-6">(1d)</span>
              </h4>
            ) : (
              <h4 className="text-danger m-0">
                {infoAboutCurrency.market_data.price_change_percentage_24h.toFixed(
                  2
                )}
                % <span className="fw-light fs-5">(1d)</span>
              </h4>
            )}
          </div>
          <div className="p-xl-5" style={{ maxWidth: "1200px" }}>
            <Chart id={id} />
          </div>
          <button onClick={() => console.log(infoAboutCurrency)}>siema</button>
        </div>
      ) : null}
    </>
  );
}

export default AdvancedInfoAboutCurrency;
