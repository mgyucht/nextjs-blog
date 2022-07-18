import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import { getSortedPostsData, getAboutMePage } from "../lib/posts";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const aboutMePage = await getAboutMePage();
  return {
    props: {
      aboutMePage,
    },
  };
};

export default function AboutMe({
  aboutMePage,
}: {
  aboutMePage: {
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section
        className="prose"
        dangerouslySetInnerHTML={{ __html: aboutMePage.contentHtml }}
      ></section>
    </Layout>
  );
}
