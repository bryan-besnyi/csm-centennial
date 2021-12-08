import Link from "next/link";

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

export default function Home({ stories }) {
  console.log(categoryData);
  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <h2 className="pl-0 col-12">Categories</h2>
          {categoryData.map((category) => {
            return (
              <div key={category} className="pl-0 col-6">
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
                <div className="card-body d-flex flex-column justify-content-between text-primary ">
                  <em className="card-text">{story.fields.subtitle}</em>
                  <div>
                    <p>
                      <Link href={`/${story.fields.slug}`}>
                        <a className="btn btn-primary mb-3">
                          {story.fields.buttonText}
                        </a>
                      </Link>
                    </p>
                  </div>
                  <img
                    className="img-fluid"
                    src={story.fields.image[0].fields.image.fields.file.url}
                    alt=""
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  let storyData = await client.getEntries({ content_type: "story" });

  return {
    props: {
      stories: storyData.items,
    },
  };
}
