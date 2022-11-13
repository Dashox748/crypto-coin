import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {addFavourite, deleteFavourite, checkData} from "../../firebase";
import {Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import ChartSparkline from "../../components/Charts/ChartSparkline";
import Button from "react-bootstrap/Button";
import { useSelector,useDispatch } from 'react-redux'
import {changeLoadingStateToFalse} from "../../redux/loadingSlice";
import {changeLoadingStateToTrue} from "../../redux/loadingSlice";

function ListOfAllCurrencies({
                                 user,
                                 updateFavourite,
                                 setUpdateFavourite,

                             }) {
    const [listOfAllCurrencies, setlistOfAllCurrencies] = useState([]);
    const [filteredListOfAllCurrencies, setFilteredListOfAllCurrencies] =
        useState([]);
    const [favouriteToCheck, setFavouriteToCheck] = useState([]);
    const [searchForCryptoInput, setSearchForCryptoInput] = useState("");
    const [howManyRows, setHowManyRows] = useState(10);
    const [whichCurrencyFilter, setWhichCurrencyFilter] = useState("");
    const [whichCurrency, setWhichCurrency] = useState(["usd", "$"]);
    const [whichPage, setWhichPage] = useState(1);
    const  darkTheme = useSelector((state)=>state.darkTheme.value)
    const dispatch = useDispatch()
    const currency_list = [
        ["usd", "$"],
        ["eur", "€"],
        ["pln", "PLN"],
        ["aed", "AED"],
        ["ars", "ARS"],
        ["aud", "A$"],
        ["bch", "BCH"],
        ["bdt", "BDT"],
        ["bhd", "BHD"],
        ["bmd", "BMD"],
        ["bnb", "BNB"],
        ["brl", "BRL"],
        ["btc", "BTC"],
        ["cad", "CA$"],
        ["chf", "CHF"],
        ["clp", "CLP"],
        ["cny", "CN¥"],
        ["czk", "CZK"],
        ["dkk", "DKK"],
        ["dot", "DOT"],
        ["eos", "EOS"],
        ["eth", "ETH"],
        ["gbp", "£"],
        ["hkd", "HKD"],
        ["huf", "HUF"],
        ["idr", "IDR"],
        ["ils", "ILS"],
        ["inr", "INR"],
        ["jpy", "¥"],
        ["krw", "KRW"],
        ["kwd", "KWD"],
        ["lkr", "LKR"],
        ["ltc", "LTC"],
        ["mmk", "MMK"],
        ["mxn", "MXN"],
        ["myr", "MYR"],
        ["ngn", "NGN"],
        ["nok", "NOK"],
        ["nzd", "NZD"],
        ["php", "PHP"],
        ["pkr", "PKR"],
        ["rub", "RUB"],
        ["sar", "SAR"],
        ["sek", "SEK"],
        ["sgd", "SGD"],
        ["thb", "THB"],
        ["try", "TRY"],
        ["twd", "TWD"],
        ["uah", "UAH"],
        ["vef", "VEF"],
        ["vnd", "VND"],
        ["xag", "XAG"],
        ["xau", "XAU"],
        ["xdr", "XDR"],
        ["xlm", "XLM"],
        ["xrp", "XRP"],
        ["yfi", "YFI"],
        ["zar", "ZAR"],
        ["bits", "BITS"],
        ["link", "LINK"],
        ["sats", "SATS"],
    ];
    useEffect(() => {
        dispatch(changeLoadingStateToTrue())
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${whichCurrency[0]}&order=market_cap_desc&per_page=${howManyRows}&page=${whichPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)
            .then((response) => response.json())
            .then((data) => {
                setlistOfAllCurrencies(data);
                setFilteredListOfAllCurrencies(data);
                dispatch(changeLoadingStateToFalse())
            }).catch((error) => {
            console.log(error)
            toast("You've exceeded the Rate Limit, please wait, try again in 1 minute")
        })

    }, [howManyRows, whichCurrency, whichPage]);

    const getFavouritesToCheck = async () => {
        let x = [];
        let newArray = [];
        await checkData(user.uid).then((response) => (x = response));
        x.map((item) => newArray.push(item.keyToApi));
        setFavouriteToCheck(newArray);
    };

    useEffect(() => {
        let x = listOfAllCurrencies.filter((item) =>
            item.name.toLowerCase().includes(searchForCryptoInput.toLowerCase())
        );
        setFilteredListOfAllCurrencies(x);
    }, [searchForCryptoInput]);

    useEffect(() => {
        if (user === null) return;
        getFavouritesToCheck();
    }, [user, updateFavourite]);

    return (
        <>

            {favouriteToCheck !== null ? (
                <div className="w-100 pb-5" style={{color: darkTheme ? "white" : null}}>
                    <div className="d-flex justify-content-between mx-xxl-5 mt-5 px-xxl-5 px-3 flex-md-row flex-column align-items-center gap-4">
                        <input
                            type="search"
                            className="form-control "
                            placeholder="Search..."
                            aria-label="Search"
                            onChange={(event) => setSearchForCryptoInput(event.target.value)}
                            style={{
                                width: "300px",
                                background: darkTheme ? "rgba(20,19,22,255)" : "",
                                border: darkTheme ? "none" : "",
                                color: darkTheme?"white":null
                            }}
                        />
                        <div className="d-flex align-items-center gap-2">
                            <span className="fs-6 fw-bold">Currency</span>
                            <Dropdown autoClose="outside" align="end">
                                <Dropdown.Toggle    
                                    variant="secondary"
                                    id="dropdown-basic"
                                    className=""
                                    style={{
                                        background: darkTheme ? "#5c636a" : "",
                                        color: darkTheme ? "white" : "",
                                    }}
                                >
                                    {whichCurrency[0].toUpperCase()}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    variant={darkTheme ? "dark" : null}
                                    style={{minWidth: "160px", maxHeight: "300px"}}
                                    className="m-0 p-3 overflow-auto"
                                >
                                    <Dropdown.Item className="m-0 p-0 hover-none">
                                        <input
                                            className="form-control my-1 rounded-2"
                                            placeholder="Search..."
                                            style={{
                                                width: "100%",
                                                background: darkTheme ? "#141316" : null,
                                                border: darkTheme ? "none" : null,
                                            }}
                                            onChange={(event) =>
                                                setWhichCurrencyFilter(event.target.value)
                                            }
                                        ></input>
                                    </Dropdown.Item>
                                    {currency_list
                                        .filter((item) =>
                                            item[0]
                                                .toLowerCase()
                                                .includes(whichCurrencyFilter.toLowerCase())
                                        )
                                        .map((item, index) => (
                                            <Dropdown.Item
                                                key={index}
                                                onClick={() => setWhichCurrency(item)}
                                            >
                                                {item[0].toUpperCase()}
                                            </Dropdown.Item>
                                        ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <span className="fs-6 fw-bold">Show Rows</span>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="secondary"
                                    id="dropdown-basic"
                                    style={{
                                        background: darkTheme ? "#5c636a" : "",
                                        color: darkTheme ? "white" : "",
                                    }}
                                >
                                    {howManyRows}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    variant={darkTheme ? "dark" : null}
                                    style={{minWidth: "70px", color: "white"}}
                                >
                                    <Dropdown.Item
                                        className={darkTheme ? "text-white" : null}
                                        onClick={() => {

                                            setHowManyRows(10)}}
                                    >
                                        10
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className={darkTheme ? "text-white" : null}
                                        onClick={() => {
                                            setHowManyRows(20)}}
                                    >
                                        20
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className={darkTheme ? "text-white" : null}
                                        onClick={() => {
                                            setHowManyRows(50)}}
                                    >
                                        50
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className={darkTheme ? "text-white" : null}
                                        onClick={() => {
                                            setHowManyRows(100)}}
                                    >
                                        100
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <Table
                        hover
                        className={
                            darkTheme ? "table-dark table-striped" : "table table-striped"
                        }
                        style={{color: darkTheme ? "white" : null, fontWeight: "500"}}
                    >
                        <thead
                            className="border-secondary"
                            style={{borderBottomWidth: "2px", fontSize: "16px"}}
                        >
                        <tr className={darkTheme ? "text-white" : null}>
                            <div className="ms-xxl-5 mt-4 number-on-list">
                                <th className="">#</th>
                            </div>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="h_chart_responsive">1h%</th>
                            <th className="d_chart_responsive">24h%</th>
                            <th>7d%</th>
                            <th className="market_chart_responsive">Market Cap</th>
                            <th className="seven-day-chart">7 Day Chart</th>
                            <th className="favourite-th">
                                <div className="d-flex align-items-center justify-content-center me-xxl-5 ">
                                    Favourite
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredListOfAllCurrencies !== 0
                            ? filteredListOfAllCurrencies.map((data, index) => (
                                <tr className="kurwamac" key={index}>
                                    <td className="number-on-list">
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
                                            <div className="d-flex align-items-center h-100 ">
                                                <img
                                                    src={`${data.image}`}
                                                    alt="image_of_coin"
                                                    style={{height: "30px"}}
                                                />
                                                <span className="fw-bold mx-3">{data.name}</span>
                                                <span className="text-muted symbol-crypto">
                              {data.symbol.toUpperCase()}
                            </span>
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
                                            style={{width: "70px"}}
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
                                            style={{width: "70px"}}
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
                                            style={{width: "70px"}}
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
                                    <td className="seven-day-chart">
                                        <ChartSparkline
                                            sparkline={data.sparkline_in_7d.price}
                                            darkTheme={darkTheme}
                                            dataSevenDays={
                                                data.price_change_percentage_7d_in_currency
                                            }
                                        />
                                    </td>
                                    <td className="favourite-td">
                                        <div
                                            className="d-flex align-items-center justify-content-center h-100 me-xxl-5">
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
                                                    style={{color: "orange"}}
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
                    <div className="d-flex justify-content-center ">
                        <ButtonGroup
                            aria-label="Basic example "
                            role="group"
                            className="d-flex gap-2"
                        >
                            <Button
                                className="fw-bold rounded-3"
                                style={{color: darkTheme ? "white" : null}}
                                variant=""
                                onClick={() => {
                                    if(whichPage===1){
                                        return
                                    }
                                    setWhichPage(whichPage - 1)
                                }}
                            >
                                <i className="bi bi-chevron-left"></i>
                            </Button>
                            {whichPage <= 4 ?<Button
                                className="fw-bold  rounded-3"
                                style={{color: darkTheme ? "white" : null}}
                                variant=""
                                >
                                ...
                            </Button>:null}

                            {whichPage <= 4 ? (
                                <>
                                <Button
                                    className={
                                    darkTheme
                                    ? "fw-bold buttons-group-hover rounded-3 text-white"
                                    : "fw-bold buttons-group-hover rounded-3"
                                }
                                    style={{
                                        background: whichPage === 1 ? "#4322ef" : null,
                                        color: whichPage === 1 ? "white" : "",
                                    }}
                                    onClick={() => setWhichPage(1)}
                                    >
                                    {whichPage}
                                </Button>
                                    <Button
                                        className={
                                            darkTheme
                                            ? "fw-bold buttons-group-hover rounded-3 text-white button-page"
                                                : "fw-bold buttons-group-hover rounded-3"
                                        }
                                        onClick={() => setWhichPage(2)}
                                        style={{
                                            background: whichPage === 2 ? "#4322ef" : null,
                                            color: whichPage === 2 ? "white" : "",
                                        }}
                                    >
                                        2
                                    </Button>
                                    <Button
                                        className={
                                            darkTheme
                                            ? "fw-bold buttons-group-hover rounded-3 text-white button-page"
                                                : "fw-bold buttons-group-hover rounded-3"
                                        }
                                        style={{
                                            background: whichPage === 3 ? "#4322ef" : null,
                                            color: whichPage === 3 ? "white" : "",
                                        }}
                                        onClick={() => setWhichPage(3)}
                                    >
                                        3
                                    </Button>
                                    <Button
                                        className={
                                            darkTheme
                                            ? "fw-bold buttons-group-hover rounded-3 text-white button-page"
                                                : "fw-bold buttons-group-hover rounded-3"
                                        }
                                        style={{
                                            background: whichPage === 4 ? "#4322ef" : null,
                                            color: whichPage === 4 ? "white" : "",
                                        }}
                                        onClick={() => setWhichPage(4)}
                                    >
                                        4
                                    </Button>
                                    <Button
                                        className={
                                            darkTheme
                                            ? "fw-bold buttons-group-hover rounded-3 text-white button-page"
                                                : "fw-bold buttons-group-hover rounded-3"
                                        }
                                        style={{
                                            background: whichPage === 5 ? "#4322ef" : null,
                                            color: whichPage === 5 ? "white" : "",
                                        }}
                                        onClick={() => setWhichPage(5)}
                                    >
                                        5
                                    </Button>
                                    <Button
                                        className={
                                            darkTheme
                                            ? "fw-bold buttons-group-hover rounded-3 text-white button-page"
                                                : "fw-bold buttons-group-hover rounded-3"
                                        }
                                        style={{
                                            background: whichPage === 6 ? "#4322ef" : null,
                                            color: whichPage === 6 ? "white" : "",
                                        }}
                                        onClick={() => setWhichPage(6)}
                                    >
                                        6
                                    </Button>
                                </>
                            ) : (
                                <>
                                <Button
                                    className={
                                    darkTheme
                                    ? "fw-bold buttons-group-hover rounded-3 text-white"
                                    : "fw-bold buttons-group-hover rounded-3"
                                }
                                    style={{
                                        background: whichPage === 1 ? "#4322ef" : null,
                                        color: whichPage === 1 ? "white" : "",
                                    }}
                                    onClick={() => setWhichPage(1)}
                                    >
                                    1
                                </Button>
                                    <Button
                                        className="fw-bold  rounded-3"
                                        style={{color: darkTheme ? "white" : null}}
                                        variant=""
                                    >
                                        ...
                                    </Button>
                                    <Button
                                        className="fw-bold buttons-group-hover rounded-3 button-page"
                                        style={{color: darkTheme ? "white" : null}}
                                        onClick={() => setWhichPage(whichPage - 2)}
                                        variant=""
                                    >
                                        {whichPage - 2}
                                    </Button>
                                    <Button
                                        className="fw-bold buttons-group-hover rounded-3 button-page"
                                        style={{color: darkTheme ? "white" : null}}
                                        onClick={() => setWhichPage(whichPage - 1)}
                                        variant=""
                                    >
                                        {whichPage - 1}
                                    </Button>
                                    <Button
                                        className="fw-bold rounded-3"
                                        style={{
                                            color: darkTheme ? "white" : "white",
                                            background: "#4322ef",
                                        }}
                                        onClick={() => setWhichPage(whichPage)}
                                    >
                                        {whichPage}
                                    </Button>
                                    <Button
                                        className="fw-bold buttons-group-hover rounded-3 button-page"
                                        style={{color: darkTheme ? "white" : null}}
                                        onClick={() => setWhichPage(whichPage + 1)}
                                        variant=""
                                    >
                                        {whichPage + 1}
                                    </Button>
                                    <Button
                                        className="fw-bold buttons-group-hover rounded-3 button-page"
                                        style={{color: darkTheme ? "white" : null}}
                                        onClick={() => setWhichPage(whichPage + 2)}
                                        variant=""
                                    >
                                        {whichPage + 2}
                                    </Button>
                                </>
                            )}

                            <Button
                                className="fw-bold r rounded-3"
                                variant=""
                                style={{color: darkTheme ? "white" : null}}
                            >
                                ...
                            </Button>
                            <Button
                                className="fw-bold buttons-group-hover rounded-3 button-page"
                                style={{color: darkTheme ? "white" : null}}
                                variant=""
                                onClick={() => setWhichPage(Math.round(13250/howManyRows))}

                            >
                                {Math.round(13250/howManyRows)}
                            </Button>
                            <Button
                                className="fw-bold  rounded-3"
                                style={{color: darkTheme ? "white" : null}}
                                variant=""
                                onClick={() => setWhichPage(whichPage + 1)}
                            >
                                <i className="bi bi-chevron-right"></i>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default ListOfAllCurrencies;
