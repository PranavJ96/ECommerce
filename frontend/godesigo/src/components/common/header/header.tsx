import {Container, Navbar, Text, Button, Dropdown} from '@nextui-org/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/Header.module.scss';
import IconButton from "@mui/material/IconButton";
export default function HeaderComponent() {
  return (
      <Navbar>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Ecommerce
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="md">
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/contact">Contact Us</Navbar.Link>
          <Navbar.Link href="/addproduct">Add Product</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          {/* <Dropdown>
            <Dropdown.Button flat>Theme</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="Light">Light</Dropdown.Item>
              <Dropdown.Item key="Dark">Dark</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <Navbar.Item>
            <Button auto flat >
              <Navbar.Link href="/login">Login/SignUp</Navbar.Link>
            </Button>
          </Navbar.Item>
          <Navbar.Item>
          <IconButton aria-label="Cart" size="large"  href="/login">
              <ShoppingCartIcon fontSize="large" className={styles.headerShoppingIcon} />
          </IconButton>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
  )
}
