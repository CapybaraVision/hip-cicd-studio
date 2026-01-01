# Frontend Debugging & Improvement List

This document outlines key areas for frontend debugging and refinement, focusing on Design, Functionality, and Code Quality.

## 1. Design & Layout (UI/UX)

### Responsiveness
- [ ] **Kanban Board Overflow**: Verify horizontal scrolling behavior on mobile devices.
- [ ] **Sidebar on Mobile**: The current Sidebar is fixed-width. Check if it obstructs content on screens narrower than 768px.
- [ ] **Bento Grid Scaling**: On ultra-wide monitors (`>1920px`), the single-column layout for the Kanban/Pipeline section might look stretched. Consider a max-width container or reverting to 2-columns only for `xl` breakpoints.

### Aesthetics & Polish
- [ ] **Dark Mode Consistency**: Ensure all new components ([ProjectsPage](file:///Users/pank/hip-cicd-studio/src/app/projects/page.tsx#15-79), [CICDPage](file:///Users/pank/hip-cicd-studio/src/app/cicd/page.tsx#7-89)) strictly adhere to the `dark.6` and `dark.7` checks.
- [ ] **Glassmorphism Performance**: Check if the blur effects (`backdrop-filter`) cause scrolling lag on lower-end devices.
- [ ] **Timeline Connectors**: Verify the connector lines align perfectly active/inactive states dynamically (currently visual only).

## 2. Functionality & Interaction

### Interactive Elements
- [ ] **Kanban Persistence**: Drag-and-drop state resets on refresh. Needs local storage or backend integration.
- [ ] **Navigation Active States**: Verify `usePathname` correctly highlights the Sidebar icon when navigating to `/projects` or `/cicd`.
- [ ] **Search Filters**: The Search inputs in [Projects](file:///Users/pank/hip-cicd-studio/src/app/projects/page.tsx#15-79) and [Pipeline](file:///Users/pank/hip-cicd-studio/src/components/CICD/Pipeline.tsx#14-107) are visual-only. Need to implement client-side filtering logic.

### Charts & Data
- [ ] **Chart Tooltips**: Ensure `Recharts` tooltips are visible and don't get clipped by parent containers (z-index issues).
- [ ] **Real-time Simulation**: The "Running" status in the Timeline/Pipeline is static. Consider adding a `useEffect` to simulate progress updates for a livelier demo.

## 3. Code Quality & Technical

### Hydration & SSR
- [ ] **Hydration Warning**: We suppressed the hydration warning in [layout.tsx](file:///Users/pank/hip-cicd-studio/src/app/layout.tsx). Root cause (likely `localStorage` theme check in SSR) should eventually be fixed properly to avoid layout shift.
- [ ] **Hardcoded Strings**: User-facing text is a mix of Korean and English. Centralize strings or standardize language.

### Performance
- [ ] **Bundle Size**: Check if `recharts` or `framer-motion` are being tree-shaken correctly.
- [ ] **Unused Imports**: Clean up any unused imports in [page.tsx](file:///Users/pank/hip-cicd-studio/src/app/page.tsx) after the refactors.
