import CustomCard from "../components/CustomCard";
import "../styles.css";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container fluid>
      <div className="row">
        <CustomCard
          link="/kniznice"
          tittleText="Kniznice"
          cText="Zobrazenie zoznamu kniznic v systeme"
        />
        <CustomCard
          link="/studenti"
          tittleText="Studenti"
          cText="Zobrazenie zoznamu studentov v systeme"
        />
      </div>
    </Container>
  );
};

export default Home;
