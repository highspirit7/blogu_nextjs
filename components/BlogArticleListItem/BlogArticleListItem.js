import { Row, Col } from "react-bootstrap";
import { urlFor } from "lib/api";
import Link from "next/link";

import styles from "./BlogArticleListItem.module.scss";

const BlogArticleListItem = ({ title, subtitle, date, link, image }) => {
  return (
    <Row className={styles.article}>
      <Col md="3" className="pt-4 pb-4">
        <div>
          <img
            alt={`${title}_thumbnail_image`}
            src={
              image
                ? urlFor(image)
                    .format("png")
                    .size(180, 140)
                    .crop("center")
                    .fit("crop")
                    .url()
                : "https://via.placeholder.com/200x160"
            }
          />
        </div>
      </Col>
      <Col
        md="9"
        className="pt-4 pb-4 d-flex flex-column justify-content-around"
      >
        <Link {...link}>
          <a className={styles.articleTitle}>{title}</a>
        </Link>

        <p className={styles.articleSubtitle}>{subtitle}</p>
        <div className="mt-6 d-flex justify-content-between align-content-center">
          <time>{date}</time>
          <Link {...link}>
            <a className={styles.readMore}>Read More →</a>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default BlogArticleListItem;
