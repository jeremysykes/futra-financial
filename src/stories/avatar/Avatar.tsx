import { Avatar as RadixAvatar } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Badge } from '../badge/Badge';

const avatarVariants = cva('', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    ring: {
      none: '',
      accent: 'ring-2 ring-accent',
      primary: 'ring-2 ring-primary',
    },
  },
  defaultVariants: {
    size: 'md',
    ring: 'none',
  },
});

export interface AvatarProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt: string;
  initials?: string;
}

const Avatar = ({
  className,
  size,
  ring,
  src,
  alt,
  initials,
  ...props
}: AvatarProps) => {
  return (
    <Badge
      shape="circle"
      content={src ? 'image' : 'text'}
      size={size}
      className={cn(avatarVariants({ ring }), className)}
      {...props}
    >
      <RadixAvatar.Root className="w-full h-full flex items-center justify-center">
        {src && (
          <RadixAvatar.Image
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        )}
        <RadixAvatar.Fallback
          delayMs={src ? 300 : 0}
          className="text-accent"
        >
          {initials ?? alt.charAt(0).toUpperCase()}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    </Badge>
  );
};

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
