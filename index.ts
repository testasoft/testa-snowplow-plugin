import { BrowserTracker, BrowserPlugin } from '@snowplow/browser-tracker-core';
import { buildStructEvent } from '@snowplow/tracker-core';

declare global {
  interface Window {
    Analytica: any;
  }
}

interface Visitor extends Event {
  project_id: string;
  experiment: number | string;
  variation: number | string;
  uuid: string;
  title: string;
}

export function TestaPlugin(): BrowserPlugin {
  function initListener(tracker: BrowserTracker) {
    document.addEventListener(
      'variation_applied',
      function (data: Visitor) {
        if (!data) return;

        tracker.core.track(buildStructEvent({
          category: 'testa',
          action: data.experiment + ":" + data.title,
          label: Number(data.variation).toString(),
          property: data.uuid,
        }));

      }
    )
  }

  return {
    activateBrowserPlugin: (tracker: BrowserTracker) => {
      initListener(tracker);
    },
  };
}
