import RestaurantCard from "./Card";
import { swiggy_api_URL } from "./Config";
import React, { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import useOnline from "./utils/useOnline";
import { withPromoted } from "./Card";
const Body = () => {
  const [searchText, SetsearchText] = useState("");
  const [filterList, SetFilterList] = useState([]);
  const [reslist, setResList] = useState([]);
  const RestaurentCardPromoted = withPromoted(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);
  const statuss = useOnline();
  const fetchData = async () => {
    const data = await fetch(swiggy_api_URL);
    const json = await data.json();

    console.log(json?.data?.cards[2]);
    setResList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    SetFilterList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  function abc(searchText, reslist) {
    return reslist.filter((restaurant) =>
      restaurant.info.name.toUpperCase().includes(searchText.toUpperCase())
    );
  }
  return statuss === false ? (
    <h1>Sher ka internet band hai jab on hoga tab sher firse ayega</h1>
  ) : reslist.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            SetsearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            let data = abc(searchText, reslist);
            SetFilterList(data);
            reslist;
          }}
        >
          search
        </button>
      </div>
      <div className="restaurant-list">
        {filterList.map((restaurant, i) => {
          return restaurant?.info.promoted ? (
            <RestaurentCardPromoted key={i} {...restaurant?.info} />
          ) : (
            <RestaurantCard key={i} {...restaurant?.info} />
          );
        })}
      </div>
    </>
  );
};
export default Body;
