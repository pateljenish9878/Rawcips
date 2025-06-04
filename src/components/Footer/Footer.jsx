import React,{useEffect} from "react";
import './footer.css'
import { Container, Row, Col} from "reactstrap";

const Footer = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  })

  
  const year = new Date().getFullYear()
  return( <footer className="footer">
    <Container>
      <Row>
        <Col className="text-center social" lg='12'>
        <p className="socialp">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <i className="ri-linkedin-box-fill"></i>
          </a>
          <a href="https://github.com/pateljenish2021?tab=repositories" target="_blank" rel="noopener noreferrer">
          <i className="ri-github-fill"></i>
          </a>
        </p>
        </Col>
       <Col lg='12'>
          <p className="footer__copyright">Rawcipes<i className="ri-copyright-line"></i>  {year}. All rights reserved. </p>
          <p className="footer__text mt-4">Rawcipes: Your virtual culinary companion. Explore diverse recipes, from classic comfort foods to exotic delights. Elevate your cooking experience with step-by-step instructions and tantalizing flavors, all at your fingertips.</p>

        </Col>
      </Row>
    </Container>
  </footer>
  )
};

export default Footer;