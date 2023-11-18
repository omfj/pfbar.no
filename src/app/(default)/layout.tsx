import { SiteHeader } from "@/components/site-header";

type Props = {
  children: React.ReactNode;
};

export default function DefaultLayotu({ children }: Props) {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  );
}
