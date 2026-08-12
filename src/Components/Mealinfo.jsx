import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Mealinfo = () => {

    const { mealid } = useParams();
    const navigate = useNavigate();

    const [info, setInfo] = useState(null);

    const getInfo = async () => {
        const get = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
        );

        const jsonData = await get.json();

        if (jsonData.meals) {
            setInfo(jsonData.meals[0]);
        }
    }

    useEffect(() => {
        getInfo();
    }, [mealid]);


    // Get all ingredients and measurements
    const ingredients = [];

    if (info) {
        for (let i = 1; i <= 20; i++) {

            const ingredient = info[`strIngredient${i}`];
            const measure = info[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({
                    ingredient,
                    measure
                });
            }
        }
    }


    if (!info) {
        return (
            <div className="mealLoading">
                <div className="loadingCircle"></div>
                <p>Loading recipe...</p>
            </div>
        )
    }


    return (
        <div className="mealInfoPage">

            {/* Back Button */}

            <button
                className="backButton"
                onClick={() => navigate(-1)}
            >
                ← Back to Recipes
            </button>


            {/* Main Recipe Section */}

            <div className="mealInfo">

                {/* Image */}

                <div className="mealInfoImage">

                    <img
                        src={info.strMealThumb}
                        alt={info.strMeal}
                    />

                </div>


                {/* Basic Information */}

                <div className="info">

                    <span className="category">
                        {info.strCategory}
                    </span>

                    <h1>
                        {info.strMeal}
                    </h1>

                    <p className="cuisine">
                        🌍 {info.strArea} Cuisine
                    </p>

                    <p className="shortText">
                        Discover how to prepare this delicious&nbsp;
                        {info.strArea} dish.
                    </p>

                    {info.strYoutube && (

                        <a
                            href={info.strYoutube}
                            target="_blank"
                            rel="noreferrer"
                            className="videoButton"
                        >
                            ▶ Watch Recipe Video
                        </a>

                    )}

                </div>

            </div>


            {/* Ingredients */}

            <div className="recipeSection">

                <h2>
                    🥘 Ingredients
                </h2>

                <div className="ingredients">

                    {ingredients.map((item, index) => (

                        <div
                            className="ingredientItem"
                            key={index}
                        >

                            <div className="ingredientNumber">
                                {index + 1}
                            </div>

                            <div>
                                <strong>
                                    {item.ingredient}
                                </strong>

                                <p>
                                    {item.measure}
                                </p>
                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* Instructions */}

            <div className="recipeSection instructionsSection">

                <h2>
                    👨‍🍳 Cooking Instructions
                </h2>

                <div className="instructions">

                    {info.strInstructions
                        .split(/\r?\n/)
                        .filter(step => step.trim() !== "")
                        .map((step, index) => (

                            <div
                                className="instruction"
                                key={index}
                            >

                                <div className="stepNumber">
                                    {index + 1}
                                </div>

                                <p>
                                    {step}
                                </p>

                            </div>

                        ))}

                </div>

            </div>

        </div>
    )
}

export default Mealinfo