import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {addFavourite} from "../../firebase";
import {deleteFavourite} from "../../firebase";
import {checkData} from "../../firebase";



function ListOfAllCurrencies({user,updateFavourite,setUpdateFavourite}) {
    const [listOfAllCurrencies, setlistOfAllCurrencies] = useState([]);
    const [favouriteToCheck, setFavouriteToCheck] = useState([])

    useEffect(() => {
        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
        )
            .then((response) => response.json())
            .then((data) => setlistOfAllCurrencies(data));
    }, []);

    const getFavouritesToCheck=async()=>{
        let x=[]
        let newArray=[];
        const response = await checkData(user.uid).then((response)=>x=(response))
        x.map((item)=>newArray.push(item.keyToApi))
        setFavouriteToCheck(newArray)
    }
    useEffect(() => {
        if (user === null) return
            getFavouritesToCheck()
    }, [user,updateFavourite])

    return (
        <>
        {favouriteToCheck!==null?
        <div className="w-100 p-xxl-5" style={{background: "rgba(237, 242, 247, 30%)"}}>
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h%</th>
                        <th>7d%</th>
                        <th>Market Cap</th>
                        <th>
                            <div className="d-flex align-items-center justify-content-center">Favourite</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listOfAllCurrencies !== 0 ? listOfAllCurrencies.map((data, index) => (
                            <tr className="kurwamac " key={index}>
                                <td>
                                    <div className="d-flex align-items-center h-100">{index}</div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center h-100 ">
                                        <img
                                            src={`${data.image}`}
                                            alt="image_of_coin"
                                            style={{height: "30px"}}
                                        />
                                        <span className="fw-bold mx-3">{data.name}</span> (
                                        {data.symbol})
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center h-100 pe-3">
                                        ${data.current_price}
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
                                        {data.market_cap}
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-center h-100">

                                        {!favouriteToCheck.includes(data.id) ? <i className="bi bi-star"
                                            onClick={() => {
                                                addFavourite(user.uid, data.name, data.symbol, data.id, data.image)
                                                setUpdateFavourite(!updateFavourite)
                                            }}>
                                        </i> : <i className="bi bi-star-fill"
                                            onClick={() => {deleteFavourite(user.uid, data.name)
                                                setUpdateFavourite(!updateFavourite)}}>
                                        </i>}
                                   
                                    </div>
                                </td>
                            </tr>
                            )) : null}
                </tbody>
            </Table>
        </div>:null}
        </>
    );
}

export default ListOfAllCurrencies;
