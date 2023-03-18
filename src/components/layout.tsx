import Header from "@/components/header";
import Banner from "@/components/banner";
import Footer from "@/components/footer";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Banner />
      <Header />
      <main className="container my-10 mx-auto flex-1 px-5">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
