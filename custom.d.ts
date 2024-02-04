declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

type ImpactsXWindow = {
  impactsX: {
    claim: {
      fetch: () => Promise<any>;
      submit: (claim: string) => Promise<any>;
    };
  };
};

declare global {
  interface Window extends ImpactsXWindow {}
}
