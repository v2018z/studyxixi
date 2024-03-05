export class ElementObserver {
  private targetSelector: string;
  private callback: () => void;
  private mutationObserver: MutationObserver;

  constructor(targetSelector: string, callback: () => void) {
    this.targetSelector = targetSelector;
    this.callback = callback;
    this.initMutationObserver();
  }

  private initMutationObserver() {
    this.mutationObserver = new MutationObserver(() => {
      if (this.isElementExist()) {
        this.callback();
      }
    });

    const config: MutationObserverInit = {
      childList: true,
      subtree: true,
    };

    this.mutationObserver.observe(document.body, config);
  }

  private isElementExist(): boolean {
    return document.querySelector(this.targetSelector) !== null;
  }

  public disconnectObserver() {
    this.mutationObserver.disconnect();
  }
}
