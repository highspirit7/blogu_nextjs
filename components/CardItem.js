import { Card } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const CardItem = ({ title, subtitle, date, image, link, mode = "normal" }) => {
  return (
    <Card className={`fj-card ${mode}`}>
      <div className="card-body-wrapper">
        <Card.Header className="d-flex flex-row border-0">
          <div>
            {mode === "placeholder" ? (
              <>
                <Card.Text className="card-date">Placeholder Date</Card.Text>
              </>
            ) : (
              <>
                <Card.Text className="card-date">{date}</Card.Text>
              </>
            )}
          </div>
        </Card.Header>
        <div className="view overlay w-100">
          {mode === "placeholder" ? (
            <div className="image-placeholder" />
          ) : image ? (
            <Card.Img
              src={urlFor(image).height(300).crop("center").fit("clip").url()}
              alt="card_image_cap"
            />
          ) : (
            <Card.Img
              src="https://via.placeholder.com/150"
              alt="placeholder_card_image"
            />
          )}
        </div>
        <Card.Body>
          {mode === "placeholder" ? (
            <>
              <Card.Title>Placeholder Title</Card.Title>
              <Card.Text>Placeholder Subtitle</Card.Text>
            </>
          ) : (
            <>
              <Card.Title className="card-main-title">{title}</Card.Title>
              <Card.Text>{subtitle}</Card.Text>
            </>
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

export default CardItem;
