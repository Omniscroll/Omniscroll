// # Handles user configuration

export interface OmniscrollConfig {
  title: string;
  sidebar?: {
    label: string;
    link: string;
  };
}

export const defaultConfig: OmniscrollConfig = {
  title: "Omniscroll",
  sidebar: {
    label: "Default Label",
    link: "Default Link",
  },
};
