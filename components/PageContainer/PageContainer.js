import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function PageContainer(props) {
  return (
    <>
      <Header />
      <Sidebar>
        { props.children }
       	<Footer />
      </Sidebar>
    </>
  );
}