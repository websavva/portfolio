export function scrollToElement(elementId: string) {
  const elementToScrollTo =
    document.getElementById(elementId);

  if (!elementToScrollTo) return;

  elementToScrollTo.scrollIntoView({ behavior: 'smooth' });
}
