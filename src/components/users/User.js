import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/spinner';
const User = ({ user, getUser, loading, getUserRepos, repos }) => {
  const param = useParams();
  //const [details, setDetails] = useState([]);
  //const [repos, setRepos] = useState([]);
  useEffect(() => {
    getUser(param.login);
    getUserRepos(param.login);
    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (details) {
  //     console.log('Updated details state:', details);
  //   }
  //   if (repos) {
  //     console.log('Updated repos state:', repos);
  //   }
  // }, [details, repos]);

  //Get user's repos
  // getUserRepos = async (username) => {
  //   try {
  //     const res = await axios.get(
  //       `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     console.log('result data', res.data);
  //     setRepos(res.data);
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };
  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location:{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit github profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-white">Public repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <div className="card grid-2">
        {repos?.map((repo) => (
          <div key={repo.id} className="card">
            <h3>
              <a href={repo.html_url}>{repo.name}</a>
            </h3>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default User;
