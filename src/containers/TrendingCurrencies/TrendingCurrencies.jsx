import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { addFavourite, deleteFavourite, checkData } from "../../firebase";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ChartSparkline from "../../components/Charts/ChartSparkline";
    import { useSelector } from 'react-redux'
import {changeLoadingStateToFalse} from "../../redux/loadingSlice";
    import {changeLoadingStateToTrue} from "../../redux/loadingSlice";
    import {useDispatch} from "react-redux";

function TrendingCurrency({
  user,
  updateFavourite,
  setUpdateFavourite,
}) {

    const  darkTheme = useSelector((state)=>state.darkTheme.value)
    const dispatch = useDispatch()
  const [trendingList, setTrendingList] = useState([]);
  const [whichCurrency, setWhichCurrency] = useState(["usd", "$"]);
  const [favouriteToCheck, setFavouriteToCheck] = useState([]);

  const getDataTrendingList = async () => {
      dispatch(changeLoadingStateToTrue())

    let x = [];
    await fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => response.json())
      .then((data) =>
        data.coins.map((data) => {
          x.push(data.item.id);
        })
        ).catch((error)=>toast("You've exceeded the Rate Limit, try again in 1 minute"))
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${x[0]}%2C${x[1]}%2C${x[2]}%2C${x[3]}%2C${x[4]}%2C${x[5]}%2C${x[6]}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    )
      .then((response) => response.json())
    .then((data) => {setTrendingList(data)
        dispatch(changeLoadingStateToFalse())})
  };
  const getFavouritesToCheck = async () => {
    let x = [];
    let newArray = [];
    const response = await checkData(user.uid).then(
      (response) => (x = response)
    );
    x.map((item) => newArray.push(item.keyToApi));
    setFavouriteToCheck(newArray);
  };

  useEffect(() => {
    getDataTrendingList();
    if (user === null) return;
    getFavouritesToCheck();
  }, [user, updateFavourite]);
  return (
    <>
      {favouriteToCheck !== null ? (
        <div className="w-100 ">
          <Table
            hover
            size="sm"
            className={
              darkTheme
                ? "table-dark table-striped my-5"
                : "table table-striped my-5"
            }
            style={{ color: darkTheme ? "white" : null, fontWeight: "500" }}
          >
            <thead
              className="border-secondary"
              style={{ borderBottomWidth: "2px", fontSize: "16px" }}
            >
              <tr className={darkTheme ? "text-white" : null}>
                <div className="ms-xxl-5 mt-4">
                  <th>#</th>
                </div>
                <th>Name</th>
                <th>Price</th>
                  <th className="h_chart_responsive">1h%</th>
                  <th className="d_chart_responsive">24h%</th>
                <th>7d%</th>
                  <th className="market_chart_responsive">Market Cap</th>
                <th className="" style={{ maxWidth: "200px" }}>
                  7 Day Chart
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-center">
                    Favourite
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {trendingList !== 0
                ? trendingList.map((data, index) => (
                    <tr className="kurwamac " key={index}>
                      <td>
                        <div className="d-flex align-items-center h-100 ms-xxl-5">
                          {index + 1}
                        </div>
                      </td>

                      <td>
                        <Link
                          to={`/Currencies/AdvancedInfo/${data.id}`}
                          style={{
                            textDecoration: "none",
                            color: darkTheme ? "white" : "black",
                          }}
                        >
                          <div className="d-flex align-items-center h-100">
                            <img
                              src={`${data.image}`}
                              alt="image_of_coin"
                              style={{ height: "30px" }}
                            />
                            <span className="fw-bold mx-3">{data.name}</span>
                            <span className="text-muted">
                              {data.symbol.toUpperCase()}
                            </span>{" "}
                          </div>
                        </Link>
                      </td>

                      <td>
                        <div className="d-flex align-items-center h-100 pe-3">
                          {whichCurrency[1]}{" "}
                          {new Intl.NumberFormat("de-DE", {
                            minimumSignificantDigits: 3,
                            maximumSignificantDigits: 8,
                            maximumFractionDigits: 8,
                          }).format(data.current_price)}
                        </div>
                      </td>
                        <td className="h_chart_responsive">
                        <div
                          style={{ width: "70px" }}
                          className={
                            data.price_change_percentage_1h_in_currency > 0
                              ? "d-flex align-items-center h-100 text-success"
                              : "d-flex align-items-center h-100 text-danger"
                          }
                        >
                          {data.price_change_percentage_1h_in_currency === null
                            ? data.price_change_percentage_1h_in_currency
                            : data.price_change_percentage_1h_in_currency.toFixed(
                                2
                              )}
                          %
                        </div>
                      </td>
                        <td className="d_chart_responsive">
                        <div
                          style={{ width: "70px" }}
                          className={
                            data.price_change_percentage_24h > 0
                              ? "d-flex align-items-center h-100 text-success"
                              : "d-flex align-items-center h-100 text-danger"
                          }
                        >
                          {data.price_change_percentage_24h === null
                            ? data.price_change_percentage_24h
                            : data.price_change_percentage_24h.toFixed(2)}
                          %
                        </div>
                      </td>
                      <td>
                        <div
                          style={{ width: "70px" }}
                          className={
                            data.price_change_percentage_7d_in_currency > 0
                              ? "d-flex align-items-center h-100 text-success"
                              : "d-flex align-items-center h-100 text-danger"
                          }
                        >
                          {data.price_change_percentage_7d_in_currency === null
                            ? data.price_change_percentage_7d_in_currency
                            : data.price_change_percentage_7d_in_currency.toFixed(
                                2
                              )}
                          %
                        </div>
                      </td>
                        <td className="market_chart_responsive">
                        <div className="d-flex align-items-center h-100">
                          $
                          {new Intl.NumberFormat("de-DE", {
                            minimumSignificantDigits: 3,
                            maximumSignificantDigits: 12,
                            maximumFractionDigits: 0,
                          }).format(data.market_cap)}
                        </div>
                      </td>
                      <td>
                        <ChartSparkline
                          sparkline={data.sparkline_in_7d.price}
                          darkTheme={darkTheme}
                          dataSevenDays={
                            data.price_change_percentage_7d_in_currency
                          }
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center h-100">
                          {!favouriteToCheck.includes(data.id) ? (
                            <i
                              className="hover-on-star bi bi-star"
                              onClick={() => {
                                if (user === null) {
                                  toast.info("u have to be logged in");
                                  return;
                                }
                                addFavourite(
                                  user.uid,
                                  data.name,
                                  data.symbol,
                                  data.id,
                                  data.image
                                );
                                setUpdateFavourite(!updateFavourite);
                              }}
                            ></i>
                          ) : (
                            <i
                              className="bi bi-star-fill"
                              style={{ color: "orange" }}
                              onClick={() => {
                                deleteFavourite(user.uid, data.name);
                                setUpdateFavourite(!updateFavourite);
                              }}
                            ></i>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
      ) : null}
    </>
  );
}

export default TrendingCurrency;
