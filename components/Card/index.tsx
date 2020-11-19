import Link from 'next/link';

import GENRES from '../../services/genres';
import React, { useContext } from 'react';
import themeContext from '../../contexts/theme';
import classNames from 'classnames/bind';
import css from './styles.module.scss';
import Ratio from '../Ratio';

const cx = classNames.bind(css);
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'a366c741ebcd23ebb98f75ee1b26fece';

export interface CardProps {
  className?: string;
  movie: any;
  ratio: number;
}

const Card = ({ className, movie, ratio }: CardProps) => {
  const theme = useContext(themeContext);
  const {
    poster_path,
    original_title,
    genre_ids,
    runtime,
    release_date,
    id,
  } = movie;

  const title =
    original_title.length > 30
      ? `${original_title.substr(0, 28)}...`
      : original_title;

  const genresList: string = genre_ids
    .slice(0, 2)
    .map((genre_id) => GENRES[genre_id])
    .join(' · ');

  function getImageFromApi(name: string): string {
    return `https://image.tmdb.org/t/p/w300${name}`;
  }
  function minuteToHour(minutes: number): string {
    const hour: number = Math.floor(minutes / 60);
    const minute: number = minutes % 60;

    return (
      (hour ? hour + 'h' : '') + ('0' + minute).slice(-2) + (hour ? '' : 'm')
    );
  }

  return (
    <Link href={`movie/${id}`}>
      <a>
        <Ratio ratio={ratio}>
          {(className) => (
            <div className={css.card}>
              <img
                className={cx(css.card__picture, theme)}
                src={
                  poster_path
                    ? getImageFromApi(poster_path)
                    : './assets/poster-not-found-no-text.jpg'
                }
                alt={`${movie.title} poster`}
              />
              <div className={cx(css.card__description, theme)}>
                <div className={css.text__container}>
                  <div className={css.titleContainer}>
                    <h3>{title}</h3>
                  </div>
                  <p>{genresList}</p>
                  <div className={css.text__informations}>
                    <div className={css.text__information}>1h12m</div>
                    {release_date && (
                      <div className={css.text__information}>
                        {release_date.slice(0, 4)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Ratio>
      </a>
    </Link>
  );
};

Card.defaultProps = {
  ratio: 274 / 468,
};

export default Card;
