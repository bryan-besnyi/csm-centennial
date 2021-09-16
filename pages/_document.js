import Document, { Html, Head, Main, NextScript } from "next/document";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://www.collegeofsanmateo.edu/_includes/csm-bootstrap.css?v=1.3.7"
            rel="stylesheet"
          />
          <link
            href="https://www.collegeofsanmateo.edu/_includes/csm-theme.css?v=1.3.7"
            rel="stylesheet"
          />
          <link
            href="https://collegeofsanmateo.edu/z-omniupdate/css/links.css?v=1.2"
            rel="stylesheet"
          />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.7.2/js/all.js"
            integrity="sha384-0pzryjIRos8mFBWMzSSZApWtPl/5++eIfzYmTgBBmXYdhvxPc+XcFEk+zJwDgWbP"
            crossOrigin="anonymous"
          ></script>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
            integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />

          <link
            href="https://collegeofsanmateo.edu/z-omniupdate/css/icons.css"
            rel="stylesheet"
          />
          <script
            src="https://collegeofsanmateo.edu/assets/scripts/icons.js"
            type="text/javascript"
          ></script>

          <script
            type="text/javascript"
            src="https//www.google-analytics.com/urchin.js"
          ></script>
        </Head>
        <body className="body--interior">
          <Header />
          <Layout>
            <Main />
          </Layout>
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
