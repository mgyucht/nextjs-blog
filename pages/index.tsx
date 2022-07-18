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

      <section className="prose">
        Welcome to my corner of the internet. Every so often, I get obsessed
        with something and spend a month or two thinking deeply about it. This
        time, it was making a website. Take a look at my blog to find out about
        what I am currently sinking my teeth into.
      </section>
    </Layout>
  );
}
