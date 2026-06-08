import AboutSection from "@/components/home/AboutSection";
import BannerSection from "@/components/home/BannerSection";
import FormSection from "@/components/home/FormSection";
import GallerySection from "@/components/home/GallerySection";
import InformationSection from "@/components/home/InformationSection";
import LocationSection from "@/components/home/LocationSection";
import UnitSection from "@/components/home/UnitSection";
import VideoSection from "@/components/home/VideoSection";
import {
  getAbout,
  getBanners,
  getContact,
  getGallery,
  getInformation,
  getLocation,
  getUnitTypes,
  getVideo,
} from "@/lib/wordpress";

export default async function HomePage() {
  const [
    bannerSlides,
    aboutData,
    informationData,
    galleryData,
    unitTypes,
    videoData,
    contactData,
    locationData,
  ] = await Promise.all([
    getBanners(),
    getAbout(),
    getInformation(),
    getGallery(),
    getUnitTypes(),
    getVideo(),
    getContact(),
    getLocation(),
  ]);

  // console.log(aboutData);
  return (
    <main>
      <BannerSection slides={bannerSlides} />
      <FormSection />
      <AboutSection data={aboutData} />
      <InformationSection data={informationData} />
      <UnitSection units={unitTypes} />
      <GallerySection data={galleryData} />
      <VideoSection data={videoData} />
      <LocationSection location={locationData} contact={contactData} />
    </main>
  );
}
