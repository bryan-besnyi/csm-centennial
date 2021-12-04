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
  console.log(story);
  return (
    <>
      <h1>
        {story.fields.title} <small>({story.fields.slug})</small>
      </h1>
      <p>
        Subtitle: <em>{story.fields.subtitle}</em>
      </p>
      <p>
        Image:
        <br />
        <img
          src={story.fields.image[0].fields.image.fields.file.url}
          alt={
            story.fields.image[0].fields.caption2.content[0].content[0].value
          }
        />
      </p>
      <p>
        Full Story: <br />
        {story.fields.fullStory.content[0].content[0].value}
      </p>
    </>
  );
}
