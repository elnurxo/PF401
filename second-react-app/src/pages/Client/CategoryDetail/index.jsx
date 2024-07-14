import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});

  useEffect(() => {
    fetch(`https://northwind.vercel.app/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory({ ...data });
      });
  }, [id]);

  return (
    <>
      <h2>Category Detail Page</h2>
      <h3>name: {category.name}</h3>
      <h3>description: {category.description}</h3>
      <h4>id: {category.id}</h4>
      <button
        onClick={() => {
          navigate('/categories');
        }}
      >
        go back
      </button>
    </>
  );
};

export default CategoryDetail;
