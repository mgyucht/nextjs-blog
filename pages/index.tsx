import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import { getSortedPostsData, getAboutMePage } from "../lib/posts";
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="text-base">
        Welcome to my corner of the internet.
      </section>
    </Layout>
  );
}
