import { lazy, Suspense } from "react";
import type { GitHubCodeViewerProps } from "./RepositoryViewer";

const RepositoryViewer = lazy(() => import("./RepositoryViewer"));

const GitHubCodeViewer = (props: GitHubCodeViewerProps) => (
  <Suspense fallback={<p role="status">Loading code viewer…</p>}>
    <RepositoryViewer {...props} />
  </Suspense>
);

export default GitHubCodeViewer;
