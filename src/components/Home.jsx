import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ProductsList from "./RecipesList";
import useGetData from "../redux/useGetData";
import heroimg from "../assets/images/heroimg.png";
import tasty from "../assets/images/tastyim.png";
import thinking from "../assets/images/thinking.png";
import lesf from "../assets/images/leaf.png";
import spices from "../assets/images/spices.png";
import spice1 from "../assets/images/spice1.png";
import spice2 from "../assets/images/spice2.png";
import spice3 from "../assets/images/spice3.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/recipes");
  };


  const { data: products, loading } = useGetData("recipes");
  const limitedProducts = products?.slice(0, 6);

  return (
    <>
      <section className="hero__section banner">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <p className="hero_subtitle">FOODS WITH RECIPES</p>
                <div className="h21">
                  <h2>
                    GOOD <img src={tasty} alt="" /> TASTE
                  </h2>
                </div>
                <div className="h21 mt-0">
                  <h2 className="colchange">
                    GOOD <img src={thinking} alt="" /> SENSE
                  </h2>
                </div>
                <p>
                  Discover delicious recipes and culinary inspiration to
                  elevate your cooking experience. Let's get cooking!
                </p>
                <div className="buttoon" onClick={handleExploreClick}>Explore</div>
              </div>
            </Col>
            <Col className="dffd" lg="6">
              <img src={heroimg} alt="" className="heroimg" />
              <img src={spice1} alt="" className="hoverimg" />
              <img src={lesf} alt="" className="hoverimg2" />
              <img src={lesf} alt="" className="hoverimg3" />
              <img src={spices} alt="" className="hoverimg5" />
              <img src={spice2} alt="" className="hoverimg6" />
              <img src={spice3} alt="" className="hoverimg7" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="trending__products">
        <Container>
          <Row className="ddffd">
            <Col lg="12" className="text-center">
              <h2 className="section__title">Try these !!</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <>
                <ProductsList data={limitedProducts} />
                <Col lg="12" className="text-center d-flex justify-content-center mt-4">
                  <button
                    className="buttoon see-btn"
                    onClick={handleExploreClick}
                  >
                    See More
                  </button>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
