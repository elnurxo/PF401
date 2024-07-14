import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch("https://northwind.vercel.app/api/categories")
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data FETCHED");
        setCategories([...data]);
      });
  }, []);

  return (
    <>
      <h3 className={styles.title}>
        Get All Categories from{" "}
        <a href="https://northwind.vercel.app/api/categories" target="_blank">
          API
        </a>
      </h3>
      <button className={styles.btn}>get all categories</button>
      <hr />
      <ul className={styles.categories}>
        {categories &&
          categories.map((cat) => {
            return <li key={cat.id}>{cat.name} <span><Link to={`/categories/${cat.id}`}>detail page</Link></span></li>;
          })}
      </ul>
      <hr />
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </>
  );
};

export default Categories;
