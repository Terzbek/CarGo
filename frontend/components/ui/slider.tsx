"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      min,
      max,
      step = 1,
      defaultValue = [min, max],
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [values, setValues] = React.useState<[number, number]>(defaultValue);

    const handleChange = (newValues: number[]) => {
      setValues([newValues[0], newValues[1]]);
      onValueChange?.([newValues[0], newValues[1]]);
    };

    return (
      <div className="w-full">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          min={min}
          max={max}
          step={step}
          value={values}
          onValueChange={handleChange}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
            <SliderPrimitive.Range className="absolute h-full bg-black" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-black bg-black shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-black bg-black shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </SliderPrimitive.Root>
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
