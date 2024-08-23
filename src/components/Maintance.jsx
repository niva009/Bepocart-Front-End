
import banner from '../assets/maintance.png'


export default function FourZeroFour() {
  return (
    <div>
      <div className="cart-page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="empty-card-wrapper w-full">
            <div className="flex justify-center items-center">
              <div>
                <div>
                  <img src={banner} width={400} height={350}></img>
                </div>
                <div data-aos="fade-up" className="empty-content w-full">
                  <h1 className="sm:text-xl text-base font-semibold text-center mb-2">
                  Site is Under Maintenance
                  </h1>
                  <h3 className="sm text-sm text-center">Please check back in sometime.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
