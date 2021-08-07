import { Row, Col } from "react-bootstrap";
import { urlFor } from "lib/api";
import Link from "next/link";

const BlogArticleListItem = ({ title, subtitle, date, link, image }) => {
  return (
    <Row className="article">
      {image && (
        <Col md="3" className="pt-4 pb-4">
          <div>
            <img
              alt={`${title}_thumbnail_image`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={urlFor(image)
                .format("png")
                .size(180, 140)
                .crop("center")
                .fit("crop")
                .url()}
            />
          </div>
        </Col>
      )}

      <Col
        md={image ? "9" : "12"}
        className="pt-4 pb-4 d-flex flex-column justify-content-around"
      >
        <Link {...link}>
          <a className="article-title">{title}</a>
        </Link>

        <p className="article-subtitle">{subtitle}</p>
        <div className="mt-6 d-flex justify-content-between align-content-center">
          <time>{date}</time>
          <Link {...link}>
            <a className="read-more">Read More →</a>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default BlogArticleListItem;
