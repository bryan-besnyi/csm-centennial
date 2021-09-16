import Link from "next/link";

let client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Home({ stories }) {
  return (
    <main>
      <div className="row">
        {stories.map((story) => {
          return (
            <div key={story.sys.id} className="col-12 col-lg-6">
              <div className="card border-primary d-flex flex-column mb-3">
                <h2 className="card-header">{story.fields.title}</h2>
                <div className="card-body text-primary">
                  <em className="card-text">{story.fields.subtitle}</em>
                  <p>
                    <Link href={`/${story.fields.slug}`}>
                      <a className="btn btn-primary mb-3">
                        {story.fields.buttonText}
                      </a>
                    </Link>
                  </p>
                  <img
                    className="img-fluid"
                    src={story.fields.image[0].fields.image.fields.file.url}
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
