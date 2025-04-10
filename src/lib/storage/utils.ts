
// Utility function to normalize tracking IDs for comparison
export const normalizeTrackingId = (trackingId: string): string => {
  return trackingId.trim().toUpperCase();
};
