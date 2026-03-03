import * as React from 'react';
import { cn } from '@/lib/utils';

const Separator = React.forwardRef(({ className, decorative = true, ...props }, ref) => (
  <hr
    ref={ref}
    role={decorative ? 'presentation' : undefined}
    className={cn('border-border bg-border', className)}
    {...props}
  />
));
Separator.displayName = 'Separator';

export { Separator };
