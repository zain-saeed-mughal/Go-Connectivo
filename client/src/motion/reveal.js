import { gsap, ease as easeTokens, START, prefersReducedMotion } from './config';

/**
 * Shared reveal engine — buttery, one-shot, never flashes before play.
 */
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
  gsap.killTweensOf(el);
  el.classList.remove('gc-will-reveal');
  gsap.set(el, {
    autoAlpha: 1,
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    scale: 1,
    clipPath: 'none',
    clearProps: 'transform,filter,willChange,clipPath',
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
    clearProps: 'transform,clipPath,filter,willChange,x,y,xPercent,yPercent,scale',
  });
};

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
}) {
  const items = gsap.utils.toArray(targets).filter(Boolean);
  if (!items.length) return null;

  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.remove('gc-will-reveal'));
    if (trigger) trigger.classList?.remove('gc-stagger-pending');
    gsap.set(items, { autoAlpha: 1, clearProps: 'all' });
    return null;
  }

  items.forEach((el) => markPending(el, finishClean(el)));

  const fromVars = { ...from, force3D: true };
  if (from.opacity !== undefined && from.autoAlpha === undefined) {
    fromVars.autoAlpha = from.opacity;
    delete fromVars.opacity;
  }

  const toVars = { ...to, force3D: true };
  if (to.opacity !== undefined) {
    toVars.autoAlpha = to.opacity;
    delete toVars.opacity;
  } else if (toVars.autoAlpha === undefined) {
    toVars.autoAlpha = 1;
  }

  gsap.set(items, fromVars);
  items.forEach((el) => el.classList.remove('gc-will-reveal'));
  if (trigger) trigger.classList?.remove('gc-stagger-pending');

  return gsap.to(items, {
    ...toVars,
    duration,
    delay,
    // Soft cascade — later cards ease into the stagger so it feels fluid,
    // not like a metronome.
    stagger: stagger
      ? { each: stagger, from: 'start', ease: 'power1.in' }
      : 0,
    ease,
    overwrite: true,
    immediateRender: false,
    onComplete() {
      this.targets().forEach(settle);
    },
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          once: true,
          toggleActions: 'play none none none',
          fastScrollEnd: true,
        }
      : undefined,
  });
}
