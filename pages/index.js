import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

let client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

let categoryData = [
  "Featured",
  "Administrator Profile",
  "Art",
  "Athletics",
  "Awards",
  "Campus",
  "Celebrities",
  "Entertainment",
  "Equity",
  "Faculty Profile",
  "History",
  "KCSM",
  "Poetry",
  "Programs",
  "Staff Profile",
  "Student Life",
  "Student Profile",
];

// const filterItems = async (arr, query) => {
//   return arr.filter(function (el) {
//     return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
//   });
// };

// categoryData.forEach((element) =>
//   console.log(filterItems(categoryData, element))
// );

export async function getStaticProps() {
  let storyData = await client.getEntries({ content_type: "story" });
  let categoryData = await client.getEntries({ content_type: "category" });

  return {
    props: {
      stories: storyData.items,
      categories: categoryData.items,
    },
  };
}

export default function Home({ stories, categories }) {
  // console.log(categories);
  // console.log(stories.excerpt);

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
            <h2 className="pl-0 col-12">Categories</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem.
            </p>
            {categoryData.map((category) => {
              return (
                <div key={category} className="pl-0 col-12 col-sm-6 col-lg-3">
                  <input type="checkbox" id={category} key={category} />
                  <label className="ml-1" htmlFor={category}>
                    {category}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="row mt-0 pt-0">
          {stories.map((story) => {
            {
              console.log(JSON.stringify(story.fields.excerpt.content));
            }
            let content = story.fields.excerpt.content;

            return (
              <div
                key={story.sys.id}
                className="my-3 col-12 col-lg-6 align-items-stretch"
              >
                <div className="card border-primary d-flex h-100 flex-column mb-3">
                  <h2 className="card-header">{story.fields.title}</h2>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <p className="card-text">
                      {content.map((item) => documentToReactComponents(item))}
                    </p>
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
                    <div className="d-flex">
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
            );
          })}
        </div>
      </main>
    </>
  );
}
