import Image from "next/image";
import Head from "next/head";

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
  console.log(story);
  return (
    <>
      <Head>
        <title>
          {story.fields.title} | CSM Centennial | College of San Mateo
        </title>
      </Head>
      <h1>{story.fields.title}</h1>
      <div
        style={{
          marginLeft: `1em`,
          float: "right",
          width: "230px",
          marginBottom: "1em",
        }}
      >
        {story.fields.image.map((image) => (
          <>
            <a
              href={`https:${image.fields.image.fields.file.url}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                key={image.fields.image.fields.file.url}
                src={`https:${image.fields.image.fields.file.url}`}
                alt={image.fields.caption2.content[0].content[0].value}
                layout="responsive"
                quality="75"
                width={image.fields.image.fields.file.details.image.width}
                height={image.fields.image.fields.file.details.image.height}
              />
            </a>
            <cite>
              <em>{image.fields.caption2.content[0].content[0].value}</em>
            </cite>
          </>
        ))}
      </div>
      <p>
        <em>{story.fields.subtitle}</em>
      </p>
      <div>{content.map((item) => documentToReactComponents(item))}</div>
    </>
  );
}
