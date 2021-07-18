import { Card } from "react-bootstrap";
import Link from "next/link";

const CardListItem = ({ title, subtitle, date, link, mode = "normal" }) => {
  return (
    <Card className={`fj-card fj-card-list ${mode}`}>
      <div className="card-body-wrapper">
        <Card.Header className="d-flex flex-row">
          {mode === "placeholder" ? (
            <Card.Title className="card-main-title">
              Placeholder Title
            </Card.Title>
          ) : (
            <Card.Title className="card-main-title">{title}</Card.Title>
          )}
        </Card.Header>
        <Card.Body>
          {mode === "placeholder" ? (
            <Card.Text>Placeholder Subtitle</Card.Text>
          ) : (
            <Card.Text>{subtitle}</Card.Text>
          )}
          {mode === "placeholder" ? (
            <div>
              <Card.Text className="card-date">Placeholder Date</Card.Text>
            </div>
          ) : (
            <div>
              <Card.Text className="card-date">{date}</Card.Text>
            </div>
          )}
        </Card.Body>
      </div>
      {link && (
        <Link {...link}>
          <a className="card-button">Read More</a>
        </Link>
      )}
    </Card>
  );
};

export default CardListItem;
