'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-sheet';

import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = ({ className, ...props }) => (
  <SheetPrimitive.Portal className={className} {...props} />
);
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-150',
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef(({ className, side = 'right', ...props }, ref) => (
  <SheetPrimitive.Content
    ref={ref}
    className={cn(
      'fixed z-50 scale-100 gap-4 bg-background p-6 opacity-100 shadow-lg duration-200 focus:outline-none',
      side === 'top' && 'animate-in slide-in-from-top-0',
      side === 'right' && 'animate-in slide-in-from-right-0',
      side === 'bottom' && 'animate-in slide-in-from-bottom-0',
      side === 'left' && 'animate-in slide-in-from-left-0',
      className
    )}
    side={side}
    {...props}
  />
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Header
    ref={ref}
    className={cn('flex flex-col space-y-2 text-center', className)}
    {...props}
  />
));
SheetHeader.displayName = SheetPrimitive.Header.displayName;

const SheetFooter = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Footer
    ref={ref}
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
));
SheetFooter.displayName = SheetPrimitive.Footer.displayName;

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
