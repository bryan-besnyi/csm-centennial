import Link from "next/link";

let client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Home({ stories }) {
  return (
    <main>
      <div className="row mt-0 pt-0">
        {stories.map((story) => {
          return (
            <div
              key={story.sys.id}
              className="my-3 col-12 col-lg-6 align-items-stretch"
            >
              <div className="card border-primary d-flex h-100 flex-column mb-3">
                <h2 className="card-header">{story.fields.title}</h2>
                <small>{story.fields.categoryOrCategories}</small>
                <div className="card-body d-flex flex-column justify-content-between text-primary ">
                  <div>
                    <em className="card-text">{story.fields.subtitle}</em>
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
  let data = await client.getEntries({ content_type: "story" });

  return {
    props: {
      stories: data.items,
    },
  };
}
