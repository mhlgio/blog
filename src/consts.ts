import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Mateusz Haligowski",
  DESCRIPTION:
    "Notes, projects, and technical writing from Mateusz Haligowski.",
  EMAIL: "mhaligowski@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "Notes, projects, and technical writing from Mateusz Haligowski.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Notes on software, infrastructure, systems, and the web.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of projects, experiments, and shipped work.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/mhlgio",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/mhaligowski",
  },
  {
    NAME: "Bluesky",
    HREF: "https://bsky.app/profile/matehal.bsky.social",
  },
  {
    NAME: "Email",
    HREF: `mailto:${SITE.EMAIL}`,
  },
];
