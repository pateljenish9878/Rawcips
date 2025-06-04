import React from "react";
import ProductCard from "./RecipeCard";

const ProductsList = ({data}) => {
  
  return (
    <>
    {data?.map((item, index)=>(
        <ProductCard item={item} key={index}/>
    ))}
        
    </>
  );
};

export default ProductsList;