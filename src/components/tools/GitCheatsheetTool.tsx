const cmds = [
  {cat:"Setup",items:["git init","git clone <url>","git config --global user.name \"Name\"","git config --global user.email \"email\""]},
  {cat:"Basic",items:["git status","git add .","git add <file>","git commit -m \"msg\"","git commit --amend"]},
  {cat:"Branching",items:["git branch","git branch <name>","git checkout <branch>","git checkout -b <branch>","git merge <branch>","git branch -d <branch>"]},
  {cat:"Remote",items:["git remote add origin <url>","git push origin <branch>","git pull origin <branch>","git fetch","git remote -v"]},
  {cat:"History",items:["git log","git log --oneline","git diff","git diff --staged","git show <commit>"]},
  {cat:"Undo",items:["git reset HEAD <file>","git checkout -- <file>","git revert <commit>","git reset --hard HEAD~1","git stash","git stash pop"]},
];
const GitCheatsheetTool = () => (
  <div className="space-y-6">
    {cmds.map(c => (
      <div key={c.cat}>
        <h3 className="font-mono text-sm font-bold mb-2 text-primary">{c.cat}</h3>
        <div className="space-y-1">{c.items.map(cmd => <div key={cmd} className="rounded bg-secondary p-2 font-mono text-sm">{cmd}</div>)}</div>
      </div>
    ))}
  </div>
);
export default GitCheatsheetTool;
