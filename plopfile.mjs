export default function (plop) {
  plop.setHelper("today", () => new Date().toISOString().slice(0, 10));

  plop.setGenerator("post", {
    description: "Create a new blog post",
    prompts: [
      {
        type: "input",
        name: "title",
        message: "Title",
      },
      {
        type: "input",
        name: "description",
        message: "Description",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/content/blog/{{kebabCase title}}/index.md",
        templateFile: "plop-templates/post.hbs",
      },
    ],
  });
}
