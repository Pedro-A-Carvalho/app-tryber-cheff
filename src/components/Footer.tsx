import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossOrigin="anonymous"
  />;

function Footer() {
  return (
    <Navbar
      data-bs-theme="primary"
      fixed="bottom"
      data-testid="footer"
    >
      <Container>
        <Nav className="me-auto nav-bar-footer justify-content-around">
          <Navbar.Brand
            href="/drinks"
            data-testid="drinks-bottom-btn"
          >
            <img
              src="src/images/drinkIcon.svg"
              width="30"
              height="30"
              alt="Ícone de bebidas"
            />
          </Navbar.Brand>
          <Navbar.Brand
            href="/meals"
            data-testid="meals-bottom-btn"
          >
            <img
              src="src/images/mealIcon.svg"
              width="30"
              height="30"
              alt="Ícone de comidas"
            />
          </Navbar.Brand>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Footer;
