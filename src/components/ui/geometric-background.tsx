'use client';

/**
 * A component that renders a fixed, geometric background pattern.
 * It is intended to be placed in the main layout of the application.
 */
export function GeometricBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        opacity: 0.5, // Keep it subtle
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80"><path fill="%23ffd700" fill-opacity="0.1" d="M0 0h80v80H0z"/><path fill-opacity="0.15" d="M40 0L80 20v40L40 80 0 60V20z" fill="%23facc15"/></svg>')`,
      }}
    />
  );
}
