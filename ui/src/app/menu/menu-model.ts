export interface MenuItem {
    link?: string;
    title?: string;
    icon?: string;
    click?: () => void;
    operations?: {
      any?: string[],
      all?: string[],
      none?: string[],
    }
  }
  
  export interface MenuSection {
    hr: boolean;
    items: MenuItem[];
  }
  