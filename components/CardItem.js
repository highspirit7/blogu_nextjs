import { Card } from "react-bootstrap";

const CardItem = () => {
  return (
    <Card className={`fj-card`}>
      <div className="card-body-wrapper">
        <Card.Header className="d-flex flex-row">
          <img
            src={"https://via.placeholder.com/150"}
            className="rounded-circle mr-3"
            height="50px"
            width="50px"
            alt="avatar"
          />
          <div>
            <Card.Title className="font-weight-bold mb-1">
              placeholder author
            </Card.Title>
            <Card.Text className="card-date">placeholder date</Card.Text>
          </div>
        </Card.Header>
        <div className="view overlay">
          <Card.Img
            src="https://via.placeholder.com/250"
            alt="card_image_cap"
          />
        </div>
        <Card.Body>
          <Card.Title className="card-main-title">placeholder title</Card.Title>
          <Card.Text>placeholder subtitle</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardItem;