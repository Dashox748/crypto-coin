import {useParams} from "react-router";
import {useEffect, useState, useRef} from "react";
import Chart from "../../components/Chart/Chart";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function AdvancedInfoAboutCurrency() {
    const [infoAboutCurrency, setInfoAboutCurrency] = useState([]);
    const [ohlcInfoAboutCurrency, setOhlcInfoAboutCurrency] = useState({});
    const {id} = useParams();
    const [open, setOpen] = useState(false)
    const inputCurrencyRef = useRef(null);
    const [inputCurrency, setInputCurrency] = useState(1.00)
    const inputCryptoCurrencyRef = useRef(null);
    const [inputCryptoCurrency, setInputCryptoCurrency] = useState(1.00)

    const getDataForTimeData = async () => {
        console.log("siema")
        let [sevenDaysInfo, thirtyDaysInfo, nintyDaysInfo] = await Promise.all([
            fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${(new Date().getTime() / 1000) - 604800}&to=${new Date().getTime() / 1000}`)
                .then((response) => response.json()).then((data) => data.prices),
            fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${(new Date().getTime() / 1000) - 2629743}&to=${new Date().getTime() / 1000}`)
                .then((response) => response.json()).then((data) => data.prices),
            fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${(new Date().getTime() / 1000) - 7889229}&to=${new Date().getTime() / 1000}`)
                .then((response) => response.json()).then((data) => data.prices),
        ]);

//        console.log(Math.max(...sevenDaysInfo.map(o => o[1])))
//        console.log(Math.min(...sevenDaysInfo.map(o => o[1])))
//        console.log(Math.max(...thirtyDaysInfo.map(o => o[1])))
//        console.log(Math.min(...thirtyDaysInfo.map(o => o[1])))
//        console.log(Math.max(...nintyDaysInfo.map(o => o[1])))
//        console.log(Math.min(...nintyDaysInfo.map(o => o[1])))

        setOhlcInfoAboutCurrency({
            sevenDaysInfoMin: (Math.min(...sevenDaysInfo.map(o => o[1]))).toFixed(2),
            sevenDaysInfoMax: (Math.max(...sevenDaysInfo.map(o => o[1]))).toFixed(2),
            thirtyDaysInfoMin: (Math.min(...thirtyDaysInfo.map(o => o[1]))).toFixed(2),
            thirtyDaysInfoMax: (Math.max(...thirtyDaysInfo.map(o => o[1]))).toFixed(2),
            ninetyDaysInfoMin: (Math.min(...nintyDaysInfo.map(o => o[1]))).toFixed(2),
            ninetyDaysInfoMax: (Math.max(...nintyDaysInfo.map(o => o[1]))).toFixed(2),
        })
//        xInfo.map((item)=>console.log(item[1]))

//        setOhlcInfoAboutCurrency(xInfo)
    }

    function createMarkup() {
        return {__html: infoAboutCurrency.description.en};
    }

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((response) => response.json())
            .then((data) => setInfoAboutCurrency(data));


        getDataForTimeData()

    }, [id]);

    function get_domain_from_url(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
    }

    const calculate = async (what) => {

        if (what === "crypto") {
            const x=inputCryptoCurrencyRef.current.value * infoAboutCurrency.market_data.current_price.usd;
            if(x===0){
                setInputCurrency("")
            }
            else{
                setInputCurrency(x)
            }


        }
        if (what === "currency") {
            const x=inputCurrencyRef.current.value / infoAboutCurrency.market_data.current_price.usd;
            console.log(x)
            if(x===0){
                setInputCryptoCurrency("")
            }
            else{
                setInputCryptoCurrency(x);
            }
        }

    }
    return (
        <>
            {infoAboutCurrency.length !== 0 ? (
                <div className="advanced_container m-xxl-4 m-xl-3 m-1 p-xxl-4 d-flex gap-xxl-5 gap-2">
                    <div className="advanced_container_left" style={{maxWidth: "1300px"}}>
                        <div className="advanced_contaier_left-main biale p-5 d-flex flex-column w-100">
                            <div className="advanced_contaier_left-main-info">
                                <div
                                    className="advanced_contaier_left-main-info-heading d-flex align-items-center gap-3 my-2">
                                    <img src={`${infoAboutCurrency.image.small}`}/>
                                    <h1 style={{fontSize: "50px"}} className="m-0 fw-bold">
                                        {infoAboutCurrency.name}
                                    </h1>
                                    <h4 className="text-uppercase fw-normal text-muted align-self-lg-end">
                                        ({infoAboutCurrency.symbol})
                                    </h4>

                                </div>

                                <div className="advanced_contaier_left-main-info-price d-flex align-items-center gap-3">
                                    <h3 className="m-0 fw-semibold text-muted">Price</h3>
                                    <h1 className="m-0" style={{fontSize: "40px"}}>
                                        ${infoAboutCurrency.market_data.current_price.usd}
                                    </h1>
                                    {infoAboutCurrency.market_data.price_change_percentage_24h > 0 ? (
                                        <h4 style={{color: "hsla(158, 100%, 44%, 1)"}} className="m-0">
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

                                <div style={{width: "400px"}}
                                     className="advanced_contaier_left-main-info-24range d-flex flex-column mt-4">
                                    <ProgressBar variant="warning" min={infoAboutCurrency.market_data.low_24h.usd}
                                                 max={infoAboutCurrency.market_data.high_24h.usd}
                                                 now={infoAboutCurrency.market_data.current_price.usd} className="w-100"
                                                 style={{height: "12px"}}/>
                                    <div className="d-flex justify-content-between fw-bold fs-7">
                                        <span>${infoAboutCurrency.market_data.low_24h.usd}</span>
                                        <span>24h range</span>
                                        <span>${infoAboutCurrency.market_data.high_24h.usd}</span>
                                    </div>
                                </div>


                            </div>

                            <Chart id={id}/>
                            <div className="szmatajebana d-flex justify-content-between">
                                <div className="d-flex flex-column"><p
                                    style={{
                                        color: "#5D667B",
                                        fontWeight: "500",
                                        fontSize: "19px",
                                        textAlign: "center"
                                    }}>Market Cap Rank</p>
                                    <span
                                        className="d-flex justify-content-center">{infoAboutCurrency.market_data.market_cap_rank}</span>
                                </div>
                                <div className="d-flex flex-column"><p
                                    style={{
                                        color: "#5D667B",
                                        fontWeight: "500",
                                        fontSize: "19px",
                                        textAlign: "center"
                                    }}>Market Cap</p>
                                    <span
                                        className="d-flex justify-content-center">{infoAboutCurrency.market_data.market_cap.usd}</span>
                                </div>
                                <div className="d-flex flex-column"><p
                                    style={{
                                        color: "#5D667B",
                                        fontWeight: "500",
                                        fontSize: "19px",
                                        textAlign: "center"
                                    }}>Circulating
                                    Supply</p><span
                                    className="d-flex justify-content-center">{infoAboutCurrency.market_data.circulating_supply}</span>
                                </div>
                                <div className="d-flex flex-column"><p
                                    style={{
                                        color: "#5D667B",
                                        fontWeight: "500",
                                        fontSize: "19px",
                                        textAlign: "center"
                                    }}>Total Supply</p>
                                    <span
                                        className="d-flex justify-content-center">{infoAboutCurrency.market_data.total_supply}</span>
                                </div>
                            </div>

                            <div className="border rounded-3 overflow-hidden my-5">
                                <div className="d-flex justify-content-evenly">
                                    <p className="d-flex justify-content-center align-items-center border m-0"
                                       style={{height: "50px", background: "rgba(243,244,246", flex: "1"}}>1h</p>
                                    <p className="d-flex justify-content-center align-items-center border m-0"
                                       style={{height: "50px", background: "rgba(243,244,246", flex: "1"}}>24h</p>
                                    <p className="d-flex justify-content-center align-items-center border m-0"
                                       style={{height: "50px", background: "rgba(243,244,246", flex: "1"}}>7d</p>
                                    <p className="d-flex justify-content-center align-items-center border m-0"
                                       style={{height: "50px", background: "rgba(243,244,246", flex: "1"}}>30d</p>
                                    <p className="d-flex justify-content-center align-items-center border m-0"
                                       style={{height: "50px", background: "rgba(243,244,246", flex: "1"}}>1y</p>
                                </div>
                                <div className="d-flex justify-content-evenly">
                                    <p className={infoAboutCurrency.market_data.price_change_percentage_1h_in_currency.usd > 0 ? "d-flex justify-content-center align-items-center border m-0" : "d-flex justify-content-center align-items-center border m-0 text-danger"}
                                       style={{
                                           height: "50px",
                                           flex: "1"
                                       }}>{infoAboutCurrency.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%</p>
                                    <p className={infoAboutCurrency.market_data.price_change_percentage_24h > 0 ? "d-flex justify-content-center align-items-center border m-0"
                                        : "d-flex justify-content-center align-items-center border m-0 text-danger"}
                                       style={{
                                           height: "50px",
                                           flex: "1"
                                       }}>{infoAboutCurrency.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                                    <p className={infoAboutCurrency.market_data.price_change_percentage_7d > 0 ? "d-flex justify-content-center align-items-center border m-0 text-success"
                                        : "d-flex justify-content-center align-items-center border m-0 text-danger"}
                                       style={{
                                           height: "50px",
                                           flex: "1"
                                       }}>{infoAboutCurrency.market_data.price_change_percentage_7d.toFixed(2)}%</p>
                                    <p className={infoAboutCurrency.market_data.price_change_percentage_30d > 0 ? "d-flex justify-content-center align-items-center border m-0 text-success"
                                        : "d-flex justify-content-center align-items-center border m-0 text-danger"}
                                       style={{
                                           height: "50px",
                                           flex: "1"
                                       }}>{infoAboutCurrency.market_data.price_change_percentage_30d.toFixed(2)}%</p>
                                    <p className={infoAboutCurrency.market_data.price_change_percentage_1y > 0 ? "d-flex justify-content-center align-items-center border m-0 text-success"
                                        : "d-flex justify-content-center align-items-center border m-0 text-danger"}
                                       style={{
                                           height: "50px",
                                           flex: "1"
                                       }}>{infoAboutCurrency.market_data.price_change_percentage_1y.toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column biale my-5 p-4"
                             style={{maxWidth: "1200px", maxHeight: open ? null : "260px"}}>
                            <h1>About {infoAboutCurrency.name}</h1>
                            <div className="fs-5 lh-4 overflow-hidden" style={{maxWidth: "1200px"}}
                                 dangerouslySetInnerHTML={createMarkup()}/>
                            <Button onClick={() => setOpen(!open)}
                                    className="align-self-end">{!open ? "expand" : "collapse"}</Button>
                        </div>


                    </div>
                    <div className="d-flex flex-column gap-5">
                        <div className="biale p-4 d-flex flex-column gap-3" style={{background: "white"}}>
                            <h1>General Info</h1>
                            <div className="d-flex gap-2">Rank: <Button className="py-0" variant="secondary"
                                                                        style={{height: "25px"}}>1</Button></div>
                            <div className="d-flex gap-2">Categories: <Button className="py-0" variant="secondary"
                                                                              style={{height: "25px"}}>CryptoCurrency</Button>
                            </div>
                            <div className="d-flex gap-2">Comunity: <Button className="py-0" variant="secondary"
                                                                            style={{height: "25px"}}>Reddit</Button>
                                <Button className="py-0" variant="secondary" style={{height: "25px"}}>github</Button>
                            </div>
                            <div className="d-flex gap-2">Homepage: <Button className="py-0" variant="secondary"
                                                                            style={{height: "25px"}}>{get_domain_from_url(infoAboutCurrency.links.homepage[0])}</Button>
                            </div>
                            <div className="d-flex gap-2">Blockchains: <Button className="py-0" variant="secondary"
                                                                               style={{height: "25px"}}>{get_domain_from_url(infoAboutCurrency.links.blockchain_site[0])}</Button>
                            </div>


                            <button onClick={() => console.log(infoAboutCurrency)}>General</button>
                            <button
                                onClick={() => console.log(get_domain_from_url(infoAboutCurrency.links.blockchain_site[0]))}>Time
                            </button>

                        </div>
                        <div className="biale p-4 d-flex flex-column gap-4"
                             style={{background: "white"}}>
                            <h1>Price Stats</h1>
                            <div className="d-flex justify-content-between py-1 gap-4">
                                <span>{infoAboutCurrency.name} Price</span><span>${infoAboutCurrency.market_data.current_price.usd}</span>
                            </div>
                            <div className="d-flex justify-content-between py-1 gap-4">
                                <span>24h high / 24h low</span><span
                                className="spany">${infoAboutCurrency.market_data.high_24h.usd}/ ${infoAboutCurrency.market_data.low_24h.usd} </span>
                            </div>
                            <div className="d-flex justify-content-between py-1 gap-4">
                                <span>7d high / 7d low</span><span
                                className="spany">${ohlcInfoAboutCurrency.sevenDaysInfoMax}/ ${ohlcInfoAboutCurrency.sevenDaysInfoMin}</span>
                            </div>
                            <div className="d-flex justify-content-between py-1 gap-4">
                                <span>30d high / 30d low</span><span
                                className="spany">${ohlcInfoAboutCurrency.thirtyDaysInfoMax}/ ${ohlcInfoAboutCurrency.thirtyDaysInfoMin}</span>
                            </div>
                            <div className="d-flex justify-content-between py-1 gap-4">
                                <span>90d high / 90d low</span><span
                                className="spany align-items-end justify-content-end">${ohlcInfoAboutCurrency.ninetyDaysInfoMax} / ${ohlcInfoAboutCurrency.ninetyDaysInfoMin}</span>
                            </div>
                        </div>
                        <div className="biale p-4 d-flex flex-column gap-4"
                             style={{background: "white"}}>
                            <h1>Currency Converter</h1>
                            <div className="d-flex border rounded-3 overflow-hidden">
                                <div className="align-items-center d-flex p-3 fs-5 text-muted border-end"
                                     style={{minWidth: "70px"}}>{infoAboutCurrency.symbol.toUpperCase()}
                                </div>
                                <input dir="rtl" className="border-0  h-100 p-4 rounded-end"
                                       placeholder="1,00" style={{width: "100%"}} ref={inputCryptoCurrencyRef}
                                       value={inputCryptoCurrency} onChange={(e) => {
                                    calculate("crypto")
                                    setInputCryptoCurrency(e.target.value)

                                }}></input>
                            </div>

                            <div className="d-flex border rounded-3 overflow-hidden">
                                <div className="align-items-center d-flex p-3 fs-5 text-muted border-end"


                                     style={{minWidth: "70px"}}>USD
                                </div>
                                <input dir="rtl" className="border-0  h-100 p-4 rounded-end"
                                       placeholder="1,00" style={{width: "100%"}}
                                       value={inputCurrency}
                                       ref={inputCurrencyRef}
                                       onChange={(e) => {
                                           calculate("currency")
                                           setInputCurrency(e.target.value)
                                       }}></input>
                            </div>

                        </div>

                    </div>

                </div>
            ) : null}
        </>
    );
}

export default AdvancedInfoAboutCurrency;
