import CategoryItem from "../CategoryItem/CategoryItem";

const CategoryList = ({ categories = [], setFilter, setPageSize }) => {
  return (
    <div className="category-list-wrapper">
      <div className="title">Categories</div>
      <ul className="p-0">
        {categories.map((category, i) => (
          <CategoryItem
            key={category + i}
            title={category.title}
            count={category.count}
            setFilter={setFilter}
            setPageSize={setPageSize}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
