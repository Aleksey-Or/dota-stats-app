import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerSearch = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) navigate(`/player/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Steam32 ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default PlayerSearch;
