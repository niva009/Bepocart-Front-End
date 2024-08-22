import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// Import Images
import maintenance from "../assets/maintance.png"
import logodark from "../assets/bepocart.png";

const PagesMaintenance = () => {
  // Meta title
  document.title = "Maintenance | React-Maintenance-Page";

  return (
    <div>
      <section className="my-5">
        <Container>
          <Row>
            <Col xs="7" className="text-center">
              <div className="home-wrapper">
                <div>
                </div>

                <Row className="justify-content-center">
                  <Col sm={8} md={6} lg={5}>
                    <div className="maintenance-img">
                      <img
                        src={maintenance}
                        alt="Maintenance"
                        className="img-fluid mx-auto d-block"
                      />
                    </div>
                  </Col>
                </Row>
                <h3 className="mt-5">Site is Under Maintenance</h3>
                <p className="text-muted">Please check back in sometime.</p>

                <div className="flex justify-around space-x-4 mb-30">
                  {/* Box 1 */}
                  <div className="box-border p-6 bg-white shadow-lg rounded-md text-center">
                    <i className="bx bx-broadcast mb-4 text-4xl text-primary"></i>
                    <h5 className="text-lg font-semibold text-uppercase">
                      Why is the Site Down?
                    </h5>
                    <p className="text-gray-600">
                      There are many variations of passages of Lorem Ipsum available, but
                      the majority have suffered alteration.
                    </p>
                  </div>

                  {/* Box 2 */}
                  <div className="box-border p-6 bg-white shadow-lg rounded-md text-center">
                    <i className="bx bx-time-five mb-4 text-4xl text-primary"></i>
                    <h5 className="text-lg font-semibold text-uppercase">
                      What is the Downtime?
                    </h5>
                    <p className="text-gray-600">
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It
                      has roots in a piece of classical literature.
                    </p>
                  </div>

                  {/* Box 3 */}
                  <div className="box-border p-6 bg-white shadow-lg rounded-md text-center">
                    <i className="bx bx-envelope mb-4 text-4xl text-primary"></i>
                    <h5 className="text-lg font-semibold text-uppercase">
                      Do you need Support?
                    </h5>
                    <p className="text-gray-600">
                      If you are going to use a passage of Lorem Ipsum, you need to be sure
                      there isn&apos;t anything embarrassing.
                      <Link
                        to="mailto:no-reply@domain.com"
                        className="text-decoration-underline text-blue-500"
                      >
                        no-reply@domain.com
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      </div>
  );
};

export default PagesMaintenance;
