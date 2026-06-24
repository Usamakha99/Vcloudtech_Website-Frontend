export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  title: string;
  overviewHref?: string;
  overviewDescription?: string;
  items: readonly NavChild[];
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
      groups: readonly NavGroup[];
    };
