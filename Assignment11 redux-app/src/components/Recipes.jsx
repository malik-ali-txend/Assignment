import React from "react";
import { useGetRecipesQuery } from "../redux/Slice";

import "./Recipes.css"; 

const Recipes = () => {
  const { data, isError, isSuccess, isLoading, refetch } = useGetRecipesQuery();

  if (isLoading) return <div>Loading recipes...</div>;
  if (isError) return <div>Error fetching recipes: {isError.message}</div>;

  return (
    <div className="recipes-container">
      <h1>Random Recipes</h1>
      <ul className="recipes-list">
        {data?.recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.summary.replace(/<[^>]+>/g, "")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
