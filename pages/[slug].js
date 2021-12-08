import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

let client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  let data = await client.getEntries({ content_type: "story" });

  return {
    paths: data.items.map((item) => ({
      params: {
        slug: item.fields.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let data = await client.getEntries({
    content_type: "story",
    "fields.slug": params.slug,
  });

  return {
    props: {
      story: data.items[0],
    },
  };
}

export default function Story({ story }) {
  let content = story.fields.fullStory.content;
  console.log(content);
  return (
    <>
      <h1>
        {story.fields.title} <small>({story.fields.slug})</small>
      </h1>
      <img
        src={story.fields.image[0].fields.image.fields.file.url}
        alt={story.fields.image[0].fields.caption2.content[0].content[0].value}
        style={{
          maxWidth: "300px",
          float: "right",
          marginLeft: "1em",
          marginBottom: "1em",
        }}
      />
      <p>
        <em>{story.fields.subtitle}</em>
      </p>

      <div>{content.map((item) => console.log(item))}</div>

      <div>{content.map((item) => documentToReactComponents(item))}</div>
    </>
  );
}
