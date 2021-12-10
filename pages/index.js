import Link from "next/link";
import Image from "next/image";

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

const filterItems = async (arr, query) => {
  return arr.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
};

categoryData.forEach((element) =>
  console.log(filterItems(categoryData, element))
);

export async function getStaticProps() {
  let storyData = await client.getEntries({ content_type: "story" });

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
                <div key={category} className="pl-0 col-6 col-md-3">
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
              console.log(story.fields.featuredImage.fields.file.url);
            }
            return (
              <div
                key={story.sys.id}
                className="my-3 col-12 col-lg-6 align-items-stretch"
              >
                <div className="card border-primary d-flex h-100 flex-column mb-3">
                  <h2 className="card-header">{story.fields.title}</h2>
                  {/* {story.fields.categoryOrCategories.map((category) => {
                  return <p>{category}</p>;
                })} */}
                  <div className="card-body d-flex flex-column justify-content-between text-primary">
                    <p className="card-text">{story.fields.subtitle}</p>
                    <div>
                      <p>
                        <Link href={`/${story.fields.slug}`}>
                          <a className="btn btn-primary mb-3">
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
