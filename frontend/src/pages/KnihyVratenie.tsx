import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface books {
  _id: string;
  name: string;
  author: string;
  history: {
    idStud: string;
    date_burrow: string;
    last_date_to_return: string;
    date_return: string;
  };
}

const returnBook = (id: string, idStud: string) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/books/returnBook/${id}/${idStud}`)
    .then((response) => response.data);
};

const KnihyVratenie = () => {
  const [data, setData] = useState<books[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books/getLendBooks/${id}`)
      .then((response) => setData(response.data));
    setLoaded(true);
  }, [loaded, id]);

  return (
    <Container fluid>
      <Table striped>
        <thead>
          <tr>
            <th>Nazov</th>
            <th>Spisovatel</th>
            <th>Moznosti</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: books, index) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      returnBook(item._id, item.history.idStud);
                      setLoaded(false);
                    }}
                  >
                    Vratit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default KnihyVratenie;
