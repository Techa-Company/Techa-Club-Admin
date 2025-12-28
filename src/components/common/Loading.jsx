// components/common/LoadingSpinner.jsx
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = "default", className = "" }) => {
    const sizes = {
        sm: "h-4 w-4",
        default: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16"
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative">
                <Loader2 className={`${sizes[size]} animate-spin text-primary`} />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/20"></div>
            </div>
        </div>
    );
};

export const PageLoader = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
            <div className="relative">
                <LoadingSpinner size="xl" />
                <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-primary rounded-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <p className="text-sm text-muted-foreground animate-pulse">در حال بارگذاری...</p>
                </div>
            </div>
        </div>
    </div>
);