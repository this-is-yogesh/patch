import { useState, type ChangeEvent, type FC } from "react";
import "./App.css";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

type PageProps = {
  Step1: number;
  Step2: number;
  Step3: number;
};
const Pages: PageProps = {
  Step1: 1,
  Step2: 2,
  Step3: 3,
};

type keys = "step1" | "step2" | "step3";
interface StepProps {
  inputs: any;
  onChange: (e: React.ChangeEvent) => void;
}

function App() {
  const [currentStep, setCurrentStep] = useState<number>(Pages.Step1);
  const [inputs, setInputs] = useState<Record<keys, object>>(() => {
    return {
      step1: {
        firstName: "",
        lastName: "",
      },
      step2: {
        phone: "",
        email: "",
      },
      step3: {
        account: "",
        balance: "",
      },
    };
  });
  const [show, setShow] = useState(false);
  const inputProps = inputs[`step${currentStep}` as keys];
  const components: Record<number, FC<StepProps>> = {
    [Pages.Step1]: Step1,
    [Pages.Step2]: Step2,
    [Pages.Step3]: Step3,
  };
  const LoadedComponent = components[currentStep];
  function onChange(event: ChangeEvent) {
    let element = event.target as HTMLInputElement;
    const value = element.value;
    const id = element.id;
    setInputs(prev => ({
      ...prev,
      [`step${currentStep}` as keys]: {
        ...prev[`step${currentStep}` as keys],
        [id]: value,
      },
    }));
  }
  let arr = Object.entries(inputs);
  return (
    <div className="app_layout">
      <div className="main_layout">
        <LoadedComponent inputs={inputProps} onChange={onChange} />
        <div className="button_layout">
          {currentStep > Pages.Step1 && (
            <button onClick={() => setCurrentStep(prev => prev - 1)}>
              Back
            </button>
          )}
          {currentStep < Pages.Step3 ? (
            <button onClick={() => setCurrentStep(prev => prev + 1)}>
              Next
            </button>
          ) : (
            <button onClick={() => setShow(true)}>Save</button>
          )}
          <button>Cancel</button>
        </div>
        <div>
          {show && (
            <div>
              {arr.map(input => (
                <div>
                  <label>{input[0]}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
