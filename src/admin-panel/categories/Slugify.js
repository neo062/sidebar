const slugify = (string) => {
    return string
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s_' "]+/g, '-') // Replace spaces, underscores, and apostrophes with hyphens
        .replace(/[^\w-]+/g, '') // Remove all non-word characters except hyphens
        .replace(/--+/g, '-'); // Replace multiple hyphens with a single hyphen
}
export default slugify;