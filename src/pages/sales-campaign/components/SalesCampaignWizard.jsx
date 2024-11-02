import { Button } from '@/components/button';
import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';


const steps = [
    {
        step: 1,
        label: "تعریف کمپین",
        content: <Step1 />
    },
    {
        step: 2,
        label: "تعریف پیامک",
        content: <Step2 />
    },
    {
        step: 3,
        label: "تایید نهایی",
        content: <Step3 />
    }
];


const SalesCampaignWizard = () => {

    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (
        <div className="mx-auto mt-5">
            <div className="flex justify-between">
                {steps.map((step, index) => (
                    <div key={index} className={`flex-1 text-center rounded-full relative ${index <= currentStep ? 'text-primary' : 'text-gray-400'}`}>
                        {index < steps.length && (
                            <div className={`h-1 w-full  ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}`} ></div>
                        )}
                        <div className={`flex justify-center items-center font-bold mx-auto border-4 ${index <= currentStep ? 'border-primary' : 'border-gray-200'} bg-white -mt-[26px] text-xl sm:text-2xl w-10 h-10 sm:w-12 sm:h-12 rounded-full z-20  ${index === currentStep ? 'underline' : ''}`}>
                            {step.step}
                        </div>
                        <p className='mt-2 font-semibold'>{step.label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <div className="text-center py-10 min-h-80">
                    {steps[currentStep].content}
                </div>
                <div className="flex justify-between mt-4">
                    <Button onClick={handleBack} disabled={currentStep === 0} variant="outline" >
                        قبلی
                    </Button>
                    {
                        currentStep !== steps.length - 1 ?
                            <Button onClick={handleNext}  >
                                بعدی
                            </Button>
                            :
                            <Button onClick={handleNext}  >
                                ثبت نهایی
                            </Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default SalesCampaignWizard;