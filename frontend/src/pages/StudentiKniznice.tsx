import { Table, Button, ButtonGroup, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditStud from "../components/ModalEditStud";

interface dataStudent {
  _id: string;
  rodCislo: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
}

const removeStudFromLibrary = (idStud: string, id: string | undefined) => {
  axios.post(
    `${process.env.REACT_APP_API_URL}/students/removeFromLib/${id}/${idStud}`
  );
};

const StudentiKniznice = () => {
  const { id } = useParams();
  const [data, setData] = useState<dataStudent[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/getStudOfLib/${id}`)
      .then((response) => setData(response.data));
    setLoaded(true);
  }, [loaded]);

  return (
    <Container fluid>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Rodne cislo</th>
              <th>Meno</th>
              <th>Prizvisko</th>
              <th>Bydlisko</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: dataStudent, index) => {
              return (
                <tr key={item._id}>
                  <td>{item.rodCislo}</td>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <ModalEditStud id={item._id} change={setLoaded} />
                      <Button
                        variant="danger"
                        onClick={() => {
                          removeStudFromLibrary(item._id, id);
                          setLoaded(false);
                        }}
                      >
                        Vylucit
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default StudentiKniznice;
