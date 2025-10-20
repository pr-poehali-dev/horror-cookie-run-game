import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface RulesScreenProps {
  onBack: () => void;
}

const RulesScreen = ({ onBack }: RulesScreenProps) => {
  return (
    <div className="pixel-border p-8 bg-gray-900 text-white max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-green-400 pixel-text">ПРАВИЛА ИГРЫ</h2>
        <Button 
          onClick={onBack}
          variant="outline"
          className="pixel-button"
        >
          <Icon name="X" size={24} />
        </Button>
      </div>

      <div className="space-y-6 text-lg pixel-text">
        <div className="space-y-2">
          <h3 className="text-2xl text-yellow-400 flex items-center gap-2">
            <Icon name="Target" size={24} />
            ЦЕЛЬ
          </h3>
          <p className="text-gray-300 pl-8">
            Уничтожайте врагов и набирайте очки. Не дайте врагам прорваться к вашей базе!
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl text-blue-400 flex items-center gap-2">
            <Icon name="Gamepad2" size={24} />
            УПРАВЛЕНИЕ
          </h3>
          <ul className="text-gray-300 pl-8 space-y-1">
            <li>← → или A D — движение влево/вправо</li>
            <li>ПРОБЕЛ — выстрел</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl text-red-400 flex items-center gap-2">
            <Icon name="Zap" size={24} />
            ГЕЙМПЛЕЙ
          </h3>
          <ul className="text-gray-300 pl-8 space-y-1">
            <li>За каждого уничтоженного врага: +10 очков</li>
            <li>Столкновение с врагом: -20 здоровья</li>
            <li>Враг прорвался к базе: -10 здоровья</li>
            <li>При 0 здоровья игра заканчивается</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl text-purple-400 flex items-center gap-2">
            <Icon name="Lightbulb" size={24} />
            СОВЕТЫ
          </h3>
          <ul className="text-gray-300 pl-8 space-y-1">
            <li>Целься точно — каждый выстрел на счету</li>
            <li>Следи за здоровьем и избегай столкновений</li>
            <li>Враги появляются быстрее со временем</li>
          </ul>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          onClick={onBack}
          className="w-full h-12 text-xl pixel-button bg-green-600 hover:bg-green-700"
        >
          <Icon name="ArrowLeft" className="mr-2" size={24} />
          НАЗАД В МЕНЮ
        </Button>
      </div>
    </div>
  );
};

export default RulesScreen;
