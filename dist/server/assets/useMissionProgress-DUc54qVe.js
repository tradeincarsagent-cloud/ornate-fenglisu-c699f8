import { useState, useEffect } from "react";
import { l as loadMission, a as computeMissionProgress, s as saveMission } from "./mission-DBMJYSh9.js";
const POLL_INTERVAL_MS = 1e3;
function useMissionProgress() {
  const [mission, setMission] = useState(null);
  useEffect(() => {
    const initial = loadMission();
    if (initial) {
      const computed = computeMissionProgress(initial);
      setMission(computed);
      saveMission(computed);
    }
    const id = window.setInterval(() => {
      const current = loadMission();
      if (!current) return;
      const computed = computeMissionProgress(current);
      setMission((prev) => {
        if (prev && prev.progress === computed.progress && prev.currentStage === computed.currentStage) {
          return prev;
        }
        return computed;
      });
      saveMission(computed);
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);
  return mission;
}
export {
  useMissionProgress as u
};
