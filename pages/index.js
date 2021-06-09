// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { Row, Col } from "react-bootstrap";

import AuthorIntro from "components/AuthorIntro";
import PageLayout from "components/PageLayout";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

import { getAllBlogs } from "lib/api";

export default function Home({ blogs }) {
  return (
    <PageLayout>
      <AuthorIntro />
      <hr />
      {JSON.stringify(blogs)}
      <div className={`page-wrapper`}>
        <Row className="mb-5">
          <Col md="10">
            <CardListItem />
          </Col>

          <Col md="4">
            <CardItem />
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const blogs = await getAllBlogs();
  return {
    props: {
      blogs,
    },
  };
}
