import { Badge } from "react-bootstrap";
import Link from "next/link";

import styles from "./Categories.module.scss";

const Categories = ({ categories = [], setFilter, setPageSize }) => {
  return (
    <div className={styles.categoriesWrapper}>
      <div className={styles.title}>Categories</div>
      <ul className="p-0">
        {categories.map((category, i) => (
          <li className={styles.item} key={category + i}>
            <Link
              href={
                category.title === "All" ? "/" : `/?category=${category.title}`
              }
            >
              <a
                onClick={(e) => {
                  setFilter({ category: category.title });
                  setPageSize(1);
                }}
              >{`${category.title} (${i})`}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
