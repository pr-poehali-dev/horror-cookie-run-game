import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface GameScreenProps {
  onGameOver: (score: number) => void;
  onBackToMenu: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SIZE = 40;
const ENEMY_SIZE = 40;
const BULLET_SIZE = 8;

const GameScreen = ({ onGameOver, onBackToMenu }: GameScreenProps) => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - 80 });
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameActive, setGameActive] = useState(true);
  const [keys, setKeys] = useState<Record<string, boolean>>({});
  const [bulletId, setBulletId] = useState(0);
  const [enemyId, setEnemyId] = useState(0);

  const shoot = useCallback(() => {
    setBullets(prev => [...prev, {
      id: bulletId,
      x: playerPos.x + PLAYER_SIZE / 2 - BULLET_SIZE / 2,
      y: playerPos.y
    }]);
    setBulletId(prev => prev + 1);
  }, [playerPos, bulletId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: true }));
      if (e.key === ' ' && gameActive) {
        e.preventDefault();
        shoot();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameActive, shoot]);

  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = setInterval(() => {
      setPlayerPos(prev => {
        let newX = prev.x;
        if (keys['ArrowLeft'] || keys['a'] || keys['A'] || keys['ф'] || keys['Ф']) {
          newX = Math.max(0, prev.x - 8);
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D'] || keys['в'] || keys['В']) {
          newX = Math.min(GAME_WIDTH - PLAYER_SIZE, prev.x + 8);
        }
        return { ...prev, x: newX };
      });

      setBullets(prev => prev
        .map(bullet => ({ ...bullet, y: bullet.y - 10 }))
        .filter(bullet => bullet.y > -BULLET_SIZE)
      );

      setEnemies(prev => prev
        .map(enemy => ({ ...enemy, y: enemy.y + enemy.speed }))
        .filter(enemy => {
          if (enemy.y > GAME_HEIGHT) {
            setHealth(h => Math.max(0, h - 10));
            return false;
          }
          return true;
        })
      );

      setBullets(prevBullets => {
        const remainingBullets = [...prevBullets];
        
        setEnemies(prevEnemies => {
          return prevEnemies.filter(enemy => {
            const hitBulletIndex = remainingBullets.findIndex(bullet =>
              bullet.x < enemy.x + ENEMY_SIZE &&
              bullet.x + BULLET_SIZE > enemy.x &&
              bullet.y < enemy.y + ENEMY_SIZE &&
              bullet.y + BULLET_SIZE > enemy.y
            );

            if (hitBulletIndex !== -1) {
              remainingBullets.splice(hitBulletIndex, 1);
              setScore(s => s + 10);
              return false;
            }
            return true;
          });
        });

        return remainingBullets;
      });

      setEnemies(prev => {
        const collision = prev.some(enemy =>
          playerPos.x < enemy.x + ENEMY_SIZE &&
          playerPos.x + PLAYER_SIZE > enemy.x &&
          playerPos.y < enemy.y + ENEMY_SIZE &&
          playerPos.y + PLAYER_SIZE > enemy.y
        );

        if (collision) {
          setHealth(h => Math.max(0, h - 20));
          return prev.filter(enemy => !(
            playerPos.x < enemy.x + ENEMY_SIZE &&
            playerPos.x + PLAYER_SIZE > enemy.x &&
            playerPos.y < enemy.y + ENEMY_SIZE &&
            playerPos.y + PLAYER_SIZE > enemy.y
          ));
        }

        return prev;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameActive, keys, playerPos]);

  useEffect(() => {
    if (!gameActive) return;

    const spawnEnemy = setInterval(() => {
      setEnemies(prev => [...prev, {
        id: enemyId,
        x: Math.random() * (GAME_WIDTH - ENEMY_SIZE),
        y: -ENEMY_SIZE,
        speed: 2 + Math.random() * 3
      }]);
      setEnemyId(prev => prev + 1);
    }, 1000);

    return () => clearInterval(spawnEnemy);
  }, [gameActive, enemyId]);

  useEffect(() => {
    if (health <= 0 && gameActive) {
      setGameActive(false);
      setTimeout(() => onGameOver(score), 1000);
    }
  }, [health, gameActive, score, onGameOver]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-4">
        <div className="text-white text-xl pixel-text">
          СЧЁТ: {score}
        </div>
        <div className="text-white text-xl pixel-text flex items-center gap-2">
          <Icon name="Heart" className="text-red-500" size={24} />
          {health}%
        </div>
        <Button 
          onClick={onBackToMenu}
          variant="outline"
          className="pixel-button"
        >
          <Icon name="Home" size={20} />
        </Button>
      </div>

      <div 
        className="relative bg-gray-900 pixel-border"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <div
          className="absolute bg-green-500 pixel-border"
          style={{
            left: playerPos.x,
            top: playerPos.y,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE
          }}
        />

        {bullets.map(bullet => (
          <div
            key={bullet.id}
            className="absolute bg-yellow-400 rounded-full"
            style={{
              left: bullet.x,
              top: bullet.y,
              width: BULLET_SIZE,
              height: BULLET_SIZE
            }}
          />
        ))}

        {enemies.map(enemy => (
          <div
            key={enemy.id}
            className="absolute bg-red-500 pixel-border"
            style={{
              left: enemy.x,
              top: enemy.y,
              width: ENEMY_SIZE,
              height: ENEMY_SIZE
            }}
          />
        ))}

        {!gameActive && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl font-bold pixel-text text-red-500">ИГРА ОКОНЧЕНА</h2>
              <p className="text-2xl pixel-text">Счёт: {score}</p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-white text-sm pixel-text">
        ← → или A D для движения | ПРОБЕЛ для стрельбы
      </div>
    </div>
  );
};

export default GameScreen;
