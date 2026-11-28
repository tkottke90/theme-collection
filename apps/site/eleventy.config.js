export default function () {
  return {
    // The site is deployed under <host>/themes/ (see release.yml), so every
    // internal link goes through the `url` filter.
    pathPrefix: "/themes/",
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
