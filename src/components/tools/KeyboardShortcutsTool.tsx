const shortcuts = [
  {category:"General",items:[{keys:"Ctrl+C",desc:"Copy"},{keys:"Ctrl+V",desc:"Paste"},{keys:"Ctrl+X",desc:"Cut"},{keys:"Ctrl+Z",desc:"Undo"},{keys:"Ctrl+Y",desc:"Redo"},{keys:"Ctrl+S",desc:"Save"},{keys:"Ctrl+A",desc:"Select All"},{keys:"Ctrl+F",desc:"Find"}]},
  {category:"VS Code",items:[{keys:"Ctrl+P",desc:"Quick Open"},{keys:"Ctrl+Shift+P",desc:"Command Palette"},{keys:"Ctrl+`",desc:"Toggle Terminal"},{keys:"Alt+↑/↓",desc:"Move Line"},{keys:"Ctrl+D",desc:"Select Word"},{keys:"Ctrl+/",desc:"Toggle Comment"},{keys:"Ctrl+B",desc:"Toggle Sidebar"}]},
  {category:"Browser",items:[{keys:"Ctrl+T",desc:"New Tab"},{keys:"Ctrl+W",desc:"Close Tab"},{keys:"Ctrl+L",desc:"Focus Address Bar"},{keys:"F12",desc:"DevTools"},{keys:"Ctrl+Shift+I",desc:"Inspect"},{keys:"Ctrl+R",desc:"Refresh"}]},
];
const KeyboardShortcutsTool = () => (
  <div className="space-y-6">
    {shortcuts.map(s => (
      <div key={s.category}>
        <h3 className="font-mono text-sm font-bold mb-2 text-primary">{s.category}</h3>
        <div className="space-y-1">{s.items.map(i => (
          <div key={i.keys} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><kbd className="bg-card px-2 py-0.5 rounded text-xs">{i.keys}</kbd><span className="text-muted-foreground">{i.desc}</span></div>
        ))}</div>
      </div>
    ))}
  </div>
);
export default KeyboardShortcutsTool;
