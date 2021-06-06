import { Row, Col, Media, Image } from "react-bootstrap";

const AuthorIntro = () => (
  <Row>
    <Col md="8">
      {/* AUTHOR INTRO STARTS */}
      <Media className="mb-4 admin-intro">
        <Image
          roundedCircle
          width={64}
          height={64}
          className="mr-3"
          src="/me.png"
          alt="blog_author_profile_image"
        />
        <Media.Body>
          <h5 className="font-weight-bold mb-0">안녕하세요</h5>
          <p className="welcome-text">
            30대가 되어서 개발 공부를 시작하였습니다. 항상 자신의 부족한 점을
            바라볼 줄 알고, 매일매일 성장했는지에 대한 의문을 던지는 개발자가
            되고 싶습니다. 개발뿐만 아니라 독서 등을 통한 자기 계발에 관심이
            많습니다.
          </p>
        </Media.Body>
      </Media>
      {/* AUTHOR INTRO ENDS */}
    </Col>
  </Row>
);

export default AuthorIntro;
