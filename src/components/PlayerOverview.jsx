const PlayerOverview = ({ data }) => {
    return (
      <div>
        <h2>{data.profile?.personaname}</h2>
        <img src={data.profile?.avatarfull} alt="avatar" />
        <p>Steam ID: {data.profile?.account_id}</p>
        <p>MMR estimate: {data.mmr_estimate?.estimate || 'N/A'}</p>
        <p>Country: {data.profile?.loccountrycode || 'Unknown'}</p>
      </div>
    );
  };
  
  export default PlayerOverview;
  