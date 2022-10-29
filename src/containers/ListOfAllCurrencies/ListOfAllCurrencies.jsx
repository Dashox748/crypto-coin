import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {addFavourite, deleteFavourite, checkData} from "../../firebase";
import {Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ChartSparkline from "../../components/Charts/ChartSparkline";
import Button from 'react-bootstrap/Button';


function ListOfAllCurrencies({user, updateFavourite, setUpdateFavourite}) {
    const [listOfAllCurrencies, setlistOfAllCurrencies] = useState([]);
    const [filteredListOfAllCurrencies, setFilteredListOfAllCurrencies] = useState([])
    const [favouriteToCheck, setFavouriteToCheck] = useState([])
    const [searchForCryptoInput, setSearchForCryptoInput] = useState("")
    const [howManyRows, setHowManyRows] = useState(10)
    const [whichCurrencyFilter, setWhichCurrencyFilter] = useState("")
    const [whichCurrency, setWhichCurrency] = useState(["usd", "$"])
    const [whichPage, setWhichPage] = useState(1);


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
        ["link", "LINK"], ,
        ["sats", "SATS"],]
    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${whichCurrency[0]}&order=market_cap_desc&per_page=${howManyRows}&page=${whichPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        )
            .then((response) => response.json())
            .then((data) => {
                setlistOfAllCurrencies(data)
                setFilteredListOfAllCurrencies(data)
            });
    }, [howManyRows, whichCurrency, whichPage]);

    const getFavouritesToCheck = async () => {
        let x = []
        let newArray = [];
        const response = await checkData(user.uid).then((response) => x = (response))
        x.map((item) => newArray.push(item.keyToApi))
        setFavouriteToCheck(newArray)
    }

    useEffect(() => {
        let x = listOfAllCurrencies.filter((item) => item.name.toLowerCase().includes(searchForCryptoInput.toLowerCase()))
        setFilteredListOfAllCurrencies(x)
    }, [searchForCryptoInput])

    useEffect(() => {
        if (user === null) return
        getFavouritesToCheck()
    }, [user, updateFavourite])

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
                className="toast-notification"
            />
            {favouriteToCheck !== null ?
                <div className="w-100 p-xxl-5 mx-auto" style={{maxWidth: "2100px"}}>
                    <div className="d-flex justify-content-between">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search"
                            onChange={(event) => setSearchForCryptoInput(event.target.value)}
                            style={{width: "300px"}}
                        />
                        <div className="d-flex align-items-center gap-2">
                            <span className="fs-6 fw-bold">Currency</span>
                            <Dropdown autoClose="outside" align="end">
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {whichCurrency[0].toUpperCase()}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{minWidth: "160px", maxHeight: "300px"}}
                                               className="m-0 p-3 overflow-auto">
                                    <Dropdown.Item className="m-0 p-0"><input className="form-control my-1"
                                                                              placeholder="Search..."
                                                                              style={{width: "100%"}}
                                                                              onChange={(event) => setWhichCurrencyFilter(event.target.value)}></input></Dropdown.Item>
                                    {currency_list.filter((item) => item[0].toLowerCase().includes(whichCurrencyFilter.toLowerCase())).map((item, index) =>
                                        <Dropdown.Item key={index} onClick={() =>

                                            setWhichCurrency(item)

                                        }>{item[0].toUpperCase()}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            <span className="fs-6 fw-bold">Show Rows</span>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {howManyRows}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{minWidth: "70px"}}>
                                    <Dropdown.Item onClick={() => setHowManyRows(10)}>10</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setHowManyRows(20)}>20</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setHowManyRows(50)}>50</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setHowManyRows(100)}>100</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <Table hover size="sm">

                        <thead className="border-secondary" style={{borderBottomWidth: "2px", fontSize: "16px"}}>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>1h%</th>
                            <th>24h%</th>
                            <th>7d%</th>
                            <th>Market Cap</th>
                            <th className="w-25" style={{maxWidth: "200px"}}>7 Day Chart</th>
                            <th>
                                <div className="d-flex align-items-center justify-content-center">Favourite</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredListOfAllCurrencies !== 0 ? filteredListOfAllCurrencies.map((data, index) => (
                            <tr className="kurwamac " key={index}>
                                <td>
                                    <div className="d-flex align-items-center h-100">{index + 1}</div>
                                </td>

                                <td>
                                    <Link to={`/Currencies/AdvancedInfo/${data.id}`}
                                          style={{textDecoration: 'none', color: "black"}}>
                                        <div className="d-flex align-items-center h-100">
                                            <img
                                                src={`${data.image}`}
                                                alt="image_of_coin"
                                                style={{height: "30px"}}
                                            />
                                            <span className="fw-bold mx-3">{data.name}</span> (
                                            {data.symbol})
                                        </div>
                                    </Link>
                                </td>

                                <td>
                                    <div className="d-flex align-items-center h-100 pe-3">
                                        {whichCurrency[1]} {data.current_price}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        style={{width: "70px"}}
                                        className={
                                            data.price_change_percentage_1h_in_currency > 0
                                                ? "d-flex align-items-center h-100 text-success"
                                                : "d-flex align-items-center h-100 text-danger"
                                        }
                                    >
                                        {data.price_change_percentage_1h_in_currency === null ? data.price_change_percentage_1h_in_currency :
                                            data.price_change_percentage_1h_in_currency.toFixed(2)}%
                                    </div>
                                </td>
                                <td>
                                    <div
                                        style={{width: "70px"}}
                                        className={
                                            data.price_change_percentage_24h > 0
                                                ? "d-flex align-items-center h-100 text-success"
                                                : "d-flex align-items-center h-100 text-danger"
                                        }
                                    >
                                        {data.price_change_percentage_24h === null ? data.price_change_percentage_24h :
                                            data.price_change_percentage_24h.toFixed(2)}%
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
                                        {data.price_change_percentage_7d_in_currency === null ? data.price_change_percentage_7d_in_currency
                                            : data.price_change_percentage_7d_in_currency.toFixed(2)}%
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center h-100">
                                        ${data.market_cap}
                                    </div>
                                </td>
                                <td>
                                    <ChartSparkline sparkline={data.sparkline_in_7d.price}/>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-center h-100">

                                        {!favouriteToCheck.includes(data.id) ? <i className="bi bi-star"
                                                                                  onClick={() => {
                                                                                      if (user === null) {
                                                                                          toast.info("u have to be logged in");
                                                                                          return
                                                                                      }
                                                                                      addFavourite(user.uid, data.name, data.symbol, data.id, data.image)
                                                                                      setUpdateFavourite(!updateFavourite)
                                                                                  }}>
                                        </i> : <i className="bi bi-star-fill"
                                                  onClick={() => {

                                                      deleteFavourite(user.uid, data.name)
                                                      setUpdateFavourite(!updateFavourite)
                                                  }}>
                                        </i>}

                                    </div>
                                </td>
                            </tr>
                        )) : null}
                        </tbody>

                    </Table>
                    <div className="d-flex justify-content-center">
                        <ButtonGroup aria-label="Basic example" role="group" className="d-flex gap-2">
                            <Button className="fw-bold rounded-3" variant=""
                                    onClick={() => setWhichPage(whichPage - 1)}><i className="bi bi-chevron-left"></i>
                            </Button>
                            <Button className="fw-bold buttons-group-hover rounded-3" onClick={() => setWhichPage(1)}
                                    variant={whichPage === 1 ? "primary" : ""}>1</Button>
                            {whichPage <= 4 ? <>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(2)}
                                            variant={whichPage === 2 ? "primary" : ""}>2</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(3)}
                                            variant={whichPage === 3 ? "primary" : ""}>3</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(4)}
                                            variant={whichPage === 4 ? "primary" : ""}>4</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(5)}
                                            variant={whichPage === 5 ? "primary" : ""}>5</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(6)}
                                            variant={whichPage === 6 ? "primary" : ""}>6</Button></>
                                :
                                <>
                                    <Button className="fw-bold  rounded-3" variant="">...</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(whichPage - 2)}
                                            variant="">{whichPage - 2}</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(whichPage - 1)}
                                            variant="">{whichPage - 1}</Button>
                                    <Button className="fw-bold rounded-3" onClick={() => setWhichPage(whichPage)}
                                            variant="primary">{whichPage}</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(whichPage + 1)}
                                            variant="">{whichPage + 1}</Button>
                                    <Button className="fw-bold buttons-group-hover rounded-3"
                                            onClick={() => setWhichPage(whichPage + 2)}
                                            variant="">{whichPage + 2}</Button></>
                            }

                            <Button className="fw-bold r rounded-3" variant="">...</Button>
                            <Button className="fw-bold buttons-group-hover rounded-3" variant="">120</Button>
                            <Button className="fw-bold  rounded-3" variant=""
                                    onClick={() => setWhichPage(whichPage + 1)}><i className="bi bi-chevron-right"></i>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div> : null}
        </>
    );
}

export default ListOfAllCurrencies;