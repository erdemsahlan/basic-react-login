let globalToast: any;

export const setGlobalToast = (toast: any) => {
  globalToast = toast;
};

export const showGlobalToast = (severity: string, summary: string, detail: string) => {
  if (globalToast) {
    globalToast.show({ severity, summary, detail });
  }
}; 