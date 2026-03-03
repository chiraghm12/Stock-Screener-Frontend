import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

const Root = RadioGroupPrimitive.Root;
const Item = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Item.displayName = RadioGroupPrimitive.Item.displayName;

const Indicator = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Indicator
    ref={ref}
    className={cn('flex items-center justify-center', className)}
    {...props}
  >
    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
  </RadioGroupPrimitive.Indicator>
));
Indicator.displayName = RadioGroupPrimitive.Indicator.displayName;

export { Root, Item, Indicator };
