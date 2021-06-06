// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { Row, Col } from "react-bootstrap";

import AuthorIntro from "components/AuthorIntro";
import PageLayout from "components/PageLayout";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

export default function Home() {
  return (
    <PageLayout>
      <AuthorIntro />

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
