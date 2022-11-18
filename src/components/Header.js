import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import "./styles.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="light" variant="light" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Nav.Link href="/">
            <img
              class="logo" src="https://www.freelogovectors.net/wp-content/uploads/2021/02/myntra-logo-freelogovectors.net_.png"
              width="50"
              height="40"
            />
          </Nav.Link>
        </Navbar.Brand>
        <Nav className="head-items">
          <Nav.Link href="/">MEN</Nav.Link>
          <Nav.Link href="/">WOMEN</Nav.Link>
          <Nav.Link href="/">KIDS</Nav.Link>
          <Nav.Link href="/">HOME & LIVING</Nav.Link>
          <Nav.Link href="/">BEAUTY</Nav.Link>
          <Nav.Link href="/">STUDIO</Nav.Link>
        </Nav>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 700 }}
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>â‚¹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <div>
          <BiUserCircle color="black" fontSize="50px" />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
