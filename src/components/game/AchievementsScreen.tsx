import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AchievementsScreenProps {
  achievements: string[];
  onBack: () => void;
}

const achievementsList = [
  {
    id: "scorer",
    name: "ПЕРВЫЕ ШАГИ",
    description: "Набери 100 очков",
    icon: "Star",
    color: "text-yellow-400"
  },
  {
    id: "master",
    name: "МАСТЕР СТРЕЛЬБЫ",
    description: "Набери 500 очков",
    icon: "Trophy",
    color: "text-purple-400"
  },
  {
    id: "survivor",
    name: "ВЫЖИВШИЙ",
    description: "Продержись 5 минут",
    icon: "Shield",
    color: "text-blue-400"
  },
  {
    id: "sniper",
    name: "СНАЙПЕР",
    description: "Уничтожь 100 врагов",
    icon: "Target",
    color: "text-red-400"
  }
];

const AchievementsScreen = ({ achievements, onBack }: AchievementsScreenProps) => {
  return (
    <div className="pixel-border p-8 bg-gray-900 text-white max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-purple-400 pixel-text">ДОСТИЖЕНИЯ</h2>
        <Button 
          onClick={onBack}
          variant="outline"
          className="pixel-button"
        >
          <Icon name="X" size={24} />
        </Button>
      </div>

      <div className="text-lg text-gray-400 pixel-text">
        Открыто: {achievements.length} / {achievementsList.length}
      </div>

      <div className="space-y-4">
        {achievementsList.map((achievement) => {
          const isUnlocked = achievements.includes(achievement.id);
          
          return (
            <div
              key={achievement.id}
              className={`pixel-border p-4 flex items-center gap-4 transition-all ${
                isUnlocked 
                  ? 'bg-gray-800 border-green-500' 
                  : 'bg-gray-950 opacity-50'
              }`}
            >
              <div className={`text-4xl ${isUnlocked ? achievement.color : 'text-gray-600'}`}>
                <Icon name={achievement.icon as any} size={48} />
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-bold pixel-text ${
                  isUnlocked ? achievement.color : 'text-gray-600'
                }`}>
                  {achievement.name}
                </h3>
                <p className="text-gray-400 pixel-text text-sm">
                  {achievement.description}
                </p>
              </div>

              {isUnlocked && (
                <div className="text-green-400">
                  <Icon name="CheckCircle" size={32} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4">
        <Button 
          onClick={onBack}
          className="w-full h-12 text-xl pixel-button bg-purple-600 hover:bg-purple-700"
        >
          <Icon name="ArrowLeft" className="mr-2" size={24} />
          НАЗАД В МЕНЮ
        </Button>
      </div>
    </div>
  );
};

export default AchievementsScreen;
