import React, {FC, useEffect, useState} from 'react';
import ReactDOMServer from 'react-dom/server';

//TODO: setup a bundler to split code into components
const SSRApp: FC<{portfolio: any; tweets: any[]}> = props => {
  return (
    <>
      <div
        className="container"
        style={{marginTop: '10em', marginBottom: '5em'}}
      >
        <div className="row">
          <div className="GlassContainer col mx-md-6 p-4">
            <div className="row">
              {props.portfolio ? (
                <>
                  <div className="col-4">
                    <div className="row">
                      <div className="col d-flex">
                        <img
                          className="ProfilePic mx-auto"
                          src={props.portfolio.profileImage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <h1>{`${props.portfolio.firstName} ${props.portfolio.lastName}`}</h1>
                    <h4>My Work Experience</h4>
                    <p>{props.portfolio.description}</p>
                  </div>
                </>
              ) : (
                <h2>Not Found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      {props.portfolio ? (
        <div className="container">
          <div className="my-4 row">
            <div className="col-6 mx-auto">
              <h1 className="text-center">
                {props.portfolio.firstName}'s Timeline
              </h1>
              {props.portfolio.twitterProfile ? (
                <>
                  {props.tweets.length ? (
                    props.tweets.map(tweet => (
                      <div className="GlassContainer mb-2 row py-2">
                        <div className="col-2">
                          <img
                            className="ProfilePic2 mx-auto"
                            src={tweet.user.profile_image_url}
                          />
                        </div>
                        <div className="col-8">
                          <h6>{tweet.user.name}</h6>
                          <span className="truncate">
                            {tweet.text.length > 100
                              ? tweet.text.substring(100) + '...'
                              : tweet.text}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="GlassContainer mb-2 text-center">
                      <h6>
                        {props.portfolio.firstName} hasn't been active recently
                        😪
                      </h6>
                    </div>
                  )}
                  <div className="text-center">
                    <a
                      href={`https://twitter.com/intent/user?user_id=${props.portfolio.twitterProfile}`}
                      style={{
                        color: 'white',
                      }}
                    >
                      Go to Account
                    </a>
                  </div>
                </>
              ) : (
                <div className="GlassContainer mb-2 text-center">
                  <h6>
                    {props.portfolio.firstName} hasn't setup it's twitter
                    account yet 😔
                  </h6>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ({portfolio, tweets}: any) =>
  ReactDOMServer.renderToString(
    <SSRApp portfolio={portfolio} tweets={tweets} />
  );
