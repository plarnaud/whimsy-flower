import WhimsyImage from "@/components/whimsyImage";
import PageScaffold from "@/components/pageScaffold";
import { InquireFormSection } from "@/components/inquireForm";

export default function InquirePage() {
  return (
    <PageScaffold followUsModifiers="bg-(--clover)/20">
      <InquireFormSection />
    </PageScaffold>
  );
}
