const trackEvent = (event: string, type: string | null = "click") => {
  if (!event || !(window as any)?.umami) return;
  console.log("TrackEvent", "#22c55e", event);

  return (window as any)?.umami?.trackEvent(event, type);
};

export default trackEvent;
