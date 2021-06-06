import { Container } from "react-bootstrap";
import Navbar from "./Navbar";
// import { useTheme } from "providers/ThemeProvider";

export default function PageLayout({ children, className }) {
  // const { theme, toggleTheme } = useTheme();
  return (
    <Container>
      <Navbar />
      <div className={`page-wrapper ${className}`}>{children}</div>
      <footer className="page-footer">
        <div>
          <a href="#">courses</a>
          {" | "}
          <a href="#">github</a>
          {" | "}
          <a href="#">facebook</a>
        </div>
      </footer>
    </Container>
  );
}
