import "./Create.css";

import { React, useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();
  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + "minutes",
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);
  return (
    <div className="create">
      <h2 className="page-title">Add a new Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title: </span>
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        ></input>

        {/* ingredient go here */}
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            ></input>
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>
        <label>Recipe method: </label>
        <textarea
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required
        ></textarea>
        <label>Cooking time: </label>
        <input
          type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
        ></input>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Create;
