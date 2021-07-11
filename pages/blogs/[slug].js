import PageLayout from "components/PageLayout";
import BlogHeader from "components/BlogHeader";
import BlogContent from "components/BlogContent";
import PreviewAlert from "components/PreviewAlert";

import { Row, Col, Spinner } from "react-bootstrap";
import moment from "moment";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import { getAllBlogs, getBlogBySlug, urlFor, getPaginatedBlogs } from "lib/api";

const BlogDetail = ({ blog, preview }) => {
  const router = useRouter();

  if (!blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }

  if (router.isFallback) {
    return (
      <PageLayout className="blog-detail-page flex-grow-1 d-flex align-items-center justify-content-center">
        <Spinner
          animation="border"
          variant="info"
          style={{ width: "3rem", height: "3rem" }}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview && <PreviewAlert />}
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            author={blog.author}
            date={moment(blog.date).format("LLL")}
          />
          <hr />
          {blog.content && <BlogContent content={blog.content} />}
        </Col>
      </Row>
    </PageLayout>
  );
};

/**
 * reference
 * https://nextjs.org/docs/advanced-features/preview-mode
 */
export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);

  return {
    props: { blog, preview },
  };
}

export async function getStaticPaths() {
  /**
   * reference
   * https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
   */

  const blogs = await getPaginatedBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));

  return {
    paths,
    fallback: true,
  };
}

export default BlogDetail;
