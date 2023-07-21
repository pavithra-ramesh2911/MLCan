import React, { FC, useContext, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthWrapper from "../views/Auth/AuthWrapper";
import isAuthenticated from "../shared/components/HOC/requireAuth";
import { RouterProps } from "../shared/types/route.type";
import { AppRoutes } from "./routeConstants/appRoutes";
import Home from "../views/Home";

const AppRouter = () => {
  let routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.HOME, component: isAuthenticated(<Home />) },
  ];


  return (

    <div>
      <BrowserRouter>
        <Routes>
          {routes.map(({ component, ...route }, index) => (
            <Route key={index} {...route} element={component} />
          ))}
          <Route path="*" element={<Navigate to={AppRoutes.CONTAINERS} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
