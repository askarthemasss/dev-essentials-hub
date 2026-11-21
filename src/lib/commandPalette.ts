export const OPEN_COMMAND_PALETTE_EVENT = "devtoolbox:open-command-palette";

/** Opens the global command palette from any visible trigger. */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
}
