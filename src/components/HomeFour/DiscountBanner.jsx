export default function DiscountBanner({ className }) {
  return (
    <div
      className={`discount-banner w-full h-[307px] bg-cover  relative ${
        className || ""
      }`}
      style={{
        background: `url(${
          import.meta.env.VITE_PUBLIC_URL
        }/assets/images/discount-banner-3.jpg) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      {/* < */}
    </div>
  );
}
