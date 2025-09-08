import { useState, type FC } from "react";
import "./App.css";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

interface PageProps {
  Step1: number;
  Step2: number;
  Step3: number;
}
const Pages: PageProps = {
  Step1: 1,
  Step2: 2,
  Step3: 3,
};

type componentsProps = {
  [Pages.Step1]: FC;
  [Pages.Step2]: FC;
  [Pages.Step3]: FC;
};

function App() {
  const [currentStep, setCurrentStep] = useState<number>(Pages.Step1);

  const components: componentsProps = {
    [Pages.Step1]: Step1,
    [Pages.Step2]: Step2,
    [Pages.Step3]: Step3,
  };

  const LoadedComponent = components[currentStep];

  return (
    <div className="app_layout">
      <div className="main_layout">
        <LoadedComponent />
        <div className="button_layout">
          {currentStep > Pages.Step1 && (
            <button onClick={() => setCurrentStep(prev => prev - 1)}>
              Back
            </button>
          )}
          {currentStep < Pages.Step3 && (
            <button onClick={() => setCurrentStep(prev => prev + 1)}>
              Next
            </button>
          )}
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default App;
