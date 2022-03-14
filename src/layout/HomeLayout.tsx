import React, { Component } from 'react';  
import { Route } from 'react-router-dom';  
  
const HomeLayout = ({ children }) => (                         
    <div>  
      <p>This is the First Layout</p>  
      {children}                                       
    </div>  
  );  
  
  const HomeLayoutRoute = ({component: Component:any, ...rest}) => {  
    return (  
      <Route {...rest} render={matchProps => (  
        <HomeLayout>  
            <Component {...matchProps} />  
        </HomeLayout>  
      )} />  
    )  
  };  
  
export default HomeLayoutRoute;  