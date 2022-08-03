import { Table, Button, ButtonGroup, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalLendBook from "../components/ModalLendBook";
import { useParams } from "react-router-dom";

interface books {
  _id: string;
  name: string;
  author: string;
}

const deleteBook = (id: string) => {
  axios.post(`${process.env.REACT_APP_API_URL}/books/delete/${id}`);
};

const Knihy = () => {
  const [data, setData] = useState<books[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books/booksToLend/${id}`)
      .then((response) => setData(response.data));
    setLoaded(true);
  }, [loaded, id]);

  return (
    <Container fluid>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Nazov</th>
              <th>Spisovatel</th>
              <th>Moznosti</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: books) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <ModalLendBook
                        id={id}
                        idBook={item._id}
                        change={setLoaded}
                      />
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteBook(item._id);
                          setLoaded(false);
                        }}
                      >
                        Vylucit knihu
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

export default Knihy;
