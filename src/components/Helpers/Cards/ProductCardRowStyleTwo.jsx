import { Link } from "react-router-dom";

export default function ProductCardRowStyleTwo({ className, datas }) {
  return (
    <div
      data-aos="fade-up"
      className={`product-card-row-two w-full ${className || ""}`}
    >
      <div className="flex flex-wrap -mx-2">
        {datas.map((data) => (
          <div key={data.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="h-[105px] bg-white border border-primarygray px-5">
              <div className="w-full h-full flex space-x-6-y-2 justify-center items-center">
                <div className="w-[75px] h-[75px]">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_URL}${data.image}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 h-full flex flex-col justify-center">
                  <Link to={`/single-product/${data.id}/`}>
                    <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-1 hover:text-blue-600">
                      {data.name}
                    </p>
                  </Link>
                  <p className="price">
                    <span className="main-price text-qgray line-through font-600 text-[18px]">
                      {data.price}
                    </span>
                    <span className="offer-price text-qred font-600 text-[18px] ml-2">
                      {data.salePrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
