import React, { useEffect, useState } from "react";
import Link from "next/link";

const CategoryItem = ({ title, count, setFilter, setPageSize }) => {
  return (
    <li className="category-item">
      <Link href={title === "All" ? "/" : `/?category=${title}`}>
        <a
          onClick={(e) => {
            setFilter({ category: title });
            setPageSize(1);
          }}
        >{`${title} (${count})`}</a>
      </Link>
    </li>
  );
};

export default CategoryItem;
