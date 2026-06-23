import SplashWrapper from "@/components/splash/SplashWrapper";
import MenuPage from "@/components/menu/MenuPage";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import BackToTop from "@/components/ui/BackToTop";
import { getRestaurantStructuredData } from "@/lib/structured-data";

export default function MenuRoute() {
  const structuredData = getRestaurantStructuredData();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ErrorBoundary>
        <SplashWrapper>
          <MenuPage />
          <BackToTop />
        </SplashWrapper>
      </ErrorBoundary>
    </>
  );
}