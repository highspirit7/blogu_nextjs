import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import useSWR from "swr";
import moment from "moment";
import { withRouter } from "next/router";

import AuthorIntro from "components/AuthorIntro";
import PageLayout from "components/PageLayout";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";
import ViewChangeButton from "components/ViewChangeButton";
import CardItemSkeleton from "components/CardItemSkeleton";
import CardListItemSkeleton from "components/CardListItemSkeleton";
import PreviewAlert from "components/PreviewAlert";
import CategoryList from "components/Category/CategoryList/CategoryList";
import BlogArticleListItem from "components/BlogArticleListItem/BlogArticleListItem";

import { useGetBlogsPages } from "actions/pagination";
import {
  getPaginatedBlogs,
  getAllCategories,
  getAllCategoriesOfBlogs,
} from "lib/api";

export const BlogList = ({ data = [] }) => {
  return data.map((blog) => (
    <BlogArticleListItem
      key={`${blog.slug}-list`}
      title={blog.title}
      subtitle={blog.subtitle}
      date={moment(blog.date).format("LL")}
      link={{
        href: "/blogs/[slug]",
        as: `/blogs/${blog.slug}`,
      }}
      image={blog.coverImage}
    />
  ));
};

function Home({ blogs, preview, categories, router }) {
  const [filter, setFilter] = useState({ category: "All" });
  // const [offset, setOffset] = useState(0);
  const {
    error,
    size,
    setSize,
    posts,
    isLoadingMore,
    isReachingEnd,
    isValidating,
  } = useGetBlogsPages({ filter });

  if (error) return <h1>Something went wrong!</h1>;
  // if (!posts) return <h1>Loading...</h1>;
  // if (categories[0].title !== "All") categories.unshift({ title: "All" });
  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />

      {/* <ViewChangeButton
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
          setSize(size);
        }}
      /> */}
      <hr className="hr" />
      <div className={`page-wrapper`}>
        <Row className="mb-5">
          <Col md="3">
            <CategoryList
              categories={categories}
              setFilter={setFilter}
              setPageSize={setSize}
            />
          </Col>
          <Col md="9">
            <BlogList data={posts || blogs} />
            {/* 아래와 같이 스켈레톤 넣으면 date로 sorting 변경 할 때는 현재 보고 있는 블로그 포스팅 숫자에서 3개가 더 스켈레톤이 생겼다가 다시 사라지게 된다. 나중에 date 정렬 기능은 없앨 계획이라 일단 이렇게 내버려두기로 함. */}
            {/* {isValidating &&
              Array(3)
                .fill(0)
                .map((_, i) =>
                  filter.view.list ? (
                    <Col key={i} md="9">
                      <CardListItemSkeleton />
                    </Col>
                  ) : (
                    <Col key={`${i}-item`} lg="4" md="6">
                      <CardItemSkeleton />
                    </Col>
                  ),
                )} */}
          </Col>
        </Row>
        <div style={{ textAlign: "center" }} className="load-more-btn">
          <Button
            onClick={() => {
              setSize(size + 1);
            }}
            disabled={isReachingEnd}
            size="lg"
            variant="outline-secondary"
          >
            {isReachingEnd ? "No more blogs" : "Load more"}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}

export default withRouter(Home);

// Static Page
// Faster, can be cached using CDN
// Created at build time
// When we making the request we are always receiving the same html document
export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({
    offset: 0,
    category: "All",
  });
  const categories = await getAllCategories();
  const result = await getAllCategoriesOfBlogs();

  const categoriesWithCount = categories.map((data) => {
    return { ...data, count: 0 };
  });

  result.forEach((data) => {
    const index = categoriesWithCount.findIndex(
      (category) => category.title === data.category,
    );
    const { count } = categoriesWithCount[index];
    categoriesWithCount[index].count = count + 1;
    // console.log(
    //   `category : ${categoriesWithCount} / count : ${categoriesWithCount[index].count}`,
    // );
  });

  categoriesWithCount.unshift({ count: result.length, title: "All" });

  return {
    props: {
      blogs,
      preview,
      categories: categoriesWithCount,
    },
    revalidate: 1,
  };
}

// Dynamic Page
// Created at request time (we can fetch data on server)
// Little bit slower, the time depends on data you are fetching
// export async function getServerSideProps() {
//   const randomNum = Math.random();
//   const blogs = await getAllBlogs();
//   return {
//     props: {
//       blogs,
//       randomNum,
//     },
//   };
// }
