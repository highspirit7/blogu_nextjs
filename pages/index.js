import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import useSWR from "swr";

import AuthorIntro from "components/AuthorIntro";
import PageLayout from "components/PageLayout";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";
import ViewChangeButton from "components/ViewChangeButton";
import CardItemSkeleton from "components/CardItemSkeleton";
import CardListItemSkeleton from "components/CardListItemSkeleton";
import PreviewAlert from "components/PreviewAlert";

import { useGetBlogsPages } from "actions/pagination";
import { getPaginatedBlogs } from "lib/api";
import moment from "moment";

export const BlogList = ({ data = [], filter }) => {
  return data.map((blog) =>
    filter.view.list ? (
      <Col key={`${blog.slug}-list`} md="9">
        <CardListItem
          author={blog.author}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LL")}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`,
          }}
        />
      </Col>
    ) : (
      <Col key={blog.slug} lg="4" md="6">
        <CardItem
          author={blog.author}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LL")}
          image={blog.coverImage}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`,
          }}
        />
      </Col>
    ),
  );
};

export default function Home({ blogs, preview }) {
  const [filter, setFilter] = useState({ view: { list: 0 }, date: { asc: 0 } });
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

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <ViewChangeButton
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
          setSize(size);
        }}
      />
      <hr />
      <div className={`page-wrapper`}>
        <Row className="mb-5">
          {/* 처음 접속 시 SSG로 생성된 블로그들을 보여주기 위한 구조 */}
          {blogs.length > posts.length ? (
            <BlogList data={blogs} filter={filter} />
          ) : (
            <BlogList data={posts} filter={filter} />
          )}
          {/* 아래와 같이 스켈레톤 넣으면 date로 sorting 변경 할 때는 현재 보고 있는 블로그 포스팅 숫자에서 3개가 더 스켈레톤이 생겼다가 다시 사라지게 된다. 나중에 date 정렬 기능은 없앨 계획이라 일단 이렇게 내버려두기로 함. */}
          {isValidating &&
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
              )}
        </Row>
        <div style={{ textAlign: "center" }}>
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

// Static Page
// Faster, can be cached using CDN
// Created at build time
// When we making the request we are always receiving the same html document
export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });

  return {
    props: {
      blogs,
      preview,
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
