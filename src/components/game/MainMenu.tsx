import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface MainMenuProps {
  onStartGame: () => void;
  onShowRules: () => void;
  onShowAchievements: () => void;
  highScore: number;
}

const MainMenu = ({ onStartGame, onShowRules, onShowAchievements, highScore }: MainMenuProps) => {
  return (
    <div className="text-center space-y-8 pixel-border p-8 bg-gray-900">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-green-400 pixel-text">
          ПИКСЕЛЬНЫЙ
        </h1>
        <h2 className="text-5xl font-bold text-red-500 pixel-text">
          ШУТЕР
        </h2>
      </div>
      
      {highScore > 0 && (
        <div className="text-yellow-400 text-xl pixel-text">
          <Icon name="Trophy" className="inline mr-2" size={24} />
          РЕКОРД: {highScore}
        </div>
      )}
      
      <div className="space-y-4">
        <Button 
          onClick={onStartGame}
          className="w-64 h-16 text-2xl pixel-button bg-green-600 hover:bg-green-700 text-white"
        >
          <Icon name="Play" className="mr-2" size={28} />
          ИГРАТЬ
        </Button>
        
        <Button 
          onClick={onShowRules}
          className="w-64 h-16 text-2xl pixel-button bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Icon name="BookOpen" className="mr-2" size={28} />
          ПРАВИЛА
        </Button>
        
        <Button 
          onClick={onShowAchievements}
          className="w-64 h-16 text-2xl pixel-button bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Icon name="Award" className="mr-2" size={28} />
          ДОСТИЖЕНИЯ
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;
