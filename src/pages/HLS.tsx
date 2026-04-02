import HLSNavbar from "@/components/hls/HLSNavbar";
import HLSHero from "@/components/hls/HLSHero";
import HLSWhySection from "@/components/hls/HLSWhySection";
import HLSLocations from "@/components/hls/HLSLocations";
import HLSPackages from "@/components/hls/HLSPackages";
import HLSLabService from "@/components/hls/HLSLabService";
import HLSCommunity from "@/components/hls/HLSCommunity";
import HLSNews from "@/components/hls/HLSNews";
import HLSConnect from "@/components/hls/HLSConnect";
import HLSFooter from "@/components/hls/HLSFooter";

export default function HLS() {
  return (
    <div className="font-body bg-white" style={{ scrollBehavior: "smooth" }}>
      <HLSNavbar />
      <HLSHero />
      <HLSWhySection />
      <HLSLocations />
      <HLSPackages />
      <HLSLabService />
      <HLSCommunity />
      <HLSNews />
      <HLSConnect />
      <HLSFooter />
    </div>
  );
}
