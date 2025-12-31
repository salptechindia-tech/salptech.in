
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
