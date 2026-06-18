import AboutSection from "@/components/home/AboutSection";
import BannerSection from "@/components/home/BannerSection";
import FormSection from "@/components/home/FormSection";
import GallerySection from "@/components/home/GallerySection";
import InformationSection from "@/components/home/InformationSection";
import LocationSection from "@/components/home/LocationSection";
import MasterPlanSection from "@/components/home/MasterPlanSection";
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

type Props = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: Props) {
  const { lang } = await params;

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
    getAbout(lang),
    getInformation(lang),
    getGallery(),
    getUnitTypes(lang),
    getVideo(),
    getContact(),
    getLocation(),
  ]);

  // console.log(aboutData);
  return (
    <main>
      {/* <BannerSection slides={bannerSlides} /> */}
      <BannerSection lang={lang} />
      <FormSection lang={lang} />
      <AboutSection lang={lang} data={aboutData} />
      <InformationSection lang={lang} data={informationData} />
      {/* <UnitSection units={unitTypes} /> */}
      <UnitSection lang={lang} units={unitTypes} />
      <MasterPlanSection lang={lang} />
      <GallerySection data={galleryData} />
      {/* <VideoSection data={videoData} /> */}
      <LocationSection location={locationData} contact={contactData} />
    </main>
  );
}

export function generateStaticParams() {
  return [{ lang: "th" }, { lang: "en" }];
}
