import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import { getSortedPostsData } from "../lib/posts";
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
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="prose">
        <p>
          I'm Miles Yucht, a staff software engineer and engineering manager at
          Databricks. I've been working at Databricks since 2015; before then, I
          was a student at Princeton University, where I concentrated in
          Computer Science.
        </p>
        <p>
          At Databricks, I've worked on tech across the gamut. I've worked on
          deployment tooling, building the first application deployment pipeline
          for Databricks as well as leading contributions to the main Databricks
          Python wrapper around kubectl. On the user-facing side, I've also
          worked on UX for payment instrument management, using Backbone and
          React to implement PCI-compliant handling of customer credit card
          data. However, for the most part, I have primarily focused on the
          backend systems supporting account management, like sign up,
          cancellation and tier selection, and cluster usage tracking, ensuring
          that Databricks accurately measures cluster usage, displays said usage
          to customers, and integrates with our finance team and cloud
          marketplaces to bill customers accurately for their consumtion on the
          product.
        </p>
        <p>
          Since 2017, I've served as tech lead on the various teams I've been
          on. I've mentored junior teammates, helping to refine their technical
          skills and ways of thinking to effectively contribute to our team,
          company and customers, and set up or managed multiple initiatives to
          encourage engineers to share their ideas with the broader engineering
          organization in the form of tech council meetings or brown-bag lunch
          demos. I have led roadmap planning initiatives for teams up to 10
          people in size, working with our product team to refine product
          requirements, scope out large areas of work on the order of several
          person-years of effort, make tradeoffs between high-priority
          initiatives and communicate those tradeoffs effectively to
          stakeholders from all sides of the company.
        </p>
        <p>
          Since April 2019, I've led the Billing and Usage Infrastructure team
          based in Amsterdam. This team focuses on customer-facing observability
          in the form of the billing and audit logging pipelines.
        </p>
      </section>
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
