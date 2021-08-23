import React, {FC, useEffect, useState} from 'react';
import ReactDOMServer from 'react-dom/server';

//TODO: setup a bundler to split code into components
const SSRApp: FC<{portfolio: any}> = props => {
  return (
    <div className="container">
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
                  <div className="my-4 row">
                    <h4>{props.portfolio.firstName}'s Timeline</h4>
                    <div className="GlassContainer mb-2">
                      <h6>Bla</h6>
                      <p>Meows</p>
                    </div>
                    <div className="GlassContainer mb-2">
                      <h6>Bla</h6>
                      <p>Meows</p>
                    </div>
                    <a>Go to Account</a>
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
  );
};

export default (portfolio: any) =>
  ReactDOMServer.renderToString(<SSRApp portfolio={portfolio} />);
