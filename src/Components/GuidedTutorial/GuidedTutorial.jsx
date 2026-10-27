import { useCallback, useEffect, useRef } from 'react';
import { driver } from 'driver.js';

export default function GuidedTutorial({ storageKey, autoStart, steps }) {
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  const startTutorial = useCallback(() => {
    const visibleSteps = stepsRef.current.filter(({ element }) => {
      const target = document.querySelector(element);
      return target && target.getClientRects().length > 0;
    });

    if (visibleSteps.length === 0) {
      return;
    }

    localStorage.setItem(storageKey, 'true');
    driver({
      steps: visibleSteps,
      showProgress: true,
      progressText: '{{current}} de {{total}}',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Finalizar',
      popoverClass: 'tutorial-popover',
    }).drive();
  }, [storageKey]);

  useEffect(() => {
    if (autoStart && localStorage.getItem(storageKey) !== 'true') {
      startTutorial();
    }
  }, [autoStart, startTutorial, storageKey]);

  return (
    <button
      type="button"
      onClick={startTutorial}
      className="shrink-0 rounded-lg border border-[#c4a46c] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#8b2e2e] transition-colors hover:bg-[#f4ecd8] focus:outline-none focus:ring-2 focus:ring-[#8b2e2e]"
      aria-label="Ver tutorial de esta sección"
    >
      Ver tutorial
    </button>
  );
}
