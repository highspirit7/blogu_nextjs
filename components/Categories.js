import { Badge } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const Categories = () => {
  const badgeTypes = ["primary", "success", "warning", "info"];

  return (
    <div className="sc-lhVmIH dFeMJs">
      <div className="title">태그 목록</div>
      <ul>
        <li className="sc-bYSBpT bYDAgL">
          <a href="/@pyk0844">전체보기</a>
          <span>(4)</span>
        </li>
        <li className="sc-bYSBpT cyARva">
          <a href="/@pyk0844?tag=IT트렌드">IT트렌드</a>
          <span>(3)</span>
        </li>
        <li className="sc-bYSBpT bYDAgL">
          <a href="/@pyk0844?tag=개발-정보">개발 정보</a>
          <span>(2)</span>
        </li>
        <li className="sc-bYSBpT bYDAgL">
          <a href="/@pyk0844?tag=기타-정보">기타 정보</a>
          <span>(1)</span>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
