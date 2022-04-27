import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreOrLess from '../../components/more_or_less/MoreOrLess';

export default function Game() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/game-info?game-id=${id}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (data.length === 0) {
    return;
  }

  return <MoreOrLess gameType={data.gameType} {...data} />;
}
