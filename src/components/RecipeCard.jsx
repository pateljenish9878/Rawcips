import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { favActions } from '../redux/slices/favSlice';
import meat from "../assets/images/non-veg.png";

const RecipeCard = ({ item = {} }) => {
  const dispatch = useDispatch();

  const addToFavorites = () => {
    dispatch(
      favActions.addItem({
        id: item.id,
        title: item.title,
        category: item.category,
        instructions: item.instructions,
        imgUrl: item.imgUrl,
        ingredients: item.ingredients,
      })
    );

    toast.success('Recipe added to Favorites');
  };

  const categories = item.categories || [];

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / ratings.length;
  };

  const averageRating = calculateAverageRating(item.ratings);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "star selected" : "star"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Col lg="3" md="1" className="mb-2 grey product-card-hover pointer">
      <div className="product__item">
        <Link to={`/recipes/${item.id}`}>
          <div className="recipe__img">
            <img
              src={item.imgUrl}
              alt=""
              style={{ height: 200, objectFit: 'contain' }}
            />
             <div className="recipe-card-rating rating">
            <div>{renderStars(averageRating)}</div>
            <div className="recipe-card-number average-number">({averageRating.toFixed(1)})</div> 
          </div>
          </div>
        </Link>
        <div className="p-2 product__info">
          <Link to={`/recipes/${item.id}`}>
            <h3 className="product__name">{item.title}</h3>
          </Link>
          <div className="categories">
            {Array.isArray(categories) &&
              categories.map((category, index) => (
                <p key={index}>{category}</p>
              ))}
          </div>
        </div>
        <div className="flexend">
          <div className="last">
            <div className="veg">
              {item.vegetarian ? (
                <div className="vegetarian">
                  <i className="leaf ri-leaf-fill" /> <p>Veg</p>
                </div>
              ) : (
                <div className="non-vegetarian">
                  <img src={meat} alt="" /><p>Non-Veg</p>
                </div>
              )}
            </div>
            <div onClick={addToFavorites} className="h_a">
              <i className="helo ri-heart-add-line"></i>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RecipeCard;