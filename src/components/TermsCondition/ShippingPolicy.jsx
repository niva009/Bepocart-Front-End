import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function SguppingPolicy() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "shipping-policy", path: "/privacy-policy" },
            ]}
            title="Shipping Policy"
          />
        </div>
        <div className="w-full">
          <div className="container-x mx-auto">
            <div className="content-item w-full mb-10">
              <p className="text-[15px] text-qgraytwo leading-7">
              <span className="font-bold text-black">Note:   </span>Please Note: This policy is subject to change at any time without notice. To
make sure you are aware of any changes, please review this policy
periodically.
Our commitment is to ensure the utmost satisfaction of our cherished cyclists.

              </p>
            </div>

            <div className="content-item w-full mb-10">
    
              <div>

              <div className="content-item w-full mb-10">
            </div>
                <h2 className="text-[20px]  text-qblack mb-5">
                ORDER PROCESSING TIMELINE
                </h2>
  

                <ul className="list-disc ml-5">
                  <li className="text-[15px] text-qgraytwo leading-7">
                  We only ship within the Indian subcontinent as long as your pin
                  code is serviceable by any of our logistics partners
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  We aim to dispatch an order within 24hours from order placement
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Order processing is suspended on Sundays, public holidays, and
                  during geographical and political disturbances
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Cash on Delivery (COD) orders require additional confirmation via
                  WhatsApp from the provided contact number

                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  The Customer is responsible for giving the correct address and
                  contact information
                  </li>
                </ul>
              </div>
            </div>

            <div className="content-item w-full mb-10">
              <h2 className="text-[20px]  text-qblack mb-5">
              SHIPPING CHARGES

              </h2>
              <ul className="list-disc ml-5">
                  <li className="text-[15px] text-qgraytwo leading-7">
                  All orders exceeding Rs. 500 are eligible for free shipping. For
                    orders utilizing the Cash On Delivery payment method, an additional
                    convenience fee of Rs. 40 will be applied.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Cash on Delivery payment option is available for orders valued up to
Rs. 29,999.

                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Cash On Delivery will incur additional shipping charges according to
the following slab.

                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Orders below Rs. 500 will incur additional shipping charges of
                  Rs.60.

                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Express Shipping is available for pre-paid orders upon request (has
                    additional costs)
                  </li>
                </ul>
            </div>
            <div className="content-item w-full mb-10">
              <h2 className="text-[18px] font-medium text-qblack mb-5">
              SHIPPING SERVICES

              </h2>
              <p className="text-[15px] text-qgraytwo leading-7">
              We provide a diverse range of shipping services

              </p>
            </div>
            <div className="content-item w-full mb-10">
              <h2 className="text-[18px] font-medium text-qblack mb-5">
              Standard Shipping

              </h2>
              <p className="text-[15px] text-qgraytwo leading-7">
              The delivery timeframe for this shipping option ranges from 3 to 7 business
days can vary depending on distance and cities. Typically, orders in this mode
are dispatched using road or air transportation for efficient and reliable
delivery.
              </p>
            </div>
            <div className="content-item w-full mb-10">
              <h2 className="text-[18px] font-medium text-qblack mb-5">
              CONTACTING US

              </h2>
              <p className="text-[15px] text-qgraytwo leading-7">
              f you have any questions about this Privacy Policy, the practices of this site,
or your dealings with this site, please contact us at:

              </p>
              <ul className="list-disc ml-5">
              <li className="text-[15px] text-qgraytwo leading-7">  +91 7025494747</li>
              <li className="text-[15px] text-qgraytwo leading-7">  <a href="mailto:contact@bepocart.com">contact@bepocart.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
