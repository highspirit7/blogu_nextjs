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

export const BlogList = ({ data = [], filter, isLoadingMore }) => {
  return data.map((blog) =>
    filter.view.list ? (
      <Col key={`${blog.slug}-list`} md="9">
        <CardListItem
          author={blog.author}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LLL")}
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
          date={moment(blog.date).format("LLL")}
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
  const { error, size, setSize, posts, isLoadingMore, isReachingEnd } =
    useGetBlogsPages({ filter });

  if (error) return <h1>Something went wrong!</h1>;
  if (!posts) return <h1>Loading...</h1>;

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
          <BlogList
            data={posts || [blogs]}
            filter={filter}
            isLoadingMore={isLoadingMore}
          />
        </Row>
        {isLoadingMore ? (
          <Row className="mb-5">
            {Array(3)
              .fill(0)
              .map((_, i) =>
                filter.view.list ? (
                  <Col key={i} md="9">
                    <CardListItemSkeleton />
                  </Col>
                ) : (
                  <Col key={`${i}-item`} md="4">
                    <CardItemSkeleton />
                  </Col>
                ),
              )}
          </Row>
        ) : (
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
        )}
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
