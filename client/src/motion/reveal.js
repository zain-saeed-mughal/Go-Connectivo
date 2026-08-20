import { gsap, ease as easeTokens, START, prefersReducedMotion } from './config';

const unfinished = new Map();

function settle(el) {
  const finish = unfinished.get(el);
  unfinished.delete(el);
  el.removeAttribute('data-reveal-pending');
  el.classList.remove('gc-revealing', 'gc-will-reveal');
  if (finish) finish();
}

export function markPending(el, finish) {
  unfinished.set(el, finish);
  el.setAttribute('data-reveal-pending', '');
  el.classList.add('gc-revealing');
}

export function settleReveal(el) {
  settle(el);
}

export function pendingElements() {
  unfinished.forEach((_, el) => {
    if (!el.isConnected) unfinished.delete(el);
  });
  return Array.from(unfinished.keys());
}

export function forceVisible(el) {
  if (!el) return;
  gsap.killTweensOf(el);
  el.classList.remove('gc-will-reveal', 'gc-stagger-pending', 'gc-revealing');
  gsap.set(el, {
    autoAlpha: 1,
    opacity: 1,
    visibility: 'visible',
    clearProps: 'x,y,xPercent,yPercent,scale,filter,clipPath,transform',
  });
  settle(el);
}

export function dropPendingWithin(root) {
  unfinished.forEach((_, el) => {
    if (el === root || root.contains(el)) {
      unfinished.delete(el);
      el.removeAttribute('data-reveal-pending');
      el.classList.remove('gc-revealing', 'gc-will-reveal');
    }
  });
}

const finishClean = (el) => () => {
  el.classList.remove('gc-will-reveal');
  gsap.set(el, {
    autoAlpha: 1,
    opacity: 1,
    visibility: 'visible',
    clearProps: 'x,y,xPercent,yPercent,scale,filter,transform',
  });
};

/**
 * Safe Lusion-style reveal:
 * - Prefer transform/blur over hard opacity:0 when possible
 * - Always failsafe to visible
 */
export function createReveal({
  targets,
  trigger,
  from,
  to = {},
  start = START,
  stagger = 0,
  delay = 0,
  duration = 0.9,
  ease = easeTokens.soft,
  safe = true,
}) {
  const items = gsap.utils.toArray(targets).filter(Boolean);
  if (!items.length) return null;

  if (prefersReducedMotion()) {
    items.forEach((el) => forceVisible(el));
    if (trigger) trigger.classList?.remove('gc-stagger-pending');
    return null;
  }

  items.forEach((el) => markPending(el, finishClean(el)));

  let fromVars = { ...from };
  let toVars = { ...to };

  // Safe mode: soft rise only — no tilt/blur that skews text alignment
  if (safe && fromVars.autoAlpha === 0) {
    delete fromVars.autoAlpha;
    if (fromVars.opacity === 0) delete fromVars.opacity;
    fromVars = { y: fromVars.y ?? 24, ...fromVars, opacity: 0.001 };
    toVars = { y: 0, opacity: 1, autoAlpha: 1, ...toVars };
  }

  if (fromVars.opacity !== undefined && fromVars.autoAlpha === undefined && !safe) {
    fromVars.autoAlpha = fromVars.opacity;
    delete fromVars.opacity;
  }

  if (toVars.opacity !== undefined && toVars.autoAlpha === undefined) {
    toVars.autoAlpha = toVars.opacity;
    delete toVars.opacity;
  } else if (toVars.autoAlpha === undefined) {
    toVars.autoAlpha = 1;
  }

  gsap.set(items, fromVars);
  items.forEach((el) => el.classList.remove('gc-will-reveal'));
  if (trigger) trigger.classList?.remove('gc-stagger-pending');

  const failsafe = window.setTimeout(() => {
    items.forEach((el) => {
      if (!el.isConnected) return;
      const opacity = Number(gsap.getProperty(el, 'opacity'));
      if (opacity < 0.15) forceVisible(el);
    });
  }, 1100);

  return gsap.to(items, {
    ...toVars,
    duration,
    delay,
    stagger: stagger
      ? { each: stagger, from: 'start', ease: 'power1.in' }
      : 0,
    ease,
    overwrite: true,
    immediateRender: false,
    onComplete() {
      window.clearTimeout(failsafe);
      this.targets().forEach(settle);
    },
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          once: true,
          toggleActions: 'play none none none',
        }
      : undefined,
  });
}
