import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import CommonSection from "./CommonSection";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuth from "../redux/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0); 
  const [userRating, setUserRating] = useState(null); 
  const [averageRating, setAverageRating] = useState(0); 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(db, "recipes", id);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          const recipeData = recipeSnap.data();
          setRecipe(recipeData);

          const ratings = recipeData.ratings || [];
          setRecipe((prevState) => ({ ...prevState, ratings }));

          const userRatingData = ratings.find((rating) => rating.userId === currentUser?.uid);
          if (userRatingData) {
            setUserRating(userRatingData.rating);
            setRating(userRatingData.rating); 
          }

          calculateAverageRating(ratings); 
        } else {
          toast.error("Recipe not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        toast.error("An error occurred while fetching the recipe");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate, currentUser]);

  const calculateAverageRating = (ratings) => {
    if (ratings.length > 0) {
      const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      setAverageRating(total / ratings.length);
    } else {
      setAverageRating(0);
    }
  };

  const handleStarClick = (newRating) => {
    setRating(newRating); 
  };

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, {
        ratings: arrayUnion({ userId: currentUser.uid, rating })
      });

      toast.success("Thank you for your rating!");
      setUserRating(rating);
      calculateAverageRating([...recipe.ratings, { userId: currentUser.uid, rating }]);
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("An error occurred while submitting your rating");
    }
  };

  const renderStars = (userRatingState) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= userRatingState ? 'selected' : ''}`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="fullload"><div className="loader"></div></div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const { title, categories, instructions, ingredients, imgUrl, youtubeLink } = recipe;

  const instructionListItems = instructions.split('\n').map((instruction, index) => (
    <li key={index}>{instruction}</li>
  ));

  const extractYouTubeId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = youtubeLink ? extractYouTubeId(youtubeLink) : null;

  return (
    <>
      <CommonSection className="commsect" title={title} hideOnMobile={true} />
      <section className="pt-0 product-details">
        <Container>
          <Row className="space">
            <Col className="padddd" lg="9">
              <div className="image recipe-img">
                <img src={imgUrl} alt={title} />
              </div>
              <div className="context">
                <h1 className="recipe_title">{title}</h1>
                <div className="categories">
                  {categories.map((cat, index) => (
                    <h3 key={index}>{cat}</h3>
                  ))}
                </div>
                <ol className="ollo">{instructionListItems}</ol>
              </div>
              {videoId && (
                <div className="youtube-video">
                  <h4>➣ Watch the Recipe Video:</h4>
                  <iframe
                    width="100%"
                    height="500px"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Recipe Video"
                  ></iframe>
                </div>
              )}
            </Col>
            <Col lg="3">
              <div className="island">
                <h4>Ingredients:</h4>
                {ingredients.map((ingredient, index) => (
                  <p key={index}><span className="dot">• </span>{ingredient}</p>
                ))}
              </div>

              <div className="rating recipe-detail-rating">
                <h4>Average Rating:</h4>
                <div className="average-rating recipe-detail-average">
                  {renderStars(averageRating)} 
                  <div className="average-number recipe-detail-number">({averageRating.toFixed(1)})</div>
                </div>
              </div>

              <div className="rating recipe-detail-rating">
                {userRating ? (
                  <p>Your Rating: {userRating}</p>
                ) : (
                  <>
                    <h4>Give Your Rating:</h4>
                    <div className="user-rating">
                      {renderStars(rating)} 
                    </div>
                    <Button className="rate-btn" color="primary" onClick={handleRatingSubmit}>
                      Submit Rating
                    </Button>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
