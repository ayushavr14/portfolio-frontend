import { Toaster } from "react-hot-toast";
import RootLayout from "./layout/layout";

const App = () => {
  return (
    <div>
      <RootLayout />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
