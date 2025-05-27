import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [playerSearch, setPlayerSearch] = useState("");
  const [matchSearch, setMatchSearch] = useState("");
  const navigate = useNavigate();

  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    const trimmed = playerSearch.trim();
    if (!trimmed) return;
    navigate(`/player/${trimmed}`);
    setPlayerSearch("");
  };

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    const trimmed = matchSearch.trim();
    if (!trimmed) return;
    if (!/^\d+$/.test(trimmed)) {
      alert("ID матча должен быть числом");
      return;
    }
    navigate(`/match/${trimmed}`);
    setMatchSearch("");
  };

  return (
    <header
      style={{
        backgroundColor: "#121212",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#e0e0e0",
        maxWidth: "1200px",  // максимальная ширина всего хедера
        margin: "0 auto",     // центрируем по горизонтали
      }}
    >
      <a
        href="/"
        style={{
          color: "#90caf9",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1.2rem",
          whiteSpace: "nowrap",
        }}
      >
        Домашняя
      </a>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "flex-end",
          flexGrow: 1, // занимает доступное пространство справа
          maxWidth: "600px", // ограничение ширины блока поиска
        }}
      >
        {/* Поиск по игроку */}
        <form onSubmit={handlePlayerSubmit} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Поиск по игроку (ID)"
            value={playerSearch}
            onChange={(e) => setPlayerSearch(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #333",
              backgroundColor: "#121212",
              color: "#e0e0e0",
              width: "220px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1rem",
            }}
          >
            Игрок
          </button>
        </form>

        {/* Поиск по матчу */}
        <form onSubmit={handleMatchSubmit} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Поиск по матчу (ID)"
            value={matchSearch}
            onChange={(e) => setMatchSearch(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #333",
              backgroundColor: "#121212",
              color: "#e0e0e0",
              width: "150px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#388e3c",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1rem",
            }}
          >
            Матч
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
