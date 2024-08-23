import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import Accodion from "../Helpers/Accodion";
import InputCom from "../Helpers/InputCom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Becoin from "../../assets/bepocoin.png"

export default function PrivacyPolicy() {

  const [coinCount ,setCoinCount] =useState("");
  const[ coinValue, setCoinValue] = useState("");

  useEffect(() =>{
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/coin/`,{

      headers:{
        'Authorization': `${token}`,
      }
    })
    .then((response) =>{
      setCoinCount(response.data.data)
      setCoinValue(response.data.coinValue.value)
    })
    .catch((error) =>{
      console.log(error,"error fetching coin");
    })
  },[])


  const totalCoin = Array.isArray(coinCount)? coinCount.reduce((sum,current) => sum+(current.amount || 0), 0):0;

const totalPrice = totalCoin * coinValue

  return (


    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "becoin", path: "privacy-policy" },
            ]}
            title="Welcome to Our BeCoins Loyalty Program"
          />
        </div>
        <div className="w-full">
          <div className="container-x mx-auto">
            <div className="content-item w-full mb-10">
            <div className="flex justify-center mb-10 w-auto">
  <div className="flex items-center justify-between h-40 w-full p-6 border-2 rounded-lg bg-gradient-to-r from-blue-400 via-sky-500 via-20% to-emerald-500">
    <div className="text-white">
      <p className="text-lg font-semibold">Total Coins</p> 
      <p className="text-yellow-300 text-4xl font-bold">{totalCoin}</p>
      <p className="mt-5 text-lg font-semibold">Total Amount:</p>
      <p className="text-yellow-300 text-2xl font-bold">{totalPrice} Rs</p>
    </div>
    <img src={Becoin} alt="Coin" className="h-30 w-20 rounded-full" />
  </div>
</div>

              <p className="text-[18px] text-qgraytwo leading-7">
              At Bepocart, we believe in rewarding our customers for their loyalty and support. Our BeCoins loyalty program is designed to give you more value for your purchases and engagement with our store. Here’s how you can earn, redeem, and maximize your BeCoins to get the best out of your shopping experience with us
              </p>
            </div>
            <div className="content-item w-full mb-10">
              <h1 className="text-[20px] font-medium text-qblack mb-5">
              How to Earn BeCoins
              </h1>
              <hr style={{color:'black'}}></hr>
              <div>
                <h2 className="text-[18px] font-medium text-qblack mb-5">
                You can earn BeCoins through a variety of actions:
                </h2>

                <ul className="list-disc ml-5">
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Product Purchases: Earn BeCoins for every purchase you make. The points awarded vary depending on the product.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Referral System: Invite your friends to shop with us. When they make their first purchase, both you and your friend will receive BeCoins.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Birthday Reward: Celebrate your special day with 50 bonus BeCoins from us.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Anniversary Reward: On the anniversary of your membership, enjoy 50 bonus BeCoins.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">Action Reward Points: Earn points for specific actions such as product reviews and signing up.</li>
                </ul>
              </div>
            </div>

            <div className="content-item w-full mb-10">
              <h2 className="text-[18px] font-medium text-qblack mb-5">
              Detailed Points Breakdown:
              </h2>
              <ul className="list-disc ml-5">
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Product Review: Earn 50 BeCoins for every product review you submit.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Sign Up: Get 100 BeCoins when you sign up for an account.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  First Time Purchase: Receive 50 BeCoins for your first purchase.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Referral Reward: Earn 10 BeCoins for every friend you refer who makes a purchase.
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">Birthday Reward: Enjoy 50 BeCoins on your birthday..</li>
                  <li className="text-[15px] text-qgraytwo leading-7">BAnniversary Points: Receive 50 BeCoins on the anniversary of your membership.  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">  Daily Login Reward: Receive 1 BeCoin when you login everyday.</li>
                </ul>
                <div class="danger">
  <p><strong>Note!</strong> If your already logged in you will have to  log out and login again to redeem it</p>
</div>
            </div>

            <div className="content-item w-full mb-10">
              <h2 className="text-[18px] font-medium text-qblack mb-5">
              How to Redeem BeCoins
              </h2>
              <ul className="list-disc ml-5">
                  <li className="text-[15px] text-qgraytwo leading-7">
                  You can use your BeCoins to get discounts on future purchases or even pay for products directly
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Conversion Rate: 10 BeCoins = 1 Rupee
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Redemption Options: Apply your BeCoins as a discount on your purchase or use them to pay           for products at checkout.
                  </li>
                </ul>
                <div class="danger">
  <p><strong>Note!</strong> The number of BeCoins required for redemption can vary depending on the product. Check product details for specific redemption values.</p>
</div>
            </div>
            <div className="content-item w-full mb-10">
              <h2 className="text-[18px] font-medium text-qblack mb-5">
              Points Expiration
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7">
              BeCoins are valid for 90 days from the date they are earned. To ensure you never miss out, we’ll send you an email reminder before your points are due to expire
              </p>
            </div>
            <div className="content-item w-full mb-10">
              <h2 className="text-[18px] font-medium text-qblack mb-5">
              Membership Tiers and Benefits
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7">
              Our loyalty program features five tiers, each offering greater rewards as you collect more BeCoins:
              </p>
              <ul className="list-disc ml-5">
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Tier 1 (Bronze): Earned when you accumulate 50-600 BeCoins. You will get 100 BECOINS free when you enter this level
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Tier 2 (Silver): Earned when you accumulate 600-1200 BeCoins. You will get 150 BECOINS free when you enter this level
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Tier 3 (Gold): Earned when you accumulate 1200-2000 BeCoins. You will get 200 BECOINS free when you enter this level
                  </li>
                  <li className="text-[15px] text-qgraytwo leading-7">
                  Tier 5 (Diamond): Earned when you accumulate 3000+ BeCoins. You will get 300 BECOINS  free when you enter this level
                  </li>
                </ul>
  <p><strong>Note!</strong> The number of BeCoins required for redemption can vary depending on the product. Check product details for specific redemption values.</p>
            </div>
            <div className="content-item w-full mb-10">
            <h2 className="text-[18px] font-medium text-qblack mb-5">
            Tracking Your BeCoins
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7">
              Keep track of your BeCoins balance easily by logging into your account on our website. Your account dashboard will display your current balance, tier level, and the expiration dates of your points.
              </p>
              </div>
              <div className="main-wrapper w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
              <h1 className="text-qblack font-bold text-[22px] mb-4">
                Frequently asked questions
              </h1>
              <div className="flex flex-col space-y-7 justify-between">
                <Accodion
                  title="How do I join the BeCoins loyalty program?"
                  des="Simply create an account on our website, and you’ll automatically start earning BeCoins."
                />
                <Accodion
                  init
                  title="Can I earn points for past purchases?"
                  des="Points can only be earned for purchases made after joining the loyalty program"
                />
                <Accodion
                  title="How will I know if my points are about to expire?"
                  des="We’ll send you an email notification before your points expire."
                />
                <Accodion
                  title="Can I combine my BeCoins with other discounts or promotions?"
                  des="Yes, you can use your BeCoins along with other discounts or promotions, unless specified otherwise."
                />
                <Accodion
                  title=" How do I redeem my points?"
                  des="During checkout, you’ll have the option to apply your BeCoins for discounts or use them as currency towards your purchase."
                />  <Accodion
                title="Are there any restrictions on earning points?"
                des="Points are earned on eligible purchases and actions. Certain products or promotions may have specific point1earning rules"
              />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white sm:p-10 p-5">
                <div className="title flex flex-col items-center">
                  <h1 className="lg:text-[34px] text-xl font-bold text-qblack">
                    Have Any Qustion
                  </h1>
                  <span className="-mt-5 block">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="inputs mt-5">
                  <div className="mb-4">
                    <InputCom
                      label="Frist Name*"
                      placeholder="Demo Name"
                      name="first_name"
                      inputClasses="h-[50px]"
                    />
                  </div>
                  <div className="mb-4">
                    <InputCom
                      label="Email Address*"
                      placeholder="info@quomodosoft.com"
                      name="email"
                      inputClasses="h-[50px]"
                    />
                  </div>
                  <div className="mb-5">
                    <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                      Message*
                    </h6>
                    <textarea
                      placeholder="Type your message here"
                      className="w-full h-[105px] focus:ring-0 focus:outline-none p-3 border border-qgray-border placeholder:text-sm"
                    ></textarea>
                  </div>
                  <div>
                    <a href="#">
                      <div className="black-btn text-sm font-semibold w-full h-[50px] flex justify-center items-center">
                        <span>Send Now</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
