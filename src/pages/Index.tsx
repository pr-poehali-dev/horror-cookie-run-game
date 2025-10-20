import { useState } from "react";
import GameScreen from "@/components/game/GameScreen";
import RulesScreen from "@/components/game/RulesScreen";
import AchievementsScreen from "@/components/game/AchievementsScreen";
import MainMenu from "@/components/game/MainMenu";

export type Screen = "menu" | "game" | "rules" | "achievements";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    
    if (finalScore >= 100 && !achievements.includes("scorer")) {
      setAchievements([...achievements, "scorer"]);
    }
    if (finalScore >= 500 && !achievements.includes("master")) {
      setAchievements([...achievements, "master"]);
    }
    
    setCurrentScreen("menu");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {currentScreen === "menu" && (
        <MainMenu 
          onStartGame={() => setCurrentScreen("game")}
          onShowRules={() => setCurrentScreen("rules")}
          onShowAchievements={() => setCurrentScreen("achievements")}
          highScore={score}
        />
      )}
      
      {currentScreen === "game" && (
        <GameScreen 
          onGameOver={handleGameOver}
          onBackToMenu={() => setCurrentScreen("menu")}
        />
      )}
      
      {currentScreen === "rules" && (
        <RulesScreen onBack={() => setCurrentScreen("menu")} />
      )}
      
      {currentScreen === "achievements" && (
        <AchievementsScreen 
          achievements={achievements}
          onBack={() => setCurrentScreen("menu")}
        />
      )}
    </div>
  );
};

export default Index;
