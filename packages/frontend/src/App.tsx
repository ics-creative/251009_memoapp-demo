import { useState } from "react";
import type { Memo } from "./types/memo";
import MemoList from "./components/MemoList";
import MemoEditor from "./components/MemoEditor";
import "./App.css";

function App() {
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelectMemo = (memo: Memo) => {
    setSelectedMemo(memo);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setSelectedMemo(null);
    setIsCreating(true);
  };

  const handleSave = () => {
    setIsCreating(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDelete = (id: number) => {
    if (selectedMemo && selectedMemo.id === id) {
      setSelectedMemo(null);
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="layout">
      <div className="notice-banner">
        このアプリは全体に公開されています。個人情報や誹謗中傷など、不適切な内容は書き込まないでください。
      </div>
      <div className="app">
        <MemoList
          onSelectMemo={handleSelectMemo}
          onCreateNew={handleCreateNew}
          key={refreshTrigger}
        />
        <MemoEditor
          selectedMemo={selectedMemo}
          isCreating={isCreating}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
