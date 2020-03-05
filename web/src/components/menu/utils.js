export const updateBrowserHistory = (url) => {
  window.history.replaceState({} , "DepViz - Dependecy Visualization", url);
}

export const generateUrl = (data) => {
  const {
    targets,
    withClosed,
    withIsolated,
    withPrs,
    withExternalDeps,
    layout
  } = data;

  // construct url
  let url = `?${targets.split(",").map(target => `targets=${target.trim()}`).join("&")}&withClosed=${withClosed}&withIsolated=${withIsolated}&withPrs=${withPrs}&withoutExternal-deps=${withExternalDeps}&layout=${layout}`;

  return url;
}
