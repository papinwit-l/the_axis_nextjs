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
import { getMasterPlan } from "@/lib/wordpress/master-plan";

type Props = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: Props) {
  const { lang } = await params;

  const [
    bannerSlides,
    aboutData,
    informationData,
    galleryData,
    unitTypes,
    masterPlanData,
    videoData,
    contactData,
    locationData,
  ] = await Promise.all([
    getBanners(),
    getAbout(lang),
    getInformation(lang),
    getGallery(),
    getUnitTypes(lang),
    getMasterPlan(lang),
    getVideo(),
    getContact(lang),
    getLocation(lang),
  ]);

  // console.log(bannerSlides);
  // console.log(aboutData);
  // console.log(informationData);
  // console.log(unitTypes);
  // console.log(masterPlanData);
  // console.log(galleryData);
  // console.log(videoData);
  // console.log(contactData);
  // console.log(locationData);

  return (
    <main>
      <BannerSection lang={lang} slides={bannerSlides} />
      {/* <BannerSection lang={lang} /> */}
      <FormSection lang={lang} />
      <AboutSection lang={lang} data={aboutData} />
      <InformationSection lang={lang} data={informationData} />
      {/* <UnitSection units={unitTypes} /> */}
      <UnitSection lang={lang} units={unitTypes} />
      <MasterPlanSection lang={lang} data={masterPlanData} />
      <GallerySection lang={lang} data={galleryData} />
      {/* <VideoSection data={videoData} /> */}
      <LocationSection
        lang={lang}
        location={locationData}
        contact={contactData}
      />
    </main>
  );
}

export function generateStaticParams() {
  return [{ lang: "th" }, { lang: "en" }];
}
