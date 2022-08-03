import { Card as BootstrapCard } from "react-bootstrap";
import { Link } from "react-router-dom";

interface props {
  link: string;
  tittleText: string;
  cText: string;
}

const CustomCard = ({ link, tittleText, cText }: props) => {
  return (
    <div className="cardx" style={{ width: "20rem", height: "20rem" }}>
      <Link to={link} style={{ textDecoration: "none" }}>
        <BootstrapCard
          bg="success"
          key="Success"
          text="dark"
          style={{ width: "18rem", height: "18rem" }}
          className="mb-2"
        >
          <BootstrapCard.Body>
            <BootstrapCard.Title
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              {tittleText}
            </BootstrapCard.Title>
            <BootstrapCard.Text
              style={{ textAlign: "center", marginTop: "3rem" }}
            >
              {cText}
            </BootstrapCard.Text>
          </BootstrapCard.Body>
        </BootstrapCard>
      </Link>
    </div>
  );
};

export default CustomCard;
