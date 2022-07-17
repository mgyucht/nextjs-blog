import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import { getSortedPostsData, getAboutMePage } from "../lib/posts";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const aboutMePage = await getAboutMePage();
  return {
    props: {
      allPostsData,
      aboutMePage,
    },
  };
};

export default function Home({
  allPostsData,
  aboutMePage,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
  aboutMePage: {
    contentHtml: string;
  };
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section
        className="prose"
        dangerouslySetInnerHTML={{ __html: aboutMePage.contentHtml }}
      ></section>
      <section className="text-base pt-12">
        <h2 className="text-3xl font-bold pb-4">Blog</h2>
        <ul className="list-none">
          {allPostsData.map(({ id, date, title }) => (
            <li className="pb-4" key={id}>
              <Link href={`/posts/${id}`}>
                <a className="text-xl hover:underline text-sky-500">{title}</a>
              </Link>
              <br />
              <small className="text-slate-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
