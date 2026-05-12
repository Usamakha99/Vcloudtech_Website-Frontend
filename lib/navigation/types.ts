export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem =
  | {
      type: "link";
      label: string;
      href: string;
    }
  | {
      type: "dropdown";
      label: string;
      href: string;
      children: readonly NavChild[];
    };
