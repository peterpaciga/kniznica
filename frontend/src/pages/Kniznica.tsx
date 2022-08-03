import CustomCard from "../components/CustomCard";
import { Container } from "react-bootstrap";
import "../styles.css";
import ModalWindowAddStudent from "../components/ModalAddStudent";
import ModalWindowAddBook from "../components/ModalAddBook";
import { useParams } from "react-router-dom";

const Kniznica = () => {
  const { id } = useParams();

  return (
    <Container fluid>
      <div className="row">
        <ModalWindowAddStudent id={id} />
        <CustomCard
          link={`/studentiKniznice/${id}`}
          tittleText="Studenti"
          cText="Zobrazenie zoznamu studentov patriacich do kniznice"
        />
        <CustomCard
          link={`/studentNovyKniznica/${id}`}
          tittleText="Studenti"
          cText="Zobrazenie zoznamu studentov nepratraciach do nasej kniznice"
        />
      </div>
      <div className="row">
        <ModalWindowAddBook idlib={id} />
        <CustomCard
          link={`/knihy/${id}`}
          tittleText="Knihy"
          cText="Zobrazenie zoznamu knih aktualne dostupnych do kniznice"
        />
        <CustomCard
          link={`/knihyVratenie/${id}`}
          tittleText="Knihy"
          cText="Zobrazenie zoznamu knih aktualne pozicanych z kniznice"
        />
      </div>
    </Container>
  );
};

export default Kniznica;
