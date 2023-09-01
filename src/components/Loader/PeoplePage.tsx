import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleList } from '../PeopleList';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {loader && (
            <Loader />
          )}

          {error && !loader && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loader && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loader && !error && people.length > 0 && (
            <PeopleList people={people} />
          )}

        </div>
      </div>
    </>
  );
};
