import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

let client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  let storyData = await client.getEntries({ content_type: "story" });
  //   let categoryData = await client.getEntries({ content_type: "category" });

  return {
    props: {
      stories: storyData.items,
    },
  };
}

export default function Home({ stories }) {
  return (
    <>
      <Head>
        <title>Stories | CSM Centennial | College of San Mateo</title>
        <meta
          name="description"
          content="Stories from one hundred years of College of San Mateo History to celebrate the centennial anniversary of the College."
        />
      </Head>
      <main>
        <div className="container-fluid">
          <div className="row">
            <h2 className="pl-0 col-12">Category: Featured</h2>
          </div>
        </div>
        <div className="row mt-0 pt-0">
          {stories.map((story) => {
            let content = story.fields.excerpt.content;
            {
              if (story.fields.categoryOrCategories.includes("Featured")) {
                return (
                  <div
                    key={story.sys.id}
                    className="my-3 col-12 col-lg-6 align-items-stretch"
                  >
                    <div className="card border-primary d-flex h-100 flex-column mb-3">
                      <h2 className="card-header">{story.fields.title}</h2>
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div className="card-text">
                          {content.map((item) =>
                            documentToReactComponents(item)
                          )}
                        </div>
                        <div>
                          <div>
                            <p className="mb-0">
                              <Link href={`/${story.fields.slug}`}>
                                <a className="mb-0 btn btn-primary mb-3">
                                  {story.fields.buttonText}
                                </a>
                              </Link>
                            </p>
                          </div>
                          <Image
                            src={`https:${story.fields.featuredImage.fields.file.url}`}
                            layout="responsive"
                            alt=""
                            width={640}
                            height={336}
                          />
                          <div className="d-flex mt-2">
                            {story.fields.categoryOrCategories.map(
                              (category) => {
                                return (
                                  <small
                                    key={category}
                                    className="text-white p-1 rounded mr-1"
                                    style={{ backgroundColor: `#23366F` }}
                                  >
                                    {category}
                                  </small>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            }

            return (
              <div
                key={story.sys.id}
                className="my-3 col-12 col-lg-6 align-items-stretch"
              >
                <div className="card border-primary d-flex h-100 flex-column mb-3">
                  <h2 className="card-header">{story.fields.title}</h2>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="card-text">
                      {content.map((item) => documentToReactComponents(item))}
                    </div>
                    <div>
                      <div>
                        <p className="mb-0">
                          <Link href={`/${story.fields.slug}`}>
                            <a className="mb-0 btn btn-primary mb-3">
                              {story.fields.buttonText}
                            </a>
                          </Link>
                        </p>
                      </div>
                      <Image
                        src={`https:${story.fields.featuredImage.fields.file.url}`}
                        layout="responsive"
                        alt=""
                        width={640}
                        height={336}
                      />
                      <div className="d-flex mt-2">
                        {story.fields.categoryOrCategories.map((category) => {
                          return (
                            <small
                              key={category}
                              className="text-white p-1 rounded mr-1"
                              style={{ backgroundColor: `#23366F` }}
                            >
                              {category}
                            </small>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
