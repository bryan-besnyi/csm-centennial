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
  return (
    <>
      <h1>{story.fields.title}</h1>
      <p>
        <em>{story.fields.subtitle}</em>
      </p>
    </>
  );
}
