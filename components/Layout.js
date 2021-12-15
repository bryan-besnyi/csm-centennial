import Image from "next/image";
import bannerImage from "../public/images/banner.png";

function Layout({ children }) {
  return (
    <main>
      <section className="section--default">
        <div className="container container-full bg-default box-shadow-side">
          <div className="d-md-flex flex-md-nowrap">
            <div className="f-200 pr-0">
              <nav className="sidenav navbar-expand-md sectionmenu">
                <header className="title-bar d-md-none d-flex navbar-dark">
                  <span className="title-bar-title">
                    <h1>CSM Centennial</h1>
                  </span>
                  <div className="ml-auto">
                    <button
                      className="btn btn-link text-light p-0 ml-3 navbar-toggler "
                      type="button"
                      data-toggle="collapse"
                      data-target="#subnav-menu"
                      aria-controls="subnav-menu"
                      aria-expanded="true"
                    >
                      <span className="sr-only">CSM Centennial Menu</span>
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  </div>
                </header>
                <div className="collapse navbar-collapse" id="subnav-menu">
                  <ul className="nav navbar-nav flex-column sidenav-list w-100">
                    <li className="nav-item">
                      <a href="https://collegeofsanmateo.edu/100">Overview</a>
                    </li>
                    <li className="nav-item">
                      <a href="https://collegeofsanmateo.edu/100/stories.php">
                        Stories
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="https://collegeofsanmateo.edu/100/committee.php">
                        Centennial Committee
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="https://collegeofsanmateo.edu/100/committee-development.php">
                        Development Committee
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="https://collegeofsanmateo.edu/100/committee-events.php">
                        Events Committee
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="https://collegeofsanmateo.edu/100/logowinner.php">
                        Logo Winner &amp; Finalists
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-auto flex-grow-1 flex-shrink-1 p-0">
              <section className="csm-main-content">
                <div className="row no-gutters">
                  <header className="title-bar w-100 d-none d-md-block">
                    <span className="title-bar-title">CSM Centennial</span>
                  </header>
                  <section className="csm-main-content main w-100">
                    <div className="row">
                      <section
                        className="col-12"
                        id="section-label-maincontent"
                      >
                        {children}
                      </section>
                    </div>
                  </section>
                  <div className="csm-carousel col-lg-12 pr-0 d-none d-md-block">
                    <div>
                      <img
                        className="img-fluid"
                        src="/images/banner.png"
                        alt="Celebrating 100 Years: 1922-2022"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Layout;
