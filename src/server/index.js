import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // обязательно установить: npm install node-fetch

const app = express();
const PORT = 5000;

app.use(cors());

const STEAM_API_KEY = 'F2F81AF6F319AADC77EA736AA9C1BE5C'; // ВСТАВЬ СВОЙ КЛЮЧ

app.get('/steam/:steamid', async (req, res) => {
  const { steamid } = req.params;

  try {
    console.log("🔍 Получаю данные Steam для:", steamid);

    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamid}`
    );

    const data = await response.json();

    const player = data?.response?.players?.[0];

    if (!player) {
      console.warn("⚠️ Игрок не найден или профиль скрыт");
      return res.status(404).json({ error: 'Player not found or profile is private' });
    }

    console.log("✅ Получены данные игрока:", player.personaname);

    res.json({
      name: player.personaname,
      avatar: player.avatarfull,
      steamid: player.steamid
    });

  } catch (err) {
    console.error("❌ Ошибка при запросе к Steam API:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
