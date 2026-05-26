/* =============================================================
   TeamsPage — SpinPick Clone
   Team division and group assignment tool
   ============================================================= */

import { useState } from "react";
import Header from "@/components/Header";
import { Plus, Trash2, RotateCcw, Copy, Check, Download } from "lucide-react";
import { toast } from "sonner";
import { divideIntoTeams, divideIntoPairs, divideIntoGroups, calculateTeamSizes } from "@/lib/teamDivision";

interface Team {
  name: string;
  members: string[];
}

export default function TeamsPage() {
  const [entries, setEntries] = useState(["Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry"]);
  const [newEntry, setNewEntry] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [divisionMode, setDivisionMode] = useState<"teams" | "pairs" | "groups">("teams");
  const [teamCount, setTeamCount] = useState(2);
  const [groupSize, setGroupSize] = useState(3);
  const [copied, setCopied] = useState(false);

  const addEntry = () => {
    const trimmed = newEntry.trim();
    if (!trimmed) return;
    if (entries.includes(trimmed)) {
      toast.error("Entry already exists");
      return;
    }
    setEntries((prev) => [...prev, trimmed]);
    setNewEntry("");
  };

  const removeEntry = (idx: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDivide = () => {
    try {
      if (entries.length < 2) {
        toast.error("Add at least 2 members to divide into teams");
        return;
      }

      let result: Team[] = [];

      if (divisionMode === "teams") {
        if (teamCount <= 0 || teamCount > entries.length) {
          toast.error(`Invalid team count. Must be between 1 and ${entries.length}`);
          return;
        }
        result = divideIntoTeams(entries, teamCount);
      } else if (divisionMode === "pairs") {
        result = divideIntoPairs(entries);
      } else if (divisionMode === "groups") {
        if (groupSize <= 0 || groupSize > entries.length) {
          toast.error(`Invalid group size. Must be between 1 and ${entries.length}`);
          return;
        }
        result = divideIntoGroups(entries, groupSize);
      }

      if (result.length === 0) {
        toast.error("Failed to divide teams. Please try again.");
        return;
      }

      setTeams(result);
      toast.success(`Divided into ${result.length} ${divisionMode}!`);
    } catch (error) {
      console.error("Error dividing teams:", error);
      toast.error("Failed to divide teams. Please try again.");
    }
  };

  const copyToClipboard = () => {
    try {
      const text = teams
        .map((team) => `${team.name}: ${team.members.join(", ")}`)
        .join("\n");
      navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Teams copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy teams");
    }
  };

  const exportTeams = () => {
    try {
      const csv = teams.map((team) => `${team.name},${team.members.join(";")}`).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "teams.csv";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Teams exported as CSV!");
    } catch (error) {
      console.error("Error exporting teams:", error);
      toast.error("Failed to export teams");
    }
  };

  const resetAll = () => {
    try {
      setEntries([]);
      setTeams([]);
      setNewEntry("");
      toast.success("Reset complete!");
    } catch (error) {
      console.error("Error resetting:", error);
      toast.error("Failed to reset");
    }
  };

  const teamSizes = divisionMode === "teams" ? calculateTeamSizes(entries.length, teamCount) : null;

  return (
    <div className="min-h-screen bg-[#f9f7ff] flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
        <div className="mb-8">
          <h1
            className="text-3xl font-extrabold text-gray-900 mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Team Divider
          </h1>
          <p className="text-gray-500">Automatically divide people into balanced teams, pairs, or groups.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2
              className="text-lg font-bold text-gray-900 mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Members
            </h2>

            {/* Add entry */}
            <div className="flex gap-2 mb-5">
              <input
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEntry()}
                placeholder="Add a member…"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
              <button
                onClick={addEntry}
                className="px-4 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors active:scale-95"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Entry list */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 mb-5">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gray-50 hover:bg-purple-50 group transition-colors"
                >
                  <span className="flex-1 text-sm text-gray-700 font-medium">{entry}</span>
                  <button
                    onClick={() => removeEntry(i)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {entries.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">No members yet. Add some above!</p>
              )}
            </div>

            <div className="text-xs text-gray-500 text-center mb-5">
              {entries.length} member{entries.length !== 1 ? "s" : ""}
            </div>

            {/* Division mode selection */}
            <div className="mb-5 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-3">Division Mode</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="teams"
                    checked={divisionMode === "teams"}
                    onChange={(e) => setDivisionMode(e.target.value as any)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700 font-medium">Divide into Teams</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="pairs"
                    checked={divisionMode === "pairs"}
                    onChange={(e) => setDivisionMode(e.target.value as any)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700 font-medium">Divide into Pairs</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="groups"
                    checked={divisionMode === "groups"}
                    onChange={(e) => setDivisionMode(e.target.value as any)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700 font-medium">Divide into Groups</span>
                </label>
              </div>
            </div>

            {/* Configuration */}
            {divisionMode === "teams" && (
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Number of Teams
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max={entries.length}
                    value={teamCount}
                    onChange={(e) => setTeamCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
                {teamSizes && (
                  <p className="text-xs text-gray-500 mt-2">
                    Team sizes: {teamSizes.join(", ")}
                  </p>
                )}
              </div>
            )}

            {divisionMode === "groups" && (
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Group Size
                </label>
                <input
                  type="number"
                  min="1"
                  max={entries.length}
                  value={groupSize}
                  onChange={(e) => setGroupSize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                onClick={handleDivide}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-300 transition-all duration-200 active:scale-95"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Divide Now
              </button>
              <button
                onClick={resetAll}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <RotateCcw size={16} />
                Reset All
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2
              className="text-lg font-bold text-gray-900 mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {divisionMode === "teams" && `Teams (${teams.length})`}
              {divisionMode === "pairs" && `Pairs (${teams.length})`}
              {divisionMode === "groups" && `Groups (${teams.length})`}
            </h2>

            {teams.length > 0 ? (
              <>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1 mb-5">
                  {teams.map((team, i) => (
                    <div key={i} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
                      <h3
                        className="font-bold text-gray-900 mb-2"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {team.name}
                      </h3>
                      <div className="space-y-1">
                        {team.members.map((member, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Export buttons */}
                <div className="space-y-2">
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all active:scale-95"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy Teams"}
                  </button>
                  <button
                    onClick={exportTeams}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
                  >
                    <Download size={16} />
                    Export CSV
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Add members and click "Divide Now" to create teams</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
