import * as React from 'react';
import { cn } from '@/lib/utils';

const Resizable = React.forwardRef(({ className, onResizeStart, onResizeEnd, ...props }, ref) => {
  const [isResizing, setIsResizing] = React.useState(false);

  const handlePointerDown = (event) => {
    event.preventDefault();
    setIsResizing(true);
    onResizeStart?.();
  };

  const handlePointerUp = (event) => {
    setIsResizing(false);
    onResizeEnd?.();
  };

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...props}
    >
      {isResizing && (
        <div
          className="absolute inset-0 bg-gray-200 opacity-50"
          aria-hidden="true"
        />
      )}
    </div>
  );
});

Resizable.displayName = 'Resizable';

export { Resizable };
