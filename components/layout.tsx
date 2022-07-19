import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const name = "Miles Yucht";
export const siteTitle = "Miles Yucht - Staff Software Engineer & Manager";

type NavBarEntry = {
  title: string;
  link: string;
};

const NAV_BAR_ENTRIES: NavBarEntry[] = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about-me" },
  { title: "Blog", link: "/blog" },
];

function isOnPage(currentPath: string, link: string): boolean {
  if (link === "/") {
    return currentPath === link;
  }
  return currentPath.startsWith(link);
}

function getNavBar(currentPath: string) {
  const elements = NAV_BAR_ENTRIES.map(({ title, link }) => {
    const isCurrentPath = isOnPage(currentPath, link);
    const className = classNames("mx-2", "font-light", {
      underline: isCurrentPath,
      "underline-offset-4": isCurrentPath,
    });
    return (
      <li className={className} key={link}>
        <Link href={link}>
          <a>{title}</a>
        </Link>
      </li>
    );
  });
  return (
    <nav className="flex flex-col items-center mb-12">
      <ul className="flex">{elements}</ul>
    </nav>
  );
}

type FooterEntry = {
  brand: IconDefinition;
  link: string;
};

const FOOTER_ENTRIES: FooterEntry[] = [
  { brand: faTwitter, link: "https://twitter.com/MilesYucht" },
  { brand: faGithub, link: "https://github.com/mgyucht" },
  { brand: faLinkedin, link: "https://www.linkedin.com/in/milesyucht/" },
];

function getFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center">
      <div className="py-2">
        {FOOTER_ENTRIES.map(({ brand, link }) => {
          return (
            <a href={link} target="_blank" rel="noreferrer" key={link}>
              <FontAwesomeIcon
                icon={brand}
                size="2x"
                className="px-2 transition-colors hover:text-sky-500"
              />
            </a>
          );
        })}
      </div>
      <div className="text-xs py-2">
        &copy; {currentYear} Miles Yucht. All Rights Reserved
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <div className="max-w-prose mx-auto mt-14 mb-3 font-sans">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        <>
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/profile-photo.jpeg"
                className="rounded-full"
                height={108}
                width={108}
                alt={name}
              />
            </a>
          </Link>
          <h2 className="text-2xl font-semibold my-4">
            <Link href="/">
              <a>{name}</a>
            </Link>
          </h2>
        </>
      </header>
      {getNavBar(currentPath)}
      <main className="pb-8">{children}</main>
      {getFooter()}
    </div>
  );
}
