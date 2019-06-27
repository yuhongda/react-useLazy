export default function hotReloadRoutes(routes, nextRoutes, keyDebug = []) {
  /* eslint-disable no-console */
  if (!routes || typeof routes !== 'object') {
    console.warn('No matching routes available to hot reload into…');
    return;
  }
  if (!nextRoutes || typeof nextRoutes !== 'object') {
    console.warn('No matching new routes available to hot reload into…');
    return;
  }

  if (Array.isArray(routes)) {
    if (!Array.isArray(nextRoutes)) {
      console.warn(
        'Old routes is an array but the next routes are not:',
        keyDebug.join('.')
      );
      return;
    }

    const length = routes.length;
    const nextRoutesLength = nextRoutes.length;

    if (nextRoutesLength !== length) {
      console.warn(
        'Old routes is an array of', length,
        'but the next routes are an array of ', nextRoutesLength, ':',
        keyDebug.join('.')
      );
      return;
    }

    for (let index = 0; index < length; index++) {
      const childRoute = routes[index];
      const nextChildRoute = routes[index];
      const newKeyDebug = keyDebug.slice(0);
      const lastKeyDebugIndex = newKeyDebug.length - 1;
      newKeyDebug[lastKeyDebugIndex] = `${newKeyDebug[lastKeyDebugIndex]}[${index}]`;

      // Ignore array items without paths
      if (!childRoute.path) { continue; }

      // Warn if paths don't match up between arrays
      if (childRoute.path !== nextChildRoute.path) {
        console.warn(
          'Old child route has path', childRoute.path,
          'but the next child route has path ', nextChildRoute.path, ':',
          newKeyDebug.join('.')
        );
        break;
      }

      hotReloadRoutes(childRoute, nextChildRoute, newKeyDebug);
    }
    return;
  }

  const keys = Object.keys(routes);

  for (const key of keys) {
    const nextSubRoutes = nextRoutes[key];
    const newKeyDebug = keyDebug.concat([key]);

    if (key === 'component' && nextSubRoutes) {
      // eslint-disable-next-line no-param-reassign
      routes.component = nextSubRoutes;
    } else {
      const subRoutes = routes[key];

      // Ignore plain data…
      if (typeof subRoutes !== 'object') { return; }

      // Check for missing data…
      if (!nextSubRoutes || typeof nextSubRoutes !== 'object') {
        console.warn(
          'No matching new routes available for subkey:',
          newKeyDebug.join('.')
        );
        return;
      }

      // Recursion…
      hotReloadRoutes(subRoutes, nextSubRoutes, newKeyDebug);
    }
  }
}