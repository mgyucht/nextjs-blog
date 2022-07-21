import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/layout";
import Date from "../../components/date";
import { getSortedPostsData, getAboutMePage } from "../../lib/posts";
import { GetStaticProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

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
    preview: boolean;
  }[];
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-base">
        <ul className="list-none">
          {allPostsData.map(({ id, date, title, preview }) => (
            <li className="pb-4" key={id}>
              {preview && <><FontAwesomeIcon icon={faTriangleExclamation} />{" "}</>}
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
