import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/contexts/NavigationContext";
import { type Page } from "@/contexts/NavigationContext";

interface NavLinkProps {
  to: Page;
  className?: string;
  activeClassName?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const NavLink = forwardRef<HTMLButtonElement, NavLinkProps>(
  ({ className, activeClassName, to, children, onClick, ...props }, ref) => {
    const { currentPage, navigate } = useNavigation();
    const isActive = currentPage === to;

    return (
      <button
        ref={ref}
        onClick={() => {
          navigate(to);
          onClick?.();
        }}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
