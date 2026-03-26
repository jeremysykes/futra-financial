import { useEffect } from 'react';

const SELECTOR = '[data-animate]';
const IN_VIEW_CLASS = 'in-view';
const DEFAULT_THRESHOLD = 0.2;

export function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(IN_VIEW_CLASS);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: DEFAULT_THRESHOLD },
    );

    function observe(root: ParentNode) {
      for (const el of root.querySelectorAll(SELECTOR)) {
        if (!el.classList.contains(IN_VIEW_CLASS)) {
          observer.observe(el);
        }
      }
    }

    // Observe existing elements
    observe(document);

    // Watch for dynamically added elements (SPA route changes)
    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.hasAttribute('data-animate')) observer.observe(node);
            observe(node);
          }
        }
      }
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);
}
