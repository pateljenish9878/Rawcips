import React from 'react'
import { Container } from 'reactstrap'

const CommonSection = ({title, hideOnMobile}) => {
  const sectionStyle = {
    display: hideOnMobile ? 'none' : 'block',
  };
  return <section style={sectionStyle} className="common__section">
      <Container className='text-center'>
        <h1>{title}</h1>
      </Container>
  </section>
}

export default CommonSection