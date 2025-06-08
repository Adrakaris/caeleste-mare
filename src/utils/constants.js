export const BgImage = {
    DRAGON: "/images/oyz.webp"
};

export const Link = {
    HOME: {name: "Home", href: "/"},
    STORIES: {name: "Stories", href: "/stories"},
    STORIES_BACK: {name: "Back", href: "/stories"},
    BACK: {name: "Back", href: "../"},
};

export const Links = {
    LANDING_LINKS: [Link.HOME, Link.STORIES],
    BLOG_ARTICLE: [Link.HOME, Link.STORIES_BACK],
    ALL_LINKS: [Link.HOME, Link.STORIES, Link.BACK]
};
