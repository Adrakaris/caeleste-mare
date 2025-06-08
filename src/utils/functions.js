export function sortPostsByDateDesc(posts) {
    return posts.slice().sort((a, b) => {
        const getDate = post => 
            new Date(post.frontmatter.updateddate || post.frontmatter.date);
        return getDate(b) - getDate(a);
    });
}