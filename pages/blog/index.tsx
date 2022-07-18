import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/layout";
import Date from "../../components/date";
import { getSortedPostsData, getAboutMePage } from "../../lib/posts";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-base">
        <ul className="list-none">
          {allPostsData.map(({ id, date, title }) => (
            <li className="pb-4" key={id}>
              <Link href={`/blog/${id}`}>
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
