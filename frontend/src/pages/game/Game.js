import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreOrLess from '../../components/more_or_less/MoreOrLess';
import Quiz from '../../components/quiz/Quiz';

export default function Game() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/game-info?game-id=${id}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (data.length === 0) {
    return;
  }

  return data.gameType === 'moreorless' ? (
    <MoreOrLess
      id={id}
      label={data.label}
      statExtra={data.statExtra}
      {...data}
    />
  ) : (
    <Quiz id={id} label={data.label} statExtra={data.statExtra} {...data} />
  );
}
